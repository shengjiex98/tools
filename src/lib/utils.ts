export function digits(x: number, pad:number) {
    const bin = x.toString(2);
    return "0".repeat(Math.abs(pad - bin.length)) + bin;
}

export function countones(bin: string) {
    return bin.split('1').length - 1;
}

function reverseStr(str: string) {
    return str.split("").reverse().join("");
}