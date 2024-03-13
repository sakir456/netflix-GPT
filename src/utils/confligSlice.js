import { createSlice } from "@reduxjs/toolkit";

const confligSlice = createSlice({
    name: "config",
   initialState: {
      lang: "en",
    },
    reducers: {
        changeLangage: (state, action) => {
            state.lang = action.payload;
        },
    },

});

export const {changeLangage} = confligSlice.actions;

export  default confligSlice.reducer