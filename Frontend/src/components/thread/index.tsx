import React from 'react';

import { Post } from '../post';
import { Thread as Info } from '../../utils/common';

import './styles.scss';

type Props = Readonly<{
    info: Info;
    inThread: boolean;
}>;

export const Thread: React.FC<Props> = ({ info, inThread }) => (
    <div className="thread">
        {info.Posts.map((item, key) => (
            <div className={item.No === 1 ? "thread__oppost" : "thread__post"} key={key}>
                <Post info={item} title={info.Title} inThread={inThread} board={info.Board} id={info.Id} />
            </div>
        ))}
    </div>
);
