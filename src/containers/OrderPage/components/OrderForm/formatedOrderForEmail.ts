import { CartProduct } from '@/components/ModalContent/FullCart/FullCart';

interface OutputItem {
    name: string;
    packaging: string;
    price: number;
    amount: number;
    forMe: number;
    forArmy: number;
    forGrow: number;
}
export const formatedOrderForEmail = (cartProducts: CartProduct[]) => {
    return cartProducts.reduce((acc: OutputItem[], curr: CartProduct) => {
        const existing = acc.find((item) => item.name === curr.product.name);
        if (existing) {
            existing.amount += curr.amount;
            if (curr.purpose === 'Для себе') {
                existing.forMe += curr.amount;
            } else if (curr.purpose === 'Для ЗСУ') {
                existing.forArmy += curr.amount;
            } else if (curr.purpose === 'На виріст') {
                existing.forGrow += curr.amount;
            }
        } else {
            acc.push({
                name: curr.product.name,
                packaging: `${curr.product.packaging.slice(0, 2)}.`,
                price: curr.product.price,
                amount: curr.amount,
                forMe: curr.purpose === 'Для себе' ? curr.amount : 0,
                forArmy: curr.purpose === 'Для ЗСУ' ? curr.amount : 0,
                forGrow: curr.purpose === 'На виріст' ? curr.amount : 0,
            });
        }
        return acc;
    }, []);
};
