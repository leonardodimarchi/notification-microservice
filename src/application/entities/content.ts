export class Content {
    constructor(content: string) {
        const isContentLengthValid = this.validateContentLength(content);

        if (!isContentLengthValid)
            throw new Error('Content length must be between 5 and 240.');

        this.content = content;
    }

    private readonly content: string;

    get value(): string {
        return this.content;
    }

    private validateContentLength(content: string): boolean {
        return content.trim().length >= 5 && content.trim().length <= 240;
    }
}