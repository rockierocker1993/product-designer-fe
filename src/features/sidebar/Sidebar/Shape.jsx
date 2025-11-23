import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addShapesItem } from "../../../store/components/AddCanvasItemSlice";
import { fetchShapesList } from "../../../api/shapesApi";
import '../../../assets/css/sidebar.css';

const Shape = () => {
  const dispatch = useDispatch();
  const [shapes, setShapes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadShapes();
  }, []);

  const loadShapes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchShapesList();
      setShapes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShapeClick = (shapeId) => {
    dispatch(addShapesItem(`api-${shapeId}`));
  };

  const handleDragStart = (e, shape) => {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('application/json', JSON.stringify({
      type: 'shape',
      id: shape.id,
      name: shape.name,
      svg: shape.svg,
      thumbnail: shape.thumbnail
    }));
  };

  const filteredShapes = shapes.filter(shape => 
    shape.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shape.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="col column menu-detail">
    <div className="sidebar-content">
      <div className="sidebar-header">
        <h3 className="sidebar-title">Shapes</h3>
        <p className="sidebar-subtitle">Click to add shape</p>
      </div>

      {/* Search Bar */}
      <div className="sidebar-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search shapes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </div>

      {/* Shapes Grid */}
      <div className="items-grid shapes-grid">
        {loading && (
          <div className="grid-message">
            <div className="spinner"></div>
            <p>Loading shapes...</p>
          </div>
        )}

        {error && (
          <div className="grid-message error">
            <p>Error: {error}</p>
            <button onClick={loadShapes} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filteredShapes.length === 0 && (
          <div className="grid-message">
            <p>No shapes found</p>
          </div>
        )}

        {!loading && !error && filteredShapes.map((shape) => (
          <div
            key={shape.id}
            className="grid-item"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, shape)}
            onClick={() => handleShapeClick(shape.id)}
            title={shape.name}
          >
            <div className="item-preview">
              {shape.thumbnail ? (
                <img src={shape.thumbnail} alt={shape.name} />
              ) : (
                <div 
                  dangerouslySetInnerHTML={{ __html: shape.svg }}
                  className="svg-preview"
                />
              )}
            </div>
            <div className="item-name">{shape.name}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      {!loading && !error && shapes.length > 0 && (
        <div className="sidebar-footer">
          Showing {filteredShapes.length} of {shapes.length} shapes
        </div>
      )}
    </div>
    </div>
  );
};

export default Shape;
