import React, { useState, FormEvent } from 'react';
import { Form, FormControl, Col, Button } from 'react-bootstrap';

import { MarkupPanel } from './components';
import { Thread } from '../../utils/common';
import { post } from '../../utils/api';

type Props = Readonly<{
    abbr: string;
    inThread: boolean;
}>;

export const PostForm: React.FC<Props> = ({ abbr, inThread }) => {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [comment, setComment] = useState('');

    const onClick = (code: string) => setComment(code);

    const createThread = (e: FormEvent) => {
        e.preventDefault();

        let formatedMessage = comment.split('\n').map(item => item.startsWith('>') ? `[green]${item}[/green]` : item).join('\n');

        let dto = {
            Board: abbr,
            Name: name,
            Title: subject,
            Message: formatedMessage,
        };

        // Attempt to create new thread
        post<Thread>('threads/new', dto)
            .then((data) => window.location.href = `/${data.Board}/${data.Id}`)
            .catch((err) => console.error(err));
    }

    const createPost = (e: FormEvent) => {
        e.preventDefault();

        let formatedMessage = comment.split('\n').map(item => item.startsWith('>') ? `[green]${item}[/green]` : item).join('\n');

        let dto = {
            Name: name,
            Message: formatedMessage,
            Thread: window.location.pathname.substr(1).split('/')[1],
        };

        // Attempt to create new post
        post('posts/new', dto)
            .then(() => window.location.reload())
            .catch((err) => console.error(err));
    }

    return (
        <Form
            onSubmit={(e: FormEvent): void => {
                inThread
                    ? createPost(e)
                    : createThread(e);
            }}
        >
            <hr />

            <Form.Row className="mb-1">
                <Col xs="12" md="5" className="ml-auto">
                    <FormControl
                        type="text"
                        size="sm"
                        placeholder="Name"
                        onChange={(e: FormEvent<FormControl & HTMLInputElement>) => setName(e.currentTarget.value)}
                    />
                </Col>
                <Col md="1" className="desktop mr-auto">
                    <Button type="submit" size="sm" className="w-100">Send</Button>
                </Col>
            </Form.Row>
            <Form.Row className="mb-1">
                <Col md="6" className="ml-auto mr-auto">
                    <FormControl
                        type="text"
                        size="sm"
                        placeholder="Subject"
                        onChange={(e: FormEvent<FormControl & HTMLInputElement>) => setSubject(e.currentTarget.value)}
                    />
                </Col>
            </Form.Row>
            <Form.Row className="mb-1">
                <Col md="6" className="ml-auto mr-auto">
                    <FormControl
                        as="textarea"
                        size="sm"
                        rows="10"
                        placeholder="A comment"
                        onChange={(e: FormEvent<FormControl & HTMLTextAreaElement>) => setComment(e.currentTarget.value)}
                        value={comment}
                        required
                    />
                </Col>
            </Form.Row>
            <Form.Row>
                <Col md="6" className="ml-auto mr-auto">
                    <MarkupPanel onClick={onClick} />
                </Col>
            </Form.Row>
            <Form.Row>
                <Col className="mobile">
                    <Button type="submit" size="sm">Send</Button>
                </Col>
            </Form.Row>
        </Form>
    );
}
