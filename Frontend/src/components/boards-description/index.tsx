import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { Constants } from '../../utils/common';
import { Link } from 'react-router-dom';
import { Emoji } from '../emoji';

type Props = {
    name: string;
    abbr: string;
}

export const BoardsDescription: React.FC<Props> = ({ name, abbr }) => (
    <>
        {name !== '' && name !== Constants.ImageboardName && (
            <>
                <h1 className="text-center">
                    <span><Link to={'/' + abbr} className="link">{name}</Link></span>
                </h1>

                <hr />
            </>
        )}

        {name === Constants.ImageboardName && (
            <>
                <h1 className="text-center"><Emoji symbol="🔰" />{Constants.ImageboardName}</h1>
                <h2 className="text-center">Welcome. Once again</h2>

                <hr />

                <Row>
                    <Col md="12">
                        <h3 className="text-center">What is {Constants.ImageboardName}?</h3>
                        <p>{Constants.ImageboardName} is a simple image-based bulletin board where anyone can post comments and share images. There are boards dedicated to a variety of topics, from Japanese animation and culture to videogames, music and photography. Users not need to register an account before participating in the commutiny. Fell free to click on a board below that interests you and jump right in!</p>
                    </Col>
                </Row>
            </>
        )}
    </>
)
