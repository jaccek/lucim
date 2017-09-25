class HtmlRenderer {

    constructor(private blocks: Block[]) {
    }

    render(container: HTMLElement): void {
        container.innerHTML = ''

        for (let i = 0; i < this.blocks.length; ++i) {
            container.appendChild(this.blocks[i].convertToHtml())
        }
    }
}
