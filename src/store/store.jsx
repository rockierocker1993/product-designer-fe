import { configureStore } from '@reduxjs/toolkit';
import addCanvasItemReducer from './CanvasAddItem';
import propertiesValueReducer from './PropertiesValue';
import objectAligmentReducer from './ObjectAlignment';


const store = configureStore({
  reducer: {
    addCanvasItem: addCanvasItemReducer,
    propertiesValue: propertiesValueReducer,
    objectAligment: objectAligmentReducer,
  },
});

export default store;
