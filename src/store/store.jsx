import { configureStore } from '@reduxjs/toolkit';
import addCanvasItemReducer from './CanvasAddItem';

const store = configureStore({
  reducer: {
    addCanvasItem: addCanvasItemReducer
  },
});

export default store;
