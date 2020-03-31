import React from 'react';
import { Link } from 'react-router-dom';

import { Post as Info } from '../../utils/common';

import './styles.scss';

import parser from 'bbcode-to-react';

type Props = {
    info: Info;
    title: string;
    board: string;
    id: string;
    inThread: boolean;
}

export const Post: React.FC<Props> = ({ info, title, board, id, inThread }) => (
    <div className={info.No === 1 ? "post__op post__container" : "post__reply post__container"}>
        <div className="post__details">
            {info.No === 1 && title !== '' && (
                <span className="post__title">{title}</span>
            )}
            <span className="post__anon">{info.Name !== null && info.Name !== '' ? info.Name : 'Anonymous'}</span>
            <span className="post__time">{info.DateTime}</span>
            <span className="post__id">No. <span className="post__id-reply">{info.Id}</span></span>
            {info.No === 1 && !inThread && (
                <span><Link to={'/' + board + '/' + id} className="link">Open thread</Link></span>
            )}
        </div>
        <div className="post__attached">
            {/* Must be replaced with actual attached */}
            {/* {info.No === 1 && (
                <figure className="post__attached-preview">
                    <figcaption className="post__attached-attr">
                        <a href="/" target="_blank" title="blank.jpg">blank.jpg</a>
                        <span className="post__attached-size">(40.0Kb, 591x453)</span>
                    </figcaption>
                    <a href="/" className="post__attached-link">
                        <img src="/blank.jpg" alt="591x453" />
                    </a>
                </figure>
            )} */}
        </div>
        <article className="post__message">
            {parser.toReact(info.Message)}
        </article>
    </div>
);
