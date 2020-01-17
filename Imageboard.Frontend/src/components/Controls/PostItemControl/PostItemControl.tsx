import React from 'react';

import { PostInfo } from '../../../common';

import './PostItemControl.scss';

type Props = {
    info: PostInfo;
}

export default class PostItemControl extends React.Component<Props> {
    render() {
        return (
            <div className={this.props.info.No === 1 ? "post__op post__container" : "post__reply post__container"}>
                <div className="post__details">
                    <span className="post__anon">Anonymous</span>
                    <span className="post__time">{this.props.info.DateTime}</span>
                    <span className="post__id">No. <span className="post__id-reply">{this.props.info.Id}</span></span>
                </div>
                <div className="post__attached">
                    { this.props.info.No === 1 && (
                        <figure className="post__attached-preview">
                            <figcaption className="post__attached-attr">
                                <a href="/" target="_blank" title="blank.jpg">blank.jpg</a>
                                <span className="post__attached-size">(40.0Kb, 591x453)</span>
                            </figcaption>
                            <a href="/" className="post__attached-link">
                                <img src="/blank.jpg" alt="591x453"/>
                            </a>
                        </figure>
                    )}
                </div>
                <article className="post__message">
                    {this.props.info.Message}
                </article>
            </div>
        );
    }
}
