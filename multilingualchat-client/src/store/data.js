import { CreateSlice } from '@reduxjs/toolkit';

const dataSlice = CreateSlice({
    name : 'data',
    initialState : {
        messages : []
    },
    reducers: {

    }
});

export default dataSlice.reducer;
export const dataSliceActions = dataSlice.actions;