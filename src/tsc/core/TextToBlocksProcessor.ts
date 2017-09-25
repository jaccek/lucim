class TextToBlocksProcessor {

    private lines: Line[]
    private lineIndex: number = 0
    // private currentTextBlock: string = ''
    private blockBuilder: BlockBuilder = new BlockBuilder()

    private get currentLine(): Line {
        return this.lines[this.lineIndex]
    }

    private get nextLine() {
        if (this.hasNextLine()) {
            return this.lines[this.lineIndex + 1]
        }
        return null
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
            this.blockBuilder.append(this.currentLine)

            if (this.nextLineIsEmpty() && this.blockBuilder.hasContent()) {
                blocks.push(this.blockBuilder.build())
                this.blockBuilder = new BlockBuilder()
            }

            this.goToNextLine()
        } while (!this.isEndReached())

        return blocks
    }

    private isEndReached(): boolean {
        return this.lineIndex >= this.lines.length
    }

    private goToNextLine(): void {
        this.lineIndex++
    }

    private nextLineIsEmpty(): boolean {
        var nextLine = this.nextLine
        if (nextLine != null) {
            return nextLine.isEmpty()
        }
        return true;
    }

    private hasNextLine(): boolean {
        return this.lineIndex + 1 < this.lines.length
    }
}
