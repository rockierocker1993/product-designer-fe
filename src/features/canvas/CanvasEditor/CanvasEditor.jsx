import ToolboxTop from "./ToolboxTop/ToolboxTop.jsx";
import { useState, useEffect, useRef } from "react";
import '../../../assets/css/canvas-editor.css';
import { fabric } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { breakStateAddShapesItem } from "../../../store/components/AddCanvasItemSlice";
import { setFlipX, setFlipY, setRotate, setSkewX, setSkewY } from "../../../store/components/CanvasEditor/ToolBoxTop/TooltipTransformSlice.jsx";
import { lockObject, unlockObject } from "../../../store/components/CanvasEditor/ToolBoxTop/TooltipPositionSlice.jsx";
import { createShape } from "./factory/ShapesFactory.jsx";
import {
  transformSelectedObject,
  lockUnlockSelectedObject,
  movePositionSelectedObject,
  handleObjectSelection,
  getColorFilter
} from "./canvasUtils.js";
import { customTransformControl, setupControlsVisibility } from "./customControls.js";
import { handleDragOver, handleDragLeave, handleDrop } from "./dragDropHandlers.js";
import ZoomControl from "./ZoomControl.jsx";
// import { 
//   initializeDesignAreaRatio
// } from "./designAreaConfigRatio.js";
import {
  initializeFullFillArea
} from "./designAreaConfigFullFill.js";
import tshirtImage from "../../../assets/images/tshirtfront.png";
import { initializeDesignAreaRatio } from "./designAreaConfigRatio.js";

