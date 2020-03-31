import React, { useState } from 'react';

import { PostForm } from '../post-form';
import { BoardsDescription } from '../boards-description';
import { BoardsLinks } from '../boards-links';

import { Boards } from '../../utils/common';

import './styles.scss';

type Props = Readonly<{
    inThread: boolean;
    abbr: string;
    links: Boards;
    name: string
}>;

export const PageTopbar: React.FC<Props> = ({ inThread, abbr, links, name }) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <BoardsLinks links={links.map(item => item.Abbr)} />
            <BoardsDescription name={name} abbr={abbr} />

            <div className="clickable-link__container">
                <span className="clickable-link" onClick={() => setShow(show ? false : true)}>
                    {show ? 'Close' : 'Open'} posting form
                </span>
            </div>

            {show && (
                <PostForm abbr={abbr} inThread={inThread} />
            )}
        </>
    );
}
