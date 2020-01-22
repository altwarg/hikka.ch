import BBTag from './BBTag';
import { Token, TokenType, AttrNameChars, AttrValueChars } from './Token';

/**
 * Represents a tokenizer for parsing string into tokens
 */
export default class Tokenizer {
    constructor(private bbTags: Array<BBTag>) { }

    /**
     * Tokenizes the given string
     * @param { string } str - Parsing string
     */
    public tokenize(str: string): Array<Token> {
        let tokens = this.getTokens(str);
        let newTokens = new Array<Token>();
        let noNesting = false;
        let noNestingTag = '';
        let noNestingTagContent = '';

        for (let i in tokens) {
            let currentToken = tokens[i];
            let bbTag: BBTag = this.bbTags[currentToken.content];
            let addTag = true;

            if (bbTag === undefined && !noNesting) { // Replace invalid tags with text
                Token.toTextToken(currentToken);
            } else {                                 // Check if current tag does not support nesting
                if (noNesting) {
                    if (currentToken.type === TokenType.EndTag && currentToken.content === noNestingTag) {
                        noNesting = false;
                        newTokens.push(Token.getTextToken(noNestingTagContent));
                    } else {
                        Token.toTextToken(currentToken);
                        noNestingTagContent += currentToken.content;
                        addTag = false;
                    }
                } else {
                    if (bbTag.noNesting && currentToken.type === TokenType.BeginTag) {
                        noNesting = true;
                        noNestingTag = currentToken.content;
                        noNestingTagContent = '';
                    }
                }
            }

            if (addTag) {
                newTokens.push(currentToken);
            }
        }

        return newTokens;
    }

    /**
     * Gets the tokens from the given string
     * @param str - Parsing string
     * @returns new Token[]
     */
    private getTokens(str: string): Array<Token> {
        let pattern = `\\[(\/\\w*)\\]|\\[(\\w*)+(=([\"])${AttrValueChars}*\\4)?( (${AttrNameChars}+)?=([\"])(${AttrValueChars}+)\\7)*\\]`;
        let tagPattern = new RegExp(pattern, "g");
        let tokens = new Array<Token>();
        let match: RegExpExecArray;
        let lastIndex = 0;

        while (match = tagPattern.exec(str)) {
            let delta = match.index - lastIndex;

            if (delta > 0) {
                tokens.push(Token.getTextToken(str.substr(lastIndex, delta)));
            }

            tokens.push(Token.getTagToken(match));
            lastIndex = tagPattern.lastIndex;
        }

        let delta = str.length - lastIndex;

        if (delta > 0) {
            tokens.push(Token.getTextToken(str.substr(lastIndex, delta)));
        }

        return tokens;
    }
}
