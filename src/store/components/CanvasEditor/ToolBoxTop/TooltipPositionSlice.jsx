import { createSlice } from "@reduxjs/toolkit";

const tooltipPositionSlice = createSlice({
  name: 'tooltipTransform',
  initialState: { centerVertical: true, centerHorizontal: false, topLeft: false, topRight: false, topCenter: false, middleLeft: false, middleRight: false, middleCenter: false, bottomLeft: false, bottomRight: false, bottomCenter: false, isLockObject: false },
  reducers: {
    centerVertical: (state, action) => {
      state.centerVertical = true;
    },
    resetCenterVertical: (state) => {
      state.centerVertical = false;
    },

    centerHorizontal: (state) => {
      state.centerHorizontal = true;
    },
    resetCenterHorizontal: (state, action) => {
      state.centerHorizontal = false;
    },

    topLeft: (state) => {
      state.topLeft = true;
    },
    resetTopLeft: (state, action) => {
      state.topLeft = false;
    },

    topRight: (state) => {
      state.topRight = true;
    },
    resetTopright: (state) => {
      state.topRight = false;
    },

    topCenter: (state) => {
      state.topCenter = true;
    },
    resetTopCenter: (state) => {
      state.topCenter = false;
    },

    middleLeft: (state) => {
      state.middleLeft = true;
    },
    resetMiddleLeft: (state) => {
      state.middleLeft = false;
    },

    middleRight: (state) => {
      state.middleRight = true;
    },
    resetMiddleRight: (state) => {
      state.middleRight = false;
    },

    middleCenter: (state) => {
      state.middleCenter = true;
    },
    resetMiddleCenter: (state) => {
      state.middleCenter = false;
    },

    bottomLeft: (state) => {
      state.bottomLeft = true;
    },
    resetBottomLeft: (state) => {
      state.bottomLeft = false;
    },

    bottomRight: (state) => {
      state.bottomRight = true;
    },
    resetBottomRight: (state) => {
      state.bottomRight = false;
    },

    bottomCenter: (state) => {
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
  centerVertical,
  resetCenterVertical,
  centerHorizontal,
  resetCenterHorizontal,
  topLeft,
  resetTopLeft,
  topRight,
  resetTopright,
  topCenter,
  resetTopCenter,
  middleLeft,
  resetMiddleLeft,
  middleRight,
  resetMiddleRight,
  middleCenter,
  resetMiddleCenter,
  bottomLeft,
  resetBottomLeft,
  bottomRight,
  resetBottomRight,
  bottomCenter,
  resetBottomCenter,
  lockObject,
  unlockObject
} = tooltipTransformsSlice.actions;
export default tooltipPositionSlice.reducer;