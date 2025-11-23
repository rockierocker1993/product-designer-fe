import { createShape } from "./factory/ShapesFactory.jsx";

/**
 * Handle drag over event - allows dropping by preventing default behavior
 * @param {DragEvent} e - The drag event
 */
export const handleDragOver = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
  e.currentTarget.classList.add('drag-over');
};

/**
 * Handle drag leave event - removes visual feedback
 * @param {DragEvent} e - The drag event
 */
export const handleDragLeave = (e) => {
  e.currentTarget.classList.remove('drag-over');
};

/**
 * Handle drop event - creates shape at drop position
 * @param {DragEvent} e - The drop event
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance
 */
export const handleDrop = async (e, canvas) => {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  
  if (!canvas) return;
  
  try {
    const data = JSON.parse(e.dataTransfer.getData('application/json'));
    
    if (data.type === 'shape') {
      // Get drop position relative to canvas
      const canvasElement = document.getElementById('canvas');
      const rect = canvasElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create shape directly at drop position
      await createShape(canvas, `api-${data.id}`, {
        left: x,
        top: y,
        height: 60,
        width: 100,
        fill: "#084D42"
      });
    }
  } catch (err) {
    console.error('Drop error:', err);
  }
};
