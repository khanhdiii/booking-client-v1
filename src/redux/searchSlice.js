import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    destination: "",
    dates: [
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ],
    options: {
        adult: 2,
        children: 0,
        room: 1,
    },
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        newSearch: (state, action) => {
            state.destination = action.payload.destination;
            state.dates = action.payload.dates;
            state.options = action.payload.options;
        },
        resetSearch: (state) => {
            state.destination = "";
            state.dates = [
                {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: "selection",
                },
            ];
            state.options = {
                adult: 2,
                children: 0,
                room: 1,
            };
        },
    },
});

export const { newSearch, resetSearch } = searchSlice.actions;

export default searchSlice.reducer;