import React, { useRef, useState, useEffect } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { SlidersHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setRotate, setSkewY, setSkewX, setFlipY, setFlipX } from '../../../../store/components/CanvasEditor/ToolBoxTop/TooltipTransformSlice';

const TooltipTransforms = ({ onTransform, isOpen, onToggle }) => {

  //redux concept
  const dispatch = useDispatch();
  const rotate = useSelector((state) => state.tooltipTransforms.rotate);
  const skewX = useSelector((state) => state.tooltipTransforms.skewX);
  const skewY = useSelector((state) => state.tooltipTransforms.skewY);
  const flipX = useSelector((state) => state.tooltipTransforms.flipX);
  const flipY = useSelector((state) => state.tooltipTransforms.flipY);

  // Track previous values to detect direction
  const prevSkewXRef = useRef(skewX);
  const prevSkewYRef = useRef(skewY);

  // Local state for input fields to prevent leading zero bug
  const [rotateInput, setRotateInput] = useState(rotate);
  const [skewXInput, setSkewXInput] = useState(skewX);
  const [skewYInput, setSkewYInput] = useState(skewY);

  // Sync local state with redux state
  useEffect(() => {
    setRotateInput(rotate);
  }, [rotate]);

  useEffect(() => {
    setSkewXInput(skewX);
  }, [skewX]);

  useEffect(() => {
    setSkewYInput(skewY);
  }, [skewY]);

  const handleRotateChange = (event) => {
    var value = event.target.value;
    dispatch(setRotate(value));
  }

  const handleRotateInputChange = (event) => {
    setRotateInput(event.target.value);
  }

  const handleRotateInputBlur = () => {
    const value = parseInt(rotateInput) || 0;
    const clamped = Math.max(0, Math.min(360, value));
    dispatch(setRotate(clamped));
  }

  const handleSkewXChange = (event) => {
    var value = parseInt(event.target.value);
    const prevValue = prevSkewXRef.current;
    
    // Snap to 0 only when moving towards zero (not when leaving zero)
    if (value >= -2 && value <= 2) {
      // Check if we're moving towards zero
      const movingTowardsZero = (prevValue > 2 && value <= 2) || (prevValue < -2 && value >= -2);
      if (movingTowardsZero) {
        value = 0;
      }
    }
    
    prevSkewXRef.current = value;
    dispatch(setSkewX(value));
  }

  const handleSkewXInputChange = (event) => {
    setSkewXInput(event.target.value);
  }

  const handleSkewXInputBlur = () => {
    const value = parseInt(skewXInput) || 0;
    const clamped = Math.max(-30, Math.min(30, value));
    prevSkewXRef.current = clamped;
    dispatch(setSkewX(clamped));
  }

  const handleSkewYChange = (event) => {
    var value = parseInt(event.target.value);
    const prevValue = prevSkewYRef.current;
    
    // Snap to 0 only when moving towards zero (not when leaving zero)
    if (value >= -2 && value <= 2) {
      // Check if we're moving towards zero
      const movingTowardsZero = (prevValue > 2 && value <= 2) || (prevValue < -2 && value >= -2);
      if (movingTowardsZero) {
        value = 0;
      }
    }
    
    prevSkewYRef.current = value;
    dispatch(setSkewY(value))
  }

  const handleSkewYInputChange = (event) => {
    setSkewYInput(event.target.value);
  }

  const handleSkewYInputBlur = () => {
    const value = parseInt(skewYInput) || 0;
    const clamped = Math.max(-30, Math.min(30, value));
    prevSkewYRef.current = clamped;
    dispatch(setSkewY(clamped));
  }

  const handleFilipYChange = () => {
    dispatch(setFlipY(!flipY));
  }

  const handleFilipXChange = () => {
    dispatch(setFlipX(!flipX));
  }

  useEffect(() => {
    if (onTransform)
      onTransform();
  }, [flipX, flipY, rotate, skewX, skewY]);
  //end of redux concept

  /*
  const [rotate, setRotate] = useState(0);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);
  

  const handleRotateChange = (event) => {
    var value = event.target.value;
    if (onTransformRotate) {
      onTransformRotate(value)
    }
    setRotate(value);
  }

  const handleSkewXChange = (event) => {
    var value = event.target.value;
    if (onTransformSkewX)
      onTransformSkewX(value)

    setSkewX(value);
  }

  const handleSkewYChange = (event) => {
    var value = event.target.value;
    if (onTransformSkewY)
      onTransformSkewY(value)

    setSkewY(value)
  }

  const handleFilipYChange = () => {
    if (onFlipY)
      onFlipY(!flipY);

    setFlipY(!flipY);
  }

  const handleFilipXChange = () => {
    if (onFlipX)
      onFlipX(!flipX)

    setFlipX(!flipX);
  }
  */

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      key="tooltipTransform"
      show={isOpen}
      onToggle={onToggle}
      overlay={
        <Popover>
          <Popover.Body>
            <div className='row align-items-center mb-2'>
              <div className='col-3 d-flex align-items-center'><label>Rotate</label></div>
              <div className='col-6 d-flex align-items-center transform-progressbar'>
                <input
                  type="range"
                  className="form-range flex-grow-1"
                  value={rotate}
                  onChange={handleRotateChange}
                  min={0}
                  max={360}
                  step={1}
                />
              </div>
              <div className='col-3 text-end transform-value'>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={rotateInput}
                  onChange={handleRotateInputChange}
                  onBlur={handleRotateInputBlur}
                  onKeyPress={(e) => e.key === 'Enter' && handleRotateInputBlur()}
                  min={0}
                  max={360}
                  style={{ width: '45px', padding: '1px 4px', fontSize: '11px', textAlign: 'center' }}
                />
              </div>
            </div>
            <div className='row align-items-center mb-2'>
              <div className='col-3 d-flex align-items-center'><label>Skew&nbsp;X</label></div>
              <div className='col-6 d-flex align-items-center transform-progressbar'>
                <input
                  type="range"
                  className="form-range flex-grow-1"
                  value={skewX}
                  onChange={handleSkewXChange}
                  min={-30}
                  max={30}
                  step={1}
                />
              </div>
              <div className='col-3 text-end transform-value'>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={skewXInput}
                  onChange={handleSkewXInputChange}
                  onBlur={handleSkewXInputBlur}
                  onKeyPress={(e) => e.key === 'Enter' && handleSkewXInputBlur()}
                  min={-30}
                  max={30}
                  style={{ width: '45px', padding: '1px 4px', fontSize: '11px', textAlign: 'center' }}
                />
              </div>
            </div>
            <div className='row align-items-center mb-2'>
              <div className='col-3 d-flex align-items-center'><label>Skew&nbsp;Y</label></div>
              <div className='col-6 d-flex align-items-center transform-progressbar'>
                <input
                  type="range"
                  className="form-range flex-grow-1"
                  value={skewY}
                  onChange={handleSkewYChange}
                  min={-30}
                  max={30}
                  step={1}
                />
              </div>
              <div className='col-3 text-end transform-value'>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={skewYInput}
                  onChange={handleSkewYInputChange}
                  onBlur={handleSkewYInputBlur}
                  onKeyPress={(e) => e.key === 'Enter' && handleSkewYInputBlur()}
                  min={-30}
                  max={30}
                  style={{ width: '45px', padding: '1px 4px', fontSize: '11px', textAlign: 'center' }}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-6'>
                <div className="form-check form-switch">
                  <label className="form-check-label">Flip X</label>
                  <input className="form-check-input" type="checkbox" onChange={handleFilipXChange} checked={flipX} value={flipX} role="switch" />
                </div>
              </div>
              <div className='col-6'>
                <div className="form-check form-switch">
                  <label className="form-check-label">Flip Y</label>
                  <input className="form-check-input" type="checkbox" onChange={handleFilipYChange} checked={flipY} value={flipY} role="switch" />
                </div>
              </div>
            </div>
          </Popover.Body>
        </Popover>
      }
    >
      <a className={`link-button ${isOpen ? 'active' : ''}`}>
        <SlidersHorizontal size={20} />
      </a>
    </OverlayTrigger>
  );

};

export default TooltipTransforms;
