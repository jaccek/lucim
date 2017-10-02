class HeaderBlock {

    private _content: string
    get content() {
        return this._content
    }

    constructor(text: string, private hashesCount: number) {
        this._content = text
    }

    convertToHtml(): HTMLElement {
        var element = document.createElement('h' + this.hashesCount)
        element.innerHTML = this._content
        return element
    }

    encapsulateIfNeeded(): Block {
        return this
    }

    canBeMergedWith(block: Block): boolean {
        return false
    }

    merge(block: Block): void {
    }

    isEmpty(): boolean {
        return this._content.length == 0
    }

    forcesNewBlock(): boolean {
        return true
    }
}
