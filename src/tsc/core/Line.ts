class Line {

    private _content: string
    get content(): string {
        return this._content
    }

    constructor(content: string) {
        this._content = content
    }

    isEmpty(): boolean {
        return this._content.trim().length == 0
    }
}
