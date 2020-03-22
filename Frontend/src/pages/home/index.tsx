import React from 'react';
import { Link } from 'react-router-dom';

import { BoardsDescription } from '../../components'
import { Board, Constants } from '../../utils/common';

import './styles.scss';

type Props = {
    links: Board[];
}

export class HomePage extends React.Component<Props> {
    render() {
        return(
            <>
                <BoardsDescription name={Constants.ImageboardName} abbr="/" />

                <hr />

                <div className="row">
                    <div className="full-width">
                        <h3 className="text-center">Boards</h3>
                        <ul id="homepage__boards-list" className="list-group">
                            {this.props.links.map((item, key) => {
                                return (
                                    <li className="list-group-item homepage__board borderless" key={key}>
                                        <strong>
                                            <Link to={item.Abbr} className="homepage__board__link">{item.Abbr} — {item.Name}</Link>
                                        </strong>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}
