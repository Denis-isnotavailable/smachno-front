import { RootState } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';

const initialState: { position: number }  = {
    position: 0,
};

const adminPagePositionSlice = createSlice({
    name: "pagePosition",
    initialState,
    reducers: {
        setPagePosition(state, action) {
            state.position = action.payload;
        }
    }
});

export const { setPagePosition } = adminPagePositionSlice.actions;
export const selectPagePosition = (state: RootState) => state.adminPagePosition.position;
export default adminPagePositionSlice.reducer;