class ListItemBlock {

    private _content: string
    get content() {
        return this._content
    }

    constructor(content: string) {
        this._content = content
    }

    convertToHtml(): HTMLElement {
        var element = document.createElement('li')
        element.innerHTML = this.content
        return element
    }

    encapsulateIfNeeded(): Block {
        const listBlock = new ListBlock()
        listBlock.merge(this)
        
        return listBlock
    }

    canBeMergedWith(block: Block): boolean {
        return !block.forcesNewBlock() && !block.isEmpty()
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
        return true
    }
}
