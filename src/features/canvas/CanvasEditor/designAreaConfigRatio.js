import { fabric } from "fabric";

/**
 * Design area configuration constants
 */
export const DESIGN_AREA_TYPES = {
  FRONT_CENTER: 'front_center',
  FULL_FRONT: 'full_front',
  BACK_CENTER: 'back_center',
  FULL_BACK: 'full_back',
  LEFT_CHEST: 'left_chest',
  RIGHT_CHEST: 'right_chest',
  SLEEVE_LEFT: 'sleeve_left',
  SLEEVE_RIGHT: 'sleeve_right',
};

/**
 * Design area presets with ratio configurations
 */
export const DESIGN_AREA_PRESETS = {
  [DESIGN_AREA_TYPES.FRONT_CENTER]: {
    name: 'Front Center',
    ratio: { width: 3, height: 4 },
    baseWidth: 150,
    offsetX: 0,
    offsetY: -40,
  },
  [DESIGN_AREA_TYPES.FULL_FRONT]: {
    name: 'Full Front',
    ratio: { width: 4, height: 5 },
    baseWidth: 250,
    offsetX: 0,
    offsetY: 100,
  },
  [DESIGN_AREA_TYPES.BACK_CENTER]: {
    name: 'Back Center',
    ratio: { width: 3, height: 4 },
    baseWidth: 150,
    offsetX: 0,
    offsetY: 160,
  },
  [DESIGN_AREA_TYPES.FULL_BACK]: {
    name: 'Full Back',
    ratio: { width: 4, height: 5 },
    baseWidth: 250,
    offsetX: 0,
    offsetY: 100,
  },
  [DESIGN_AREA_TYPES.LEFT_CHEST]: {
    name: 'Left Chest',
    ratio: { width: 1, height: 1 },
    baseWidth: 80,
    offsetX: -80,
    offsetY: 120,
  },
  [DESIGN_AREA_TYPES.RIGHT_CHEST]: {
    name: 'Right Chest',
    ratio: { width: 1, height: 1 },
    baseWidth: 80,
    offsetX: 80,
    offsetY: 120,
  },
};

/**
 * Calculate design area dimensions based on preset configuration
 * @param {string} presetType - Type of design area preset
 * @param {number} canvasWidth - Canvas width
 * @param {number} canvasHeight - Canvas height
 * @returns {Object} Design area dimensions {x, y, width, height}
 */
export const calculateDesignArea = (presetType, canvasWidth, canvasHeight) => {
  const preset = DESIGN_AREA_PRESETS[presetType] || DESIGN_AREA_PRESETS[DESIGN_AREA_TYPES.FRONT_CENTER];
  
  // Scale design area proportionally to canvas dimensions.
  // Reference canvas was 1400 × 400 px; baseWidth=150 fitted 10.7 % of width.
  const heightScale = canvasHeight / 400;
  const designWidth  = Math.round(preset.baseWidth * heightScale);
  const designHeight = Math.round((designWidth / preset.ratio.width) * preset.ratio.height);

  return {
    x: (canvasWidth - designWidth) / 2 + Math.round(preset.offsetX * heightScale),
    y: Math.round(canvasHeight * 0.30),   // 30 % from top (was hardcoded 120 px = 30 % of 400)
    width: designWidth,
    height: designHeight,
    ratio: preset.ratio,
    name: preset.name,
  };
};

/**
 * Create clip path rectangle for design area
 * @param {Object} designArea - Design area configuration
 * @returns {fabric.Rect} Fabric.js rectangle for clipping
 */
export const createClipPath = (designArea) => {
  return new fabric.Rect({
    left: designArea.x - 4,
    top: designArea.y,
    width: designArea.width,
    height: designArea.height,
    absolutePositioned: true,
  });
};

/**
 * Create design area border rectangle (dashed line)
 * @param {Object} designArea - Design area configuration
 * @returns {fabric.Rect} Fabric.js rectangle for border
 */
export const createDesignAreaBorder = (designArea) => {
  return new fabric.Rect({
    left: designArea.x - 4,
    top: designArea.y,
    width: designArea.width,
    height: designArea.height,
    fill: 'transparent',
    stroke: '#393939ff',
    strokeWidth: 2,
    strokeDashArray: [5, 5],
    selectable: false,
    evented: false,
    excludeFromExport: true,
    hasControls: false,
    hasBorders: false,
    lockMovementX: true,
    lockMovementY: true,
    lockRotation: true,
    lockScalingX: true,
    lockScalingY: true,
  });
};

/**
 * Create ratio text label
 * @param {Object} designArea - Design area configuration
 * @returns {fabric.Text} Fabric.js text object
 */
export const createRatioText = (designArea) => {
  const ratioText = new fabric.Text(
    `ratio = ${designArea.ratio.width}:${designArea.ratio.height}`,
    {
      fontSize: 12,
      fill: '#666',
      fontFamily: 'Arial',
      selectable: false,
      evented: false,
      excludeFromExport: true,
      hasControls: false,
      hasBorders: false,
      lockMovementX: true,
      lockMovementY: true,
    }
  );

  // Position text at top-right corner, outside and above the design area
  const rectLeft = designArea.x - 4;
  const rectTop = designArea.y;
  
  ratioText.set({
    left: rectLeft + designArea.width - ratioText.width,
    top: rectTop - 18,
    clipPath: null,
  });
  
  return ratioText;
};

