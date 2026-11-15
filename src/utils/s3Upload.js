
export const uploadToS3 = (presignedUrl, method, file, onProgress) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, presignedUrl, true);

        // Harus sama dengan Content-Type saat generate presigned URL
        xhr.setRequestHeader("Content-Type", file.type);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentage = Math.round(
                    (event.loaded / event.total) * 100
                );

                onProgress(percentage);
            }
        };

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(true);
            } else {
                reject(new Error(
                    `MinIO upload failed: ${xhr.status}`
                ));
            }
        };

        xhr.onerror = () => {
            reject(new Error("Network error during upload"));
        };

        xhr.onabort = () => {
            reject(new Error("Upload cancelled"));
        };

        // Kirim file langsung, bukan FormData
        xhr.send(file);
    });
};
