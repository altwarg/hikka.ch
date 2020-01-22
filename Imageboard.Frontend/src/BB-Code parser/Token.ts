/**
 * Type of token
 */
export enum TokenType {
    Text, BeginTag, EndTag
}

export const AttrNameChars = "[a-zA-Z0-9\\.\\-_;:/]";
export const AttrValueChars = "[a-zA-Z0-9\\.\\-_:;#/\\s]";

/**
 * Represents a token of a parsing string
 */
export class Token {
    constructor(public type: TokenType, public content: string, public tagAttributes?: Array<string>, public tagStr?: string) { }

    public toString(): string {
        return `${this.content} (${TokenType[this.type]})`;
    }

    public equals(token: Token): boolean {
        return this.type == token.type && this.content == token.content;
    }

    public static getTextToken(content: string): Token {
        return new Token(TokenType.Text, content);
    }

    public static getTagToken(match: RegExpExecArray): Token {
        if (match[1] === undefined) { // Begin tag
            let tagName = match[2];
            let attributes = new Array<string>();
            let attrPattern = new RegExp(`(${AttrNameChars}+)?=([\"])(${AttrValueChars}+)\\2`, "g");
            let attrStr = match[0].substr(1 + tagName.length, match[0].length - 2 - tagName.length);

            let attrMatch: RegExpExecArray;
            while (attrMatch = attrPattern.exec(attrStr)) {
                if (attrMatch[1] === undefined) { // The tag attribute
                    attributes[tagName] = attrMatch[3];
                } else {                          // Normal attribute
                    attributes[attrMatch[1]] = attrMatch[3];
                }
            }

            return new Token(TokenType.BeginTag, tagName, attributes, match[0]);
        } else {                      // End tag
            return new Token(TokenType.EndTag, match[1].substr(1, match[1].length - 1));
        }
    }

    public static toTextToken(token: Token) {
        if (token.type == TokenType.BeginTag) {
            token.content = token.tagStr;
            token.type = TokenType.Text;
        }

        if (token.type == TokenType.EndTag) {
            token.content = `[/${token.content}]`;
            token.type = TokenType.Text;
        }
    }
}
