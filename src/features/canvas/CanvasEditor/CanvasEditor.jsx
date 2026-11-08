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
} from "./canvasUtils.js";
import { customTransformControl, setupControlsVisibility } from "./customControls.js";
import { handleDragOver, handleDragLeave, handleDrop } from "./dragDropHandlers.js";
import ZoomControl from "./ZoomControl.jsx";
import tshirtImage from "../../../assets/images/tshirtfront.png";
import { initializeDesignAreaRatio } from "./designAreaConfigRatio.js";
import { CanvasStage, EditorTopbar, EditorPropertiesPanel } from "./components";
import { DEFAULT_PROJECT_NAME } from "./config/editorUiConfig";

const CanvasEditor = () => {
  const dispatch = useDispatch();

  // transform redux state
  const rotate = useSelector((state) => state.tooltipTransforms.rotate);
  const skewX  = useSelector((state) => state.tooltipTransforms.skewX);
  const skewY  = useSelector((state) => state.tooltipTransforms.skewY);
  const flipX  = useSelector((state) => state.tooltipTransforms.flipX);
  const flipY  = useSelector((state) => state.tooltipTransforms.flipY);

  // position redux state
  const isLockObject = useSelector((state) => state.tooltipPosition.isLockObject);

  const designAreaObjsRef = useRef(null);
  const isPanningRef      = useRef(false);
  const panStartRef       = useRef(null);
  const [canvas, setCanvas]         = useState(null);
  const [tshirtColor, setTshirtColor] = useState('#ffffff');

  useEffect(() => {
    const canvasArea = document.getElementById('canvasArea');
    if (!canvasArea) return;

    // Canvas fills the full canvas-area container
    const canvasWidth  = canvasArea.clientWidth;
    const canvasHeight = canvasArea.clientHeight;

    const initCanvas = new fabric.Canvas('canvas', {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: null,
    });

    // ── T-shirt background: non-interactive Fabric image, centred ──────────
    fabric.Image.fromURL(tshirtImage, (img) => {
      const scale = Math.min(
        (canvasHeight * 0.85) / img.height,
        (canvasWidth  * 0.40) / img.width,
      );
      img.set({
        left:       canvasWidth  / 2,
        top:        canvasHeight / 2,
        originX:    'center',
        originY:    'center',
        scaleX:     scale,
        scaleY:     scale,
        selectable:     false,
        evented:        false,
        lockMovementX:  true,
        lockMovementY:  true,
        lockScalingX:   true,
        lockScalingY:   true,
        lockRotation:   true,
        hasControls:    false,
        hasBorders:     false,
        excludeFromExport: true,
        id: 'tshirt-background',
      });
      initCanvas.add(img);
      initCanvas.sendToBack(img);

      // Design area is calculated after canvas & t-shirt dimensions are known
      const designAreaObjs = initializeDesignAreaRatio(initCanvas);
      designAreaObjsRef.current = designAreaObjs;

      initCanvas.renderAll();
    });

    // ── Object event handlers ──────────────────────────────────────────────
    const handleObjectSelected = () => {
      onObjectSelected(initCanvas.getActiveObject());
    };
    const handleObjectRotating = (e) => {
      if (e.target) dispatch(setRotate(parseInt(e.target.angle)));
    };
    const handleObjectScaling = (e) => {
      if (e.target) console.log('scaling:', e.target.scaleX, e.target.scaleY);
    };
    const handleObjectModified = (e) => {
      if (!e.target) return;
      dispatch(setRotate(parseInt(e.target.angle)));
      dispatch(setSkewX(e.target.skewX));
      dispatch(setSkewY(e.target.skewY));
      dispatch(setFlipX(e.target.flipX));
      dispatch(setFlipY(e.target.flipY));
    };

    initCanvas.on('selection:created',  handleObjectSelected);
    initCanvas.on('selection:updated',  handleObjectSelected);
    initCanvas.on('object:selected',    handleObjectSelected);
    initCanvas.on('object:rotating',    handleObjectRotating);
    initCanvas.on('object:scaling',     handleObjectScaling);
    initCanvas.on('object:modified',    handleObjectModified);

    // ── Grab cursor + viewport pan on empty canvas ─────────────────────────
    initCanvas.defaultCursor = 'grab';

    const resetPan = () => {
      if (isPanningRef.current) {
        initCanvas.selection    = true;
        initCanvas.defaultCursor = 'grab';
      }
      isPanningRef.current = false;
      panStartRef.current  = null;
    };

    const handleCanvasPanStart = (opt) => {
      if (opt.target) return;              // clicked on an object — don't pan
      isPanningRef.current = true;
      panStartRef.current  = { x: opt.e.clientX, y: opt.e.clientY };
      initCanvas.selection    = false;     // stop Fabric drawing a selection rect
      initCanvas.defaultCursor = 'grabbing';
      initCanvas.setCursor('grabbing');
    };

    const handleCanvasPanMove = (opt) => {
      if (!isPanningRef.current || !panStartRef.current) return;
      // If the mouse button was released outside the canvas, Fabric's mouse:up
      // never fires — detect it here and stop panning immediately.
      if (opt.e.buttons === 0) {
        resetPan();
        return;
      }
      const dx = opt.e.clientX - panStartRef.current.x;
      const dy = opt.e.clientY - panStartRef.current.y;
      // relativePan → absolutePan → setViewportTransform, which calls
      // setCoords() on every object so hit-detection coords stay in sync
      // with the new visual position. Direct vpt mutation skips setCoords
      // and is the root cause of the "can't click shape after pan" bug.
      initCanvas.relativePan(new fabric.Point(dx, dy));
      panStartRef.current = { x: opt.e.clientX, y: opt.e.clientY };
    };

    const handleCanvasPanEnd = () => resetPan();

    // Catch mouse-up outside the canvas so pan state never gets stuck
    const handleWindowMouseUp = () => resetPan();
    window.addEventListener('mouseup', handleWindowMouseUp);

    initCanvas.on('mouse:down', handleCanvasPanStart);
    initCanvas.on('mouse:move', handleCanvasPanMove);
    initCanvas.on('mouse:up',   handleCanvasPanEnd);

    customTransformControl();
    setupControlsVisibility();
    fabric.Object.prototype.set({
      transparentCorners: false,
      cornerColor:  'transparent',
      borderColor:  'transparent',
    });

    setCanvas(initCanvas);

    return () => {
      window.removeEventListener('mouseup', handleWindowMouseUp);
      if (designAreaObjsRef.current?.cleanup) designAreaObjsRef.current.cleanup();
      initCanvas.off('selection:created',  handleObjectSelected);
      initCanvas.off('selection:updated',  handleObjectSelected);
      initCanvas.off('object:selected',    handleObjectSelected);
      initCanvas.off('object:rotating',    handleObjectRotating);
      initCanvas.off('object:scaling',     handleObjectScaling);
      initCanvas.off('object:modified',    handleObjectModified);
      initCanvas.off('mouse:down', handleCanvasPanStart);
      initCanvas.off('mouse:move', handleCanvasPanMove);
      initCanvas.off('mouse:up',   handleCanvasPanEnd);
      initCanvas.off('after:render');
      initCanvas.dispose();
    };
  }, []);

  const onObjectSelected = (activeObject) => {
    if (activeObject) {
      handleObjectSelection(activeObject, dispatch, {
        setRotate, setSkewY, setSkewX, setFlipY, setFlipX, lockObject, unlockObject,
      });
    }
  };

  const onTransform = () => {
    transformSelectedObject(canvas, { rotate, skewX, skewY, flipX, flipY });
  };

  const onPosition = (positionCode) => {
    if (!canvas?.designArea) return;
    movePositionSelectedObject(canvas, canvas.designArea, positionCode);
  };

  const canvasItem = useSelector((state) => state.addCanvasItem.canvasItem);
  useEffect(() => {
    if (!canvas || !canvasItem || !canvas.designArea) return;
    const area = canvas.designArea;
    createShape(canvas, canvasItem, {
      left:    area.x + area.width  / 2,
      top:     area.y + area.height / 2,
      originX: 'center',
      originY: 'center',
    });
    dispatch(breakStateAddShapesItem());
  }, [canvasItem, canvas]);

  useEffect(() => {
    if (canvas) lockUnlockSelectedObject(canvas, isLockObject);
  }, [isLockObject, canvas]);

  return (
    <div className="canvas-editor" id="canvasEditor">
      <div className="canvas-editor-shell">
        <section className="editor-main">
          <EditorTopbar projectName={DEFAULT_PROJECT_NAME} />

          <div className="editor-tools-row">
            <ToolboxTop onTransform={onTransform} onPosition={onPosition} />
          </div>

          <CanvasStage
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(event) => handleDrop(event, canvas)}
          />

          <div className="editor-bottom-dock">
            {canvas && <ZoomControl canvas={canvas} />}
          </div>
        </section>

        <EditorPropertiesPanel
          canvas={canvas}
          tshirtColor={tshirtColor}
          onTshirtColorChange={setTshirtColor}
        />
      </div>
    </div>
  );
};

export default CanvasEditor;
