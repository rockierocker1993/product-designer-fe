import { configureStore } from '@reduxjs/toolkit';
import tooltipTransformReducer from './components/CanvasEditor/ToolBoxTop/TooltipTransformSlice';
import shapesReducer from './components/Sidebar/ShapesSlice';

const store = configureStore({
  reducer: {
    tooltipTransforms: tooltipTransformReducer,
    shapes: shapesReducer
  },
});

export default store;
