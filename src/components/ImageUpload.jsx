
import { useRef, useState } from "react";
import { convertImageToWebp } from "../utils/imageConverter";
import { getImageDimensions } from "../utils/imageUtil";
import { uploadToS3 } from "../utils/s3Upload";
import { Upload } from "lucide-react";
import {
    generatePreasignedUploadImage
} from "../api/storageApi";
import {
    uploadImage,
} from "../api/designDataToolsApi";


export const ImageUpload = ({ onSuccess, onFailed, onProgress, onUpload }) => {
    const fileInputRef = useRef(null);

    const handleChooseFile = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const selectedFiles = event.target.files;
        if (!selectedFiles || selectedFiles.length <= 0) return;
        Array.from(selectedFiles).forEach((selectedFile) => {
            if (!selectedFile.type.startsWith("image/")) {
                alert("File harus berupa gambar");
                return;
            }
        });
        try {
            Array.from(selectedFiles).forEach(async (selectedFile, index) => {
                handleUpload(index, selectedFile);
            });
        } catch (error) {
            alert("Gagal mengonversi gambar: " + error.message);
            if (onFailed) onFailed(error);
        } finally {
        }
    };

    const handleUpload = async (id, selectedFile) => {
        if (!selectedFile) return;
        const objectUrl = URL.createObjectURL(selectedFile);
        const webpFile = await convertImageToWebp(selectedFile, 100, null, 0.85);

        onUpload && onUpload({
            id: id,
            preview: URL.createObjectURL(webpFile),
        });

        const presignedUrlOriginalFile = await generatePreasignedUploadImage(selectedFile.name);
        const presignedUrlWebFile = await generatePreasignedUploadImage(webpFile.name);
        if (!presignedUrlOriginalFile || !presignedUrlWebFile || !presignedUrlOriginalFile.data || !presignedUrlWebFile.data) {
            throw new Error("Gagal mendapatkan presigned URL");
        }

        const uploadUrlOriginalFile = presignedUrlOriginalFile.data.uploadUrl;
        const methodOriginalFile = presignedUrlOriginalFile.data.method;
        const uploadUrlWebFile = presignedUrlWebFile.data.uploadUrl;
        const methodWebFile = presignedUrlWebFile.data.method;

        uploadToS3(uploadUrlOriginalFile, methodOriginalFile, selectedFile, (progress) => {
            if (onProgress) onProgress(progress);
        });
        uploadToS3(uploadUrlWebFile, methodWebFile, webpFile, (progress) => {
            if (onProgress) onProgress(progress);
        });

        const { width: originalWidth, height: originalHeight } = await getImageDimensions(selectedFile);
        const { width: webpWidth, height: webpHeight } = await getImageDimensions(webpFile);
        const response = await uploadImage(JSON.stringify({
            url: presignedUrlOriginalFile.data.publicUrl,
            urlThumbnail: presignedUrlWebFile.data.publicUrl,
            format: selectedFile.type,
            width: originalWidth,
            height: originalHeight,
            objectKey: presignedUrlOriginalFile.data.objectKey,
            objectKeyThumbnail: presignedUrlWebFile.data.objectKey,
        }));
        response.urlThumbnail = URL.createObjectURL(webpFile);
        if (onSuccess) onSuccess(id, response);
    };
    return (
        <div className="sidebar-wrapper">
            <button className="tool-property-btn" type="button" onClick={handleChooseFile}>
                <Upload size={14} />
                Upload
            </button>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleFileChange}
            />
        </div>
    );
};
