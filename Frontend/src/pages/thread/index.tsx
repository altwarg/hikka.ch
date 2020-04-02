import React, { useState, useEffect } from 'react';
import { Button, Collapse } from 'react-bootstrap';

import { Thread as ThreadItem, PageTopbar, PostForm } from '../../components';
import { Thread, Boards } from '../../utils/common';
import { get } from '../../utils/api';

type Props = Readonly<{
    links: Boards;
    name: string;
    abbr: string;
    id: string;
}>;

export const ThreadPage: React.FC<Props> = ({ links, name, abbr, id }) => {
    const [fetched, setFetched] = useState<Thread | null>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        get<Thread>(`threads/${id}`)
            .then((data) => setFetched(data))
            .catch((err) => console.error(err));
    }, [id, abbr]);

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
                    {show ? 'Close posting form' : 'Reply to thread'}
                </Button>
            </div>

            <Collapse in={show}>
                <div id="form">
                    <PostForm abbr={abbr} inThread={true} />

                    <hr />
                </div>
            </Collapse>

            {!show && <hr />}

            <ThreadItem info={fetched} className="mb-5" />
        </>
    ) : <div />;
}
