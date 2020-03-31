import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

type Props = {
    links: string[];
}

export const BoardsLinks: React.FC<Props> = ({ links }) => (
    <nav id="board-navigation" className="borderless">
        <strong>
            [&nbsp; {links.map((item, key) => (
                <Fragment key={key}>
                    <Link to={'/' + item} className="board-navigation__link" key={key}>{item}</Link>
                    {key !== links.length - 1 && (
                        <span> / </span>
                    )}
                </Fragment>
        ))} &nbsp;]
        </strong>

        &nbsp;

        <strong>
            [&nbsp; <Link to="/" className="board-navigation__link">Home</Link> &nbsp;]
        </strong>
    </nav>
);
