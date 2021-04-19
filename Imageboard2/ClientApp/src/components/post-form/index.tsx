import React, { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { Form, FormGroup, Row, Col, Button } from 'react-bootstrap';

import { MarkupPanel } from './components';
import { Thread, FetchAction } from '../../utils/common';
import { post } from '../../utils/api';

type Props = Readonly<{
    abbr: string;
    inThread: boolean;
    onSubmit: (msg: string) => void;
    onUpdate: (action: FetchAction) => void;
}>;

export const PostForm: React.FC<Props> = ({ abbr, inThread, onSubmit, onUpdate }) => {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [comment, setComment] = useState('');
    const [sage, setSage] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [fileLabel, setFileLabel] = useState('Choose file');

    const commentRef = useRef<HTMLTextAreaElement>(null);

    const mentionRule = /\B(>>\d+)\b/gm;
    const greenTextRule = /^(>{1}[\w\d\s][^\n]+)$/gm;

    const formatComment = (): string => {
        let formatted = comment;

        mentionRule.exec(formatted);
        formatted = formatted.replace(mentionRule, `[mention]$1[/mention]`);

        greenTextRule.exec(formatted);
        formatted = formatted.replace(greenTextRule, '[green]$1[/green]');

        return formatted;
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('Name', name);
        formData.append('Message', formatComment());

        if (file) {
            formData.append('Attachment', file!, file!.name);
        }

        if (inThread) {
            // Because it is imposible to append boolean to FormData
            formData.append('Sage', sage ? 'sage' : 'regular');
            formData.append('Thread', window.location.pathname.substr(1).split('/')[1]);

            // Attempt to create new post
            post('posts/new', formData)
                .then(() => {
                    onUpdate(FetchAction.submit);
                })
                .catch((err) => {
                    console.error(err);
                    onSubmit(err);
                });
        } else {
            formData.append('Title', subject);
            formData.append('Board', abbr);

            // Attempt to create new thread
            post<Thread>('threads/new', formData)
                .then((data) => {
                    onSubmit('Thread has been successfully created.');
                    window.location.href = `/${data.board}/${data.id}`;
                })
                .catch((err) => {
                    console.error(err);
                    onSubmit(err);
                });
        }
    }

    return (
        <Form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            <hr />

            <FormGroup as={Row} className="mb-1">
                <Col xs="12" md="5" className="ml-auto">
                    <Form.Control
                        placeholder="Name"
                        size="sm"
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => setName(e.currentTarget.value)}
                    />
                </Col>
                <Col md="1" className="desktop mr-auto">
                    <Button type="submit" className="w-100" size="sm">Send</Button>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-1">
                <Col md="6" className="ml-auto mr-auto">
                    <Form.Control
                        placeholder="Subject"
                        size="sm"
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => setSubject(e.currentTarget.value)}
                    />
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-1">
                <Col md="6" className="ml-auto mr-auto">
                    <Form.Control
                        as="textarea"
                        placeholder="A comment"
                        rows={10}
                        size="sm"
                        value={comment}
                        ref={commentRef}
                        required
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => setComment(e.currentTarget.value)}
                    />
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-1">
                <Col md="6" className="ml-auto mr-auto">
                    <MarkupPanel textArea={commentRef.current!} />
                    {inThread && (<Form.Check
                        className="ml-5"
                        id="sage-check"
                        type="checkbox"
                        label="Sage"
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => setSage(e.currentTarget.checked)}
                        custom
                        inline
                    />)}
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-1">
                <Col md="6" className="ml-auto mr-auto">
                    <Form.File
                        custom
                        label={fileLabel}
                        required={!inThread}
                        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                            if (e.currentTarget.files!.length! !== 0) {
                                setFile(e.currentTarget.files![0]);
                                setFileLabel(e.currentTarget.files![0].name);
                            } else {
                                setFile(null);
                                setFileLabel('Choose file');
                            }
                        }}
                    />
                </Col>
            </FormGroup>

            <FormGroup as={Row}>
                <Col className="mobile">
                    <Button type="submit" size="sm">Send</Button>
                </Col>
            </FormGroup>
        </Form>
    );
}
