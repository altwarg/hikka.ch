import React from 'react';

import BoardsLinksControl from '../../Controls/BoardsLinksControl/BoardsLinksControl';
import BoardsDescriptionControl from '../../Controls/BoardsDescriptionControl/BoardsDescriptionControl';
import PostFormControl from '../../Controls/PostFormControl/PostFormControl';
import Thread from '../Thread/Thread';
import HttpHelper from '../../../httpHelper';
import { BoardsInfo, ThreadInfo } from '../../../common';

import './Board.scss';

type Props = {
    boardsInfo: BoardsInfo[];
    name: string;
}

type State = {
    isLoading: boolean;
    showForm: boolean;
}

export default class Board extends React.Component<Props, State> {
    private threads: ThreadInfo[];

    constructor(props: Props) {
        super(props);

        this.threads = [];
        this.state = { isLoading: true, showForm: false };

        // Fetching data about threads from backend
        HttpHelper.getThreadInfo().then((res) => {
            this.threads = res.data;
            this.setState({ isLoading: false });
        });
    }

    render() {
        if (this.state.isLoading) {
            console.log("Loading threads, please wait...");
            return(<div />);
        } else {
            return (
                <div id="content">
                    <div className="boards-links-control">
                        <BoardsLinksControl boardsInfo={this.props.boardsInfo} />
                    </div>

                    <div id="description">
                        <BoardsDescriptionControl name={this.props.name} />

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
                            <PostFormControl />
                        )}

                        <br />

                        <hr />
                    </div>

                    <div id="content">
                        <Thread threadInfo={this.threads} />
                    </div>
                </div>
            );
        }
    }
}
