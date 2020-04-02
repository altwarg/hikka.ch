import React from 'react';

import { BoardsDescription } from '../boards-description';
import { BoardsLinks } from '../boards-links';

import { Boards } from '../../utils/common';

type Props = Readonly<{
    abbr: string;
    links: Boards;
    name: string;
}>;

export const PageTopbar: React.FC<Props> = ({ abbr, links, name }) => (
    <>
        <BoardsLinks links={links.map(item => item.Abbr)} />
        <BoardsDescription name={name} abbr={abbr} />
    </>
);
