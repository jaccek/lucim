class HeaderBlock {

    constructor(private content: string, private hashesCount: number) {
    }

    convertToHtml(): HTMLElement {
        var element = document.createElement('h' + this.hashesCount)
        element.innerHTML = this.content
        return element
    }
}


class HeaderBlockBuilder {

    private _content: string
    get content() {
        return this._content
    }

    constructor(text: string, private hashesCount: number) {
        this._content = text
    }

    encapsulateIfNeeded(): BlockBuilder {
        return this
    }

    canBeMergedWith(block: BlockBuilder): boolean {
        return false
    }

    merge(block: BlockBuilder): void {
    }

    isEmpty(): boolean {
        return this._content.length == 0
    }

    forcesNewBlock(): boolean {
        return true
    }

    build(): Block {
        return new HeaderBlock(this._content, this.hashesCount)
    }
}
