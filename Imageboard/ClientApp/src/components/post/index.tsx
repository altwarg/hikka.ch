import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import parser from 'bbcode-to-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Post as Info } from '../../utils/common';
import { ScrollInto } from '../scroll-into-view';
import { SpoilerTag, GreenTextTag, MentionTag } from './lib/bb-tags';
import { Attached } from './components';

type Props = Readonly<{
    info: Info;
    board: string;
    id: string;
    className: string;
}>;

export const Post: React.FC<Props> = ({ info, board, id, className }) => {
    useEffect(() => {
        parser.registerTag('spoiler', SpoilerTag);
        parser.registerTag('green', GreenTextTag);
        parser.registerTag('mention', MentionTag);
    }, []);

    return (
        <Card className={className}>
            <Card.Header>
                <span className="mr-3">
                    {info.name !== null && info.name !== '' ? info.name : 'Anonymous'}
                </span>

                <span className="mr-3 text-danger">{moment(info.dateTime).format('DD/MM/YYYY ddd HH:mm:ss')}</span>

                <ScrollInto selector={`#id-${info.id}`}>
                    <Link to={{
                        pathname: `/${board}/${id}`,
                        hash: `#id-${info.id}`,
                    }} id={`id-${info.id}`} className="mr-1">No.</Link>
                </ScrollInto>

                <span>{info.id}</span>
            </Card.Header>
            <Card.Body>
                {info.attachment && (
                    <Attached id={info.attachment} />
                )}

                <div className="display-whitespace">
                    {parser.toReact(info.message)}
                </div>
            </Card.Body>
        </Card>
    )
};
