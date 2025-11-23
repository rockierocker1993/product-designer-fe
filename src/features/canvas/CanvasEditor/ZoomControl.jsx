import { useState, useEffect } from 'react';

const ZoomControl = ({ canvas }) => {
  const [scale, setScale] = useState(100);

  // Apply scale to canvas and t-shirt when scale changes
  useEffect(() => {
    if (!canvas) return;
    
    const scaleValue = scale / 100;
    
    // Scale the wrapper that contains both canvas and t-shirt
    const wrapper = document.querySelector('.canvas-tshirt-wrapper');
    
    if (wrapper) {
      wrapper.style.transform = `scale(${scaleValue})`;
      wrapper.style.transformOrigin = 'center center';
      wrapper.style.transition = 'transform 0.2s ease';
    }
  }, [scale, canvas]);

  const handleScaleUp = () => {
    setScale(prev => Math.min(prev + 10, 200)); // Max 200%
  };

  const handleScaleDown = () => {
    setScale(prev => Math.max(prev - 10, 50)); // Min 50%
  };

  const handleScaleSlider = (e) => {
    setScale(parseInt(e.target.value));
  };

  return canvas ? (
    <div 
      className="zoom-control-wrapper"
      style={{ 
        position: 'fixed', 
        bottom: '30px', 
        left: '50%', 
        transform: 'translateX(-50%)',
        zIndex: 99999, 
        background: 'var(--bs-body-bg, #ffffff)', 
        padding: '8px 12px', 
        borderRadius: '8px',
        border: '1px solid var(--bs-border-color, #dee2e6)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <button 
        onClick={handleScaleDown}
        style={{
          background: 'transparent',
          border: '1px solid var(--bs-border-color, #dee2e6)',
          color: 'var(--bs-body-color, #212529)',
          width: '32px',
          height: '32px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'var(--bs-light, #f8f9fa)';
          e.target.style.borderColor = 'var(--primary-color, #084D42)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.borderColor = 'var(--bs-border-color, #dee2e6)';
        }}
      >
        −
      </button>
      
      <input 
        type="range" 
        min="50" 
        max="200" 
        value={scale}
        onChange={handleScaleSlider}
        style={{
          width: '120px',
          accentColor: 'var(--primary-color, #084D42)',
          cursor: 'pointer'
        }}
      />
      
      <span style={{ 
        color: 'var(--bs-body-color, #212529)', 
        fontSize: '13px', 
        fontWeight: '500',
        minWidth: '40px',
        textAlign: 'center'
      }}>
        {scale}%
      </span>
      
      <button 
        onClick={handleScaleUp}
        style={{
          background: 'transparent',
          border: '1px solid var(--bs-border-color, #dee2e6)',
          color: 'var(--bs-body-color, #212529)',
          width: '32px',
          height: '32px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'var(--bs-light, #f8f9fa)';
          e.target.style.borderColor = 'var(--primary-color, #084D42)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.borderColor = 'var(--bs-border-color, #dee2e6)';
        }}
      >
        +
      </button>
    </div>
  ) : null;
};

export default ZoomControl;
