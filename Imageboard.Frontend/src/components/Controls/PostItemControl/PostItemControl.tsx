import React from 'react';
import { Link } from 'react-router-dom';

import { Post } from '../../../common';

import './PostItemControl.scss';

import parser from 'bbcode-to-react';

type Props = {
    info: Post;
    title: string;
    board: string;
    id: string;
    inThread: boolean;
}

export default class PostItemControl extends React.Component<Props> {
    render() {
        return (
            <div className={this.props.info.No === 1 ? "post__op post__container" : "post__reply post__container"}>
                <div className="post__details">
                    { this.props.info.No === 1 && this.props.title !== '' && (
                        <span className="post__title">{this.props.title}</span>
                    )}
                    <span className="post__anon">{this.props.info.Name !== null && this.props.info.Name !== '' ? this.props.info.Name : 'Anonymous' }</span>
                    <span className="post__time">{this.props.info.DateTime}</span>
                    <span className="post__id">No. <span className="post__id-reply">{this.props.info.Id}</span></span>
                    { this.props.info.No === 1 && !this.props.inThread && (
                        <span><Link to={'/' + this.props.board + '/' + this.props.id} className="link">Open thread</Link></span>
                    )}
                </div>
                <div className="post__attached">
                    {/* Must be replaced with actual attached */}
                    {/* { this.props.info.No === 1 && (
                        <figure className="post__attached-preview">
                            <figcaption className="post__attached-attr">
                                <a href="/" target="_blank" title="blank.jpg">blank.jpg</a>
                                <span className="post__attached-size">(40.0Kb, 591x453)</span>
                            </figcaption>
                            <a href="/" className="post__attached-link">
                                <img src="/blank.jpg" alt="591x453"/>
                            </a>
                        </figure>
                    )} */}
                </div>
                <article className="post__message">
                    {parser.toReact(this.props.info.Message)}
                </article>
            </div>
        );
    }
}
