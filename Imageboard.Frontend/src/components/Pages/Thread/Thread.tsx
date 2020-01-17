import React from 'react';

import PostItemControl from '../../Controls/PostItemControl/PostItemControl';
import { ThreadInfo } from '../../../common';

import './Thread.scss';

type Props = {
    threadInfo: ThreadInfo;
}

export default class Thread extends React.Component<Props> {
    render() {
        return (
            <div className="thread">
                {this.props.threadInfo.Posts.map((item, key) => {
                    return (
                        <div className={item.No === 1 ? "thread__oppost" : "thread__post"} key={key}>
                            <PostItemControl info={item} />
                        </div>
                    );
                })}
            </div>
        );
    }
}
