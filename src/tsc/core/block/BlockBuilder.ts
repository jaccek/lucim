class BlockBuilder {

    private content: string = ''
    private buildingRules: BlockBuildingRule[] = []

    constructor() {
        this.buildingRules.push(new HeaderBlockBuildingRule())
    }

    build(): Block {
        for (let i = 0; i < this.buildingRules.length; ++i) {
            if (this.buildingRules[i].matches(this.content)) {
                return this.buildingRules[i].buildBlock(this.content)
            }
        }
        return new TextBlock(this.content)
    }

    append(line: Line): void {
        if (line.isEmpty()) {
            return
        }
        if (this.content.length > 0) {
            this.content += ' '
        }
        this.content += line.content.trim()
    }

    hasContent(): boolean {
        return this.content.length > 0
    }
}

interface BlockBuildingRule {
    matches(content: string): boolean
    buildBlock(content: string): Block
}
