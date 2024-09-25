export function translatePaymentStatus(status: string): string {
    switch (status) {
        case 'created':
            return 'створено';
        case 'processing':
            return 'в обробці';
        case 'hold':
            return 'зупинено';
        case 'success':
            return 'успішно';
        case 'failure':
            return 'не вдалося';
        case 'reversed':
            return 'скасовано';
        case 'expired':
            return 'прострочено';
        default:
            return 'невідомий статус оплати';
    }
}
