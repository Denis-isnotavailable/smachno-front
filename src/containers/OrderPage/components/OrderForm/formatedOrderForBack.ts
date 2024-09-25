import { IProduct } from '@/store/features/services/productService';

interface OutputItem {
    productId: string;
    order_quantity: number;
    plate?: string;
}

interface OutputObject {
    items: OutputItem[];
}

interface CartProduct {
    product: IProduct;
    addDate: Date;
    amount: number;
    price: number;
    purpose: string;
    plate?: string;
}

export const formatedOrderForBack = (cartProducts: CartProduct[]) => {
    const outputObject: { [key: string]: OutputObject } = {};
    cartProducts.forEach((item) => {
        let key: string;
        switch (item.purpose) {
            case 'Для себе':
                key = 'selfOrder';
                break;
            case 'Для ЗСУ':
                key = 'zsuOrder';
                break;
            default:
                key = 'growthOrder';
                break;
        }

        if (!outputObject[key]) {
            outputObject[key] = { items: [] };
        }

        outputObject[key].items.push({
            productId: item.product.id,
            order_quantity: item.amount,
        });
    });

    if (!('growthOrder' in outputObject)) {
        return outputObject;
    }

    const growthOrderItems: OutputItem[] = outputObject['growthOrder'].items;

    const newArr: OutputItem[] = [];
    growthOrderItems.forEach((objGrow: OutputItem) => {
        cartProducts.forEach((product: CartProduct) => {
            if (product.product.id === objGrow.productId) {
                newArr.push({
                    productId: objGrow.productId,
                    order_quantity: objGrow.order_quantity,
                    plate: product.plate || '',
                });
            }
        });
    });
    outputObject.growthOrder.items = newArr;
    return outputObject;
};
