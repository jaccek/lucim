class BlockBuilder {

    private content: string = ''
    private buildingRules: BlockBuildingRule[] = []

    constructor() {
        this.buildingRules.push(new HeaderBlockBuildingRule())
        this.buildingRules.push(new ListItemBlockBuildingRule())
    }

    build(): Block {
        const rule = this.findMatchingRule(this.content)
        if (rule != null) {
            return rule.buildBlock(this.content)
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

    cannotBeAppendBy(line: Line): boolean {
        return !this.canBeAppendBy(line)
    }

    hasContent(): boolean {
        return !this.isEmpty()
    }

    private findMatchingRule(text: string): BlockBuildingRule | null {
        for (let i = 0; i < this.buildingRules.length; ++i) {
            if (this.buildingRules[i].matches(text)) {
                return this.buildingRules[i]
            }
        }
        return null
    }

    private canBeAppendBy(line: Line): boolean {
        if (this.isEmpty()) {
            return true
        }
        const rule = this.findMatchingRule(line.content.trim())
        if (rule != null) {
            return !rule.isLineByLineBlock()
        }
        return !line.isEmpty()
    }

    private isEmpty(): boolean {
        return this.content.length <= 0
    }
}

interface BlockBuildingRule {
    matches(content: string): boolean
    buildBlock(content: string): Block
    isLineByLineBlock(): boolean
}
