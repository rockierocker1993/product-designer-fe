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

  const handleRotateChange = (event) => {
    var value = event.target.value;
    dispatch(setRotate(value));
  }

  const handleSkewXChange = (event) => {
    var value = event.target.value;
    dispatch(setSkewX(value));
  }

  const handleSkewYChange = (event) => {
    var value = event.target.value;
    dispatch(setSkewY(value))
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
              <div className='col-7 d-flex align-items-center transform-progressbar'>
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
              <div className='col-2 text-end transform-value'><span>{rotate}º</span></div>
            </div>
            <div className='row align-items-center mb-2'>
              <div className='col-3 d-flex align-items-center'><label>Skew&nbsp;X</label></div>
              <div className='col-7 d-flex align-items-center transform-progressbar'>
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
              <div className='col-2 text-end transform-value'><span>{skewX}</span></div>
            </div>
            <div className='row align-items-center mb-2'>
              <div className='col-3 d-flex align-items-center'><label>Skew&nbsp;Y</label></div>
              <div className='col-7 d-flex align-items-center transform-progressbar'>
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
              <div className='col-2 text-end transform-value'><span>{skewY}</span></div>
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
