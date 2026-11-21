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
                const { scale, canvasWidth, canvasHeight } = calculateSizeItem(canvas, options, img.width, img.height);
                img.set({
                    left: options.left ?? canvasWidth / 2,
                    top: options.top ?? canvasHeight / 2,
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