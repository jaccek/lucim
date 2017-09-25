class HeaderBlock {

    constructor(private text: string, private hashesCount: number) {
    }

    convertToHtml(): HTMLElement {
        var element = document.createElement('h' + this.hashesCount)
        element.innerHTML = this.text
        return element
    }
}


class HeaderBlockBuildingRule {

    matches(content: string): boolean {
        let hashesCount = this.countStartingHashes(content)
        return 0 < hashesCount && hashesCount < 7
    }

    buildBlock(content: string): Block {
        let hashesCount = this.countStartingHashes(content)
        return new HeaderBlock(content.substring(hashesCount + 1), hashesCount)
    }

    isLineByLineBlock(): boolean {
        return false
    }

    private countStartingHashes(text: string): number {
        var hashesCount = 0
        for (let i = 0; i < text.length; ++i) {
            if (text.charAt(i) == '#') {
                hashesCount++
            } else if (text.charAt(i) == ' ') {
                return hashesCount
            } else {
                break
            }
        }
        return 0
    }
}
