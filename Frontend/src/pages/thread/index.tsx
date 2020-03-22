import React from 'react';
import { AxiosError } from 'axios';

import { Thread as ThreadItem, PostForm, BoardsDescription, BoardsLinks } from '../../components';
import Api from '../../utils/api';
import { Thread, Board } from '../../utils/common';

import './styles.scss';

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

export class ThreadPage extends React.Component<Props, State> {
    private thread: Thread | null;

    constructor(props: Props) {
        super(props);

        this.thread = null;
        this.state = { loaded: false, showForm: false, noConnection: false };

        Api.getThreadById(this.props.thread).then((res) => {
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
                <>
                    <BoardsLinks boardsInfo={this.props.links} />

                    <BoardsDescription name={this.props.name} abbr={this.props.abbr} />

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
                        <PostForm abbr={this.props.abbr} inThread={this.props.inThread} />
                    )}

                    <hr />

                    <ThreadItem threadInfo={this.thread} inThread={this.props.inThread} />
                </>
            );
        }
    }
}
