interface Block {
    content: string

    convertToHtml(): HTMLElement

    encapsulateIfNeeded(): Block

    canBeMergedWith(block: Block): boolean
    merge(block: Block): void

    isEmpty(): boolean
    forcesNewBlock(): boolean
}
