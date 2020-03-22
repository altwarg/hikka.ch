import React from 'react';

import { Post } from '../post';
import { Thread as ThreadInfo } from '../../utils/common';

import './styles.scss';

type Props = {
    threadInfo: ThreadInfo | null;
    inThread: boolean;
}

export class Thread extends React.Component<Props> {
    render() {
        return (
            <div className="thread">
                {this.props.threadInfo !== null && this.props.threadInfo!.Posts.map((item, key) => (
                    <div className={item.No === 1 ? "thread__oppost" : "thread__post"} key={key}>
                        <Post info={item} title={this.props.threadInfo!.Title} inThread={this.props.inThread} board={this.props.threadInfo!.Board} id={this.props.threadInfo!.Id} />
                    </div>
                ))}
            </div>
        );
    }
}
