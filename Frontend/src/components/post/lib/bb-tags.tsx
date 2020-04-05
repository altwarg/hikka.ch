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
        return (
            <a href={document.location.pathname}>{this.getComponents()}</a>
        );
    }
}

parser.registerTag('spoiler', SpoilerTag);
parser.registerTag('green', GreenTextTag);
parser.registerTag('mention', MentionTag);
