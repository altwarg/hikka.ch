import React from 'react';

import { Constants } from '../../../common';

import './NotFound.scss';

export default class NotFound extends React.Component {
    // Here just add additional pics or gifs
    private images: string[] = [ "/404/404_1.jpg", "/404/404_2.gif", "/404/404_3.png", "/404/404_4.jpg", "/404/404_5.png" ];

    private Rand(min: number, max: number): number {
        return Math.round(Math.random() * (max - min)) + min;
    }

    render() {
        document.title = "Not found";

        return (
            <div id="content">
                <div id="logo">
                    <h1 className="text-center">{Constants.ImageboardName}</h1>
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