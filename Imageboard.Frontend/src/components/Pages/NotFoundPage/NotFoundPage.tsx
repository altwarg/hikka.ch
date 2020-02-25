import React from 'react';
import { Link } from 'react-router-dom';

import { Constants } from '../../../common';

import './NotFoundPage.scss';

export default class NotFoundPage extends React.Component {
    // Here just add additional pics or gifs
    private images: string[] = [ "/404/404_1.jpg", "/404/404_2.gif", "/404/404_3.png", "/404/404_4.jpg", "/404/404_5.png" ];

    private Rand(min: number, max: number): number {
        return Math.round(Math.random() * (max - min)) + min;
    }

    componentDidMount() {
        document.title = "Not found";
    }

    render() {
        return (
            <div id="content">
                <div id="logo">
                    <h1 className="text-center">
                        <span><Link to="/" className="link">{Constants.ImageboardName}</Link></span>
                    </h1>
                </div>
                <div className="box">
                    <div className="box__data">
                        <img src={this.images[this.Rand(0, this.images.length - 1)]} alt="Here must be something awesome" />
                    </div>
                    <div className="box__info">
                        <span className="not-found">404</span>

                        <br/>

                        Not found
                    </div>
                </div>
            </div>
        );
    }
}
