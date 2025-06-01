import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';
import { useDispatch, useSelector } from 'react-redux';
import { setRotate, setSkewY, setSkewX, setFlipY, setFlipX } from '../../../store/components/CanvasEditor/ToolBoxTop/TooltipTransformSlice';

const TooltipTransforms = () => {
  library.add(faSliders);
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
    dispatch(setSkewY(value));  
  }

  const handleFilipYClick = () =>{
    dispatch(setFlipY(!flipY));  
  }

  const handleFilipXClick = () =>{
    dispatch(setFlipX(!flipX));  
  }

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      key="tooltipTransform"
      overlay={
        <Popover>
          <Popover.Body>
            <div className='row'>
              <div className='col-3'><label>Rotate</label></div>
              <div className='col-9 d-flex'><input type="range" className="form-range" defaultValue={rotate} onChange={handleRotateChange} min={"0"} max={"100"} step={"1"} style={{ marginRight: 5 }} /><span>{rotate}º</span></div>
            </div>
            <div className='row'>
              <div className='col-3'><label>Skew&nbsp;X</label></div>
              <div className='col-9 d-flex'><input type="range" className="form-range" defaultValue={skewX} onChange={handleSkewXChange} min={"0"} max={"100"} style={{ marginRight: 5 }} /><span>{skewX}&nbsp;</span></div>
            </div>
            <div className='row'>
              <div className='col-3'><label>Skew&nbsp;Y</label></div>
              <div className='col-9 d-flex'><input type="range" className="form-range" defaultValue={skewY} onChange={handleSkewYChange} min={"0"} max={"100"} style={{ marginRight: 5 }} /><span>{skewY}&nbsp;</span></div>
            </div>
            <div className='row'>
              <div className='col-6'>
                <div className="form-check form-switch">
                  <label className="form-check-label" >Filp X</label>
                  <input className="form-check-input" type="checkbox" onChange={handleFilipXClick} checked={flipX} value={flipX} role="switch"/>
                </div>
              </div>
              <div className='col-6'>
                <div className="form-check form-switch">
                  <label className="form-check-label">Filp Y</label>
                  <input className="form-check-input" type="checkbox" onChange={handleFilipYClick} checked={flipY} value={flipY} role="switch"/>
                </div>
              </div>
            </div>
          </Popover.Body>
        </Popover>
      }
    >
      <a className="link-button active">
        <FontAwesomeIcon icon='sliders' size="lg" />
      </a>
    </OverlayTrigger>
  );

};

export default TooltipTransforms;
