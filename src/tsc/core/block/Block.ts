interface Block {
    // content: string

    convertToHtml(): HTMLElement

    // encapsulateIfNeeded(): Block
    //
    // canBeMergedWith(block: Block): boolean
    // merge(block: Block): void
    //
    // isEmpty(): boolean
    // forcesNewBlock(): boolean
}

interface BlockBuilder {
    content: string

    encapsulateIfNeeded(): BlockBuilder

    canBeMergedWith(block: BlockBuilder): boolean
    merge(block: BlockBuilder): void

    isEmpty(): boolean
    forcesNewBlock(): boolean

    build(): Block
}
