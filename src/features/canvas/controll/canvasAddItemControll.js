import { fabric } from "fabric";

export const addImage = (canvas, url, options = {}) => {
    return new Promise((resolve, reject) => {
        if (!canvas || !url) {
            reject(new Error("Canvas and image URL are required"));
            return;
        }
        fabric.Image.fromURL(
            url,
            (img) => {
                if (!img) {
                    reject(new Error("Failed to load image from URL"));
                    return;
                }
                const { scale } = calculateSizeItem(canvas, options, img.width, img.height);
                const { left, top } = getMiddleCenterBoundary(img.width, img.height, options.boundary);
                img.set({
                    left: left,
                    top: top,
                    originX: "center",
                    originY: "center",
                    scaleX: scale,
                    scaleY: scale,
                    selectable: true,
                    evented: true,
                    hasControls: true,
                    hasBorders: true,
                });

                canvas.add(img);
                canvas.setActiveObject(img);
                canvas.requestRenderAll();

                resolve(img);
            },
            {
                crossOrigin: "anonymous",
            }
        );
    });
};

export const addText = async (
    canvas,
    textValue = "Your Design",
    options = {}
) => {
    if (!canvas) return null;

    const fontFamily = options.fontFamily ?? "Arial";
    const fontSize = options.fontSize ?? 40;

    await document.fonts.load(`${options.fontWeight ?? "normal"} ${fontSize}px "${fontFamily}"`);
    const { left, top } = getMiddleCenterBoundary(100, 30, options.boundary);
    const text = new fabric.IText(textValue, {
        left: left,
        top: top,
        originX: "center",
        originY: "center",
        fontFamily,
        fontSize,
        fontWeight: options.fontWeight ?? "normal",
        fontStyle: options.fontStyle ?? "normal",
        fill: options.fill ?? "#000000",
        textAlign: options.textAlign ?? "center",
        selectable: true,
        editable: true,
        evented: true,
        ...options,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.requestRenderAll();

    return text;
};


function calculateSizeItem(canvas, options, objectWidth, objectHeight) {
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();

    const maxWidth = options.maxWidth ?? canvasWidth * 0.8;
    const maxHeight = options.maxHeight ?? canvasHeight * 0.8;

    const imageWidth = objectWidth || 1;
    const imageHeight = objectHeight || 1;

    const scale = Math.min(
        maxWidth / imageWidth,
        maxHeight / imageHeight,
        1
    );
    console.log("Calculated scale:", scale);
    console.log("Scaled width:", imageWidth * scale);
    console.log("Scaled height:", imageHeight * scale);
    return {
        scale: scale,
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
        objectWidth: objectWidth,
        objectHeight: objectHeight,
        maxWidth: maxWidth,
        maxHeight: maxHeight
    }
}

export function getMiddleCenterBoundary(objWidth, objHeight, boundary) {
    if (!boundary) return null;
    const left = boundary.left + (objWidth / 2);
    const top = boundary.top + (objHeight / 2);
    const centerX = left + (boundary.width / 2);
    const centerY = top + (boundary.height / 2);
    return {
        left: centerX - (objWidth / 2),
        top: centerY - (objHeight / 2)
    };
}