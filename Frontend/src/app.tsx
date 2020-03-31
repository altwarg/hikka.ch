import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { ThreadPage, BoardPage, NotFoundPage, HomePage } from './pages';
import Api from './utils/api';
import { Board, Constants, Thread } from './utils/common';

import './styles.scss';

type State = {
    boardsLoaded: boolean;
    threadsLoaded: boolean;
    noConnection: boolean;
}

export default class App extends React.Component<{}, State> {
    private boards: Board[];
    private threads: Thread[];

    // Get the current page name (i.e. "Anime" or "Random", etc.)
    public get currentPageName(): string {
        if (this.boards.length === 0) {
            return '';
        }

        let result: Board = this.boards.filter(board => board.Abbr === document.location.pathname.substr(1).split('/')[0])[0];

        if (document.location.pathname === '/' && !result) {
            return Constants.ImageboardName;
        }

        return result.Name;
    }

    // Get the current page abbr (i.e. 'a' or 'b', etc.)
    public get currentPageAbbr(): string {
        if (this.boards.length === 0) {
            return '';
        }

        return this.boards.filter(board => board.Abbr === document.location.pathname.substr(1).split('/')[0])[0].Abbr;
    }

    constructor(props: any) {
        super(props);

        this.boards = [];
        this.threads = [];
        this.state = { threadsLoaded: false, boardsLoaded: false, noConnection: false };

        // Fetching boards info from backend
        Api.getBoards().then((res) => {
            this.boards = res.data;
            this.setState({ boardsLoaded: true });
        }).catch(() => {
            this.setState({ noConnection: true });
        })

        // Fetching threads info from backend and updating routes
        Api.getAllThreads().then((res) => {
            this.threads = res.data;
            this.setState({ threadsLoaded: true });
        }).catch((err: Error) => {
            this.setState({ noConnection: true });
        })
    }

    render() {
        if (this.state.noConnection) {
            return (<div>No connection with backend</div>);
        } else if (!(this.state.threadsLoaded && this.state.boardsLoaded)) {
            return (<div />);
        } else {
            return (
                <Container>
                    <BrowserRouter>
                        <Switch>
                            {/* Home route */}
                            <Route path="/" exact render={() => <HomePage links={this.boards} />} />

                            {/* Mapping the boards routes */}
                            {this.boards.map((item, key) => (
                                <Route path={'/' + item.Abbr} exact render={() => <BoardPage name={this.currentPageName} abbr={this.currentPageAbbr} links={this.boards} inThread={false} />} key={key} />
                            ))}

                            {/* Mapping the threads routes */}
                            {this.threads.map((item, key) => (
                                <Route path={'/' + item.Board + '/' + item.Id} exact render={() => <ThreadPage thread={item.Id} name={this.currentPageName} abbr={this.currentPageAbbr} links={this.boards} inThread={true} />} key={key} />
                            ))}

                            {/* Other routes (404) */}
                            <Route path="*" component={NotFoundPage} />
                        </Switch>
                    </BrowserRouter>
                </Container>
            );
        }
    }
}
