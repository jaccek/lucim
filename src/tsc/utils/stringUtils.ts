
function isTextStartingWith(text: string, prefix: string): boolean {
    return new RegExp('^' + prefix).test(text)
}
