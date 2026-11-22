import { fabric } from "fabric";
import { customTransformControl, setupControlsVisibility } from "./canvasObjectSellectionControll.js"
import { createCanvasEventHandlers, cleanCanvasEventHandlers } from "./canvasEventHandlerControll.js"
import {
    ALIGNMENT_LEFT, ALIGNMENT_CENTER,
    ALIGNMENT_RIGHT, ALIGNMENT_TOP,
    ALIGNMENT_MIDDLE, ALIGNMENT_BOTTOM
} from "../../../constant.jsx";

export const initializeCanvas = async (containerRef, fabricRef, canvasRef, calculatedBoundaryRef, config, dispatch) => {
    const container = containerRef.current;

    if (!container || !canvasRef.current) return;
    let eventHandlersInitialized = false;
    const workspaceWidth = container.clientWidth;
    const workspaceHeight = container.clientHeight;
    const productTop = (workspaceHeight - config.height) / 2;
    const productLeft = (workspaceWidth - config.width) / 2;

    const canvas = new fabric.Canvas(canvasRef.current, {
        width: workspaceWidth,
        height: workspaceHeight,
        backgroundColor: null,
    });
    
    fabricRef.current = canvas;

    // ==================================
    // 1. Build Product Mockup
    // ==================================

    const productMockup = await buildProductMockup(
        canvas,
        fabricRef,
        {
            productUrl: config.mockupUrl,
            productBackground: config.mockupBackgroundColor,
            productWidth: config.width,
            productHeight: config.height,
            productLeft,
            productTop,
            backgroundPading: config.mockupBackgroundPadding,
        }
    );

    if (!productMockup) return;

    const { productGroup, maskImage } = productMockup;
    // ==================================
    // 2. Design Boundary
    // ==================================

    if (config.designMode === "BOUNDARY") {
        config.boundary.top = config.boundary.top + productTop;
        config.boundary.left = config.boundary.left + productLeft;
        calculatedBoundaryRef.current = config.boundary;
        const designArea = buildDesignAreaBoundary({
            top: config.boundary.top,
            left: config.boundary.left,
            width: config.boundary.width,
            height: config.boundary.height,
        });
        console.log("boundary", config.boundary);
        canvas.add(designArea);
    }
    // ==================================
    // 3. Object Added Event
    // ==================================

    createCanvasEventHandlers(canvas, maskImage, config, dispatch);
    eventHandlersInitialized = true;

    customTransformControl();
    setupControlsVisibility();
    fabric.Object.prototype.set({
        transparentCorners: false,
        cornerColor: 'transparent',
        borderColor: 'transparent',
    });

    canvas.requestRenderAll();

    return () => {
        if (eventHandlersInitialized) {
            cleanCanvasEventHandlers(canvas);
        }
    };
};

// Responsive canvas
export const resizeCanvas = (canvasRef, containerRef, originalWorkspaceHeight, originalWorkspaceWidth) => {
    /*
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    canvas.setDimensions({
        width: containerWidth,
        height: containerHeight,
    });

    // Original workspace size
    // const originalWidth = 1200;
    // const originalHeight = 800;

    const scale = Math.min(
        containerWidth / originalWorkspaceWidth,
        containerHeight / originalWorkspaceHeight
    );

    const offsetX = (containerWidth - originalWorkspaceWidth * scale) / 2;
    const offsetY = (containerHeight - originalWorkspaceHeight * scale) / 2;

    canvas.setViewportTransform([
        scale, 0,
        0, scale,
        offsetX, offsetY,
    ]);

    canvas.renderAll();
    */
};

