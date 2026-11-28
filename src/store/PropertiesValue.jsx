import { createSlice } from "@reduxjs/toolkit";

const propertiesValue = createSlice({
  name: 'propertiesValue',
  initialState: {
    id: null,
    type: null,
    rotate: 0,
    skewX: 0,
    skewY: 10,
    flipX: false,
    flipY: false,
    width: 0,
    height: 0,
    opacity: 100,
    textColor: "#000000",
    stroke: "#000000",
    strokeWidth: 0,
    left: 0,
    top: 0,
    originX: "center",
    originY: "center",
    fontFamily: null,
    fontSize: null,
    fontWeight: "normal",
    fontStyle: "normal",
    textAlign: "center",
    renderObject: false
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
    setType: (state, action) => {
      state.type = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
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
    },
    setOpacity: (state, action) => {
      state.opacity = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
    setStroke: (state, action) => {
      state.stroke = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
    setStrokeWidth: (state, action) => {
      state.strokeWidth = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
    setTextColor: (state, action) => {
      state.textColor = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
    setLeft: (state, action) => {
      state.left = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
    setTop: (state, action) => {
      state.top = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
    setOriginX: (state, action) => {
      state.originX = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
    setOriginY: (state, action) => {
      state.originY = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
    setFontWeight: (state, action) => {
      state.fontWeight = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
    setFontStyle: (state, action) => {
      state.fontStyle = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
    setTextAlign: (state, action) => {
      state.textAlign = action.payload.data;
      state.renderObject = action.payload.renderObject;
    },
  }
})

export const { setId, setType, setRotate, setSkewX, setSkewY, setFlipX, setFlipY, setWidth, setHeight, setOpacity, setTextColor, setStroke, setStrokeWidth, setLeft, setTop, setOriginX, setOriginY, setFontFamily, setFontSize, setFontWeight, setFontStyle, setTextAlign } = propertiesValue.actions;
export default propertiesValue.reducer;