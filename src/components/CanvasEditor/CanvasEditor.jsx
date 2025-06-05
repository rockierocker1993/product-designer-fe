import ToolboxTop from "./ToolboxTop/ToolboxTop.jsx";
import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import '../../assets/css/canvas-editor.css';
import { Canvas, Rect } from "fabric";
import Settings from './Settings.jsx';
import { Button, IconButton } from "blocksin-system";
import { useDispatch, useSelector } from "react-redux";
import { resetStateAddShapes } from "../../store/components/Sidebar/ShapesSlice";
import {
  centerVertical, resetCenterVertical, centerHorizontal, resetCenterHorizontal,
  topLeft, resetTopLeft, topRight, resetTopright, topCenter, resetTopCenter,
  middleLeft, resetMiddleLeft, middleRight, resetMiddleRight, middleCenter, resetMiddleCenter, 
  bottomLeft, resetBottomLeft, bottomRight, resetBottomRight, bottomCenter, resetBottomCenter, 
  lockObject, unlockObject
} from '../../store/components/CanvasEditor/ToolBoxTop/TooltipPositionSlice.jsx'

const CanvasEditor = () => {

  const dispatch = useDispatch()
  const rotate = useSelector((state) => state.tooltipTransforms.rotate);
  const skewX = useSelector((state) => state.tooltipTransforms.skewX);
  const skewY = useSelector((state) => state.tooltipTransforms.skewY);
  const flipX = useSelector((state) => state.tooltipTransforms.flipX);
  const flipY = useSelector((state) => state.tooltipTransforms.flipY);

  const addShapes = useSelector((state) => state.shapes.addShapes);

  const centerVertical = useSelector((state) => state.tooltipPosition.centerVertical);
  const centerHorizontal = useSelector((state) => state.tooltipPosition.centerHorizontal);
  const topLeft = useSelector((state) => state.tooltipPosition.topLeft);
  const topRight = useSelector((state) => state.tooltipPosition.topRight);
  const topCenter = useSelector((state) => state.tooltipPosition.topCenter);
  const middleLeft = useSelector((state) => state.tooltipPosition.middleLeft);
  const middleRight = useSelector((state) => state.tooltipPosition.middleRight);
  const middleCenter = useSelector((state) => state.tooltipPosition.middleCenter);
  const bottomLeft = useSelector((state) => state.tooltipPosition.bottomLeft);
  const bottomRight = useSelector((state) => state.tooltipPosition.bottomRight);
  const isLockObject = useSelector((state) => state.tooltipPosition.isLockObject);

  const defaultShapeConfig = {
    top: 100,
    left: 50,
    height: 60,
    width: 100,
    fill: "#084D42"
  };
  const canvasRef = useRef(null)
  const [canvas, setCanvas] = useState(null)

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 500,
        height: 500
      });

      initCanvas.backgroundColor = "#fff";
      initCanvas.renderAll();

      setCanvas(initCanvas);
      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (addShapes === 'rect') {
      const rect = new Rect(defaultShapeConfig)
      canvas.add(rect);
      dispatch(resetStateAddShapes());
    }
  }, [addShapes]);

  return <div className="col column bg-light canvas-editor" id="canvasEditor">
    <ToolboxTop></ToolboxTop>
    <div className="canvas-container" id="canvasContainer">
      <span>{rotate}</span>
      <canvas id="canvas" ref={canvasRef}></canvas>
    </div>
  </div>
};

export default CanvasEditor;