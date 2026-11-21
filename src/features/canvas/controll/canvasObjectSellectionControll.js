import { fabric } from "fabric";
import { LUCIDE_ICONS, renderLucideSvgIcon } from "../../../IconConstant.jsx";

const iconCache = {};

/**
 * Render transform control icon from SVG string
 */
function renderTransformControlIcon(svgString, prop) {
  if (!iconCache[svgString]) {
    const lucideIcon = renderLucideSvgIcon(svgString, prop);
    const svg = new Blob([lucideIcon], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svg);

    const img = new Image();
    img.src = url;
    iconCache[svgString] = img;
  }

  return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    const img = iconCache[svgString];
    if (!img.complete) return;

    ctx.save();

    // Keep size consistent, not affected by object scale/zoom
    const zoom = fabricObject.canvas.getZoom();
    ctx.translate(left, top);
    ctx.scale(1 / zoom, 1 / zoom);

    ctx.drawImage(img, -prop.size / 2, -prop.size / 2, prop.size, prop.size);

    ctx.restore();
  };
}

/**
 * Setup custom transform controls for Fabric.js objects
 */
export function customTransformControl() {
  // DELETE CONTROL
  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: -0.5, 
    y: -0.5,
    cursorStyle: "pointer",
    mouseUpHandler: (evt, transform) => {
      const target = transform.target;
      const canvas = target.canvas;
      if (!canvas) return;
      
      // Check if this is active selection (multiple objects)
      if (target.type === 'activeSelection') {
        target.forEachObject((obj) => {
          canvas.remove(obj);
        });
        canvas.discardActiveObject();
      } else {
        canvas.remove(target);
      }
      canvas.requestRenderAll();
    },
    render: renderTransformControlIcon(LUCIDE_ICONS.TRANSFORM_CONTROL_DELETE, { size: 18, color: '#E5484D' }),
    cornerSize: 30
  });

  // DUPLICATE CONTROL
  fabric.Object.prototype.controls.duplicateControl = new fabric.Control({
    x: -0.5, 
    y: 0.5,
    cursorStyle: 'pointer',
    mouseUpHandler: (evt, transform) => {
      const target = transform.target;
      const canvas = target.canvas;
      if (!canvas) return;

      // Check if this is active selection (multiple objects)
      if (target.type === 'activeSelection') {
        const clonedObjects = [];
        target.forEachObject((obj) => {
          obj.clone((clone) => {
            clone.set({
              left: obj.left + 20,
              top: obj.top + 20
            });
            canvas.add(clone);
            clonedObjects.push(clone);
            
            // If all objects are cloned, create new selection
            if (clonedObjects.length === target._objects.length) {
              canvas.discardActiveObject();
              const sel = new fabric.ActiveSelection(clonedObjects, {
                canvas: canvas
              });
              canvas.setActiveObject(sel);
              canvas.requestRenderAll();
            }
          });
        });
      } else {
        // Single object
        target.clone((clone) => {
          clone.set({ 
            left: target.left + 20, 
            top: target.top + 20 
          });
          canvas.add(clone);
          canvas.setActiveObject(clone);
          canvas.requestRenderAll();
        });
      }
    },
    render: renderTransformControlIcon(LUCIDE_ICONS.TRANSFORM_CONTROL_DUPLICATE, { size: 18, color: '#3B82F6' }),
    cornerSize: 30
  });

  // ROTATE CONTROL
  fabric.Object.prototype.controls.rotateCustom = new fabric.Control({
    x: 0.5, 
    y: -0.5,
    cursorStyle: 'crosshair',
    actionHandler: fabric.controlsUtils.rotationWithSnapping,
    actionName: 'rotate',
    render: renderTransformControlIcon(LUCIDE_ICONS.TRANSFORM_CONTROL_ROTATE, { size: 18, color: '#F59E0B' }),
    cornerSize: 30
  });

  // RESIZE CONTROL
  fabric.Object.prototype.controls.customResize = new fabric.Control({
    x: 0.5, 
    y: 0.5,
    cursorStyle: 'se-resize',
    actionHandler: fabric.controlsUtils.scalingEqually,
    actionName: 'resize',
    render: renderTransformControlIcon(LUCIDE_ICONS.TRANSFORM_CONTROL_RESIZE, { size: 18, color: '#10B981' }),
    cornerSize: 30
  });
}

/**
 * Hide default Fabric.js controls and set corner styles
 */
export function setupControlsVisibility() {
  fabric.Object.prototype.set({
    transparentCorners: false,
    cornerColor: 'transparent',
    borderColor: 'transparent',
  });
  
  fabric.Object.prototype.setControlsVisibility({
    mt: false,    // middle top
    mb: false,    // middle bottom
    ml: false,    // middle left
    mr: false,    // middle right
    tl: false,    // top left
    tr: false,    // top right
    bl: false,    // bottom left
    br: false,    // bottom right
    mtr: false    // rotation control
  });
}
