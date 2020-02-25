import React from 'react';

import PostItemControl from '../PostItemControl/PostItemControl';
import { Thread } from '../../../common';

import './ThreadItemControl.scss';

type Props = {
    thread: Thread | null;
    inThread: boolean;
}

export default class ThreadItemControl extends React.Component<Props> {
    render() {
        return (
            <div className="thread">
                {this.props.thread !== null && this.props.thread!.Posts.map((item, key) => {
                    return (
                        <div className={item.No === 1 ? "thread__oppost" : "thread__post"} key={key}>
                            <PostItemControl info={item} title={this.props.thread!.Title} inThread={this.props.inThread} board={this.props.thread!.Board} id={this.props.thread!.Id} />
                        </div>
                    );
                })}
            </div>
        );
    }
}
