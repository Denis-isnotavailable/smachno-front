export function getMonthNameFromDate(dateString: Date): string {
    const date: Date = new Date(dateString);

    const monthNames: string[] = [
        "січні", "лютому", "березні",
        "квітні", "травні", "червні",
        "липні", "серпні", "вересні",
        "жовтні", "листопаді", "грудні"
    ];

    const monthIndex: number = date.getMonth();
    return monthNames[monthIndex];
}