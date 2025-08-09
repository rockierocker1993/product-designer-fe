import { createSlice } from "@reduxjs/toolkit";

const addCanvasItemSlice = createSlice({
    name: 'addCanvasItem',
    initialState: { canvasItem: null },
    reducers: {
        addCanvasItem: (state, action) => {
            state.canvasItem = action.payload;
        },
        breakStateAddCanvasItem: (state) => {
            state.canvasItem = null;
        },
    }
})

export const { addCanvasItem, breakStateAddCanvasItem } = addCanvasItemSlice.actions;
export default addCanvasItemSlice.reducer;