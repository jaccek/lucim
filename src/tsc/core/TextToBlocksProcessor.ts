class TextToBlocksProcessor {

    private builders: BlockBuilder[] = []

    constructor(text: string) {
        var textLines = text.split('\n')

        for (let i = 0; i < textLines.length; ++i) {
            this.builders.push(new LineToBlockBuilder(textLines[i]).build())
        }
    }

    parse(): Block[] {
        const basicBlocks = this.builders
        this.builders = []

        let currentBlockIndex = 0
        let nextBlockIndex = currentBlockIndex + 1

        while (currentBlockIndex < basicBlocks.length) {
            let currentBlock = basicBlocks[currentBlockIndex].encapsulateIfNeeded()

            while (nextBlockIndex < basicBlocks.length) {
                const nextBlock = basicBlocks[nextBlockIndex]

                if (currentBlock.canBeMergedWith(nextBlock)) {
                    currentBlock.merge(nextBlock)
                    ++nextBlockIndex
                } else {
                    break;
                }
            }
            if (!currentBlock.isEmpty()) {
                this.builders.push(currentBlock)
            }
            currentBlockIndex = nextBlockIndex++
        }

        return this.convertBuildersToBlocks()
    }

    private convertBuildersToBlocks(): Block[] {
        let blocks: Block[] = []
        for (let i = 0; i < this.builders.length; ++i) {
            blocks.push(this.builders[i].build())
        }
        return blocks
    }
}
