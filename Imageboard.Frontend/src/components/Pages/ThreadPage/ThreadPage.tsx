import React from 'react';

import PostItemControl from '../../Controls/PostItemControl/PostItemControl';
import { Thread } from '../../../common';

import './ThreadPage.scss';

type Props = {
    thread: Thread;
    inThread: boolean;
}

export default class ThreadPage extends React.Component<Props> {
    render() {
        return (
            <div className="thread">
                {this.props.thread.Posts.map((item, key) => {
                    return (
                        <div className={item.No === 1 ? "thread__oppost" : "thread__post"} key={key}>
                            <PostItemControl info={item} title={this.props.thread.Title} inThread={this.props.inThread} board={this.props.thread.Board} id={this.props.thread.Id} />
                        </div>
                    );
                })}
            </div>
        );
    }
}
