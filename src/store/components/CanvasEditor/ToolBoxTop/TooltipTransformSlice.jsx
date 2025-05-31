import { createSlice } from "@reduxjs/toolkit";

const tooltipTransformsSlice = createSlice({
  name: 'tooltipTransform',
  initialState: { rotate: 0, skewX : 0, skewY : 0, flipX : false, flipY : false},
  reducers: {
    setRotate: (state, action) => {
      state.rotate = action.payload;
    },
    setSkewX: (state, action) => {
      state.skewX = action.payload;
    },
    setSkewY: (state, action) => {
      state.skewY = action.payload;
    },
    setFlipX: (state, action) => {
      state.flipX = action.payload;
    },
    setFlipY: (state, action) => {
      state.flipY = action.payload;
    },
  }
})

export const {setRotate, setSkewX, setSkewY, setFlipX, setFlipY} = tooltipTransformsSlice.actions;
export default tooltipTransformsSlice.reducer;