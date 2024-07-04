import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name : 'data',
    initialState : {
        messages : []
    },
    reducers: {

    }
});

export default dataSlice.reducer;
export const dataSliceActions = dataSlice.actions;