class TextBlock {

    constructor(private content: string) {
    }

    convertToHtml(): HTMLElement {
        var paragraph = document.createElement('p')
        paragraph.innerHTML = this.content
        return paragraph
    }
}


class TextBlockBuilder {

    private _content: string
    get content() {
        return this._content
    }

    constructor(content: string) {
        this._content = content
    }

    encapsulateIfNeeded(): BlockBuilder {
        return this
    }

    canBeMergedWith(block: BlockBuilder): boolean {
        return (!block.forcesNewBlock() && this.isEmpty())
                || (!block.forcesNewBlock() && !block.isEmpty())
    }

    merge(block: BlockBuilder): void {
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

    build(): Block {
        return new TextBlock(this._content)
    }
}
