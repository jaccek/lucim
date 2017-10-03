class LineToBlockBuilder {

    constructor(private line: string) {
    }

    build(): BlockBuilder {
        if (isTextStartingWith(this.line, "\\*")) {
            return new ListItemBlockBuilder(this.line.substring(1), false)
        } else if (isTextStartingWith(this.line, "1\\.")) {
            return new ListItemBlockBuilder(this.line.substring(2), true)
        } else if (isTextStartingWith(this.line, "#")) {
            const hashesCount = countStartingChar(this.line)
            return new HeaderBlockBuilder(this.line.substring(hashesCount), hashesCount)
        }
        return new TextBlockBuilder(this.line)
    }
}
