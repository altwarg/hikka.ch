import React from 'react';
import { Link } from 'react-router-dom';

import BoardsDescriptionControl from '../../Controls/BoardsDescriptionControl/BoardsDescriptionControl';
import { Board, Constants } from '../../../common';

import './HomePage.scss';

type Props = {
    links: Board[];
}

export default class HomePage extends React.Component<Props> {
    render() {
        return(
            <div id="content">
                <div id="description">
                    <BoardsDescriptionControl name={Constants.ImageboardName} abbr="/" />
                </div>

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
            </div>
        );
    }
}
