import { fabric } from "fabric";
import { customTransformControl, setupControlsVisibility } from "./canvasObjectSellectionControll.js"

export const initializeCanvas = async (containerRef,fabricRef,canvasRef, config) => {
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
        const designArea = buildDesignAreaBoundary({
            top: config.boundary.top + productTop,
            left: config.boundary.left + productLeft,
            width: config.boundary.width,
            height: config.boundary.height,
        });
        canvas.add(designArea);
    }
    // ==================================
    // 3. Object Added Event
    // ==================================

    createCanvasEventHandlers(canvas, maskImage, config.outsideOpacity, config.outsideOpacity);
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


/**
 * Membuat efek transparansi pada bagian objek
 * yang berada di luar Design Boundary.
 *
 * Objek tetap satu instance Fabric.js.
 */
export const applyPartialTransparency = async (object, DESIGN_BOUNDARY, CANVAS_WIDTH, CANVAS_HEIGHT, OUTSIDE_OPACITY) => {
    if (object.__partialTransparencyApplied) return;
    const originalRender = object.render.bind(object);
    object.__partialTransparencyApplied = true;
    object.render = function (ctx) {
        // Saat export, render objek secara normal.
        if (this.canvas?.__exporting) {
            originalRender(ctx);
            return;
        }
        const { left, top, width, height } = DESIGN_BOUNDARY;
        const right = left + width;
        const bottom = top + height;
        ctx.save();
        // ==================================
        // 1. Render area luar opacity ${OUTSIDE_OPACITY}
        // ==================================
        ctx.globalAlpha *= OUTSIDE_OPACITY;
        ctx.beginPath();
        // Area atas
        ctx.rect(0, 0, CANVAS_WIDTH, top);
        // Area bawah
        ctx.rect(0, bottom, CANVAS_WIDTH, CANVAS_HEIGHT - bottom);
        // Area kiri
        ctx.rect(0, top, left, height);
        // Area kanan
        ctx.rect(right, top, CANVAS_WIDTH - right, height);
        ctx.clip();
        originalRender(ctx);
        ctx.restore();
        // ==================================
        // 2. Render area dalam opacity 100%
        // ==================================
        ctx.save();
        ctx.beginPath();
        ctx.rect(left, top, width, height);
        ctx.clip();
        originalRender(ctx);
        ctx.restore();
    };
}

export const applyImageShapeTransparency = (
    object,
    maskImage,
    OUTSIDE_OPACITY = 0.2
) => {
    if (!object || !maskImage) {
        throw new Error("Object dan maskImage wajib tersedia");
    }

    if (object.__imageShapeTransparencyApplied) {
        return object.__imageShapeTransparencyCleanup;
    }

    const originalRender = object.render.bind(object);

    const objectCanvas = document.createElement("canvas");
    const maskCanvas = document.createElement("canvas");
    const outsideCanvas = document.createElement("canvas");
    const insideCanvas = document.createElement("canvas");
    const resultCanvas = document.createElement("canvas");

    const objectCtx = objectCanvas.getContext("2d");
    const maskCtx = maskCanvas.getContext("2d");
    const outsideCtx = outsideCanvas.getContext("2d");
    const insideCtx = insideCanvas.getContext("2d");
    const resultCtx = resultCanvas.getContext("2d");

    const resizeCanvas = (canvas, width, height) => {
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }
    };

    // FIX: Bersihkan seluruh buffer dengan identity transform
    const clearCanvas = (ctx, width, height) => {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, width, height);
        ctx.restore();
    };

    object.__imageShapeTransparencyApplied = true;

    object.render = function (ctx) {
        // Export menggunakan rendering normal
        if (this.canvas?.__exporting) {
            originalRender(ctx);
            return;
        }

        const width = ctx.canvas.width;
        const height = ctx.canvas.height;

        resizeCanvas(objectCanvas, width, height);
        resizeCanvas(maskCanvas, width, height);
        resizeCanvas(outsideCanvas, width, height);
        resizeCanvas(insideCanvas, width, height);
        resizeCanvas(resultCanvas, width, height);

        const transform = ctx.getTransform();

        // ==========================================
        // 1. Render objek desain
        // ==========================================

        clearCanvas(objectCtx, width, height);

        objectCtx.setTransform(transform);
        originalRender(objectCtx);

        // ==========================================
        // 2. Render alpha mask
        // ==========================================

        clearCanvas(maskCtx, width, height);

        const maskElement = maskImage.getElement();
        const maskTransform = maskImage.calcTransformMatrix();

        maskCtx.setTransform(transform);
        maskCtx.transform(...maskTransform);

        maskCtx.drawImage(
            maskElement,
            -maskImage.width / 2,
            -maskImage.height / 2,
            maskImage.width,
            maskImage.height
        );

        // ==========================================
        // 3. Outside area
        // ==========================================

        clearCanvas(outsideCtx, width, height);

        outsideCtx.globalCompositeOperation = "source-over";
        outsideCtx.drawImage(objectCanvas, 0, 0);

        outsideCtx.globalCompositeOperation = "destination-out";
        outsideCtx.drawImage(maskCanvas, 0, 0);

        outsideCtx.globalCompositeOperation = "source-over";

        // ==========================================
        // 4. Inside area
        // ==========================================

        clearCanvas(insideCtx, width, height);

        insideCtx.globalCompositeOperation = "source-over";
        insideCtx.drawImage(objectCanvas, 0, 0);

        insideCtx.globalCompositeOperation = "destination-in";
        insideCtx.drawImage(maskCanvas, 0, 0);

        insideCtx.globalCompositeOperation = "source-over";

        // ==========================================
        // 5. Combine
        // ==========================================

        clearCanvas(resultCtx, width, height);

        resultCtx.globalAlpha = OUTSIDE_OPACITY;
        resultCtx.drawImage(outsideCanvas, 0, 0);

        resultCtx.globalAlpha = 1;
        resultCtx.drawImage(insideCanvas, 0, 0);

        resultCtx.globalAlpha = 1;
        resultCtx.globalCompositeOperation = "source-over";

        // ==========================================
        // 6. Draw result to Fabric context
        // ==========================================

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(resultCanvas, 0, 0);
        ctx.restore();
    };

    const cleanup = () => {
        object.render = originalRender;

        object.__imageShapeTransparencyApplied = false;
        delete object.__imageShapeTransparencyCleanup;

        object.canvas?.requestRenderAll();
    };

    object.__imageShapeTransparencyCleanup = cleanup;

    object.canvas?.requestRenderAll();

    return cleanup;
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

export const createCanvasEventHandlers = (canvas, maskImage, outsideOpacity, DESIGN_MODE) => {
    const handleObjectAdded = (event) => {
        const object = event.target;
        if (
            !object ||
            object.isDesignBoundary ||
            object.isProductBackground
        ) {
            return;
        }
        if (DESIGN_MODE === "BOUNDARY") {
            return;
        } else {
            applyImageShapeTransparency(
                object,
                maskImage,
                outsideOpacity
            );
        }
    };
    canvas.on("object:added", handleObjectAdded);
};

export const cleanCanvasEventHandlers = (canvas) => {
    canvas.off("object:added");
};