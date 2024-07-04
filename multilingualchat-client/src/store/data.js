import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name : 'data',
    initialState : {
        messages : [],
        user : null
    },
    reducers: {
        setUser(state, action){
            state.user = action.payload;
        }
    }
});

export default dataSlice.reducer;
export const dataSliceActions = dataSlice.actions;