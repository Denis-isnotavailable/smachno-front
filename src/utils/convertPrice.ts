export function createPriceText(packaging: string, unit: string, price: number, weightMin: number, weightMax: number) {
    if (packaging === 'штука' && unit !== 'штука') {
        return `${price} грн / 1шт`;
    } else if (packaging === 'штука' && unit === 'штука') {
        return `${price} грн / ${weightMin}шт`;
    } else {
        return `${price} грн / ${weightMin === weightMax ? weightMin : weightMin + "-" + weightMax}${unit}`;
    }
}