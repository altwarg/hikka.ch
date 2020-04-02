import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

type Props = Readonly<{
    links: string[];
}>;

export const BoardsLinks: React.FC<Props> = ({ links }) => (
    <>
        <strong>
            [&nbsp; {links.map((item, key) => (
                <Fragment key={key}>
                    <Link to={'/' + item} key={key}>{item}</Link>
                    {key !== links.length - 1 && (
                        <span> / </span>
                    )}
                </Fragment>
        ))} &nbsp;]
        </strong>

        &nbsp;

        <strong>
            [&nbsp; <Link to="/">Home</Link> &nbsp;]
        </strong>
    </>
);
