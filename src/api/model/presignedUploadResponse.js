export class PresignedUploadResponseModel {
    constructor({
        bucket = null,
        objectKey = '',
        uploadUrl = '',
        publicUrl = '',
        method = '',
        contentType = '',
        expiresIn = null,
    } = {}) {
        this.bucket = bucket;
        this.objectKey = objectKey;
        this.uploadUrl = uploadUrl;
        this.publicUrl = publicUrl;
        this.method = method;
        this.contentType = contentType;
        this.expiresIn = expiresIn;
    }

    /**
     * @param {PresignedUploadResponseRaw} item
     * @returns {PresignedUploadResponseModel}
     */
    static from(item = {}) {
        return new PresignedUploadResponseModel({
            bucket: item.bucket ?? null,
            objectKey: item.objectKey || '',
            uploadUrl: item.uploadUrl || '',
            publicUrl: item.publicUrl || '',
            method: item.method || '',
            contentType: item.contentType || '',
            expiresIn: item.expiresIn || null,
        });
    }
}
