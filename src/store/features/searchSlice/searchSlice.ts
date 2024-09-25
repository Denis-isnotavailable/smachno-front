import { RootState } from '@/store/store';
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: "search",
    initialState: "",
    reducers: {
        setSearchValue(state, action) {
            return state = action.payload;
        }
    }
});

export const { setSearchValue } = searchSlice.actions;
export const selectSearchValue = (state: RootState) => state.search;
export default searchSlice.reducer;