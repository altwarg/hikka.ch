import React from 'react';

import { BoardsDescription } from '../boards-description';
import { BoardsLinks } from '../boards-links';

import { Boards, ImageboardName } from '../../utils/common';

type Props = Readonly<{
    abbr: string;
    links: Boards;
}>;

export const PageTopbar: React.FC<Props> = ({ abbr, links }) => (
    <>
        <BoardsLinks links={links.map(item => item.Abbr)} />
        <BoardsDescription
            name={
                abbr === '/'
                    ? ImageboardName
                    : links.find((item) => item.Abbr === abbr)!.Name
            }
            abbr={abbr}
        />
    </>
);
