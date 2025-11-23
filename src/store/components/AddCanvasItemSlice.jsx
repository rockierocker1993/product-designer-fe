import { createSlice } from "@reduxjs/toolkit";

const addCanvasItemSlice = createSlice({
    name: 'addCanvasItem',
    initialState: { canvasItem: null },
    reducers: {
        addShapesItem: (state, action) => {
            state.canvasItem = action.payload;
        },
        addProductItem: (state, action) => {
            state.canvasItem = action.payload;
        },
        addImageItem: (state, action) => {
            state.canvasItem = action.payload;
        },
        addTextItem: (state, action) => {
            state.canvasItem = action.payload;
        },
        addTemplateItem: (state, action) => {
            state.canvasItem = action.payload;
        },
        addClipartItem: (state, action) => {
            state.canvasItem = action.payload;
        },
        breakStateAddShapesItem: (state) => {
            state.canvasItem = null;
        },
    }
})

export const { 
    addShapesItem, 
    addProductItem,
    addImageItem,
    addTextItem,
    addTemplateItem,
    addClipartItem,
    breakStateAddShapesItem 
} = addCanvasItemSlice.actions;

export default addCanvasItemSlice.reducer;