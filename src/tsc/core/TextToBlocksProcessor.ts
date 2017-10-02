class TextToBlocksProcessor {

    private blocks: Block[] = []

    constructor(text: string) {
        var textLines = text.split('\n')

        for (let i = 0; i < textLines.length; ++i) {
            this.blocks.push(new BlockBuilder(textLines[i]).build())
        }
    }

    parse(): Block[] {
        const basicBlocks = this.blocks
        this.blocks = []

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
                this.blocks.push(currentBlock)
            }
            currentBlockIndex = nextBlockIndex++
        }

        return this.blocks
    }
}
