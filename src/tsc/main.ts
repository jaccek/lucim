function generateSlide() {
    var slideEditor = <HTMLTextAreaElement> document.getElementById('slideEditor')
    var text = slideEditor!.value

    let textProcessor = new TextToBlocksProcessor(text)
    var blocks = textProcessor.parse()

    let htmlRenderer = new HtmlRenderer(blocks)
    var slideContainer = document.getElementById('slideContainer')
    htmlRenderer.render(slideContainer!)

    return false
}


window.onload = () => {
    document.getElementById('editorForm')!.onsubmit = generateSlide
    document.getElementById('slideEditor')!.oninput = generateSlide
    // document.getElementById('slideEditor')!.addEventListener("keypress", () => generateSlide());
};
