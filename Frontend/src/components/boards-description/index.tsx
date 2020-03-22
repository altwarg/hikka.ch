import React, { Fragment } from 'react';

import { Constants } from '../../utils/common';
import { Link } from 'react-router-dom';

type Props = {
    name: string;
    abbr: string;
}

export class BoardsDescription extends React.Component<Props> {
    // Changing the <title> contents when changing the board
    componentDidMount() {
        if (this.props.name !== '' && this.props.name !== Constants.ImageboardName) {
            document.title = `${Constants.ImageboardName} — ${this.props.name}`;
        } else {
            document.title = Constants.ImageboardName;
        }
    }

    render() {
        return (
            <Fragment>
                {this.props.name !== '' && this.props.name !== Constants.ImageboardName && (
                    <Fragment>
                        <h1 className="text-center">
                            <span><Link to={'/' + this.props.abbr} className="link">{this.props.name}</Link></span>
                        </h1>

                        <hr />
                    </Fragment>
                )}
                {this.props.name === Constants.ImageboardName && (
                    <Fragment>
                        <h1 className="text-center">{Constants.ImageboardName}</h1>
                        <h2 className="text-center">Welcome. Once again</h2>

                        <hr />

                        <h3 className="text-center">What is {Constants.ImageboardName}?</h3>
                        <p>{Constants.ImageboardName} is a simple image-based bulletin board where anyone can post comments and share images. There are boards dedicated to a variety of topics, from Japanese animation and culture to videogames, music and photography. Users not need to register an account before participating in the commutiny. Fell free to click on a board below that interests you and jump right in!</p>
                    </Fragment>
                )}
            </Fragment>
        );
    }
}
