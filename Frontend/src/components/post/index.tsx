import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import parser from 'bbcode-to-react';
import { Link } from 'react-router-dom';

import { Post as Info } from '../../utils/common';
import { ScrollInto } from '../scroll-into-view';
import { SpoilerTag, GreenTextTag, MentionTag } from './lib/bb-tags';
// import { Attached } from './components';

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
                    {info.Name !== null && info.Name !== '' ? info.Name : 'Anonymous'}
                </span>

                <span className="mr-3 text-danger">{info.DateTime}</span>

                <ScrollInto selector={`#id-${info.Id}`}>
                    <Link to={{
                        pathname: `/${board}/${id}`,
                        hash: `#id-${info.Id}`,
                    }} id={`id-${info.Id}`} className="mr-1">No.</Link>
                </ScrollInto>

                <span>{info.Id}</span>
            </Card.Header>
            <Card.Body>
                {/* <Attached size="40.0Kb" width={591} height={453} source="/blank.jpg" />*/}
                <div className="display-whitespace">
                    {parser.toReact(info.Message)}
                </div>
            </Card.Body>
        </Card>
    )
};
