import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '../services/productService';

interface CurrentProductState {
    currentProduct: IProduct | null;
}

const initialState: CurrentProductState = {
    currentProduct: null,
};

export const currentProductSlice = createSlice({
    name: 'currentProduct',
    initialState,
    reducers: {
        setCurrentProduct(state, action) {
            state.currentProduct = action.payload;
        },
        clearCurrentProduct(state) {
            state.currentProduct = null;
        },
    },
});

export const { setCurrentProduct, clearCurrentProduct } =
    currentProductSlice.actions;
export const selectCurrentProduct = (state: {
    currentProduct: CurrentProductState;
}) => state.currentProduct.currentProduct;

export default currentProductSlice.reducer;
