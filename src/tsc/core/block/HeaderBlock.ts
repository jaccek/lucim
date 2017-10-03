class HeaderBlock {

    constructor(private content: string, private hashesCount: number) {
    }

    convertToHtml(): HTMLElement {
        var element = document.createElement('h' + this.hashesCount)
        element.innerHTML = this.content
        return element
    }
}


class HeaderBlockBuilder extends BlockBuilder {

    private _content: string
    get content() {
        return this._content
    }

    constructor(text: string, private hashesCount: number) {
        super()
        this._content = text
    }

    canBeMergedWith(block: BlockBuilder): boolean {
        return false
    }

    merge(block: BlockBuilder): void {
    }

    forcesNewBlock(): boolean {
        return true
    }

    build(): Block {
        return new HeaderBlock(this._content, this.hashesCount)
    }
}
