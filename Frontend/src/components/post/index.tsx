import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import parser from 'bbcode-to-react';

import { Post as Info } from '../../utils/common';
import { Spoiler } from './lib/bb-tags';
// import { Attached } from './components';

type Props = Readonly<{
    info: Info;
    className: string;
}>;

export const Post: React.FC<Props> = ({ info, className }) => {
    useEffect(() => {
        parser.registerTag('spoiler', Spoiler);
    });

    return (
        <Card className={className}>
            <Card.Header>
                {info.Name !== null && info.Name !== '' ? info.Name : 'Anonymous'} {info.DateTime} No. {info.Id}
            </Card.Header>
            <Card.Body>
                {/* <Attached size="40.0Kb" width={591} height={453} source="/blank.jpg" />
            <Attached size="40.0Kb" width={591} height={453} source="/blank.jpg" /> */}
                <Card.Text className="display-whitespace">
                    {parser.toReact(info.Message)}
                </Card.Text>
            </Card.Body>
        </Card>
    )
};
