import { createHash } from 'crypto';

interface LiqPayProps {
    amount: number;
    isDisabledBtn: boolean;
    orderId: string;
    formRef: any;
}
interface Credentials {
    version: number;
    public_key: string;
    action: string;
    amount: number;
    currency: string;
    description: string;
    order_id: string;
    action_payment: string;
    language: string;
    result_url: string;
    server_url: string;
}

export const LiqPay = ({ amount, orderId, formRef }: LiqPayProps) => {
    const publicKey: string = process.env.NEXT_PUBLIC_PUBLIC_KEY_LIQPAY as string;
    const privateKey: string = process.env.NEXT_PUBLIC_PRIVAT_KEY_LIQPAY as string;
    const apiLiqPay: string = process.env.NEXT_PUBLIC_API_URL_LIQPAY as string;
    const resultURL: string = process.env.NEXT_PUBLIC_RESULT_URL as string;
    const serverURL: string = process.env.NEXT_PUBLIC_SERVER_URL as string;

    const credentials: Credentials = {
        version: 3,
        public_key: publicKey,
        action: 'pay',
        amount: amount,
        currency: 'UAH',
        description: `Оплата за смачні овочі від Рудого, замовлення номер ${orderId}`,
        order_id: orderId,
        action_payment: 'pay',
        language: 'ua',
        result_url: `${resultURL}/step-result-payment`,
        server_url: `${serverURL}/orders/liqpay`,
    };

    const json_string = JSON.stringify(credentials);
    const encoded_data = Buffer.from(json_string, 'utf-8').toString('base64');
    const sign_string = privateKey + encoded_data + privateKey;
    const signature_hash = createHash('sha1').update(sign_string).digest('base64');

    return (
        <form ref={formRef} method='POST' action={apiLiqPay} accept-charset='utf-8' id='hiddenForm'>
            <input type='hidden' name='data' value={encoded_data} />
            <input type='hidden' name='signature' value={signature_hash} />
        </form>
    );
};
