import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import { Post } from '../post';
import { Thread as Info } from '../../utils/common';

type Props = Readonly<{
    info: Info;
    className: string;
    inThread: boolean;
}>;

export const Thread: React.FC<Props> = ({ info, className, inThread }) => {
    useEffect(() => {
        if (inThread) {
            document.querySelector(document.location.hash)!.scrollIntoView();
        }
    }, [inThread]);

    return (
        <Card className={className}>
            <Card.Header>
                <span className="font-weight-bold mr-3">{info.Title}</span>
                <span>Posts: {info.PostsCount}</span>
                {!inThread && <Link className="float-right font-weight-bold" to={`/${info.Board}/${info.Id}`}>Open thread</Link>}
            </Card.Header>
            <Card.Body>
                {info.Posts.map((item, key) => (
                    <Post
                        info={item}
                        board={info.Board}
                        id={info.Id}
                        key={key}
                        className={key !== info.Posts.length - 1 ? 'mb-3' : ''}
                    />
                ))}
            </Card.Body>
        </Card>
    )
};
