import React from 'react';

import { Post } from '../post';
import { Thread as ThreadInfo } from '../../utils/common';

import './styles.scss';

type Props = {
    threadInfo: ThreadInfo | null;
    inThread: boolean;
}

export const Thread: React.FC<Props> = ({ threadInfo, inThread }) => (
    <div className="thread">
        {threadInfo && threadInfo.Posts.map((item, key) => (
            <div className={item.No === 1 ? "thread__oppost" : "thread__post"} key={key}>
                <Post info={item} title={threadInfo.Title} inThread={inThread} board={threadInfo.Board} id={threadInfo.Id} />
            </div>
        ))}
    </div>
)
