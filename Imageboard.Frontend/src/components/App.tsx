import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './Pages/HomePage/HomePage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import BoardPage from './Pages/BoardPage/BoardPage';
import HttpHelper from '../httpHelper';
import { Board, Constants, Thread } from '../common';

import './App.scss';

type State = {
    boardsLoaded: boolean;
    threadsLoaded: boolean;
    noConnection: boolean;
}

export default class App extends React.Component<{}, State> {
    private boards: Board[];
    private threads: Thread[];

    // Get the current page name (i.e. "Anime" or "Random", etc.)
    public get currentPageName() : string {
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
    public get currentPageAbbr() : string {
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
        HttpHelper.getBoards().then((res) => {
            this.boards = res.data;
            this.setState({ boardsLoaded: true });
        }).catch(() => {
            this.setState({ noConnection: true });
        })

        // Fetching threads info from backend and updating routes
        HttpHelper.getAllThreads().then((res) => {
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
            return(<div />);
        } else {
            return (
                <BrowserRouter>
                    <div id="app">
                        <Switch>
                            {/* Home route */}
                            <Route path="/" exact render={() => <HomePage links={this.boards} />} />

                            {/* Mapping the boars routes */}
                            {this.boards.map((item, key) => {
                                return <Route path={'/' + item.Abbr} exact render={() => <BoardPage name={this.currentPageName} abbr={this.currentPageAbbr} links={this.boards} inThread={false} /> } key={key} />
                            })}

                            {/* Mapping the threads routes */}
                            {this.threads.map((item, key) => {
                                return <Route path={'/' + item.Board + '/' + item.Id} exact render={() => <BoardPage name={this.currentPageName} abbr={this.currentPageAbbr} links={this.boards} inThread={true} /> } key={key} />
                            })}

                            {/* Other routes (404) */}
                            <Route path="*" component={NotFoundPage} />
                        </Switch>
                    </div>
                </BrowserRouter>
            );
        }
    }
}
