import React from 'react';

import './PostFormControl.scss';

export default class PostFormControl extends React.Component {
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
                    <span className="postform__len">15000</span>
                    <textarea name="comment" id="comment" className="postform__input input" rows={10} placeholder="A comment. Max length is 15000 characters" />
                </div>

                <div className="mobile">
                    <input type="submit" id="submitMobile" className="mobile button-mobile" value="Send" />
                </div>
            </form>
        );
    }
}
