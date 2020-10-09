import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Button, Collapse } from 'react-bootstrap';

import { Thread as ThreadItem, PageTopbar, PostForm, Toast } from '../../components';
import { Thread, Boards } from '../../utils/common';
import { get } from '../../utils/api';

type RouteProps = RouteComponentProps<Readonly<{
    board: string;
    thread: string;
}>>;

type Props = Readonly<{
    routeProps: RouteProps;
    links: Boards;
}>;

export const ThreadPage: React.FC<Props> = ({ routeProps, links }) => {
    const [thread, setThread] = useState<Thread | null>(null);
    const [error, setError] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [show, setShow] = useState(false);

    const abbr = routeProps.match.params.board;
    const id = routeProps.match.params.thread;

    useEffect(() => {
        get<Thread>(`threads/${id}`)
            .then(data => {
                setThread(data);
                showToastMessage('Data loaded from database.');
            })
            .catch(err => setError(true));
    }, [id, abbr]);

    const showToastMessage = (msg: string) => {
        setToastMsg(msg);
        setShowToast(true);
    }

    return thread ? (
        <>
            <PageTopbar abbr={abbr} links={links} />
            <Toast msg={toastMsg} show={showToast} onClose={() => setShowToast(false)} />

            <div className="text-center">
                <Button
                    onClick={() => setShow(!show)}
                    size="sm"
                    aria-expanded={show}
                    aria-controls="form"
                >
                    {show ? 'Close posting form' : 'Reply to thread'}
                </Button>
            </div>

            <Collapse in={show}>
                <div id="form">
                    <PostForm abbr={abbr} inThread={true} onSubmit={showToastMessage} />

                    <hr />
                </div>
            </Collapse>

            {!show && <hr />}

            <ThreadItem info={thread} className="mb-5" inThread={true} />
        </>
    ) : error ? <Redirect to="/not-found" /> : <div />;
};
