import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import { Post } from '../post';
import { Thread as Info } from '../../utils/common';

type Props = Readonly<{
    info: Info;
    className: string;
}>;

export const Thread: React.FC<Props> = ({ info, className }) => (
    <Card className={className}>
        <Card.Header>
            <strong>{info.Title}</strong> Posts: {info.PostsCount} <Link className="float-right" to={`/${info.Board}/${info.Id}`}><strong>Open thread</strong></Link>
        </Card.Header>
        <Card.Body>
            {info.Posts.map((item, key) => (
                <Post info={item} key={key} className={key !== info.Posts.length - 1 ? 'mb-3' : ''} />
            ))}
        </Card.Body>
    </Card>
);
