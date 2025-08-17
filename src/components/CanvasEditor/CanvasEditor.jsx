import ToolboxTop from "./ToolboxTop/ToolboxTop.jsx";
import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import '../../assets/css/canvas-editor.css';
import { fabric } from "fabric";
import Settings from './Settings.jsx';
import { Button, IconButton } from "blocksin-system";
import { useDispatch, useSelector } from "react-redux";
import { breakStateAddCanvasItem } from "../../store/components/AddCanvasItemSlice";
import {
  CENTER_VERTICAL, CENTER_HORIZONTAL,
  TOP_LEFT, TOP_RIGHT, TOP_CENTER,
  MIDDLE_LEFT, MIDDLE_CENTER, MIDDLE_RIGHT,
  BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT
} from "../../constant";
import { setFlipX, setFlipY, setRotate, setSkewX, setSkewY } from "../../store/components/CanvasEditor/ToolBoxTop/TooltipTransformSlice.jsx";
import { height, width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { TABLER_ICONS, renderTablerSvgIcon } from "../../IconConstant.jsx";

const CanvasEditor = () => {


  const dispatch = useDispatch()
  //transform redux state
  const rotate = useSelector((state) => state.tooltipTransforms.rotate);
  const skewX = useSelector((state) => state.tooltipTransforms.skewX);
  const skewY = useSelector((state) => state.tooltipTransforms.skewY);
  const flipX = useSelector((state) => state.tooltipTransforms.flipX);
  const flipY = useSelector((state) => state.tooltipTransforms.flipY);
  //end of transform redux state

  //position redux state
  const isLockObject = useSelector((state) => state.tooltipPosition.isLockObject);
  //end of position redux state

  const designArea = {
    x: 10,
    y: 10,
    width: 480,
    height: 480
  }
  const defaultShapeConfig = {
    top: 100,
    left: 50,
    height: 60,
    width: 100,
    fill: "#084D42"
  };
  //const canvasRef = useRef(null)
  const [canvas, setCanvas] = useState(null)
  useEffect(() => {
    //if (canvasRef.current) {
    const initCanvas = new fabric.Canvas('canvas', {
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

    customTransformControl();
    fabric.Object.prototype.set({
      transparentCorners: false,
      cornerColor: 'transparent',  // kotak jadi hilang
      //cornerStrokeColor: 'transparent',
      borderColor: 'transparent',
      //hasControls: false           // semua transform (resize/rotate) hilang
    });
    fabric.Object.prototype.setControlsVisibility({
      mt: false,
      mb: false,
      ml: false,
      mr: false,
      tl: false,
      tr: false,
      bl: false,
      br: false,
      mtr: false
    });
    return () => {
      initCanvas.off('selection:created', handleObjectSelected);
      initCanvas.off('selection:updated', handleObjectSelected);
      initCanvas.off('object:selected', handleObjectSelected);
      initCanvas.dispose();
    };
    //}
  }, []);

  const onObjectSelected = (activeObject) => {

    if (activeObject) {

      //update redux state with selected object
      const activeRotate = parseInt(activeObject.toggle().angle);
      const activeSkewY = activeObject.toggle().skewY;
      const activeSkewX = activeObject.toggle().skewX;
      const activeFilpY = activeObject.toggle().flipY;
      const activeFilpX = activeObject.toggle().flipX;
      dispatch(setRotate(activeRotate));
      dispatch(setSkewY(activeSkewY));
      dispatch(setSkewX(activeSkewX));
      dispatch(setFlipY(activeFilpY));
      dispatch(setFlipX(activeFilpX));

    }
  };

  const transformSelectedObject = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
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

  /* Sembunyikan control handle resize & rotate
object.setControlsVisibility({
  mt: false, // middle top
  mb: false, // middle bottom
  ml: false, // middle left
  mr: false, // middle right
  tl: false, // top left
  tr: false, // top right
  bl: false, // bottom left
  br: false, // bottom right
  mtr: false // rotation control
});*/

  const lockUnlockSelectedObject = (isLocked) => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.lockMovementX = isLocked;
        activeObject.lockMovementY = isLocked;
        activeObject.lockScalingX = isLocked;
        activeObject.lockScalingY = isLocked;
        activeObject.lockRotation = isLocked;
        canvas.renderAll();
      }
    }
  }

  const movePositionSelectedObject = (positionCode) => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      switch (positionCode) {
        case CENTER_VERTICAL:
          activeObject.top = (designArea.y + (designArea.height / 2)) - (activeObject.getScaledHeight() / 2);
          break;
        case CENTER_HORIZONTAL:
          activeObject.left = (designArea.x + (designArea.width / 2)) - (activeObject.getScaledWidth() / 2);
          break;
        case TOP_LEFT:
          activeObject.left = designArea.x;
          activeObject.top = designArea.y;
          break;
        case TOP_CENTER:
          activeObject.top = designArea.y;
          activeObject.left = (designArea.x + (designArea.width / 2)) - (activeObject.getScaledWidth() / 2);
          break;
        case TOP_RIGHT:
          activeObject.top = designArea.y;
          activeObject.left = designArea.x + designArea.width - activeObject.getScaledWidth();
          break;
        case MIDDLE_LEFT:
          activeObject.top = (designArea.y + (designArea.height / 2)) - (activeObject.getScaledHeight() / 2);
          activeObject.left = designArea.x;
          break;
        case MIDDLE_CENTER:
          activeObject.top = (designArea.y + (designArea.height / 2)) - (activeObject.getScaledHeight() / 2);
          activeObject.left = (designArea.x + (designArea.width / 2)) - (activeObject.getScaledWidth() / 2);
          break;
        case MIDDLE_RIGHT:
          activeObject.top = (designArea.y + (designArea.height / 2)) - (activeObject.getScaledHeight() / 2);
          activeObject.left = designArea.x + designArea.width - activeObject.getScaledWidth();
          break;
        case BOTTOM_LEFT:
          activeObject.top = designArea.y + designArea.height - activeObject.getScaledHeight();
          activeObject.left = designArea.x;
          break;
        case BOTTOM_CENTER:
          activeObject.top = designArea.y + designArea.height - activeObject.getScaledHeight();
          activeObject.left = (designArea.x + (designArea.width / 2)) - (activeObject.getScaledWidth() / 2);
          break;
        case BOTTOM_RIGHT:
          activeObject.top = designArea.y + designArea.height - activeObject.getScaledHeight();
          activeObject.left = designArea.x + designArea.width - activeObject.getScaledWidth();
          break;
        default:
          break;
      }
      activeObject.setCoords();
      canvas.renderAll();
    }
  }

  const iconCache = {};

  function renderTransformControlIcon(svgString, prop) {
    if (!iconCache[svgString]) {
      const tablerIcon = renderTablerSvgIcon(svgString, prop);
      const svg = new Blob([tablerIcon], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svg);

      const img = new Image();
      img.src = url;
      iconCache[svgString] = img;
    }

    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      const img = iconCache[svgString];
      if (!img.complete) return; // tunggu load

      ctx.save();

      // pastikan ukuran tetap, tidak ikut scale/zoom object
      const zoom = fabricObject.canvas.getZoom();
      ctx.translate(left, top);
      ctx.scale(1 / zoom, 1 / zoom);

      ctx.drawImage(img, -prop.size / 2, -prop.size / 2, prop.size, prop.size);

      ctx.restore();
    };
  }

  function customTransformControl() {
  // DELETE
  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: -0.5, y: -0.5,
    cursorStyle: "pointer",
    mouseUpHandler: (evt, transform) => {
      const target = transform.target;
      target.canvas.remove(target);
      target.canvas.requestRenderAll();
    },
    render: renderTransformControlIcon(TABLER_ICONS.DELETE, { size: 24, color: 'black' }),
    cornerSize: 30
  });

  // DUPLICATE
  fabric.Object.prototype.controls.duplicateControl = new fabric.Control({
    x: -0.5, y: 0.5,
    cursorStyle: 'pointer',
    mouseUpHandler: (evt, transform) => {
      const target = transform.target;
      target.clone(clone => {
        clone.set({ left: target.left + 20, top: target.top + 20 });
        target.canvas.add(clone);
        target.canvas.setActiveObject(clone);
      });
    },
    render: renderTransformControlIcon(TABLER_ICONS.DUPLICATE, { size: 24, color: 'black' }),
    cornerSize: 30
  });

  // ROTATE
  fabric.Object.prototype.controls.rotateCustom = new fabric.Control({
    x: 0.5, y: -0.5,
    cursorStyle: 'crosshair',
    actionHandler: fabric.controlsUtils.rotationWithSnapping,
    actionName: 'rotate',
    render: renderTransformControlIcon(TABLER_ICONS.ROTATE, { size: 24, color: 'black' }),
    cornerSize: 30
  });

  // RESIZE (satu-satunya)
  fabric.Object.prototype.controls.customResize = new fabric.Control({
    x: 0.5, y: 0.5,
    cursorStyle: 'se-resize',
    actionHandler: fabric.controlsUtils.scalingEqually,
    actionName: 'resize',
    render: renderTransformControlIcon(TABLER_ICONS.RESIZE, { size: 24, color: 'black' }),
    cornerSize: 30
  });
}




  const addRectangleShape = () => {
    const rect = new fabric.Rect(defaultShapeConfig)
    //rect.setControlVisible('mtr', false);
    canvas.add(rect);
  }

  //callback function list
  const onTransform = () => {
    transformSelectedObject();
  }

  const onPosition = (positionCode) => {
    movePositionSelectedObject(positionCode);
  }
  //end of callback function list

  //redux list action handlers
  const canvasItem = useSelector((state) => state.addCanvasItem.canvasItem);
  useEffect(() => {
    if (canvasItem === 'rectangle') {
      addRectangleShape();
    }
    dispatch(breakStateAddCanvasItem());
  }, [canvasItem]);

  useEffect(() => {
    lockUnlockSelectedObject(isLockObject)
  }, [isLockObject]);

  return <div className="col column bg-light canvas-editor" id="canvasEditor">
    <ToolboxTop
      onTransform={onTransform}
      onPosition={onPosition}
    ></ToolboxTop>
    <div className="canvas-container" id="canvasContainer">
      <span>{rotate}</span>
      <canvas id="canvas" ></canvas>
    </div>
  </div>
};

export default CanvasEditor;