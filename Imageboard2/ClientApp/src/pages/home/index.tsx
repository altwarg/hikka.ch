import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

import { PageTopbar } from '../../components';
import { Boards } from '../../utils/common';

type Props = Readonly<{
    links: Boards;
}>;

export const HomePage: React.FC<Props> = ({ links }) => {
    return (
        <>
            <PageTopbar abbr="/" links={links} />

            <hr />

            <Row>
                <Col md="12">
                    <h3 className="text-center">Boards</h3>
                    <ListGroup horizontal>
                        {links.map((item, key) => (
                            <ListGroupItem className="borderless" key={key}>
                                <strong>
                                    <Link to={item.abbr}>{item.name}</Link>
                                </strong>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </>
    );
};
