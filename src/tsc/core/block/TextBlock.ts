class TextBlock {

    constructor(private content: string) {
    }

    convertToHtml(): HTMLElement {
        var paragraph = document.createElement('p')
        paragraph.innerHTML = this.content
        return paragraph
    }
}


class TextBlockBuilder extends BlockBuilder {

    private _content: string
    get content() {
        return this._content
    }

    constructor(content: string) {
        super()
        this._content = content
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

    forcesNewBlock(): boolean {
        return false
    }

    build(): Block {
        return new TextBlock(this._content)
    }
}
