import { createSlice } from "@reduxjs/toolkit";

const addCanvasItem = createSlice({
    name: 'addCanvasItem',
    initialState: {
        canvasItem: {
            type : null,
            data : null
        }
    },
    reducers: {
        addShape: (state, action) => {
            state.canvasItem = action.payload;
        },
        addImage: (state, action) => {
            state.canvasItem = action.payload;
        },
        addText: (state, action) => {
            state.canvasItem = action.payload;
        },
        addTemplate: (state, action) => {
            state.canvasItem = action.payload;
        },
        addClipart: (state, action) => {
            state.canvasItem = action.payload;
        },
        breakStateAddShape: (state) => {
            state.canvasItem = {
                type: null,
                data: null
            };
        },
    }
})

export const {
    addShape,
    addImage,
    addText,
    addTemplate,
    addClipart,
    breakStateAddShape
} = addCanvasItem.actions;

export default addCanvasItem.reducer;