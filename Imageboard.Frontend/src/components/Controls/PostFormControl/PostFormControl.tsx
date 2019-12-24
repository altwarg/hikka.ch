import React from 'react';

import './PostFormControl.scss';

type State = {
    charsLeft: number;
}

export default class PostFormControl extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);

        this.state = { charsLeft: 15000 };
    }

    private postChars(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({ charsLeft: 15000 - e.target.value.length });
    }

    render() {
        return (
            <form className="postform">
                <hr />

                <div className="postform__raw">
                    <input type="text" id="name" className="postform__input postform__input__inline input" placeholder="Name" />
                    <input type="submit" id="submitDesktop" className="button desktop" value="Send" />
                </div>

                <div className="postform__raw">
                    <input type="text" id="subject" className="postform__input input" placeholder="Subject" />
                </div>

                <div className="postform__raw postform__raw__rel">
                    {this.state.charsLeft > 0 && (
                        <span className="postform__len">{this.state.charsLeft}</span>
                    )}

                    {this.state.charsLeft < 0 && (
                        <span className="postform__len">Post length exceeded by {(-1) * this.state.charsLeft} characters</span>
                    )}

                    <textarea name="comment" id="comment" className="postform__input input" rows={10} placeholder="A comment. Max length is 15000 characters" onChange={(e) => this.postChars(e)} />
                </div>

                <div className="mobile">
                    <input type="submit" id="submitMobile" className="mobile button-mobile" value="Send" />
                </div>
            </form>
        );
    }
}
