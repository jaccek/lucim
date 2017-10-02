class BlockBuilder {

    constructor(private line: string) {
    }

    build(): Block {
        if (isTextStartingWith(this.line, "\\*")) {
            return new ListItemBlock(this.line.substring(1))
        }
        return new TextBlock(this.line)
    }
}
