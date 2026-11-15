
export const convertImageToWebp = (
    file,
    width = null,
    height = null,
    quality = 0.85
) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        const objectUrl = URL.createObjectURL(file);

        image.onload = () => {
            try {
                const originalWidth = image.naturalWidth;
                const originalHeight = image.naturalHeight;

                let targetWidth = width;
                let targetHeight = height;

                // Jika width dan height tidak ditentukan,
                // gunakan resolusi asli.
                if (!targetWidth && !targetHeight) {
                    targetWidth = originalWidth;
                    targetHeight = originalHeight;
                }
                // Jika hanya width yang ditentukan,
                // hitung height berdasarkan aspect ratio.
                else if (targetWidth && !targetHeight) {
                    targetHeight = Math.round(
                        originalHeight * targetWidth / originalWidth
                    );
                }
                // Jika hanya height yang ditentukan,
                // hitung width berdasarkan aspect ratio.
                else if (!targetWidth && targetHeight) {
                    targetWidth = Math.round(
                        originalWidth * targetHeight / originalHeight
                    );
                }

                const canvas = document.createElement("canvas");
                canvas.width = targetWidth;
                canvas.height = targetHeight;

                const context = canvas.getContext("2d");

                context.drawImage(
                    image,
                    0,
                    0,
                    targetWidth,
                    targetHeight
                );

                canvas.toBlob(
                    (blob) => {
                        URL.revokeObjectURL(objectUrl);

                        if (!blob) {
                            reject(new Error("Failed to convert image"));
                            return;
                        }

                        const webpFile = new File(
                            [blob],
                            file.name.replace(/\.[^.]+$/, ".webp"),
                            {
                                type: "image/webp"
                            }
                        );

                        resolve(webpFile);
                    },
                    "image/webp",
                    quality
                );

            } catch (error) {
                URL.revokeObjectURL(objectUrl);
                reject(error);
            }
        };

        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Failed to load image"));
        };

        image.src = objectUrl;
    });
};
