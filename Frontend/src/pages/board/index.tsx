import React, { useState, useEffect } from 'react';
import { Button, Collapse } from 'react-bootstrap';

import { Thread, PageTopbar, PostForm } from '../../components';
import { Boards, Threads } from '../../utils/common';
import { post } from '../../utils/api';

type Props = Readonly<{
    links: Boards;
    name: string;
    abbr: string;
}>;

export const BoardPage: React.FC<Props> = ({ links, name, abbr }) => {
    const [fetched, setFetched] = useState<Threads | null>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        let dto = {
            Board: abbr,
            LastPostsLimit: 3
        };

        post<Threads>('threads/all', dto)
            .then((data) => setFetched(data))
            .catch((err) => console.error(err));
    }, [abbr]);

    return fetched ? (
        <>
            <PageTopbar abbr={abbr} links={links} name={name} />

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

            {fetched.map((item, key) => (
                <Thread info={item} key={key} className="mb-5" />
            ))}
        </>
    ) : <div />;
}
