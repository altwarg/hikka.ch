import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Button, Collapse } from 'react-bootstrap';

import { Thread, PageTopbar, PostForm } from '../../components';
import { Boards, Threads } from '../../utils/common';
import { get } from '../../utils/api';

type RouteProps = RouteComponentProps<Readonly<{
    board: string;
}>>;

type Props = Readonly<{
    routeProps: RouteProps;
    links: Boards;
}>;

export const BoardPage: React.FC<Props> = ({ routeProps, links }) => {
    const [threads, setThreads] = useState<Threads | null>(null);
    const [error, setError] = useState(false);
    const [show, setShow] = useState(false);

    const abbr = routeProps.match.params.board;

    useEffect(() => {
        get<Threads>(`threads/all?board=${abbr}&limit=3`)
            .then((data) => setThreads(data))
            .catch(err => setError(true));
    }, []);


    return threads ? (
        <>
            <PageTopbar abbr={abbr} links={links} />

            <div className="text-center">
                <Button
                    onClick={() => setShow(!show)}
                    size="sm"
                    aria-expanded={show}
                    aria-controls="form"
                >
                    {show ? 'Close posting form' : 'Create thread'}
                </Button>
            </div>

            <Collapse in={show}>
                <div id="form">
                    <PostForm abbr={abbr} inThread={false} />

                    <hr />
                </div>
            </Collapse>

            {!show && <hr />}

            {threads.map((item, key) => (
                <Thread info={item} key={key} className="mb-5" inThread={false} />
            ))}
        </>
    ) : error ? <Redirect to="/not-found" /> : <div />;
}
