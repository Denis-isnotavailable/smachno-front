import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

const initialState: { token: string | null }  = {
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getToken(state, action) {
            state.token = action.payload;
        },
        clearToken(state) {
            state.token = null;
        },
    },
});

export const { getToken, clearToken,} =
    authSlice.actions;
export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
