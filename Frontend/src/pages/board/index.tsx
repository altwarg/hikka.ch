import React, { useState, useEffect } from 'react';

import { Thread, PostForm, BoardsDescription, BoardsLinks } from '../../components';
import { Board, Thread as ThreadInfo } from '../../utils/common';
import { get, post } from '../../utils/api';

import './styles.scss';

type Props = {
    links: Board[];
    inThread: boolean;
    name: string;
    abbr: string;
}

export const BoardPage: React.FC<Props> = ({ links, inThread, name, abbr }) => {
    const [loaded, setLoaded] = useState(false);
    const [show, setShow] = useState(false);
    const [noConnection, setNoConnection] = useState(false);
    const [threads, setThreads] = useState<ThreadInfo[]>([]);

    useEffect(() => {
        if (inThread === true) {
            // We've opened thread
            let id: string = document.location.pathname.substr(1).split('/')[1];

            get<ThreadInfo>(`threads/${id}`)
                .then((data) => { setThreads([ data ]); setLoaded(true); })
                .catch((err) => setNoConnection(true));
        } else {
            let dto = {
                Board: abbr,
                LastPostsLimit: 3
            };

            post<ThreadInfo[]>('threads/all', dto)
                .then((data) => { setThreads(data); setLoaded(true); })
                .catch((err) => setNoConnection(true));
        }
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

            {threads.map((item, key) => (
                <Thread threadInfo={item} inThread={inThread} key={key} />
            ))}
        </>
    ) : <div />;
}
