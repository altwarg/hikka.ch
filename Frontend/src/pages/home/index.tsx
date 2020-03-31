import React from 'react';
import { Link } from 'react-router-dom';

import { BoardsDescription } from '../../components'
import { Boards, ImageboardName } from '../../utils/common';

import './styles.scss';

type Props = Readonly<{
    links: Boards;
}>;

export const HomePage: React.FC<Props> = ({ links }) => (
    <>
        <BoardsDescription name={ImageboardName} abbr="/" />

        <hr />

        <div className="row">
            <div className="full-width">
                <h3 className="text-center">Boards</h3>
                <ul id="homepage__boards-list" className="list-group">
                    {links.map((item, key) => (
                        <li className="list-group-item homepage__board borderless" key={key}>
                            <strong>
                                <Link to={item.Abbr} className="homepage__board__link">{item.Abbr} — {item.Name}</Link>
                            </strong>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </>
);
