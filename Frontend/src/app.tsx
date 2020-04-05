import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { ThreadPage, BoardPage, NotFoundPage, HomePage } from './pages';
import { Boards } from './utils/common';
import { get } from './utils/api';

import './styles.scss';

export const App: React.FC = () => {
    const [links, setLinks] = useState<Boards | null>(null);

    useEffect(() => {
        get<Boards>('boards/all')
            .then((res) => setLinks(res))
            .catch((err) => console.error(err));
    }, [])

    return links && (
        <Container>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact render={() => <HomePage links={links} />} />
                    <Route path="/not-found" exact component={NotFoundPage} />
                    <Route path="/:board" exact render={(props) => <BoardPage routeProps={{...props}} links={links} />} />
                    <Route path="/:board/:thread" exact render={(props) => <ThreadPage routeProps={{...props}} links={links} />} />
                    </Switch>
            </BrowserRouter>
        </Container>
    );
};
