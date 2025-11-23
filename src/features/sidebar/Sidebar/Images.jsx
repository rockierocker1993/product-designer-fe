import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addImageItem } from "../../../store/components/AddCanvasItemSlice";
import { fetchImagesList, uploadImage } from "../../../api/imagesApi";
import '../../../assets/css/sidebar.css';

const Images = () => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchImagesList();
      setImages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
      setImages([uploadedImage, ...images]);
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

  return (
    <div className="col column menu-detail">
    <div className="sidebar-content">
      <div className="sidebar-header">
        <h3 className="sidebar-title">Images</h3>
        <p className="sidebar-subtitle">Click to add image</p>
      </div>

      {/* Upload Button */}
      <div className="sidebar-actions">
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
      </div>

      {/* Search Bar */}
      <div className="sidebar-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </div>

      {/* Images Grid */}
      <div className="items-grid images-grid">
        {loading && (
          <div className="grid-message">
            <div className="spinner"></div>
            <p>Loading images...</p>
          </div>
        )}

        {error && (
          <div className="grid-message error">
            <p>Error: {error}</p>
            <button onClick={loadImages} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filteredImages.length === 0 && (
          <div className="grid-message">
            <p>No images found</p>
          </div>
        )}

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

      {/* Footer */}
      {!loading && !error && images.length > 0 && (
        <div className="sidebar-footer">
          Showing {filteredImages.length} of {images.length} images
        </div>
      )}
    </div>
    </div>
  );
};

export default Images;