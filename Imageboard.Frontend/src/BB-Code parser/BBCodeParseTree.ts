import BBTag from './BBTag';
import Tokenizer from './Tokenizer';
import { Token, TokenType } from './Token';

/**
 * The types of the trees
 */
export enum TreeType {
    Root, Text, Tag
}

/**
 * Represents a parse tree
 */
export class BBCodeParseTree {
    constructor(public type: TreeType, public content: string, public attributes?: Array<string>, public subTrees?: Array<BBCodeParseTree>) {
        this.subTrees = [];
    }

    /**
     * Indicates if the current tree is valid
     */
    public isValid(): boolean {
        // A tree without subtrees is valid
        if (this.subTrees.length === 0) {
            return true;
        }

        // A tree is valid if all of its subtrees are valid
        for (let i in this.subTrees) {
            let currentTree = this.subTrees[i];

            if (currentTree === null || !currentTree.isValid()) {
                return false;
            }
        }

        return true;
    }

    public toString(): string {
        return `${TreeType[this.type]} - ${this.content}`;
    }

    public static buildTree(str: string, bbTags: Array<BBTag>) {
        let tokenizer = new Tokenizer(bbTags);
        let tokens = tokenizer.tokenize(str);

        return BBCodeParseTree.buildTreeFromTokens(
            new BBCodeParseTree(TreeType.Root, str), tokens.reverse()
        );
    }

    /**
     * Bilds a tree from the given tokens
     */
    public static buildTreeFromTokens(root: BBCodeParseTree, tokens: Array<Token>, currentTag = ''): BBCodeParseTree {
        // The root is invalid
        if (root === null) {
            return null;
        }

        // There're no more tokens
        if (tokens.length === 0) {
            return root;
        }

        let currentToken = tokens.pop();

        // Add the text token as a text parse tree
        if (currentToken.type === TokenType.Text) {
            root.subTrees.push(
                new BBCodeParseTree(TreeType.Text, currentToken.content)
            );
        }

        // Create a new tag tree and find its subtrees
        if (currentToken.type === TokenType.BeginTag) {
            let tagName = currentToken.content;
            root.subTrees.push(BBCodeParseTree.buildTreeFromTokens(
                new BBCodeParseTree(TreeType.Tag, tagName, currentToken.tagAttributes), tokens, tagName)
            );
        }

        // Check if its end tag is correct
        if (currentToken.type === TokenType.EndTag) {
            let tagName = currentToken.content;

            if (tagName === currentTag) {
                return root;
            } else {
                return null;
            }
        }

        // If we got no more tokens and we've opened the tag but not closed it, return null
        if (tokens.length === 0 && currentTag !== '') {
            return null;
        }

        // Proceed to the next token
        return BBCodeParseTree.buildTreeFromTokens(root, tokens, currentTag);
    }
}
