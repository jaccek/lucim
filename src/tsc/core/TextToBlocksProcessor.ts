class TextToBlocksProcessor {

    private lines: Line[]
    private lineIndex: number = 0
    private blockBuilder: BlockBuilder = new BlockBuilder()

    private get currentLine(): Line {
        return this.lines[this.lineIndex]
    }

    constructor(text: string) {
        var textLines = text.split('\n')

        this.lines = []
        for (let i = 0; i < textLines.length; i++) {
            this.lines.push(new Line(textLines[i]))
        }
    }

    parse(): Block[] {
        var blocks: Block[] = []

        do {
            if (this.blockBuilder.cannotBeAppendBy(this.currentLine) && this.blockBuilder.hasContent()) {
                blocks.push(this.blockBuilder.build())
                this.blockBuilder = new BlockBuilder()
            }

            this.blockBuilder.append(this.currentLine)

            this.goToNextLine()
        } while (!this.isEndReached())

        if (this.blockBuilder.hasContent()) {
            blocks.push(this.blockBuilder.build())
        }

        return blocks
    }

    private isEndReached(): boolean {
        return this.lineIndex >= this.lines.length
    }

    private goToNextLine(): void {
        this.lineIndex++
    }
}