export const buildProductMockup = (
    canvas,
    fabricRef,
    config
) => {
    return new Promise((resolve, reject) => {
        fabric.Image.fromURL(
            config.productUrl,
            (img) => {
                if (!img || fabricRef.current !== canvas) {
                    resolve(null);
                    return;
                }

                // Product background color
                const background = new fabric.Rect({
                    left: 0,
                    top: 0,
                    width: config.productWidth + config.backgroundPading,
                    height: config.productHeight + config.backgroundPading,
                    fill: config.productBackground,
                    originX: "left",
                    originY: "top",
                    selectable: false,
                    evented: false,
                });

                // Product image
                img.set({
                    left: config.backgroundPading / 2,
                    top: config.backgroundPading / 2,
                    originX: "left",
                    originY: "top",
                    scaleX: config.productWidth / img.width,
                    scaleY: config.productHeight / img.height,
                    selectable: false,
                    evented: false,
                });

                // Combine background and product image
                console.log(config.productLeft, config.productTop);
                const productGroup = new fabric.Group(
                    [background, img],
                    {
                        left: config.productLeft,
                        top: config.productTop,
                        originX: "left",
                        originY: "top",
                        selectable: false,
                        evented: false,
                        subTargetCheck: false,
                        objectCaching: false,
                    }
                );

                productGroup.isProductBackground = true;

                canvas.add(productGroup);
                canvas.sendToBack(productGroup);

                canvas.requestRenderAll();

                resolve({
                    productGroup,
                    maskImage: img
                });
            },
            { crossOrigin: "anonymous" }
        );
    });
};

export const buildDesignAreaBoundary = (DESIGN_BOUNDARY) => {
    const designArea = new fabric.Rect({
        left: DESIGN_BOUNDARY.left,
        top: DESIGN_BOUNDARY.top,
        width: DESIGN_BOUNDARY.width,
        height: DESIGN_BOUNDARY.height,
        fill: "transparent",
        stroke: "#16a34a",
        strokeWidth: 2,
        strokeDashArray: [8, 5],
        selectable: false,
        evented: false,
        excludeFromExport: true,
    });
    designArea.isDesignBoundary = true;
    return designArea;
};


/**
 * Move selected object to specific position within design area.
 *
 * @param {fabric.Canvas} canvas
 * @param {Object} boundary - Design area boundary
 * @param {number} backgroundPadding
 * @param {string} positionCode
 */
export const alignmentSelectedObject = (
    canvas,
    boundary,
    positionCode
) => {
    if (!canvas || !boundary) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    const objWidth = activeObject.getScaledWidth();
    const objHeight = activeObject.getScaledHeight();
    const left = boundary.left + (objWidth / 2);
    const top = boundary.top + (objHeight / 2);
    const boundaryWidth = boundary.width;
    const boundaryHeight = boundary.height;
    const centerX = left + (boundaryWidth / 2);
    const centerY = top + (boundaryHeight / 2);

    switch (positionCode) {
        case ALIGNMENT_LEFT:
            activeObject.set({
                left: left
            });
            break;

        case ALIGNMENT_RIGHT:
            activeObject.set({
                left: left + boundaryWidth - objWidth
            });
            break;

        case ALIGNMENT_CENTER:
            activeObject.set({
                left: centerX - (objWidth / 2)
            });
            break;

        case ALIGNMENT_TOP:
            activeObject.set({
                top: top
            });
            break;

        case ALIGNMENT_BOTTOM:
            activeObject.set({
                top: top + boundaryHeight - objHeight
            });
            break;

        case ALIGNMENT_MIDDLE:
            activeObject.set({
                top: centerY - (objHeight / 2)
            });
            break;

        default:
            return;
    }

    activeObject.setCoords();
    canvas.requestRenderAll();
};

export const transformSelectedObject = (canvas, objectTransform) => {
  if (!canvas) return;
  
  const activeObject = canvas.getActiveObject();
  if (!activeObject) return;

  const { rotate, skewX, skewY, flipX, flipY, width, height } = objectTransform;
   activeObject.set({
    skewX,
    skewY,
    flipX,
    flipY,
    scaleX: width / activeObject.width,
    scaleY: height / activeObject.height,
    angle: rotate
  });

  activeObject.setCoords();
  canvas.requestRenderAll();
};
