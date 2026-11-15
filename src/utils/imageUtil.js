export const getImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        const objectUrl = URL.createObjectURL(file);
        image.onload = () => {
            resolve({
                width: image.naturalWidth,
                height: image.naturalHeight
            });
            URL.revokeObjectURL(objectUrl);
        };

        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Failed to load image"));
        };

        image.src = objectUrl;
    });
};