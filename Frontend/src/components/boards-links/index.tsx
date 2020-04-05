import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

type Props = Readonly<{
    links: string[];
}>;

export const BoardsLinks: React.FC<Props> = ({ links }) => (
    <>
        <span className="font-weight-bold">
            [&nbsp; {links.map((item, key) => (
                <Fragment key={key}>
                    <Link to={'/' + item} key={key}>{item}</Link>
                    {key !== links.length - 1 && (
                        <span> / </span>
                    )}
                </Fragment>
        ))} &nbsp;]
        </span>

        &nbsp;

        <span className="font-weight-bold">
            [&nbsp; <Link to="/">Home</Link> &nbsp;]
        </span>
    </>
);
