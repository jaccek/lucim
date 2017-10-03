abstract class BlockBuilder {
    content: string

    encapsulateIfNeeded(): BlockBuilder {
        return this
    }

    isEmpty(): boolean {
        return this.content.trim().length == 0
    }

    abstract canBeMergedWith(block: BlockBuilder): boolean
    abstract merge(block: BlockBuilder): void

    abstract forcesNewBlock(): boolean

    abstract build(): Block
}
