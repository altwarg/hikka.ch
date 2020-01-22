export default class BBTag {
    /**
     * Creates a new BB-Tag
     *
     * @param { string } tagName - Name of the tag
     * @param { boolean } insertLineBreaks - Indicates if line breaks are inserted inside the tag content
     * @param { boolean } suppressLineBreaks - Suppress any line breaks for nested tags
     * @param { boolean } noNesting - Indicates if the tag supports nested tags
     * @param { callback } markupGenerator - If no generator is defined, used the default one
     */
    constructor(public tagName: string, public insertLineBreaks: boolean, public suppressLineBreaks: boolean, public noNesting: boolean, public markupGenerator?: (tag: BBTag, content: string, attr: Array<string>) => string) {
        if (markupGenerator === undefined) {
            this.markupGenerator = (tag, content, attr) => {
                return `<${tag.tagName}>${content}</${tag.tagName}>`;
            };
        }
    }

    /**
     * Creates a new simple tag
     * @param {string} tagName - HTML-tag name
     * @param {boolean} insertLineBreaks - Indicates if nested <br /> tags needed
     * @returns new BBTag
     */
    public static createSimpleTag(tagName: string, insertLineBreaks: boolean = true): BBTag {
        return new BBTag(tagName, insertLineBreaks, false, false);
    }

    /**
     * Creates a tag with given generator
     * @param tagName - HTML-tag name
     * @param markupGenerator - Given generator
     * @param insertLineBreaks - Indicates if nested <br /> tags needed
     * @returns new BBTag
     */
    public static createTag(tagName: string, markupGenerator: (tag: BBTag, content: string, attr: Array<string>) => string, insertLineBreaks: boolean = true): BBTag {
        return new BBTag(tagName, insertLineBreaks, false, false, markupGenerator);
    }
}
