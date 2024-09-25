export function removeTrailingZeros(num: number | undefined) {
    if (!num) return 0;
    return parseFloat(num.toString());
}