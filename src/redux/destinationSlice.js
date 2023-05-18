import { createSlice } from '@reduxjs/toolkit';

const destinationSlice = createSlice({
    name: 'destination',
    initialState: {
        name: "Đà tesst",
    },
    reducers: {
        update: (state, action) => {
            state.name = action.payload.name
        }
    },
});

export const { update } = destinationSlice.actions;
export default destinationSlice.reducer;