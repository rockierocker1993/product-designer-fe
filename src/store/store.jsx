import { configureStore } from '@reduxjs/toolkit';
import tooltipTransformReducer from './components/CanvasEditor/ToolBoxTop/TooltipTransformSlice';
import shapesReducer from './components/Sidebar/ShapesSlice';
import tooltipPositionReducer from './components/CanvasEditor/ToolBoxTop/TooltipPositionSlice';

const store = configureStore({
  reducer: {
    tooltipTransforms: tooltipTransformReducer,
    shapes: shapesReducer,
    tooltipPosition: tooltipPositionReducer
  },
});

export default store;
