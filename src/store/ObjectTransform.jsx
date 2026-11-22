import { createSlice } from "@reduxjs/toolkit";

const objectTransform = createSlice({
  name: 'objectTransform',
  initialState: { rotate: 0, skewX : 0, skewY : 10, flipX : false, flipY : false, width: 0, height: 0, renderObject: false},
  reducers: {
    setRotate: (state, action) => {
      state.rotate = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
    setSkewX: (state, action) => {
      state.skewX = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
    setSkewY: (state, action) => {
      state.skewY = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
    setFlipX: (state, action) => {
      state.flipX = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
    setFlipY: (state, action) => {
      state.flipY = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
    setWidth: (state, action) => {
      state.width = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
    setHeight: (state, action) => {
      state.height = action.payload.data;
      state.renderObject = action.payload.renderObject;
    }
  }
})

export const {setRotate, setSkewX, setSkewY, setFlipX, setFlipY, setWidth, setHeight} = objectTransform.actions;
export default objectTransform.reducer;