import React from 'react';

import { ThreadInfo } from '../../../common';

import './PostItemControl.scss';

type Props = {
    info: ThreadInfo;
}

export default class PostItemControl extends React.Component<Props> {
    render() {
        // Just template for now
        if (this.props.info.no === 1) {
            return (
                <div className="post__op post__container">
                    <div className="post__details">
                        <span className="post__anon">Anonymous</span>
                        <span className="post__time">{this.props.info.datetime}</span>
                        <span className="post__id">No. <span className="post__id-reply">{this.props.info.id}</span></span>
                    </div>
                    <div className="post__attached">
                        <figure className="post__attached-preview">
                            <figcaption className="post__attached-attr">
                                <a href="/" target="_blank" title="blank.jpg">blank.jpg</a>
                                <span className="post__attached-size">(40.0Kb, 591x453)</span>
                            </figcaption>
                            <a href="/" className="post__attached-link">
                                <img src="/blank.jpg" alt="591x453"/>
                            </a>
                        </figure>
                    </div>
                    <article className="post__message">
                        {this.props.info.message}
                    </article>
                </div>
            );
        } else {
            return (
                <div className="post__reply post__container">
                    <div className="post__details">
                        <span className="post__anon">Anonymous</span>
                        <span className="post__time">{this.props.info.datetime}</span>
                        <span className="post__id">No. <span className="post__id-reply">{this.props.info.id}</span></span>
                    </div>
                    <div className="post__attached">
                    </div>
                    <article className="post__message">
                        {this.props.info.message}
                    </article>
                </div>
            );
        }

        // Ideal -- in future
        // return (
        //     <div className={this.props.info.no === 1 ? "post__op post__container" : "post__reply post__container" }>
        //         <div className="post__details">
        //             <span className="post__anon">Anonymous</span>
        //             <span className="post__time">{this.props.info.datetime}</span>
        //             <span className="post__id">No. <span className="post__id-reply">{this.props.info.id}</span></span>
        //         </div>
        //         <div className="post__attached">
        //             <figure className="post__attached-preview">
        //                 <figcaption className="post__attached-attr">
        //                     <a href="/" target="_blank" title="blank.jpg">blank.jpg</a>
        //                     <span className="post__attached-size">(40.0Kb, 591x453)</span>
        //                 </figcaption>
        //                 <a href="/" className="post__attached-link">
        //                     <img src="/blank.jpg" alt="591x453"/>
        //                 </a>
        //             </figure>
        //         </div>
        //         <article className="post__message">
        //             {this.props.info.message}
        //         </article>
        //     </div>
        // );
    }
}
