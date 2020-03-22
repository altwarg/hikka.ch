declare module 'bbcode-to-react' {
    import * as React from 'react';

    function toReact(input: string): JSX.Element;
    function registerTag(name: string, tag: typeof Tag): void;

    class Tag {
        name: string;
        parent: JSX.Element;
        text: string;
        params: { [index: string]: any };
        children: JSX.Element[];

        getComponents(): JSX.Element;
        getContent(raw?: boolean): string;
        toText(contentAsHTML?: boolean): string;
        toHTML(): string;
        toReact(): JSX.Element;
    }
}
