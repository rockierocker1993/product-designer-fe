import React, { useState } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpDownLeftRight, faArrowsToCircle, faArrowsUpDown, faArrowUp, faArrowDown, faArrowRight, faArrowLeft, faArrowTurnDown } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  moveToCenterVertical, moveToCenterHorizontal,
  moveToTopLeft, moveToTopRight, moveToTopCenter,
  moveToMiddleLeft, moveToMiddleRight, moveToMiddleCenter,
  moveToBottomLeft, moveToBottomRight, moveToBottomCenter,
  lockObject, unlockObject
} from '../../../store/components/CanvasEditor/ToolBoxTop/TooltipPositionSlice'

const TooltipPosition = () => {
  library.add(faUpDownLeftRight, faArrowsToCircle, faArrowsUpDown, faArrowUp, faArrowDown, faArrowRight, faArrowLeft, faArrowTurnDown);
  const dispatch = useDispatch();
  const isLockObject = useSelector((state) => state.tooltipPosition.isLockObject);

  const handleLockObjectChange = () => {
    if (isLockObject) {
      dispatch(unlockObject());
    } else {
      dispatch(lockObject());
    }
  }


  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      key="tooltipPosition"
      overlay={
        <Popover>
          <Popover.Body>
            <div className='row'>
              <div className='col-12'>
                <div class="form-check form-switch">
                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Lock Object Position</label>
                  <input className="form-check-input" type="checkbox" onChange={handleLockObjectChange} checked={isLockObject} value={isLockObject} role="switch" />
                </div>
              </div>
            </div>
            <hr />
            <div className='row mb-3'>
              <div className='col-3 text-center'>
                <a className='btn-position' onClick={() => dispatch(moveToCenterHorizontal())}>
                  <FontAwesomeIcon icon='fa-arrows-up-down' size="lg" style={{ marginBottom: '5px' }} />
                </a>
              </div>
              <div className='col-3 text-center'>
                <a className='btn-position' onClick={() => dispatch(moveToTopLeft())}>
                  <FontAwesomeIcon className='top-left-deg' icon='fa-arrow-up' size="lg" style={{ marginBottom: '5px' }} />
                </a>
              </div>
              <div className='col-3 text-center'>
                <a className='btn-position' onClick={() => dispatch(moveToTopCenter())}>
                  <FontAwesomeIcon icon='fa-arrow-up' size="lg" style={{ marginBottom: '5px' }} /></a>
              </div>
              <div className='col-3 text-center'>
                <a className='btn-position' onClick={() => dispatch(moveToTopCenter())}>
                  <FontAwesomeIcon className='top-right-deg' icon='fa-arrow-up' size="lg" style={{ marginBottom: '5px' }} />
                </a>
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col-3 text-center'>
                <a className='btn-position' onClick={() => dispatch(moveToCenterVertical())}>
                  <FontAwesomeIcon className='right-deg' icon='fa-arrows-up-down' size="lg" style={{ marginBottom: '5px' }} />
                </a>
              </div>
              <div className='col-3 text-center'>
                <a className='btn-position' onClick={() => dispatch(moveToMiddleLeft())}>
                  <FontAwesomeIcon icon='fa-arrow-left' size="lg" style={{ marginBottom: '5px' }} />
                </a>
              </div>
              <div className='col-3 text-center'>
                <a className='btn-position' onClick={() => dispatch(moveToMiddleCenter())}>
                  <FontAwesomeIcon icon='fa-arrows-to-circle' size="lg" style={{ marginBottom: '5px' }} />
                </a>
              </div>
              <div className='col-3 text-center'>
                <a className='btn-position' onClick={() => dispatch(moveToMiddleRight())}>
                  <FontAwesomeIcon icon='fa-arrow-right' size="lg" style={{ marginBottom: '5px' }} />
                </a>
              </div>
            </div>

            <div className='row'>
              <div className='col-3 text-center'> </div>
              <div className='col-3 text-center'>
                <a className='btn-position' onClick={() => dispatch(moveToBottomLeft())}>
                  <FontAwesomeIcon className='bottom-left-deg' icon='fa-arrow-up' size="lg" style={{ marginBottom: '5px' }} />
                </a>
              </div>
              <div className='col-3 text-center'>
                <a className='btn-position' onClick={() => dispatch(moveToBottomCenter())}>
                  <FontAwesomeIcon icon='fa-arrow-down' size="lg" style={{ marginBottom: '5px' }} />
                </a>
              </div>
              <div className='col-3 text-center'>
                <a className='btn-position' onClick={() => dispatch(moveToBottomRight())}>
                  <FontAwesomeIcon className='bottom-right-deg' icon='fa-arrow-up' size="lg" style={{ marginBottom: '5px' }} />
                </a>
              </div>
            </div>

          </Popover.Body>
        </Popover>
      }
    >
      <a className="link-button me-3">
        <FontAwesomeIcon icon='up-down-left-right' size="lg" />
      </a>
    </OverlayTrigger>
  );

};

export default TooltipPosition;
