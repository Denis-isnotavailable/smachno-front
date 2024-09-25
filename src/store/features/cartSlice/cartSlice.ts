import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../services/productService';
import { RootState } from '@/store/store';

export const STORAGE_NAME = 'cartProductsSmachno';

interface CartProduct {
    product: IProduct;
    addDate: Date;
    amount: number;
    price: number;
    purpose: string;
    plate?: string;
}

interface CartState {
    cartProducts: CartProduct[];
    totalPrice: number;
    totalAmount: number;
}

const initialState: CartState = {
    cartProducts: [],
    totalPrice: 0,
    totalAmount: 0,
};

export const findProductsToDelete = (data: CartState) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date().getTime();
    const productsToDelete: CartProduct[] = [];

    data.cartProducts.map((product: CartProduct) => {
        const date = new Date(product.addDate).getTime();

        if (currentDate - date > oneDay) {
            productsToDelete.push(product);
        }
    });

    return productsToDelete;
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        //set action.payload: CartProduct
        setCartProduct(state, action) {
            state.totalAmount += action.payload.amount;
            state.totalPrice += action.payload.price;
            state.cartProducts.push(action.payload);
        },
        //update action.payload: CartProduct
        updateCartProduct(state, action) {
            const index = state.cartProducts.findIndex(
                ({ product, purpose }) =>
                    product.id === action.payload.product.id && purpose === action.payload.purpose
            );
            if (index !== -1) {
                state.totalAmount =
                    state.totalAmount - state.cartProducts[index].amount + action.payload.amount;
                state.totalPrice =
                    state.totalPrice - state.cartProducts[index].price + action.payload.price;
                state.cartProducts.splice(index, 1, action.payload);
            }
        },
        //delete action.payload: {id: product.id, purpose}
        deleteCartProduct(state, action) {
            const index = state.cartProducts.findIndex(
                ({ product, purpose }) =>
                    product.id === action.payload.id && purpose === action.payload.purpose
            );
            if (index !== -1) {
                state.totalAmount -= state.cartProducts[index].amount;
                state.totalPrice -= state.cartProducts[index].price;
                state.cartProducts.splice(index, 1);
            }
        },

        clearCartProduct(state) {
            state.totalAmount = 0;
            state.totalPrice = 0;
            state.cartProducts = [];
        },

        //addPlate action.payload: {id: product.id, plate}
        addPlateToProduct(state, action) {
            const index = state.cartProducts.findIndex(
                ({ product, purpose }) =>
                    product.id === action.payload.id && purpose === 'На виріст'
            );
            if (index !== -1) {
                state.cartProducts[index].plate = action.payload.plate;
            }
        },
    },
});

export const {
    setCartProduct,
    updateCartProduct,
    deleteCartProduct,
    clearCartProduct,
    addPlateToProduct,
} = cartSlice.actions;
export const selectCartProducts = (state: RootState) => state.cart;
export const selectCartProductsArr = (state: RootState) => state.cart.cartProducts;

export default cartSlice.reducer;
