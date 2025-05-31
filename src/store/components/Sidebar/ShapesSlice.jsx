import { createSlice } from "@reduxjs/toolkit";

const shapesSlice = createSlice({
  name: 'shapes',
  initialState: { addShapes: null},
  reducers: {
    addShapes: (state, action) => {
      console.log(action.payload)
      state.addShapes = action.payload;
    },
    resetStateAddShapes: (state) => {
      state.addShapes = null;
    },
  }
})

export const {addShapes, resetStateAddShapes} = shapesSlice.actions;
export default shapesSlice.reducer;