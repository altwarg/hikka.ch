import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Pages/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import Board from './Pages/Board/Board';
import HttpHelper from '../httpHelper';
import { BoardsInfo, Constants } from '../common';

import './App.scss';

type State = {
    isLoading: boolean;
}

export default class App extends React.Component<{}, State> {
    private boardsInfo: BoardsInfo[];

    // Get the current page name (i.e. "Anime" or "Random", etc.)
    public get currentPageName() : string {
        if (this.boardsInfo.length === 0) {
            return '';
        }

        let result: BoardsInfo = this.boardsInfo.filter(info => info.Abbr === document.location.pathname.substr(1))[0];

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

        return this.boardsInfo.filter(info => info.Abbr === document.location.pathname.substr(1))[0].Abbr;
    }

    constructor(props: any) {
        super(props);

        this.boardsInfo = [];
        this.state = { isLoading: true };

        // Fetching boards info from backend and updating the state to enforce the components re-render
        HttpHelper.getBoardsInfo().then((res) => {
            this.boardsInfo = res.data;
            this.setState({ isLoading: false });
        });
    }

    render() {
        if (this.state.isLoading) {
            console.log("Loading boards, please wait...");
            return(<div />);
        } else {
            return (
                <BrowserRouter>
                    <div id="app">
                        <Switch>
                            <Route path="/" exact render={() => <Home boardsInfo={this.boardsInfo} />} />

                            {this.boardsInfo.map((item, key) => {
                                return <Route path={'/' + item.Abbr} exact render={() => <Board name={this.currentPageName} abbr={this.currentPageAbbr} boardsInfo={this.boardsInfo} /> } key={key} />
                            })}

                            <Route path="*" component={NotFound} />
                        </Switch>
                    </div>
                </BrowserRouter>
            );
        }
    }
}
