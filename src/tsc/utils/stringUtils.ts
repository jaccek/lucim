
function isTextStartingWith(text: string, prefix: string): boolean {
    return new RegExp('^' + prefix).test(text)
}

function countStartingChar(text: string): number {
    if (text.length == 0) {
        return 0
    }

    const firstChar = text.charAt(0)
    var firstCharCount = 1
    for (let i = 1; i < text.length; ++i) {
        if (text.charAt(i) != firstChar) {
            break
        }
        firstCharCount++
    }
    return firstCharCount
}
