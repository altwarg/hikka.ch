import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { ThreadPage, BoardPage, NotFoundPage, HomePage } from './pages';
import { Boards, Threads, ImageboardName } from './utils/common';
import { get } from './utils/api';

import './styles.scss';

export const App: React.FC = () => {
    const [boards, setBoards] = useState<Boards | null>(null);
    const [threads, setThreads] = useState<Threads | null>(null);

    const currentPageName = (): string => {
        if (boards!.length === 0) {
            return '';
        }

        let result = boards!.filter(board => board.Abbr === document.location.pathname.substr(1).split('/')[0])[0];

        if (document.location.pathname === '/' && !result) {
            return ImageboardName;
        }

        return result.Name;
    }

    const currentPageAbbr = (): string => {
        if (boards!.length === 0) {
            return '';
        }

        return boards!.filter(board => board.Abbr === document.location.pathname.substr(1).split('/')[0])[0].Abbr;
    }

    useEffect(() => {
        // Fetching boards info from backend
        get<Boards>('boards/all')
            .then((data) => setBoards(data))
            .catch((err) => console.error(err));

        // Fetching threads info from backend and updating routes
        get<Threads>('threads/all')
            .then((data) => setThreads(data))
            .catch((err) => console.error(err));
    }, []);

    return boards && threads ? (
        <Container>
            <BrowserRouter>
                <Switch>
                    {/* Home route */}
                    <Route path="/" exact render={() => <HomePage links={boards} />} />

                    {/* Mapping the boards routes */}
                    {boards.map((item, key) => (
                        <Route path={'/' + item.Abbr} exact render={() => <BoardPage name={currentPageName()} abbr={currentPageAbbr()} links={boards} />} key={key} />
                    ))}

                    {/* Mapping the threads routes */}
                    {threads.map((item, key) => (
                        <Route path={'/' + item.Board + '/' + item.Id} exact render={() => <ThreadPage id={item.Id} name={currentPageName()} abbr={currentPageAbbr()} links={boards} />} key={key} />
                    ))}

                    {/* Other routes (404) */}
                    <Route path="*" component={NotFoundPage} />
                </Switch>
            </BrowserRouter>
        </Container>
    ) : <div />;
}
