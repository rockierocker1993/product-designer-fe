import { setFlipX, setFlipY, setRotate, setSkewX, setSkewY, setWidth, setHeight } from "../../../store/ObjectTransform";
export const createCanvasEventHandlers = (canvas, maskImage, config, dispatch) => {

    const handleObjectAdded = (event) => {
        onObjectAdded(canvas, event, maskImage, config);
    };
    const handleObjectSelected = () => {
        onObjectSelected(canvas.getActiveObject(), dispatch);
    };
    const handleObjectModified = (event) => {
        onObjectSelected(event.target, dispatch);
    };

    canvas.on("object:added", handleObjectAdded);
    canvas.on("object:selected", handleObjectSelected);
    canvas.on('selection:created', handleObjectSelected);
    canvas.on('selection:updated', handleObjectSelected);
    canvas.on('object:modified', handleObjectModified);
};

const onObjectAdded = (canvas, event, maskImage, config) => {
    const object = event.target;
    if (
        !object ||
        object.isDesignBoundary ||
        object.isProductBackground
    ) {
        return;
    }
    if (config.designMode === "BOUNDARY") {
        applyPartialTransparency(
            object,
            config.boundary,
            canvas.width,
            canvas.height,
            config.outsideOpacity
        );
    } else {
        applyImageShapeTransparency(
            object,
            maskImage,
            config.outsideOpacity
        );
    }
};

const onObjectSelected = (object, dispatch) => {
    if (!object) return;

    const activeRotate = parseInt(object.angle) || 0;
    const activeSkewY = object.skewY || 0;
    const activeSkewX = object.skewX || 0;
    const activeFlipY = object.flipY || false;
    const activeFlipX = object.flipX || false;
    const activeWidth = object.getScaledWidth() || 0;
    const activeHeight = object.getScaledHeight() || 0;
    dispatch(setRotate({ data: activeRotate, renderObject: false }));
    dispatch(setSkewY({ data: activeSkewY, renderObject: false }));
    dispatch(setSkewX({ data: activeSkewX, renderObject: false }));
    dispatch(setFlipY({ data: activeFlipY, renderObject: false }));
    dispatch(setFlipX({ data: activeFlipX, renderObject: false }));
    dispatch(setWidth({ data: Math.trunc(activeWidth), renderObject: false }));
    dispatch(setHeight({ data: Math.trunc(activeHeight), renderObject: false }));
};

export const cleanCanvasEventHandlers = (canvas) => {
    canvas.off("object:added");
    canvas.off("object:selected");
    canvas.off("selection:created");
    canvas.off("selection:updated");
};

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
