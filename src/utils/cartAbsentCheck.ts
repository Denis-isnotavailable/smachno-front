import { IAbsetnProduct, CartProduct } from "@/components/ModalContent/FullCart/FullCart";
import { IProduct } from "@/store/features/services/productService";

interface IProductsInCart {
    cartProducts: CartProduct[];
    totalPrice: number;
    totalAmount: number;
}

export const cartAbsentCheck = (productsInCart: IProductsInCart, productsList:IProduct[] ) => {
    const absentProducts: IAbsetnProduct[] = [];

    if (productsList) {
        productsInCart?.cartProducts?.map(({ product, purpose }) => {
            const currentProduct = productsList?.find(({ id, isNowInSell }) => id === product.id && !isNowInSell)
            currentProduct && absentProducts.push({ id: product.id, purpose, name: product.name });
        })
    }

    return absentProducts;
}