import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Constants } from '../../utils/common';

import './styles.scss';

export const NotFoundPage: React.FC = () => {
    const images: string[] = ["/404/404_1.jpg", "/404/404_2.gif", "/404/404_3.png", "/404/404_4.jpg", "/404/404_5.png"];

    const rand = (min: number, max: number): number =>
        Math.round(Math.random() * (max - min)) + min;

    useEffect(() => {
        document.title = "Not found";
    }, []);

    return (
        <>
            <div id="logo">
                <h1 className="text-center">
                    <span><Link to="/" className="link">{Constants.ImageboardName}</Link></span>
                </h1>
            </div>
            <div className="box">
                <div className="box__data">
                    <img src={images[rand(0, images.length - 1)]} alt="Here must be something awesome" />
                </div>
                <div className="box__info">
                    <span className="not-found">404</span>

                    <br />

                    Not found
                </div>
            </div>
        </>
    );
}
