import { useState, useEffect } from 'react';
import { fabric } from 'fabric';

const ZoomControl = ({ canvas }) => {
  const [scale, setScale] = useState(100);

  // Fabric.js native zoom — zooms toward the canvas centre so content
  // stays visually centred; no CSS transform or scroll tricks needed.
  useEffect(() => {
    if (!canvas) return;
    const zoomValue = scale / 100;
    const center = new fabric.Point(canvas.width / 2, canvas.height / 2);
    canvas.zoomToPoint(center, zoomValue);
    canvas.renderAll();
  }, [scale, canvas]);

  // Ctrl + mouse-wheel to zoom, centred on the cursor position
  useEffect(() => {
    if (!canvas) return;
    const handleWheel = (opt) => {
      if (!opt.e.ctrlKey && !opt.e.metaKey) return;
      opt.e.preventDefault();
      const delta = opt.e.deltaY;
      setScale(prev => Math.max(50, Math.min(300, prev + (delta > 0 ? -5 : 5))));
    };
    canvas.on('mouse:wheel', handleWheel);
    return () => canvas.off('mouse:wheel', handleWheel);
  }, [canvas]);

  const handleScaleUp = () => {
    setScale(prev => Math.min(prev + 10, 300));
  };

  const handleScaleDown = () => {
    setScale(prev => Math.max(prev - 10, 50));
  };

  const handleScaleSlider = (e) => {
    setScale(parseInt(e.target.value));
  };

  return canvas ? (
    <div className="kittl-zoom-control">
      <button
        onClick={handleScaleDown}
        className="kittl-zoom-btn"
        type="button"
        aria-label="Zoom out"
      >
        -
      </button>

      <input
        type="range"
        min="50"
        max="300"
        value={scale}
        onChange={handleScaleSlider}
        className="kittl-zoom-range"
      />

      <span className="kittl-zoom-value">
        {scale}%
      </span>

      <button
        onClick={handleScaleUp}
        className="kittl-zoom-btn"
        type="button"
        aria-label="Zoom in"
      >
        +
      </button>
    </div>
  ) : null;
};

export default ZoomControl;
