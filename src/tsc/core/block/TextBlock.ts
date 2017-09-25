class TextBlock {

    constructor(private text: string) {
    }

    convertToHtml(): HTMLElement {
        var paragraph = document.createElement('p')
        paragraph.innerHTML = this.text
        return paragraph
    }
}
