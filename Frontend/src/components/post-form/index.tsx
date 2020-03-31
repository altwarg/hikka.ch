import React, { useState } from 'react';
import { AxiosError } from 'axios';

import { NewThreadDTO, NewPostDTO } from '../../utils/common';
import Api from '../../utils/api';

import './styles.scss';

type Props = {
    abbr: string;
    inThread: boolean;
}

export const PostForm: React.FC<Props> = ({ abbr, inThread }) => {
    const [charsLeft, setCharsLeft] = useState(15000);
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [comment, setComment] = useState('');

    const createThread = (e: React.MouseEvent) => {
        e.preventDefault();
        let dto: NewThreadDTO = {
            Board: abbr,
            Name: name,
            Title: subject,
            Message: comment
        };

        // Attempt to create new thread
        Api.createNewThread(dto).then((res) => {
            window.location.reload();
            window.location.href = `/${res.data.Board}/${res.data.Id}`;
        }).catch((err: AxiosError) => {
            if (err.message === "Network Error") {
                console.log(err.message);
            }
        });
    }

    const createPost = (e: React.MouseEvent) => {
        e.preventDefault();
        let dto: NewPostDTO = {
            Name: name,
            Message: comment,
            Thread: window.location.pathname.substr(1).split('/')[1]
        };

        // Attempt to create new post
        Api.createNewPost(dto).then((res) => {
            window.location.reload();
        }).catch((err: AxiosError) => {
            if (err.message === "Network Error") {
                console.log(err.message);
            } else if (err.response?.status === 404) {
                console.log("Thread does not exist");
            }
        })
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
