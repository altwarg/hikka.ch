import BBTag from './BBTag';
import { BBCodeParseTree, TreeType } from './BBCodeParseTree';

const TagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
};

export default class BBCodeParser {
    constructor(private bbTags: Array<BBTag>, private options = { escapeHTML: false }) { }

    // Parses the given string
    public parseString(content: string, stripTags = false, insertLineBreak = true, escapingHtml = true) {
        let parseTree = BBCodeParseTree.buildTree(content, this.bbTags);

        // If the tree is invalid, return the input as text
        if (parseTree === null || !parseTree.isValid()) {
            return content;
        }

        // Convert it to HTML
        return this.treeToHtml(parseTree.subTrees, insertLineBreak, escapingHtml, stripTags);
    }

    private treeToHtml(subTrees: Array<BBCodeParseTree>, insertLineBreak: boolean, escapingHtml: boolean, stripTags: boolean = false): string {
        let htmlStr = '';
        let suppressLineBreak = false;

        subTrees.forEach((currentTree) => {
            if (currentTree.type === TreeType.Text) {
                let textContent = currentTree.content;

                if (escapingHtml) {
                    textContent = this.options.escapeHTML ? BBCodeParser.escapeHTML(textContent) : textContent;
                }

                if (insertLineBreak && !suppressLineBreak) {
                    textContent = textContent.replace(/(\r\n|\n|\r)/gm, "<br />");
                    suppressLineBreak = false;
                }

                htmlStr += textContent;
            } else {
                let bbTag: BBTag = this.bbTags[currentTree.content];
                let content = this.treeToHtml(currentTree.subTrees, bbTag.insertLineBreaks, escapingHtml, stripTags);

                // Check if to string the tags
                if (!stripTags) {
                    htmlStr += bbTag.markupGenerator(bbTag, content, currentTree.attributes);
                } else {
                    htmlStr += content;
                }

                suppressLineBreak = bbTag.insertLineBreaks;
            }
        });

        return htmlStr;
    }

    /**
     * Returns the default tags
     */
    public static defaultTags(): Array<BBTag> {
        let bbTags = new Array<BBTag>();

        // Simple tags
        bbTags["b"] = new BBTag("b", true, false, false);
        bbTags["i"] = new BBTag("i", true, false, false);
        bbTags["u"] = new BBTag("u", true, false, false);

        bbTags["text"] = new BBTag("text", true, false, true, (tag, content, attr) => {
            return content;
        });

        bbTags["url"] = new BBTag("url", true, false, false, (tag, content, attr) => {
            let link = content;

            if (attr["url"] !== undefined) {
                link = BBCodeParser.escapeHTML(attr["url"]);
            }

            if (!BBCodeParser.startsWith(link, "http://") && !BBCodeParser.startsWith(link, "https://")) {
                link = "http://" + link;
            }

            return `<a href=\"${link}\" target=\"_blank\">${content}</a>`;
        });

        bbTags["code"] = new BBTag("code", true, false, true, (tag, content, attr) => {
            let lang = attr["lang"];

            if (lang !== undefined) {
                return `<code class=\"${BBCodeParser.escapeHTML(lang)}\">${content}</code>`;
            } else {
                return `<code>${content}</code>`;
            }
        });

        return bbTags;
    }

    public static escapeHTML(content: string): string {
        return content.replace(/[&<>]/g, (tag) => {
            return TagsToReplace[tag] || tag;
        });
    }

    public static startsWith(str: string, startStr: string): boolean {
        if (str.length === 0) {
            return false;
        }

        if (startStr.length > str.length) {
            return false;
        }

        let inStrStart = str.substr(0, startStr.length);
        return startStr === inStrStart;
    }

    public static endsWith(str: string, endStr: string): boolean {
        if (str.length === 0) {
            return false;
        }

        if (endStr.length > str.length) {
            return false;
        }

        let inStrEnd = str.substr(str.length - endStr.length, endStr.length);
        return endStr === inStrEnd;
    }
}
