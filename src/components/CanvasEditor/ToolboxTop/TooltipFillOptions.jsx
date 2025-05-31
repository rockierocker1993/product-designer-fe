import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFill } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';

const TooltipFillOptions = () => {
  library.add(faFill);
  const [rotate, setRotate] = useState(0);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);

  const resetAll = () => {
    setRotate(0);
    setSkewX(0);
    setSkewY(0);
    setFlipX(false);
    setFlipY(false);
  };


  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      key="tooltipFillOptions"
      overlay={
        <Popover>
          <Popover.Body>
            <div className='row'>
              <div className='col-3'><label>Rotate</label></div>
              <div className='col-9 d-flex'><input type="range" className="form-range" style={{ marginRight: 5 }} id="customRange1" /><span>0º</span></div>
            </div>
            <div className='row'>
              <div className='col-3'><label>Skew&nbsp;X</label></div>
              <div className='col-9 d-flex'><input type="range" className="form-range" style={{ marginRight: 5 }} /><span>0&nbsp;</span></div>
            </div>
            <div className='row'>
              <div className='col-3'><label>Skew&nbsp;Y</label></div>
              <div className='col-9 d-flex'><input type="range" className="form-range" style={{ marginRight: 5 }} /><span>0&nbsp;</span></div>
            </div>
            <div className='row'>
              <div className='col-6'>
                <div class="form-check form-switch">
                  <label className="form-check-label" for="flexSwitchCheckDefault">Filp X</label>
                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                </div>
              </div>
              <div className='col-6'>
                <div class="form-check form-switch">
                  <label className="form-check-label" for="flexSwitchCheckDefault">Filp Y</label>
                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                </div>
              </div>
            </div>
          </Popover.Body>
        </Popover>
      }
    >
      <a className="link-button me-3">
        <FontAwesomeIcon icon='fill' size="lg" />
      </a>
    </OverlayTrigger>
  );

};

export default TooltipFillOptions;
