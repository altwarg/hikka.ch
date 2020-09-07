import React from 'react';
import parser, { Tag } from 'bbcode-to-react';

export class SpoilerTag extends Tag {
    toReact(): JSX.Element {
        return (
            <span className="spoiler">{this.getComponents()}</span>
        );
    }
}

export class GreenTextTag extends Tag {
    toReact(): JSX.Element {
        return (
            <span className="text-success">{this.getComponents()}</span>
        );
    }
}

export class MentionTag extends Tag {
    toReact(): JSX.Element {
        let content = this.getContent();
        let info = content.substring(8).split('#');

        return (
            <a href={`${info[1]}#id-${info[0]}`}>{`>>${info[0]}`}</a>
        );
    }
}

parser.registerTag('spoiler', SpoilerTag);
parser.registerTag('green', GreenTextTag);
parser.registerTag('mention', MentionTag);
