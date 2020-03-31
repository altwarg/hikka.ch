import React, { useState, useEffect } from 'react';
import { AxiosError } from 'axios';

import { Thread, PostForm, BoardsDescription, BoardsLinks } from '../../components';
import Api from '../../utils/api';
import { Board, Thread as ThreadInfo, GetThreadsDTO } from '../../utils/common';

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
            Api.getThreadById(id).then((res) => {
                setThreads([res.data]);
                setLoaded(true);
            }).catch((err: AxiosError) => {
                if (err.message === "Network Error") {
                    setNoConnection(true);
                }
            });
        } else {
            let dto: GetThreadsDTO = {
                Board: abbr,
                LastPostsLimit: 3
            };

            Api.getBoardThreads(dto).then((res) => {
                setThreads(res.data);
                setLoaded(true);
            }).catch((err: AxiosError) => {
                if (err.message === "Network Error") {
                    setNoConnection(true);
                }
            });
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
