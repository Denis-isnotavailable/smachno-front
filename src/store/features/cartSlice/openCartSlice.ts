import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

const initialState: { isCartOpen: boolean }  = {
    isCartOpen: false,
};

const openCartSlice = createSlice({
    name: 'openCart',
    initialState,
    reducers: {        
        setIsCartOpen(state, action) {
            state.isCartOpen = action.payload;
        },
    },
});

export const { setIsCartOpen } =
    openCartSlice.actions;
export const selectIsCartOpen = (state: RootState) => state.openCart.isCartOpen;

export default openCartSlice.reducer;