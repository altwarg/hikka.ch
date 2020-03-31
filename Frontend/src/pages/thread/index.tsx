import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';

import { Thread as ThreadItem, PostForm, BoardsDescription, BoardsLinks } from '../../components';
import Api from '../../utils/api';
import { Thread, Board } from '../../utils/common';

import './styles.scss';

type Props = {
    links: Board[];
    inThread: boolean;
    name: string;
    abbr: string;
    thread: string;
}

export const ThreadPage: React.FC<Props> = ({ links, inThread, name, abbr, thread }) => {
    const [loaded, setLoaded] = useState(false);
    const [show, setShow] = useState(false);
    const [noConnection, setNoConnection] = useState(false);
    const [fetched, setFetched] = useState<Thread | null>(null);

    useEffect(() => {
        Api.getThreadById(thread).then((res) => {
            setFetched(res.data);
            setLoaded(true);
        }).catch((err: AxiosError) => {
            if (err.message === "NetworkError") {
                setNoConnection(true);
            }
        });
    }, []);

    return !noConnection && loaded ? (
        <>
            <BoardsLinks links={links.map(item => item.Abbr)} />
            <BoardsDescription name={name} abbr={abbr} />

            <div className="clickable-link__container">
                {show && (
                    <span className="clickable-link" onClick={() => setShow(false)}>
                        Close posting form
                    </span>
                )}

                {!show && (
                    <span className="clickable-link" onClick={() => setShow(true)}>
                        Open posting form
                    </span>
                )}
            </div>

            {show && (
                <PostForm abbr={abbr} inThread={inThread} />
            )}

            <hr />

            <ThreadItem threadInfo={fetched} inThread={inThread} />
        </>
    ) : <div />;
}
