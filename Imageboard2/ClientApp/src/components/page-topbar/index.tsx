import React from 'react';
import { Navbar } from 'react-bootstrap';

import { BoardsDescription } from '../boards-description';
import { BoardsLinks } from '../boards-links';

import { Boards, ImageboardName } from '../../utils/common';

import './styles.scss';

type Props = Readonly<{
    abbr: string;
    links: Boards;
}>;

export const PageTopbar: React.FC<Props> = ({ abbr, links }) => (
    <>
        <Navbar
            sticky="top"
            bg="white"
            className="navbar-links"
        >
            <BoardsLinks links={links.map(item => item.abbr)} />
        </Navbar>

        <BoardsDescription
            name={
                abbr === '/'
                    ? ImageboardName
                    : links.find((item) => item.abbr === abbr)!.name
            }
            abbr={abbr}
        />
    </>
);
