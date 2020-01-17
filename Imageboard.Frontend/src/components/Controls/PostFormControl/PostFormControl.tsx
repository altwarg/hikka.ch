import React from 'react';

import { NewThreadDTO } from '../../../common';
import HttpHelper from '../../../httpHelper';

import './PostFormControl.scss';

type Props = {
    abbr: string;
}

type State = {
    charsLeft: number;
    name: string;
    subject: string;
    comment: string;
}

export default class PostFormControl extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);

        this.state = {
            charsLeft: 15000,
            name: '',
            subject: '',
            comment: '',
        };
    }

    private postChars(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({ charsLeft: 15000 - e.target.value.length });
    }

    private createThread(e: React.MouseEvent) {
        e.preventDefault();
        let dto = {
            Board: this.props.abbr,
            Name: this.state.name,
            Title: this.state.subject,
            Message: this.state.comment
        } as NewThreadDTO;

        // Attempt to create new thread
        HttpHelper.createNewThread(dto).then((res) => {
            console.log(res.data);
        });
    }

    render() {
        return (
            <form className="postform">
                <hr />

                <div className="postform__raw">
                    <input type="text" id="name" className="postform__input postform__input__inline input" placeholder="Name" onChange={(e) => this.setState({ name: e.target.value })} />
                    <input type="submit" id="submitDesktop" className="button desktop" value="Send" onClick={(e) => this.createThread(e)} />
                </div>

                <div className="postform__raw">
                    <input type="text" id="subject" className="postform__input input" placeholder="Subject" onChange={(e) => this.setState({ subject: e.target.value })} />
                </div>

                <div className="postform__raw postform__raw__rel">
                    {this.state.charsLeft > 0 && (
                        <span className="postform__len">{this.state.charsLeft}</span>
                    )}

                    {this.state.charsLeft < 0 && (
                        <span className="postform__len">Post length exceeded by {(-1) * this.state.charsLeft} characters</span>
                    )}

                    <textarea name="comment" id="comment" className="postform__input input" rows={10} placeholder="A comment. Max length is 15000 characters" onChange={(e) => { this.postChars(e); this.setState({ comment: e.target.value }) } } />
                </div>

                <div className="mobile">
                    <input type="submit" id="submitMobile" className="mobile button-mobile" value="Send" onClick={(e) => this.createThread(e)} />
                </div>
            </form>
        );
    }
}
