import React, { useState } from 'react';

import { Thread } from '../../utils/common';
import { post } from '../../utils/api';

import './styles.scss';

type Props = Readonly<{
    abbr: string;
    inThread: boolean;
}>;

export const PostForm: React.FC<Props> = ({ abbr, inThread }) => {
    const [charsLeft, setCharsLeft] = useState(15000);
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [comment, setComment] = useState('');

    const createThread = (e: React.MouseEvent) => {
        e.preventDefault();
        let dto = {
            Board: abbr,
            Name: name,
            Title: subject,
            Message: comment
        };

        // Attempt to create new thread
        post<Thread>('threads/new', dto)
            .then((data) => {
                window.location.reload();
                window.location.href = `/${data.Board}/${data.Id}`;
            })
            .catch((err) => console.error(err));
    }

    const createPost = (e: React.MouseEvent) => {
        e.preventDefault();
        let dto = {
            Name: name,
            Message: comment,
            Thread: window.location.pathname.substr(1).split('/')[1],
        };

        // Attempt to create new post
        post('posts/new', dto)
            .then(() => window.location.reload())
            .catch((err) => console.error(err));
    }

    return (
        <form className="postform">
            <hr />

            <div className="postform__raw">
                <input
                    type="text"
                    id="name"
                    className="postform__input postform__input__inline input"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="submit"
                    id="submitDesktop"
                    className="button desktop"
                    value="Send"
                    onClick={(e) => inThread ? createPost(e) : createThread(e)}
                />
            </div>

            <div className="postform__raw">
                <input
                    type="text"
                    id="subject"
                    className="postform__input input"
                    placeholder="Subject"
                    onChange={(e) => setSubject(e.target.value)}
                />
            </div>

            <div className="postform__raw postform__raw__rel">
                {charsLeft > 0 && (
                    <span className="postform__len">{charsLeft}</span>
                )}

                {charsLeft < 0 && (
                    <span className="postform__len">Post length exceeded by {(-1) * charsLeft} characters</span>
                )}

                <textarea
                    name="comment"
                    id="comment"
                    className="postform__input input"
                    rows={10}
                    placeholder="A comment. Max length is 15000 characters"
                    onChange={(e) => {
                        setCharsLeft(15000 - e.target.value.length);
                        setComment(e.target.value)
                    }}
                />
            </div>

            <div className="mobile">
                <input
                    type="submit"
                    id="submitMobile"
                    className="mobile button-mobile"
                    value="Send"
                    onClick={(e) => inThread ? createPost(e) : createThread(e)} />
            </div>
        </form>
    );
}
