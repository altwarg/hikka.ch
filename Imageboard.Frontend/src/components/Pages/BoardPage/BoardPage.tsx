import React from 'react';
import { AxiosError } from 'axios';

import BoardsLinksControl from '../../Controls/BoardsLinksControl/BoardsLinksControl';
import BoardsDescriptionControl from '../../Controls/BoardsDescriptionControl/BoardsDescriptionControl';
import PostFormControl from '../../Controls/PostFormControl/PostFormControl';
import ThreadPage from '../ThreadPage/ThreadPage';
import HttpHelper from '../../../httpHelper';
import { Board, Thread } from '../../../common';

import './BoardPage.scss';


type Props = {
    links: Board[];
    inThread: boolean;
    name: string;
    abbr: string;
}

type State = {
    loaded: boolean;
    showForm: boolean;
    noConnection: boolean;
}

export default class BoardPage extends React.Component<Props, State> {
    private threads: Thread[];

    constructor(props: Props) {
        super(props);

        this.threads = [];
        this.state = { loaded: false, showForm: false, noConnection: false };

        if (this.props.inThread === true) {
            // We've opened thread
            let id: string = document.location.pathname.substr(1).split('/')[1];
            HttpHelper.getThreadById(id).then((res) => {
                this.threads.push(res.data);
                this.setState({ loaded: true });
            }).catch((err: AxiosError) => {
                if (err.message === "Network Error") {
                    this.setState({ noConnection: true });
                }
            });
        } else {
            HttpHelper.getBoardThreads(this.props.abbr).then((res) => {
                this.threads = res.data;
                this.setState({ loaded: true });
            }).catch((err: AxiosError) => {
                if (err.message === "Network Error") {
                    this.setState({ noConnection: true });
                }
            });
        }
    }

    render() {
        if (this.state.noConnection) {
            return (<div>No connection with backend</div>);
        } else if (!this.state.loaded) {
            return(<div />);
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
                        {this.threads.map((item, key) => {
                            return (
                                <ThreadPage thread={item} inThread={this.props.inThread} key={key} />
                            )
                        })}
                    </div>
                </div>
            );
        }
    }
}
