import ToolboxTop from "./ToolboxTop/ToolboxTop.jsx";
import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import '../../assets/css/canvas-editor.css';
import { Canvas, Rect } from "fabric";
import Settings from './Settings.jsx';
import { Button, IconButton } from "blocksin-system";
import { useDispatch, useSelector } from "react-redux";
import { breakStateAddCanvasItem } from "../../store/components/AddCanvasItemSlice";
import {
  moveToCenterVertical, resetCenterVertical, moveToCenterHorizontal, resetCenterHorizontal,
  moveToTopLeft, resetTopLeft, moveToTopRight, resetTopright, moveToTopCenter, resetTopCenter,
  moveToMiddleLeft, resetMiddleLeft, moveToMiddleRight, resetMiddleRight, moveToMiddleCenter, resetMiddleCenter,
  moveToBottomLeft, resetBottomLeft, moveToBottomRight, resetBottomRight, moveToBottomCenter, resetBottomCenter,
  lockObject, unlockObject
} from '../../store/components/CanvasEditor/ToolBoxTop/TooltipPositionSlice.jsx'
import { setFlipX, setFlipY, setRotate, setSkewX, setSkewY } from "../../store/components/CanvasEditor/ToolBoxTop/TooltipTransformSlice.jsx";

const CanvasEditor = () => {

  const dispatch = useDispatch()
  //transform redux state
  const rotate = useSelector((state) => state.tooltipTransforms.rotate);
  const skewX = useSelector((state) => state.tooltipTransforms.skewX);
  const skewY = useSelector((state) => state.tooltipTransforms.skewY);
  const flipX = useSelector((state) => state.tooltipTransforms.flipX);
  const flipY = useSelector((state) => state.tooltipTransforms.flipY);


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
      const handleObjectSelected = () => {
        const selected = initCanvas.getActiveObject();
        onObjectSelected(selected);
      };
      initCanvas.on('selection:created', handleObjectSelected);
      initCanvas.on('selection:updated', handleObjectSelected);
      initCanvas.on('object:selected', handleObjectSelected);
      
      setCanvas(initCanvas);

      return () => {
        initCanvas.off('selection:created', handleObjectSelected);
        initCanvas.off('selection:updated', handleObjectSelected);
        initCanvas.off('object:selected', handleObjectSelected);
        initCanvas.dispose();
      };
    }
  }, []);

  const onObjectSelected = (activeObject) => {
    if (activeObject) {
      //update redux state with selected object
      
      const activeRotate = parseInt(activeObject.toggle().angle);
      const activeSkewY = activeObject.toggle().skewY;
      const activeSkewX = activeObject.toggle().skewX;
      const activeFilpY = activeObject.toggle().flipY;
      const activeFilpX = activeObject.toggle().flipX;
      console.log(activeRotate)
      dispatch(setRotate(activeRotate));
      dispatch(setSkewY(activeSkewY));
      dispatch(setSkewX(activeSkewX));
      dispatch(setFlipY(activeFilpY));
      dispatch(setFlipX(activeFilpX));
    }
  };

  const transformSelectedObject = () => {
    console.log(flipX,"test")
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        console.log(flipX,"sa")
        activeObject.set('skewX', skewX);
        activeObject.set('skewY', skewY);
        activeObject.set('flipX', flipX);
        activeObject.set('flipY', flipY);
        activeObject.rotate(rotate);
        activeObject.setCoords();
        canvas.requestRenderAll();
      }
    }
  }

  const addRectangleShape = () => {
    const rect = new Rect(defaultShapeConfig)
    canvas.add(rect);
  }

  //callback function list
  const onTransform = () => {
    transformSelectedObject();
  }

  //redux list action handlers
  const canvasItem = useSelector((state) => state.addCanvasItem.canvasItem);
  useEffect(() => {
    if (canvasItem === 'rectangle') {
      addRectangleShape();
    }
    dispatch(breakStateAddCanvasItem());
  }, [canvasItem]);

  return <div className="col column bg-light canvas-editor" id="canvasEditor">
    <ToolboxTop
      onTransform={onTransform}
    ></ToolboxTop>
    <div className="canvas-container" id="canvasContainer">
      <span>{rotate}</span>
      <canvas id="canvas" ref={canvasRef}></canvas>
    </div>
  </div>
};

export default CanvasEditor;