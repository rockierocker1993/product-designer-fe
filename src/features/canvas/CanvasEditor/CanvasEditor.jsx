import ToolboxTop from "./ToolboxTop/ToolboxTop.jsx";
import { useState, useEffect } from "react";
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

  const [designArea, setDesignArea] = useState({});
  
  //const canvasRef = useRef(null)
  const [canvas, setCanvas] = useState(null)
  const [tshirtColor, setTshirtColor] = useState('#ffffff') // Default white
  
  useEffect(() => {
    // Canvas size calculated only on initial load (no resize listener)
    const canvasContainer = document.getElementById('canvasContainer');
    if (!canvasContainer) return;
    
    const rect = canvasContainer.getBoundingClientRect();
    const canvasWidth = rect.width - 40; // Account for 20px padding on each side
    const canvasHeight = rect.height - 40; // Height calculated on initial load only
    
    // Update design area with 3:4 ratio (width 150px)
    const designWidth = 150;
    const designHeight = (designWidth / 3) * 4; // 200px
    const calculatedDesignArea = {
      x: (canvasWidth - designWidth) / 2,
      y: (canvasHeight - designHeight) / 2,
      width: designWidth,
      height: designHeight
    };
    setDesignArea(calculatedDesignArea);
    
    const initCanvas = new fabric.Canvas('canvas', {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: null // Keep canvas transparent
    });
    
    // Create clipPath for objects (not canvas) - this way controls stay visible
    const objectClipPath = new fabric.Rect({
      left: calculatedDesignArea.x-4,
      top: calculatedDesignArea.y,
      width: calculatedDesignArea.width,
      height: calculatedDesignArea.height,
      absolutePositioned: true
    });
    
    // Apply clipPath to new objects when they are added
    initCanvas.on('object:added', function(e) {
      if (e.target && !e.target.clipPath && e.target.type !== 'rect') {
        // Don't clip the design area rectangle itself
        if (e.target.stroke !== '#999' || !e.target.strokeDashArray) {
          e.target.clipPath = objectClipPath;
        }
      }
    });
    
    // Create design area rectangle (clipping area)
    const designAreaRect = new fabric.Rect({
      left: calculatedDesignArea.x-4,
      top: 160,
      width: calculatedDesignArea.width,
      height: calculatedDesignArea.height,
      fill: 'transparent',
      stroke: '#393939ff',
      strokeWidth: 2,
      strokeDashArray: [5, 5],
      selectable: false,
      evented: false,
      excludeFromExport: true
    });
    initCanvas.add(designAreaRect);
    
    // Add ratio text label (3:4) - positioned at top-right corner OUTSIDE design area
    const ratioText = new fabric.Text('ratio = 3:4', {
      fontSize: 12,
      fill: '#666',
      fontFamily: 'Arial',
      selectable: false,
      evented: false,
      excludeFromExport: true
    });
    
    // IMPORTANT: Add text BEFORE applying clipPath logic, and explicitly set NO clipPath
    initCanvas.add(ratioText);
    
    // Position text at top-right corner, outside and above the design area
    const rectLeft = calculatedDesignArea.x - 4;
    const rectTop = calculatedDesignArea.y;
    ratioText.set({
      left: rectLeft + calculatedDesignArea.width - ratioText.width,
      top: 145, // Above the design area, closer to border
      clipPath: null // Explicitly no clipping
    });
    ratioText.setCoords();
    
    initCanvas.renderAll();

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

    // Handle window resize - COMMENTED OUT (causing issues with canvas moving on resize)
    // const handleResize = () => {
    //   const canvasContainer = document.getElementById('canvasContainer');
    //   if (!canvasContainer) return;
    //   
    //   const rect = canvasContainer.getBoundingClientRect();
    //   const newCanvasWidth = rect.width - 40;
    //   const newCanvasHeight = rect.height - 40;
    //   
    //   // Update canvas dimensions
    //   initCanvas.setWidth(newCanvasWidth);
    //   initCanvas.setHeight(newCanvasHeight);
    //   
    //   // Recalculate design area
    //   const designWidth = 150;
    //   const designHeight = (designWidth / 3) * 5;
    //   const newDesignArea = {
    //     x: (newCanvasWidth - designWidth) / 2,
    //     y: (newCanvasHeight - designHeight) / 2,
    //     width: designWidth,
    //     height: designHeight
    //   };
    //   setDesignArea(newDesignArea);
    //   
    //   // Update all objects
    //   const objects = initCanvas.getObjects();
    //   objects.forEach(obj => {
    //     if (obj.stroke === '#999' && obj.strokeDashArray) {
    //       // Update design area rectangle
    //       obj.set({
    //         left: newDesignArea.x,
    //         top: newDesignArea.y
    //       });
    //     } else if (obj.type === 'text' && obj.text === '3:5') {
    //       // Update ratio text
    //       obj.set({
    //         left: newDesignArea.x + newDesignArea.width - obj.width,
    //         top: newDesignArea.y - 20
    //       });
    //     } else if (obj.clipPath) {
    //       // Update clipPath
    //       obj.clipPath.set({
    //         left: newDesignArea.x,
    //         top: newDesignArea.y,
    //         width: newDesignArea.width,
    //         height: newDesignArea.height
    //       });
    //     }
    //   });
    //   
    //   initCanvas.renderAll();
    // };
    // 
    // window.addEventListener('resize', handleResize);

    return () => {
      // window.removeEventListener('resize', handleResize);
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
  
  useEffect(() => {
    if (!canvas) return;
    
    const handleResize = () => {
      const canvasContainer = document.getElementById('canvasContainer');
      if (canvasContainer) {
        const containerWidth = canvasContainer.clientWidth;
        const containerHeight = canvasContainer.clientHeight;
        
        const padding = 20;
        const canvasWidth = containerWidth - padding;
        const canvasHeight = containerHeight - padding;
        
        canvas.setWidth(canvasWidth);
        canvas.setHeight(canvasHeight);
        
        // Update design area with 3:4 ratio (width 150px) centered
        const designWidth = 150;
        const designHeight = (designWidth / 3) * 4; // 200px
        setDesignArea({
          x: (canvasWidth - designWidth) / 2,
          y: (canvasHeight - designHeight) / 2,
          width: designWidth,
          height: designHeight
        });
        
        canvas.renderAll();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [canvas]);

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
    movePositionSelectedObject(canvas, designArea, positionCode);
  }
  //end of callback function list

  //redux list action handlers
  const canvasItem = useSelector((state) => state.addCanvasItem.canvasItem);
  useEffect(() => {
    if (!canvas || !canvasItem) return;
    
    createShape(canvas, canvasItem, {
      // Position shapes in center of design area
      left: designArea.x + (designArea.width / 2),
      top: designArea.y + (designArea.height / 2),
      originX: 'center',
      originY: 'center'
    });
    dispatch(breakStateAddShapesItem());
  }, [canvasItem]);

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
      <div className="canvas-tshirt-wrapper" style={{ display: 'inline-block', position: 'relative' }}>
        <div className="tshirt-layer">
          <img 
            src="/tshirtfront.png" 
            alt="T-shirt" 
            className="tshirt-background"
          />
          {tshirtColor !== '#ffffff' && (
            <div 
              className="tshirt-color-overlay"
              style={{ 
                backgroundColor: tshirtColor,
                '--mask-image': 'url(/tshirtfront.png)'
              }}
            />
          )}
        </div>
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