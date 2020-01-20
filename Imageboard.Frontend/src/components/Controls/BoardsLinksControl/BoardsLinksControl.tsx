import React from 'react';
import { Link } from 'react-router-dom';

import { BoardsInfo } from '../../../common';

import './BoardsLinksControl.scss';

type Props = {
    boardsInfo: BoardsInfo[];
}

export default class BoardsLinksControl extends React.Component<Props> {
    private forRendering: string[];

    constructor(props: Props) {
        super(props);
        this.forRendering = [];
    }

    private intersperce(arr: string[], el: string): string[] {
        let result: string[] = [];
        let i: number = 0;

        if (i < arr.length) {
            result.push(arr[i++]);
        }

        while (i < arr.length) {
            result.push(el, arr[i++]);
        }

        return result;
    }

    componentDidMount() {
        if (this.props.boardsInfo !== []) {
            this.forRendering = this.intersperce(this.props.boardsInfo.map(item => item.Abbr), '/');
            this.setState({ fetchedInfo: this.props.boardsInfo });
        }
    }

    render() {
        return(
            <nav id="board-navigation" className="borderless">
                <strong>
                    [ &nbsp;
                </strong>
                <strong>
                    {this.forRendering.map((item, key) => {
                        if (item !== '/') {
                            return <Link to={'/' + item} className="board-navigation__link" key={key}>{item}</Link>;
                        } else {
                            return <span key={key}> {item} </span>;
                        }
                    })}
                </strong>
                <strong>
                    &nbsp; ]
                </strong>

                &nbsp;

                <strong>
                    [ &nbsp;
                </strong>
                <strong>
                    <Link to="/" className="board-navigation__link">Home</Link>
                </strong>
                <strong>
                    &nbsp; ]
                </strong>
            </nav>
        );
    }
}
