class BlockBuilder {

    constructor(private line: string) {
    }

    build(): Block {
        if (isTextStartingWith(this.line, "\\*")) {
            return new ListItemBlock(this.line.substring(1))
        } else if (isTextStartingWith(this.line, "#")) {
            const hashesCount = countStartingChar(this.line)
            return new HeaderBlock(this.line.substring(hashesCount), hashesCount)
        }
        return new TextBlock(this.line)
    }
}
