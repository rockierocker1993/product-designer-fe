import { createSlice } from "@reduxjs/toolkit";

const tooltipPositionSlice = createSlice({
  name: 'tooltipTransform',
  initialState: { centerVertical: true, centerHorizontal: false, topLeft: false, topRight: false, topCenter: false, middleLeft: false, middleRight: false, middleCenter: false, bottomLeft: false, bottomRight: false, bottomCenter: false, isLockObject: false },
  reducers: {
    moveToCenterVertical: (state, action) => {
      state.centerVertical = true;
    },
    resetCenterVertical: (state) => {
      state.centerVertical = false;
    },

    moveToCenterHorizontal: (state) => {
      state.centerHorizontal = true;
    },
    resetCenterHorizontal: (state, action) => {
      state.centerHorizontal = false;
    },

    moveToTopLeft: (state) => {
      state.topLeft = true;
    },
    resetTopLeft: (state, action) => {
      state.topLeft = false;
    },

    moveToTopRight: (state) => {
      state.topRight = true;
    },
    resetTopright: (state) => {
      state.topRight = false;
    },

    moveToTopCenter: (state) => {
      state.topCenter = true;
    },
    resetTopCenter: (state) => {
      state.topCenter = false;
    },

    moveToMiddleLeft: (state) => {
      state.middleLeft = true;
    },
    resetMiddleLeft: (state) => {
      state.middleLeft = false;
    },

    moveToMiddleRight: (state) => {
      state.middleRight = true;
    },
    resetMiddleRight: (state) => {
      state.middleRight = false;
    },

    moveToMiddleCenter: (state) => {
      state.middleCenter = true;
    },
    resetMiddleCenter: (state) => {
      state.middleCenter = false;
    },

    moveToBottomLeft: (state) => {
      state.bottomLeft = true;
    },
    resetBottomLeft: (state) => {
      state.bottomLeft = false;
    },

    moveToBottomRight: (state) => {
      state.bottomRight = true;
    },
    resetBottomRight: (state) => {
      state.bottomRight = false;
    },

    moveToBottomCenter: (state) => {
      state.bottomCenter = true;
    },
    resetBottomCenter: (state) => {
      state.bottomCenter = false;
    },

    lockObject: (state) => {
      state.isLockObject = true;
    },
    unlockObject: (state) => {
      state.isLockObject = false;
    }

  }
})

export const {
  moveToCenterVertical,
  resetCenterVertical,
  moveToCenterHorizontal,
  resetCenterHorizontal,
  moveToTopLeft,
  resetTopLeft,
  moveToTopRight,
  resetTopright,
  moveToTopCenter,
  resetTopCenter,
  moveToMiddleLeft,
  resetMiddleLeft,
  moveToMiddleRight,
  resetMiddleRight,
  moveToMiddleCenter,
  resetMiddleCenter,
  moveToBottomLeft,
  resetBottomLeft,
  moveToBottomRight,
  resetBottomRight,
  moveToBottomCenter,
  resetBottomCenter,
  lockObject,
  unlockObject
} = tooltipPositionSlice.actions;
export default tooltipPositionSlice.reducer;