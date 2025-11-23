import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { 
  Move, 
  MoveVertical, 
  MoveHorizontal,
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  ArrowUpLeft,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowDownRight,
  Circle
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { lockObject, unlockObject } from '../../../../store/components/CanvasEditor/ToolBoxTop/TooltipPositionSlice'
import {
  CENTER_VERTICAL, CENTER_HORIZONTAL,
  TOP_LEFT, TOP_RIGHT, TOP_CENTER,
  MIDDLE_LEFT, MIDDLE_CENTER, MIDDLE_RIGHT,
  BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT
} from "../../../../constant";

const TooltipPosition = ({
  onPosition,
  isOpen,
  onToggle
}) => {
  const dispatch = useDispatch();
  const isLockObject = useSelector((state) => state.tooltipPosition.isLockObject);

  const handleLockObjectChange = () => {
    if (isLockObject) {
      dispatch(unlockObject());
    } else {
      dispatch(lockObject());
    }
  }

  const moveToCenterVertical = () => {
    if (onPosition)
      onPosition(CENTER_VERTICAL);
  }

  const moveToCenterHorizontal = () => {
    if (onPosition)
      onPosition(CENTER_HORIZONTAL);
  }

  const moveToTopLeft = () => {
    if (onPosition)
      onPosition(TOP_LEFT);
  }

  const moveToTopRight = () => {
    if (onPosition)
      onPosition(TOP_RIGHT);
  }

  const moveToTopCenter = () => {
    if (onPosition)
      onPosition(TOP_CENTER);
  }

  const moveToMiddleLeft = () => {
    if (onPosition)
      onPosition(MIDDLE_LEFT);
  }

  const moveToMiddleRight = () => {
    if (onPosition)
      onPosition(MIDDLE_RIGHT);
  }

  const moveToMiddleCenter = () => {
    if (onPosition)
      onPosition(MIDDLE_CENTER);
  }

  const moveToBottomLeft = () => {
    if (onPosition)
      onPosition(BOTTOM_LEFT);
  }

  const moveToBottomRight = () => {
    if (onPosition)
      onPosition(BOTTOM_RIGHT);
  }

  const moveToBottomCenter = () => {
    if (onPosition)
      onPosition(BOTTOM_CENTER);
  }

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      key="tooltipPosition"
      show={isOpen}
      onToggle={onToggle}
      overlay={
        <Popover>
          <Popover.Body>
            <div className='row'>
              <div className='col-12'>
                <div className="form-check form-switch">
                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Lock Object Position</label>
                  <input className="form-check-input" type="checkbox" onChange={handleLockObjectChange} checked={isLockObject} value={isLockObject} role="switch" />
                </div>
              </div>
            </div>
            <hr />
            {!isLockObject && (
              <>
                <div className='row mb-3'>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToCenterVertical}>
                      <MoveVertical size={20} style={{ color: 'var(--primary-color, #2196F3)' }} />
                    </a>
                  </div>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToTopLeft}>
                      <ArrowUpLeft size={20} style={{ color: 'var(--primary-color, #2196F3)' }} />
                    </a>
                  </div>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToTopCenter}>
                      <ArrowUp size={20} style={{ color: 'var(--primary-color, #2196F3)' }} /></a>
                  </div>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToTopRight}>
                      <ArrowUpRight size={20} style={{ color: 'var(--primary-color, #2196F3)' }} />
                    </a>
                  </div>
                </div>

                <div className='row mb-3'>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToCenterHorizontal}>
                      <MoveHorizontal size={20} style={{ color: 'var(--primary-color, #2196F3)' }} />
                    </a>
                  </div>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToMiddleLeft}>
                      <ArrowLeft size={20} style={{ color: 'var(--primary-color, #2196F3)' }} />
                    </a>
                  </div>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToMiddleCenter}>
                      <Circle size={20} style={{ color: 'var(--primary-color, #2196F3)' }} />
                    </a>
                  </div>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToMiddleRight}>
                      <ArrowRight size={20} style={{ color: 'var(--primary-color, #2196F3)' }} />
                    </a>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-3 text-center'> </div>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToBottomLeft}>
                      <ArrowDownLeft size={20} style={{ color: 'var(--primary-color, #2196F3)' }} />
                    </a>
                  </div>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToBottomCenter}>
                      <ArrowDown size={20} style={{ color: 'var(--primary-color, #2196F3)' }} />
                    </a>
                  </div>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToBottomRight}>
                      <ArrowDownRight size={20} style={{ color: 'var(--primary-color, #2196F3)' }} />
                    </a>
                  </div>
                </div>
              </>
            )}
          </Popover.Body>
        </Popover>
      }
    >
      <a className={`link-button me-3 ${isOpen ? 'active' : ''}`}>
        <Move size={20} />
      </a>
    </OverlayTrigger>
  );

};

export default TooltipPosition;
