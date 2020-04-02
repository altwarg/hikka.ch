import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { ImageboardName } from '../../utils/common';
import { Link } from 'react-router-dom';
import { Emoji } from '../emoji';

type Props = Readonly<{
    name: string;
    abbr: string;
}>;

export const BoardsDescription: React.FC<Props> = ({ name, abbr }) => (
    <>
        {name !== '' && name !== ImageboardName && (
            <>
                <h1 className="text-center mt-4">
                    <span><Link to={'/' + abbr} className="link">/{abbr}/ – {name}</Link></span>
                </h1>

                <hr />
            </>
        )}

        {name === ImageboardName && (
            <>
                <h1 className="text-center mt-4"><Emoji symbol="🔰" />{ImageboardName}</h1>
                <h2 className="text-center mt-4">Welcome. Once again</h2>

                <hr />

                <Row>
                    <Col md="12">
                        <h3 className="text-center">What is {ImageboardName}?</h3>
                        <p>{ImageboardName} is a simple image-based bulletin board where anyone can post comments and share images. There are boards dedicated to a variety of topics, from Japanese animation and culture to videogames, music and photography. Users not need to register an account before participating in the commutiny. Fell free to click on a board below that interests you and jump right in!</p>
                    </Col>
                </Row>
            </>
        )}
    </>
);
