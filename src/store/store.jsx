import { configureStore } from '@reduxjs/toolkit';
import tooltipTransformReducer from './components/CanvasEditor/ToolBoxTop/TooltipTransformSlice';
import shapesReducer from './components/Sidebar/ShapesSlice';
import tooltipPositionReducer from './components/CanvasEditor/ToolBoxTop/TooltipPositionSlice';
import addCanvasItemReducer from './components/AddCanvasItemSlice';

const store = configureStore({
  reducer: {
    tooltipTransforms: tooltipTransformReducer,
    shapes: shapesReducer,
    tooltipPosition: tooltipPositionReducer,
    addCanvasItem: addCanvasItemReducer
  },
});

export default store;
