import {
  CENTER_VERTICAL, CENTER_HORIZONTAL,
  TOP_LEFT, TOP_RIGHT, TOP_CENTER,
  MIDDLE_LEFT, MIDDLE_CENTER, MIDDLE_RIGHT,
  BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT
} from "../../../constant";

/**
 * Transform selected object with rotation, skew, and flip
 */
export const transformSelectedObject = (canvas, transformState) => {
  if (!canvas) return;
  
  const activeObject = canvas.getActiveObject();
  if (!activeObject) return;
  
  const { rotate, skewX, skewY, flipX, flipY } = transformState;
  
  activeObject.set('skewX', skewX);
  activeObject.set('skewY', skewY);
  activeObject.set('flipX', flipX);
  activeObject.set('flipY', flipY);
  activeObject.rotate(rotate);
  activeObject.setCoords();
  canvas.requestRenderAll();
};

/**
 * Lock or unlock selected object movement and transformations
 */
export const lockUnlockSelectedObject = (canvas, isLocked) => {
  if (!canvas) return;
  
  const activeObject = canvas.getActiveObject();
  if (!activeObject) return;
  
  activeObject.lockMovementX = isLocked;
  activeObject.lockMovementY = isLocked;
  activeObject.lockScalingX = isLocked;
  activeObject.lockScalingY = isLocked;
  activeObject.lockRotation = isLocked;
};

/**
 * Move selected object to specific position within design area
 */
export const movePositionSelectedObject = (canvas, designArea, positionCode) => {
  if (!canvas) return;
  
  const activeObject = canvas.getActiveObject();
  if (!activeObject) return;
  
  const objWidth = activeObject.getScaledWidth();
  const objHeight = activeObject.getScaledHeight();
  const centerX = designArea.x + (designArea.width / 2);
  const centerY = designArea.y + (designArea.height / 2);
  
  switch (positionCode) {
    case CENTER_VERTICAL:
      activeObject.top = centerY - (objHeight / 2);
      break;
    case CENTER_HORIZONTAL:
      activeObject.left = centerX - (objWidth / 2);
      break;
    case TOP_LEFT:
      activeObject.left = designArea.x;
      activeObject.top = designArea.y;
      break;
    case TOP_CENTER:
      activeObject.top = designArea.y;
      activeObject.left = centerX - (objWidth / 2);
      break;
    case TOP_RIGHT:
      activeObject.top = designArea.y;
      activeObject.left = designArea.x + designArea.width - objWidth;
      break;
    case MIDDLE_LEFT:
      activeObject.top = centerY - (objHeight / 2);
      activeObject.left = designArea.x;
      break;
    case MIDDLE_CENTER:
      activeObject.top = centerY - (objHeight / 2);
      activeObject.left = centerX - (objWidth / 2);
      break;
    case MIDDLE_RIGHT:
      activeObject.top = centerY - (objHeight / 2);
      activeObject.left = designArea.x + designArea.width - objWidth;
      break;
    case BOTTOM_LEFT:
      activeObject.top = designArea.y + designArea.height - objHeight;
      activeObject.left = designArea.x;
      break;
    case BOTTOM_CENTER:
      activeObject.top = designArea.y + designArea.height - objHeight;
      activeObject.left = centerX - (objWidth / 2);
      break;
    case BOTTOM_RIGHT:
      activeObject.top = designArea.y + designArea.height - objHeight;
      activeObject.left = designArea.x + designArea.width - objWidth;
      break;
    default:
      break;
  }
  
  activeObject.setCoords();
  canvas.renderAll();
};

/**
 * Handle object selection and extract current properties
 */
export const handleObjectSelection = (activeObject, dispatch, actions) => {
  if (!activeObject) return;
  
  const { setRotate, setSkewX, setSkewY, setFlipX, setFlipY, lockObject, unlockObject } = actions;
  
  const activeRotate = parseInt(activeObject.angle) || 0;
  const activeSkewY = activeObject.skewY || 0;
  const activeSkewX = activeObject.skewX || 0;
  const activeFlipY = activeObject.flipY || false;
  const activeFlipX = activeObject.flipX || false;
  const isObjectLocked = activeObject.lockMovementX || false;
  
  dispatch(setRotate(activeRotate));
  dispatch(setSkewY(activeSkewY));
  dispatch(setSkewX(activeSkewX));
  dispatch(setFlipY(activeFlipY));
  dispatch(setFlipX(activeFlipX));
  
  if (isObjectLocked) {
    dispatch(lockObject());
  } else {
    dispatch(unlockObject());
  }
};

/**
 * Convert hex color to CSS filter for t-shirt color tinting
 * This approach works better for recoloring white/light images
 * @param {string} hexColor - Hex color code (e.g., '#ff0000')
 * @returns {object} Style object with filter or background-color
 */
export const getColorFilter = (hexColor) => {
  // Return no filter for white
  if (!hexColor || hexColor === '#ffffff' || hexColor === '#fff') {
    return { filter: 'none' };
  }
  
  // For colored tints, we'll use a combination approach
  // Convert hex to RGB
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Use opacity and multiply blend mode for more accurate tinting
  // This returns a style object that should be applied differently
  return {
    filter: `brightness(0.9) contrast(1.1)`,
    backgroundColor: hexColor,
    mixBlendMode: 'multiply',
    opacity: 0.7
  };
};
