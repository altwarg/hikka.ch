import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { ThreadPage, BoardPage, NotFoundPage, HomePage } from './pages';
import { Board, Thread, ImageboardName } from './utils/common';
import { get } from './utils/api';

import './styles.scss';

export const App: React.FC = () => {
    const [boardsLoaded, setBoardsLoaded] = useState(false);
    const [threadsLoaded, setThreadsLoaded] = useState(false);
    const [noConnection, setNoConnection] = useState(false);
    const [boards, setBoards] = useState<Board[]>([]);
    const [threads, setThreads] = useState<Thread[]>([]);

    const currentPageName = (): string => {
        if (boards.length === 0) {
            return '';
        }

        let result: Board = boards.filter(board => board.Abbr === document.location.pathname.substr(1).split('/')[0])[0];

        if (document.location.pathname === '/' && !result) {
            return ImageboardName;
        }

        return result.Name;
    }

    const currentPageAbbr = (): string => {
        if (boards.length === 0) {
            return '';
        }

        return boards.filter(board => board.Abbr === document.location.pathname.substr(1).split('/')[0])[0].Abbr;
    }

    useEffect(() => {
        // Fetching boards info from backend
        get<Board[]>('boards/all')
            .then((data) => { setBoards(data); setBoardsLoaded(true); })
            .catch((err) => setNoConnection(true));

        // Fetching threads info from backend and updating routes
        get<Thread[]>('threads/all')
            .then((data) => { setThreads(data); setThreadsLoaded(true); })
            .catch((err) => setNoConnection(true));
    }, []);

    return !noConnection && boardsLoaded && threadsLoaded ? (
        <Container>
            <BrowserRouter>
                <Switch>
                    {/* Home route */}
                    <Route path="/" exact render={() => <HomePage links={boards} />} />

                    {/* Mapping the boards routes */}
                    {boards.map((item, key) => (
                        <Route path={'/' + item.Abbr} exact render={() => <BoardPage name={currentPageName()} abbr={currentPageAbbr()} links={boards} inThread={false} />} key={key} />
                    ))}

                    {/* Mapping the threads routes */}
                    {threads.map((item, key) => (
                        <Route path={'/' + item.Board + '/' + item.Id} exact render={() => <ThreadPage id={item.Id} name={currentPageName()} abbr={currentPageAbbr()} links={boards} inThread={true} />} key={key} />
                    ))}

                    {/* Other routes (404) */}
                    <Route path="*" component={NotFoundPage} />
                </Switch>
            </BrowserRouter>
        </Container>
    ) : <div />;
}
