import React from 'react';
import { AxiosError } from 'axios';

import BoardsLinksControl from '../../Controls/BoardsLinksControl/BoardsLinksControl';
import BoardsDescriptionControl from '../../Controls/BoardsDescriptionControl/BoardsDescriptionControl';
import PostFormControl from '../../Controls/PostFormControl/PostFormControl';
import ThreadItemControl from '../../Controls/ThreadItemControl/ThreadItemControl';
import HttpHelper from '../../../httpHelper';
import { Thread, Board } from '../../../common';

import './ThreadPage.scss';

type Props = {
    links: Board[];
    inThread: boolean;
    name: string;
    abbr: string;
    thread: string;
}

type State = {
    loaded: boolean;
    showForm: boolean;
    noConnection: boolean;
}

export default class ThreadPage extends React.Component<Props, State> {
    private thread: Thread | null;

    constructor(props: Props) {
        super(props);

        this.thread = null;
        this.state = { loaded: false, showForm: false, noConnection: false };

        HttpHelper.getThreadById(this.props.thread).then((res) => {
            this.thread = res.data;
            this.setState({ loaded: true });
        }).catch((err: AxiosError) => {
            if (err.message === "NetworkError") {
                this.setState({ noConnection: true });
            }
        });
    }

    render() {
        if (this.state.noConnection) {
            return (<div>No connection with backend</div>);
        } else if (!this.state.loaded) {
            return (<div />);
        } else {
            return (
                <div id="content">
                    <div className="boards-links-control">
                        <BoardsLinksControl boardsInfo={this.props.links} />
                    </div>

                    <div id="description">
                        <BoardsDescriptionControl name={this.props.name} abbr={this.props.abbr} />

                        <div className="clickable-link__container">
                            {this.state.showForm && (
                                <span className="clickable-link" onClick={() => this.setState({ showForm: false })}>
                                    Close posting form
                                </span>
                            )}

                            {!this.state.showForm && (
                                <span className="clickable-link" onClick={() => this.setState({ showForm: true })}>
                                    Open posting form
                                </span>
                            )}
                        </div>

                        {this.state.showForm && (
                            <PostFormControl abbr={this.props.abbr} inThread={this.props.inThread} />
                        )}

                        <br />

                        <hr />
                    </div>

                    <div id="content">
                        <ThreadItemControl thread={this.thread} inThread={this.props.inThread} />
                    </div>
                </div>
            );
        }
    }
}
