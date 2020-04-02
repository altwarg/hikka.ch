import React from 'react';
import parser, { Tag } from 'bbcode-to-react';

export class Spoiler extends Tag {
    toReact(): JSX.Element {
        return (
            <span className="spoiler">{this.getComponents()}</span>
        );
    }
}

// Have no idea why it won't works without internal registerTag()
parser.registerTag('spoiler', Spoiler);
