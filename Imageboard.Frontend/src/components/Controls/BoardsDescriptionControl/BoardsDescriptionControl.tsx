import React from 'react';

import { Constants } from '../../../common';

type Props = {
    name: string;
}

export default class BoardsDescriptionControl extends React.Component<Props> {
    // Changing the <title> contents when changing the board
    componentDidMount() {
        if (this.props.name !== '' && this.props.name !== Constants.ImageboardName) {
            document.title = `${Constants.ImageboardName} — ${this.props.name}`;
        } else {
            document.title = Constants.ImageboardName;
        }
    }

    render() {
        if (this.props.name !== '' && this.props.name !== Constants.ImageboardName) {
            return (
                <div>
                    <h1 className="text-center">{this.props.name}</h1>

                    <hr />
                </div>
            );
        } else {
            return (
                <div>
                    <h1 className="text-center">{Constants.ImageboardName}</h1>
                    <h2 className="text-center">Welcome. Once again</h2>

                    <hr />

                    <div>
                        <h3 className="text-center">What is {Constants.ImageboardName}?</h3>
                        <p>{Constants.ImageboardName} is a simple image-based bulletin board where anyone can post comments and share images. There are boards dedicated to a variety of topics, from Japanese animation and culture to videogames, music and photography. Users to not need to register an account before participating in the commutiny. Fell free to click on a board below that interests you and jump right in!</p>
                    </div>
                </div>
            );
        }
    }
}
