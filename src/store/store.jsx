import { configureStore } from '@reduxjs/toolkit';
import addCanvasItemReducer from './CanvasAddItem';
import objectTransformReducer from './ObjectTransform';
import objectAligmentReducer from './ObjectAlignment';


const store = configureStore({
  reducer: {
    addCanvasItem: addCanvasItemReducer,
    objectTransform: objectTransformReducer,
    objectAligment: objectAligmentReducer,
  },
});

export default store;
