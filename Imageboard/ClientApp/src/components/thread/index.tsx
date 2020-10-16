import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form } from 'react-bootstrap';

import { Post } from '../post';
import { Thread as Info, FetchAction } from '../../utils/common';

type Props = Readonly<{
    info: Info;
    className: string;
    inThread: boolean;
    onUpdate: (action: FetchAction) => void;
}>;

export const Thread: React.FC<Props> = ({ info, className, inThread, onUpdate }) => {
    useEffect(() => {
        if (inThread && document.location.hash) {
            const el = document.querySelector(document.location.hash)
            if (el) {
                el.scrollIntoView();
            }
        }
    }, [inThread]);

    return (
        <Card className={className}>
            <Card.Header>
                <span className="font-weight-bold mr-3">{info.title}</span>
                <span>Posts: {info.postsCount}</span>
                {inThread && <a className="link ml-2" onClick={() => onUpdate(FetchAction.update)}>Update thread</a>}
                {inThread && <Form.Check type="checkbox" label="AutoUpdate" className="d-inline-block ml-2" />}
                {!inThread && <Link className="float-right font-weight-bold" to={`/${info.board}/${info.id}`}>Open thread</Link>}
            </Card.Header>
            <Card.Body>
                {info.posts.map((item, key) => (
                    <Post
                        info={item}
                        board={info.board}
                        id={info.id}
                        key={key}
                        className={key !== info.posts.length - 1 ? 'mb-3' : ''}
                    />
                ))}
            </Card.Body>
        </Card>
    )
};