const CanvasEditor = () => {
  const designType = "ratio";


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

  //const canvasRef = useRef(null)
  const designAreaObjsRef = useRef(null);
  const [canvas, setCanvas] = useState(null)
  const [tshirtColor, setTshirtColor] = useState('#ffffff') // Default white

  useEffect(() => {
    // Canvas size calculated only on initial load (no resize listener)
    const canvasContainer = document.getElementById('canvasContainer');
    if (!canvasContainer) return;

    const canvasWidth = 1400;
    const canvasHeight = 400;

    const initCanvas = new fabric.Canvas('canvas', {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: null // Keep canvas transparent
    });

    // for design area full fill area calculation
    if (designType === "full-fill") {
      fabric.Image.fromURL(tshirtImage, (img) => {
        img.set({
          left: canvasWidth / 2,
          top: canvasHeight / 2,
          originX: 'center',
          originY: 'center',
          selectable: false,
          evented: false,
          id: 'tshirt-image'
        });

        // Scale image to fit canvas
        const scale = Math.min(
          (canvasWidth * 0.8) / img.width,
          (canvasHeight * 0.8) / img.height
        );
        img.scale(scale);

        initCanvas.add(img);
        initCanvas.sendToBack(img);

        // Initialize full fill area using t-shirt image
        const designAreaObjs = initializeFullFillArea(initCanvas, img);
        designAreaObjsRef.current = designAreaObjs;

        initCanvas.renderAll();
      });
    }
    // for design area ratio initialization
    else {
      const designAreaObjs = initializeDesignAreaRatio(initCanvas);
      initCanvas.renderAll();
    }

    const handleObjectSelected = () => {
      const selected = initCanvas.getActiveObject();
      onObjectSelected(selected);
    };

    const handleObjectRotating = (e) => {
      const obj = e.target;
      if (obj) {
        const currentRotate = parseInt(obj.angle);
        dispatch(setRotate(currentRotate));
      }
    };

    const handleObjectScaling = (e) => {
      const obj = e.target;
      if (obj) {
        console.log('Object scaling:', obj.scaleX, obj.scaleY);
      }
    };

    const handleObjectModified = (e) => {
      const obj = e.target;
      if (obj) {
        const currentRotate = parseInt(obj.angle);
        const currentSkewX = obj.skewX;
        const currentSkewY = obj.skewY;
        const currentFlipX = obj.flipX;
        const currentFlipY = obj.flipY;

        dispatch(setRotate(currentRotate));
        dispatch(setSkewX(currentSkewX));
        dispatch(setSkewY(currentSkewY));
        dispatch(setFlipX(currentFlipX));
        dispatch(setFlipY(currentFlipY));
      }
    };

    initCanvas.on('selection:created', handleObjectSelected);
    initCanvas.on('selection:updated', handleObjectSelected);
    initCanvas.on('object:selected', handleObjectSelected);
    initCanvas.on('object:rotating', handleObjectRotating);
    initCanvas.on('object:scaling', handleObjectScaling);
    initCanvas.on('object:modified', handleObjectModified);

    customTransformControl();
    setupControlsVisibility();
    fabric.Object.prototype.set({
      transparentCorners: false,
      cornerColor: 'transparent',
      borderColor: 'transparent',
    });

    setCanvas(initCanvas);

    return () => {
      if (designAreaObjsRef.current && designAreaObjsRef.current.cleanup) {
        designAreaObjsRef.current.cleanup();
      }
      initCanvas.off('selection:created', handleObjectSelected);
      initCanvas.off('selection:updated', handleObjectSelected);
      initCanvas.off('object:selected', handleObjectSelected);
      initCanvas.off('object:rotating', handleObjectRotating);
      initCanvas.off('object:scaling', handleObjectScaling);
      initCanvas.off('object:modified', handleObjectModified);
      initCanvas.off('after:render');
      initCanvas.dispose();
    };
  }, []);

  const onObjectSelected = (activeObject) => {
    if (activeObject) {
      handleObjectSelection(activeObject, dispatch, {
        setRotate,
        setSkewY,
        setSkewX,
        setFlipY,
        setFlipX,
        lockObject,
        unlockObject
      });
    }
  };

  //callback function list
  const onTransform = () => {
    transformSelectedObject(canvas, { rotate, skewX, skewY, flipX, flipY });
  }

  const onPosition = (positionCode) => {
    // Use appropriate area based on design type
    const area = designType === "full-fill" ? canvas?.fullFillArea : canvas?.designArea;
    if (!area) return;
    movePositionSelectedObject(canvas, area, positionCode);
  }
  //end of callback function list

  //redux list action handlers
  const canvasItem = useSelector((state) => state.addCanvasItem.canvasItem);
  useEffect(() => {
    if (!canvas || !canvasItem) return;
    
    // Use appropriate area based on design type
    const area = designType === "full-fill" ? canvas.fullFillArea : canvas.designArea;
    if (!area) return;

    createShape(canvas, canvasItem, {
      // Position shapes in center of design area
      left: area.x + (area.width / 2),
      top: area.y + (area.height / 2),
      originX: 'center',
      originY: 'center'
    });
    dispatch(breakStateAddShapesItem());
  }, [canvasItem, canvas]);

  useEffect(() => {
    if (canvas) {
      lockUnlockSelectedObject(canvas, isLockObject);
    }
  }, [isLockObject, canvas]);

  // Handle zoom level changes
  return <div className="col column bg-light canvas-editor" id="canvasEditor">
    <ToolboxTop
      onTransform={onTransform}
      onPosition={onPosition}
    ></ToolboxTop>
    <div
      className="canvas-container"
      id="canvasContainer"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, canvas)}
    >

      <div className="canvas-wrapper" style={{ display: 'inline-block', position: 'relative' }}>
        {designType === "ratio" && (
          <div className="tshirt-layer">
            <img
              src={tshirtImage}
              alt="T-shirt"
              className="tshirt-background"
            />
            {tshirtColor !== '#ffffff' && (
              <div
                className="tshirt-color-overlay"
                style={{
                  backgroundColor: tshirtColor,
                  '--mask-image': `url(${tshirtImage})`
                }}
              />
            )}
          </div>
        )}
        <canvas id="canvas"></canvas>
      </div>
      {/* Zoom Control Component */}
      {canvas && <ZoomControl canvas={canvas} />}

      {/* Color picker for testing - nanti bisa dipindah ke UI/Settings */}
      <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000, background: 'white', padding: '10px', borderRadius: '5px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px' }}>T-Shirt Color:</label>
        <input
          type="color"
          value={tshirtColor}
          onChange={(e) => setTshirtColor(e.target.value)}
        />
      </div>
    </div>
  </div>
};

export default CanvasEditor;