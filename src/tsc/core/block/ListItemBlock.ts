class ListItemBlock {

    private _content: string
    get content() {
        return this._content
    }

    private _isOrdered: boolean
    get isOrdered() {
        return this._isOrdered
    }

    constructor(content: string, isOrdered: boolean) {
        this._content = content
        this._isOrdered = isOrdered
    }

    convertToHtml(): HTMLElement {
        var element = document.createElement('li')
        element.innerHTML = this.content
        return element
    }
}


class ListItemBlockBuilder extends BlockBuilder {

    private _content: string
    get content() {
        return this._content
    }

    private _isOrdered: boolean
    get isOrdered() {
        return this._isOrdered
    }

    constructor(content: string, isOrdered: boolean) {
        super()
        this._content = content
        this._isOrdered = isOrdered
    }

    encapsulateIfNeeded(): BlockBuilder {
        const listBlockBuilder = new ListBlockBuilder()
        listBlockBuilder.merge(this)

        return listBlockBuilder
    }

    canBeMergedWith(block: BlockBuilder): boolean {
        return !block.forcesNewBlock() && !block.isEmpty()
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
        return true
    }

    build(): ListItemBlock {
        return new ListItemBlock(this._content, this.isOrdered)
    }
}
