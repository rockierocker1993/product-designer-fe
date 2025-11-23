import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Palette, X } from 'lucide-react';

const TooltipFillOptions = ({ isOpen, onToggle }) => {
  const [fillColor, setFillColor] = useState('#084D42');
  const [customColor, setCustomColor] = useState('#084D42');
  const [transparency, setTransparency] = useState(100);
  const [strokeWidth, setStrokeWidth] = useState(42);
  const [strokeColor, setStrokeColor] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [predefinedColors, setPredefinedColors] = useState([
    '#4CAF50', '#009688', '#00BCD4', '#03A9F4', '#2196F3',
    '#3F51B5', '#9C27B0', '#E91E63', '#F44336', '#ECEFF1',
    '#424242', '#FFFFFF'
  ]);

  const handleColorSelect = (color) => {
    setFillColor(color);
    setCustomColor(color);
    setShowColorPicker(false);
  };

  const handleAddCustomColor = () => {
    if (customColor && !predefinedColors.includes(customColor)) {
      setPredefinedColors([...predefinedColors, customColor]);
    }
    setShowColorPicker(false);
  };

  const handleClearColor = () => {
    setFillColor('');
    setCustomColor('#084D42');
  };


  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      key="tooltipFillOptions"
      show={isOpen}
      onToggle={onToggle}
      overlay={
        <Popover id="fill-options-popover" style={{ minWidth: '320px', maxWidth: '360px' }}>
          <Popover.Header className="d-flex justify-content-between align-items-center" style={{ padding: '8px 12px' }}>
            <strong style={{ fontSize: '13px' }}>FILL OPTIONS</strong>
            <button 
              onClick={onToggle}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                color: '#999'
              }}
            >
              <X size={20} />
            </button>
          </Popover.Header>
          <Popover.Body style={{ padding: '12px' }}>
            {/* Color Input */}
            <div className='mb-2' style={{ position: 'relative' }}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="click to choose color"
                  value={fillColor}
                  readOnly
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  style={{ cursor: 'pointer', paddingRight: '35px' }}
                />
                {fillColor && (
                  <button
                    onClick={handleClearColor}
                    style={{
                      position: 'absolute',
                      right: '50px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 10,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#999',
                      padding: '0 5px'
                    }}
                  >
                    <X size={16} />
                  </button>
                )}
                <button 
                  className="btn btn-dark"
                  onClick={handleAddCustomColor}
                >
                  +
                </button>
              </div>
              
              {/* Color Picker Popup */}
              {showColorPicker && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  marginTop: '5px',
                  background: 'white',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '10px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}>
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    style={{ width: '100%', height: '40px', cursor: 'pointer', border: 'none' }}
                  />
                </div>
              )}
            </div>

            {/* Color Palette */}
            <div className='mb-2' style={{ maxHeight: '140px', overflowY: 'auto', border: '1px solid #ddd', padding: '6px', borderRadius: '4px' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(6, 1fr)', 
                gap: '6px' 
              }}>
                {predefinedColors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => handleColorSelect(color)}
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      backgroundColor: color,
                      border: fillColor === color ? '3px solid var(--primary-color, #084D42)' : '1px solid #ddd',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Transparency Slider */}
            <div className='mb-2'>
              <label className='form-label d-flex justify-content-between mb-1' style={{ fontSize: '12px' }}>
                <span>Transparent:</span>
                <span>{transparency}%</span>
              </label>
              <input
                type="range"
                className="form-range primary-range"
                value={transparency}
                onChange={(e) => setTransparency(e.target.value)}
                min="0"
                max="100"
                step="1"
              />
            </div>

            {/* Stroke Width Slider */}
            <div className='mb-2'>
              <label className='form-label d-flex justify-content-between mb-1' style={{ fontSize: '12px' }}>
                <span>Stroke width:</span>
                <span>{strokeWidth}px</span>
              </label>
              <input
                type="range"
                className="form-range primary-range"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(e.target.value)}
                min="0"
                max="100"
                step="1"
              />
            </div>

            {/* Stroke Color */}
            <div className='mb-0'>
              <label className='form-label mb-1' style={{ fontSize: '12px' }}>Stroke color:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Select a color"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
              />
            </div>
          </Popover.Body>
        </Popover>
      }
    >
      <a className={`link-button me-3 ${isOpen ? 'active' : ''}`}>
        <Palette size={20} />
      </a>
    </OverlayTrigger>
  );

};

export default TooltipFillOptions;
