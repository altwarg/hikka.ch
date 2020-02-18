import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Pages/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import Board from './Pages/Board/Board';
import HttpHelper from '../httpHelper';
import { BoardsInfo, Constants, ThreadInfo } from '../common';

import './App.scss';

type State = {
    boardsLoaded: boolean;
    threadsLoaded: boolean;
}

export default class App extends React.Component<{}, State> {
    private boardsInfo: BoardsInfo[];
    private threadsInfo: ThreadInfo[];

    // Get the current page name (i.e. "Anime" or "Random", etc.)
    public get currentPageName() : string {
        if (this.boardsInfo.length === 0) {
            return '';
        }

        let result: BoardsInfo = this.boardsInfo.filter(info => info.Abbr === document.location.pathname.substr(1).split('/')[0])[0];

        if (document.location.pathname === '/' && !result) {
            return Constants.ImageboardName;
        }

        return result.Name;
    }

    // Get the current page abbr (i.e. 'a' or 'b', etc.)
    public get currentPageAbbr() : string {
        if (this.boardsInfo.length === 0) {
            return '';
        }

        return this.boardsInfo.filter(info => info.Abbr === document.location.pathname.substr(1).split('/')[0])[0].Abbr;
    }

    constructor(props: any) {
        super(props);

        this.boardsInfo = [];
        this.threadsInfo = [];
        this.state = { threadsLoaded: false, boardsLoaded: false };

        // Fetching boards info from backend
        HttpHelper.getBoardsInfo().then((res) => {
            this.boardsInfo = res.data;
            this.setState({ boardsLoaded: true });
        });

        // Fetching threads info from backend and updating routes
        HttpHelper.getAllThreads().then((res) => {
            this.threadsInfo = res.data;
            this.setState({ threadsLoaded: true });
        })
    }

    render() {
        if (!(this.state.threadsLoaded && this.state.boardsLoaded)) {
            console.log("Loading, please wait...");
            return(<div />);
        } else {
            return (
                <BrowserRouter>
                    <div id="app">
                        <Switch>
                            <Route path="/" exact render={() => <Home boardsInfo={this.boardsInfo} />} />

                            {this.boardsInfo.map((item, key) => {
                                return <Route path={'/' + item.Abbr} exact render={() => <Board name={this.currentPageName} abbr={this.currentPageAbbr} boardsInfo={this.boardsInfo} threadInfo={null} threadOpened={false} /> } key={key} />
                            })}

                            {this.threadsInfo.map((item, key) => {
                                return <Route path={'/' + item.Board + '/' + item.Id} exact render={() => <Board name={this.currentPageName} abbr={this.currentPageAbbr} boardsInfo={this.boardsInfo} threadInfo={item} threadOpened={true} /> } key={key} />
                            })}

                            <Route path="*" component={NotFound} />
                        </Switch>
                    </div>
                </BrowserRouter>
            );
        }
    }
}
