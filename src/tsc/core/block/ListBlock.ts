class ListBlock {

    private itemBlocks: ListItemBlock[] = []
    private mergedEmptyBlock: boolean = false

    get content() {
        return ""
    }

    convertToHtml(): HTMLElement {
        var element = document.createElement('ul')
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
        return block instanceof ListItemBlock
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
}
