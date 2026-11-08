import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addImageItem } from "../../../store/components/AddCanvasItemSlice";
import { fetchImagesList, uploadImage } from "../../../api/imagesApi";
import { SidebarPanelShell, SidebarGridState } from "./components";
import { useLoadableData } from "../../../hooks";

const Images = () => {
  const dispatch = useDispatch();
  const {
    data: images,
    setData: setImages,
    loading,
    error,
    reload: loadImages,
  } = useLoadableData(fetchImagesList);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef(null);

  const handleImageClick = (imageId) => {
    dispatch(addImageItem(`image-${imageId}`));
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    try {
      const uploadedImage = await uploadImage(formData);
      setImages((previousImages) => [uploadedImage, ...previousImages]);
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  const filteredImages = images.filter(image => 
    image.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const footerText = !loading && !error && images.length > 0
    ? `Showing ${filteredImages.length} of ${images.length} images`
    : null;

  const uploadAction = (
    <>
      <button
        className="upload-btn"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{ display: 'none' }}
      />
    </>
  );

  return (
    <SidebarPanelShell
      title="Images"
      subtitle="Click to add image"
      actions={uploadAction}
      searchPlaceholder="Search images..."
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      footer={footerText}
    >
      <div className="items-grid images-grid">
        <SidebarGridState
          loading={loading}
          loadingText="Loading images..."
          error={error}
          onRetry={loadImages}
          empty={!loading && !error && filteredImages.length === 0}
          emptyText="No images found"
        />

        {!loading && !error && filteredImages.map((image) => (
          <div
            key={image.id}
            className="grid-item"
            onClick={() => handleImageClick(image.id)}
            title={image.name}
          >
            <div className="item-preview image-preview">
              {image.url ? (
                <img src={image.url} alt={image.name} />
              ) : (
                <div className="item-placeholder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </SidebarPanelShell>
  );
};

export default Images;