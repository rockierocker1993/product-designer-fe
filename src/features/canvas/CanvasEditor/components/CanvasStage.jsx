import React from "react";

const CanvasStage = ({ onDragOver, onDragLeave, onDrop }) => {
  return (
    <div className="canvas-stage">
      <div
        className="canvas-area"
        id="canvasArea"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="canvas-layer canvas-layer-1">
          <canvas id="canvas" />
        </div>

        <div className="canvas-layer canvas-layer-2" id="canvasOverlayLayer" />
      </div>
    </div>
  );
};

export default CanvasStage;
