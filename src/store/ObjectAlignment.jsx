import { createSlice } from "@reduxjs/toolkit";

const objectAligment = createSlice({
  name: 'objectAligment',
  initialState: {alignment: null},
  reducers: {
    alignment: (state, action) => {
      state.alignment = action.payload;
    }
  }
})

export const {
  alignment
} = objectAligment.actions;
export default objectAligment.reducer;