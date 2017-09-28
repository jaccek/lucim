class TextBlock {

    private _content: string
    get content() {
        return this._content
    }

    constructor(content: string) {
        this._content = content
    }

    convertToHtml(): HTMLElement {
        var paragraph = document.createElement('p')
        paragraph.innerHTML = this._content
        return paragraph
    }

    encapsulateIfNeeded(): Block {
        return this
    }

    canBeMergedWith(block: Block): boolean {
        return (!block.forcesNewBlock() && this.isEmpty())
                || (!block.forcesNewBlock() && !block.isEmpty())
    }

    merge(block: Block): void {
        if (block.isEmpty()) {
            return
        }

        if (!this.isEmpty()) {
            this._content += " "
        }
        this._content += block.content.trim()
    }

    isEmpty(): boolean {
        return this._content.trim().length == 0
    }

    forcesNewBlock(): boolean {
        return false
    }
}
