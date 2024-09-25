const token = process.env.NEXT_PUBLIC_PAYMENT_TOKEN || '';
const webHookUrl = process.env.NEXT_PUBLIC_API_URL || '';

export const usePayments = async (amount: number, id: string) => {
    const location = window.location.origin;
    const requestData = {
        amount: amount * 100,
        ccy: 980,
        merchantPaymInfo: {
            reference: id.toString(),
        },
        redirectUrl: `${location}/step-result-payment`,
        webHookUrl: `${webHookUrl}monopay`,
        paymentType: 'debit',
    };

    const request = await fetch('https://api.monobank.ua/api/merchant/invoice/create', {
        method: 'POST',
        headers: {
            'X-Token': token,
        },
        body: JSON.stringify(requestData),
    });

    const data = await request.json();
    const pageUrl = data.pageUrl;

    if (pageUrl) window.location.href = data.pageUrl;
};
