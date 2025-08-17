import { OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpDownLeftRight, faArrowsToCircle, faArrowsUpDown, faArrowUp, faArrowDown, faArrowRight, faArrowLeft, faArrowTurnDown } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { lockObject, unlockObject } from '../../../store/components/CanvasEditor/ToolBoxTop/TooltipPositionSlice'
import {
  CENTER_VERTICAL, CENTER_HORIZONTAL,
  TOP_LEFT, TOP_RIGHT, TOP_CENTER,
  MIDDLE_LEFT, MIDDLE_CENTER, MIDDLE_RIGHT,
  BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT
} from "../../../constant";

const TooltipPosition = ({
  onPosition
}) => {
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
                      <FontAwesomeIcon icon='fa-arrows-up-down' size="lg" style={{ marginBottom: '5px' }} />
                    </a>
                  </div>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToTopLeft}>
                      <FontAwesomeIcon className='top-left-deg' icon='fa-arrow-up' size="lg" style={{ marginBottom: '5px' }} />
                    </a>
                  </div>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToTopCenter}>
                      <FontAwesomeIcon icon='fa-arrow-up' size="lg" style={{ marginBottom: '5px' }} /></a>
                  </div>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToTopRight}>
                      <FontAwesomeIcon className='top-right-deg' icon='fa-arrow-up' size="lg" style={{ marginBottom: '5px' }} />
                    </a>
                  </div>
                </div>

                <div className='row mb-3'>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToCenterHorizontal}>
                      <FontAwesomeIcon className='right-deg' icon='fa-arrows-up-down' size="lg" style={{ marginBottom: '5px' }} />
                    </a>
                  </div>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToMiddleLeft}>
                      <FontAwesomeIcon icon='fa-arrow-left' size="lg" style={{ marginBottom: '5px' }} />
                    </a>
                  </div>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToMiddleCenter}>
                      <FontAwesomeIcon icon='fa-arrows-to-circle' size="lg" style={{ marginBottom: '5px' }} />
                    </a>
                  </div>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToMiddleRight}>
                      <FontAwesomeIcon icon='fa-arrow-right' size="lg" style={{ marginBottom: '5px' }} />
                    </a>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-3 text-center'> </div>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToBottomLeft}>
                      <FontAwesomeIcon className='bottom-left-deg' icon='fa-arrow-up' size="lg" style={{ marginBottom: '5px' }} />
                    </a>
                  </div>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToBottomCenter}>
                      <FontAwesomeIcon icon='fa-arrow-down' size="lg" style={{ marginBottom: '5px' }} />
                    </a>
                  </div>
                  <div className='col-3 text-center'>
                    <a className='btn-position' onClick={moveToBottomRight}>
                      <FontAwesomeIcon className='bottom-right-deg' icon='fa-arrow-up' size="lg" style={{ marginBottom: '5px' }} />
                    </a>
                  </div>
                </div>
              </>
            )}
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
