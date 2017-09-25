class ListItemBlock {

    static readonly prefix: string = "* "

    constructor(private content: string) {
    }

    convertToHtml(): HTMLElement {
        var element = document.createElement('li')
        element.innerHTML = this.content
        return element
    }
}

class ListItemBlockBuildingRule {

    matches(content: string): boolean {
        return isTextStartingWith(content, "\\" + ListItemBlock.prefix)
    }

    buildBlock(content: string): Block {
        return new ListItemBlock(content.substring(ListItemBlock.prefix.length))
    }

    isLineByLineBlock(): boolean {
        return true
    }
}
