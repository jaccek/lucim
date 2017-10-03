class ListBlock {

    constructor(private items: ListItemBlock[], private isOrdered: boolean) {
    }

    get content() {
        return ""
    }

    convertToHtml(): HTMLElement {
        const htmlTag = this.isOrdered ? 'ol' : 'ul'
        const element = document.createElement(htmlTag)
        for (let i = 0; i < this.items.length; ++i) {
            element.appendChild(this.items[i].convertToHtml())
        }
        return element
    }
}


class ListBlockBuilder extends BlockBuilder {

    private itemBlocks: ListItemBlockBuilder[] = []
    private mergedEmptyBlock: boolean = false

    get content() {
        return ""
    }

    canBeMergedWith(block: BlockBuilder): boolean {
        const itemsCount = this.itemBlocks.length
        return (block instanceof ListItemBlockBuilder && this.isOrdered() == block.isOrdered)
                || block.isEmpty()
                || (itemsCount > 0 && this.itemBlocks[itemsCount - 1].canBeMergedWith(block) && !this.mergedEmptyBlock)
    }

    merge(block: BlockBuilder): void {
        if (block.isEmpty()) {
            this.mergedEmptyBlock = true;
            return
        }

        this.mergedEmptyBlock = false
        if (block instanceof ListItemBlockBuilder) {
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

    build(): Block {
        let items: ListItemBlock[] = []
        for (let i = 0; i < this.itemBlocks.length; ++i) {
            items.push(this.itemBlocks[i].build())
        }

        return new ListBlock(items, this.isOrdered())
    }

    private isOrdered(): boolean {
        if (this.itemBlocks.length == 0) {
            return false
        }
        return this.itemBlocks[0].isOrdered
    }
}
