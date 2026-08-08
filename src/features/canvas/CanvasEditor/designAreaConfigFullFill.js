import { fabric } from "fabric";

/**
 * Full Fill Design Area Configuration
 * Allows shapes to be placed anywhere on the t-shirt image without restricted design area
 */

/**
 * Calculate full fill design area based on t-shirt image dimensions
 * @param {fabric.Image} tshirtImage - T-shirt image object from canvas
 * @param {number} canvasWidth - Canvas width
 * @param {number} canvasHeight - Canvas height
 * @returns {Object} Full fill area dimensions {x, y, width, height, name}
 */
export const calculateFullFillArea = (tshirtImage, canvasWidth, canvasHeight) => {
  if (!tshirtImage) {
    // Fallback to full canvas if no image provided
    return {
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight,
      name: 'Full Canvas',
    };
  }

  // Get t-shirt image bounds using getBoundingRect for accurate positioning
  const boundingRect = tshirtImage.getBoundingRect();

  return {
    x: boundingRect.left,
    y: boundingRect.top,
    width: boundingRect.width,
    height: boundingRect.height,
    name: 'Full T-Shirt Area',
  };
};

/**
 * Create clip path for full fill area (uses t-shirt image itself as clip mask)
 * @param {fabric.Image} tshirtImage - T-shirt image object
 * @returns {fabric.Image} Fabric.js image for clipping
 */
export const createFullFillClipPath = (tshirtImage) => {
  if (!tshirtImage) return null;
  
  // Clone the t-shirt image to use as clip path
  // This will follow the shape/contour of the t-shirt PNG
  const clipPath = fabric.util.object.clone(tshirtImage);
  clipPath.set({
    absolutePositioned: true,
  });
  
  return clipPath;
};

/**
 * Apply clip path to canvas object for full fill mode
 * @param {fabric.Object} object - Fabric.js object
 * @param {fabric.Rect} clipPath - Clip path rectangle
 */
export const applyFullFillClipPath = (object, clipPath) => {
  if (!object || !clipPath) return;
  
  // Don't clip the t-shirt image itself
  if (object.type === 'image' && object.id === 'tshirt-image') return;
  
  // Apply clip path to all other objects
  object.clipPath = clipPath;
};

/**
 * Setup full fill design area (no border, no ratio text, just clipping)
 * @param {fabric.Canvas} canvas - Fabric.js canvas instance
 * @param {Object} fullFillArea - Full fill area configuration
 * @param {fabric.Image} tshirtImage - T-shirt image for creating clip mask
 * @returns {Object} Created objects {clipPath, cleanup}
 */
export const setupFullFillArea = (canvas, fullFillArea, tshirtImage) => {
  if (!canvas || !fullFillArea || !tshirtImage) return null;

  // Create clip path using t-shirt image shape
  const clipPath = createFullFillClipPath(tshirtImage);

  // Setup object:added listener for auto-clipping
  const handleObjectAdded = (e) => {
    if (e.target && !e.target.clipPath) {
      applyFullFillClipPath(e.target, clipPath);
    }
  };

  canvas.on('object:added', handleObjectAdded);

  return {
    clipPath,
    cleanup: () => {
      canvas.off('object:added', handleObjectAdded);
    },
  };
};

/**
 * Initialize full fill design area on canvas
 * @param {fabric.Canvas} canvas - Fabric.js canvas instance
 * @param {fabric.Image} tshirtImage - T-shirt image object (required)
 * @returns {Object} Full fill area objects for cleanup {cleanup, clipPath}
 */
export const initializeFullFillArea = (canvas, tshirtImage) => {
  if (!canvas) return null;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Calculate full fill area based on t-shirt image
  const fullFillArea = calculateFullFillArea(tshirtImage, canvasWidth, canvasHeight);

  // Setup full fill area with clip path using t-shirt image shape
  const fullFillObjs = setupFullFillArea(canvas, fullFillArea, tshirtImage);

  // Store full fill area in canvas for later access
  canvas.fullFillArea = fullFillArea;

  return fullFillObjs;
};

/**
 * Update full fill area when t-shirt image changes
 * @param {fabric.Canvas} canvas - Fabric.js canvas instance
 * @param {fabric.Image} tshirtImage - Updated t-shirt image object
 * @param {Object} currentFullFillObjs - Current full fill objects
 * @returns {Object} New full fill configuration
 */
export const updateFullFillArea = (canvas, tshirtImage, currentFullFillObjs) => {
  if (!canvas) return null;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Calculate new full fill area
  const newFullFillArea = calculateFullFillArea(tshirtImage, canvasWidth, canvasHeight);

  // Cleanup old listeners
  if (currentFullFillObjs && currentFullFillObjs.cleanup) {
    currentFullFillObjs.cleanup();
  }

  // Setup new full fill area with t-shirt image shape
  const newFullFillObjs = setupFullFillArea(canvas, newFullFillArea, tshirtImage);

  // Update clip path for all existing objects
  const objects = canvas.getObjects();
  objects.forEach((obj) => {
    applyFullFillClipPath(obj, newFullFillObjs.clipPath);
  });

  // Store in canvas
  canvas.fullFillArea = newFullFillArea;

  canvas.renderAll();

  return {
    ...newFullFillArea,
    ...newFullFillObjs,
  };
};

export default {
  calculateFullFillArea,
  createFullFillClipPath,
  applyFullFillClipPath,
  setupFullFillArea,
  initializeFullFillArea,
  updateFullFillArea,
};
