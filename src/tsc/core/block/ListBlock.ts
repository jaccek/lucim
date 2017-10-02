class ListBlock {

    private itemBlocks: ListItemBlock[] = []
    private mergedEmptyBlock: boolean = false

    get content() {
        return ""
    }

    convertToHtml(): HTMLElement {
        const htmlTag = this.isOrdered() ? 'ol' : 'ul'
        const element = document.createElement(htmlTag)
        for (let i = 0; i < this.itemBlocks.length; ++i) {
            element.appendChild(this.itemBlocks[i].convertToHtml())
        }
        return element
    }

    encapsulateIfNeeded(): Block {
        return this
    }

    canBeMergedWith(block: Block): boolean {
        const itemsCount = this.itemBlocks.length
        return (block instanceof ListItemBlock && this.isOrdered() == block.isOrdered)
                || block.isEmpty()
                || (itemsCount > 0 && this.itemBlocks[itemsCount - 1].canBeMergedWith(block) && !this.mergedEmptyBlock)
    }

    merge(block: Block): void {
        if (block.isEmpty()) {
            this.mergedEmptyBlock = true;
            return
        }

        this.mergedEmptyBlock = false
        if (block instanceof ListItemBlock) {
            this.itemBlocks.push(block)
        } else {
            this.itemBlocks[this.itemBlocks.length - 1].merge(block)
        }
    }

    isEmpty(): boolean {
        return this.itemBlocks.length == 0
    }

    forcesNewBlock(): boolean {
        return true
    }

    private isOrdered(): boolean {
        if (this.itemBlocks.length == 0) {
            return false
        }
        return this.itemBlocks[0].isOrdered
    }
}
