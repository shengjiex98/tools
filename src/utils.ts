export function digits(x: number, pad:number) {
    let bits = Math.floor(Math.log2(x))
    return "0".repeat(Math.abs(pad - bits)) + reverseStr(x.toString(2))
}

function reverseStr(str: string) {
    return str.split("").reverse().join("")
}