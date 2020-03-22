import React from 'react';
import { AxiosError } from 'axios';

import { Thread, PostForm, BoardsDescription, BoardsLinks } from '../../components';
import Api from '../../utils/api';
import { Board, Thread as ThreadInfo, GetThreadsDTO } from '../../utils/common';

import './styles.scss';

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

export class BoardPage extends React.Component<Props, State> {
    private threads: ThreadInfo[];

    constructor(props: Props) {
        super(props);

        this.threads = [];
        this.state = { loaded: false, showForm: false, noConnection: false };

        if (this.props.inThread === true) {
            // We've opened thread
            let id: string = document.location.pathname.substr(1).split('/')[1];
            Api.getThreadById(id).then((res) => {
                this.threads.push(res.data);
                this.setState({ loaded: true });
            }).catch((err: AxiosError) => {
                if (err.message === "Network Error") {
                    this.setState({ noConnection: true });
                }
            });
        } else {
            let dto: GetThreadsDTO = {
                Board: this.props.abbr,
                LastPostsLimit: 3
            };

            Api.getBoardThreads(dto).then((res) => {
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

                    {this.threads.map((item, key) => (
                        <Thread threadInfo={item} inThread={this.props.inThread} key={key} />
                    ))}
                </>
            );
        }
    }
}