/**
 * Apply clip path to canvas object
 * @param {fabric.Object} object - Fabric.js object
 * @param {fabric.Rect} clipPath - Clip path rectangle
 */
export const applyClipPath = (object, clipPath) => {
  if (!object || !clipPath) return;
  
  // Don't clip certain objects
  const excludeTypes = ['rect'];
  if (excludeTypes.includes(object.type)) return;
  
  // Don't clip if it's a border or text
  if (
    (object.stroke === '#393939ff' && object.strokeDashArray) ||
    (object.type === 'text' && object.fontSize === 12)
  ) {
    return;
  }
  
  object.clipPath = clipPath;
};

/**
 * Setup design area with all components (border, clip path, ratio text)
 * @param {fabric.Canvas} canvas - Fabric.js canvas instance
 * @param {Object} designArea - Design area configuration
 * @returns {Object} Created objects {clipPath, border, ratioText}
 */
export const setupDesignArea = (canvas, designArea) => {
  if (!canvas || !designArea) return null;

  // Create clip path
  const clipPath = createClipPath(designArea);

  // Create border
  const border = createDesignAreaBorder(designArea);
  canvas.add(border);

  // Create ratio text
  const ratioText = createRatioText(designArea);
  canvas.add(ratioText);

  // Setup object:added listener for auto-clipping
  const handleObjectAdded = (e) => {
    if (e.target && !e.target.clipPath) {
      applyClipPath(e.target, clipPath);
    }
  };

  canvas.on('object:added', handleObjectAdded);

  return {
    clipPath,
    border,
    ratioText,
    cleanup: () => {
      canvas.off('object:added', handleObjectAdded);
    },
  };
};

/**
 * Initialize design area on canvas (old version with manual state setters)
 * @param {fabric.Canvas} canvas - Fabric.js canvas instance
 * @param {string} presetType - Design area preset type
 * @param {Function} setDesignArea - State setter for design area
 * @param {Function} setDesignAreaObjects - State setter for design area objects
 * @returns {Object} Design area configuration and objects
 */
export const initializeDesignArea = (canvas, presetType, setDesignArea, setDesignAreaObjects) => {
  if (!canvas) return null;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Calculate design area using config
  const calculatedDesignArea = calculateDesignArea(
    presetType,
    canvasWidth,
    canvasHeight
  );
  
  if (setDesignArea) {
    setDesignArea(calculatedDesignArea);
  }

  // Setup design area with border, clip path, and ratio text
  const designAreaObjs = setupDesignArea(canvas, calculatedDesignArea);
  
  if (setDesignAreaObjects) {
    setDesignAreaObjects(designAreaObjs);
  }

  return {
    designArea: calculatedDesignArea,
    designAreaObjects: designAreaObjs,
  };
};

/**
 * Initialize design area ratio on canvas (simplified version)
 * @param {fabric.Canvas} canvas - Fabric.js canvas instance
 * @param {string} presetType - Design area preset type (default: FRONT_CENTER)
 * @returns {Object} Design area objects for cleanup {cleanup, clipPath, border, ratioText}
 */
export const initializeDesignAreaRatio = (canvas, presetType = DESIGN_AREA_TYPES.FRONT_CENTER) => {
  if (!canvas) return null;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Calculate design area using config
  const calculatedDesignArea = calculateDesignArea(
    presetType,
    canvasWidth,
    canvasHeight
  );

  // Setup design area with border, clip path, and ratio text
  const designAreaObjs = setupDesignArea(canvas, calculatedDesignArea);

  // Store design area in canvas for later access
  canvas.designArea = calculatedDesignArea;

  return designAreaObjs;
};

/**
 * Update design area when switching presets
 * @param {fabric.Canvas} canvas - Fabric.js canvas instance
 * @param {string} presetType - New preset type
 * @param {Object} currentDesignArea - Current design area objects
 * @returns {Object} New design area configuration
 */
export const updateDesignArea = (canvas, presetType, currentDesignArea) => {
  if (!canvas) return null;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Calculate new design area
  const newDesignArea = calculateDesignArea(presetType, canvasWidth, canvasHeight);

  // Remove old design area objects
  if (currentDesignArea) {
    if (currentDesignArea.border) canvas.remove(currentDesignArea.border);
    if (currentDesignArea.ratioText) canvas.remove(currentDesignArea.ratioText);
    if (currentDesignArea.cleanup) currentDesignArea.cleanup();
  }

  // Setup new design area
  const newDesignAreaObjects = setupDesignArea(canvas, newDesignArea);

  // Update clip path for all existing objects
  const objects = canvas.getObjects();
  objects.forEach((obj) => {
    if (obj !== newDesignAreaObjects.border && obj !== newDesignAreaObjects.ratioText) {
      applyClipPath(obj, newDesignAreaObjects.clipPath);
    }
  });

  canvas.renderAll();

  return {
    ...newDesignArea,
    ...newDesignAreaObjects,
  };
};

export default {
  DESIGN_AREA_TYPES,
  DESIGN_AREA_PRESETS,
  calculateDesignArea,
  createClipPath,
  createDesignAreaBorder,
  createRatioText,
  applyClipPath,
  setupDesignArea,
  initializeDesignArea,
  initializeDesignAreaRatio,
  updateDesignArea,
};
