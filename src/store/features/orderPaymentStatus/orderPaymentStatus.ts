import { RootState } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';

const initialState: { status: boolean }  = {
    status: false,
};

const orderPaymentStatusSlice = createSlice({
    name: "orderPaymentStatus",
    initialState,
    reducers: {
        setOrderPaymentStatus(state, action) {
            state.status = action.payload;
        }
    }
});

export const { setOrderPaymentStatus } = orderPaymentStatusSlice.actions;
export const selectOrderPaymentStatus = (state: RootState) => state.orderPaymentStatus.status;
export default orderPaymentStatusSlice.reducer;