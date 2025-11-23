import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addClipartItem } from "../../../store/components/AddCanvasItemSlice";
import { fetchClipartsList } from "../../../api/clipartsApi";
import '../../../assets/css/sidebar.css';

const Cliparts = () => {
  const dispatch = useDispatch();
  const [cliparts, setCliparts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadCliparts();
  }, []);

  const loadCliparts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchClipartsList();
      setCliparts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClipartClick = (clipartId) => {
    dispatch(addClipartItem(`clipart-${clipartId}`));
  };

  const categories = ['all', ...new Set(cliparts.map(c => c.category).filter(Boolean))];

  const filteredCliparts = cliparts.filter(clipart => {
    const matchesSearch = clipart.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clipart.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || clipart.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="col column menu-detail">
    <div className="sidebar-content">
      <div className="sidebar-header">
        <h3 className="sidebar-title">Cliparts</h3>
        <p className="sidebar-subtitle">Click to add clipart</p>
      </div>

      {/* Categories */}
      {categories.length > 1 && (
        <div className="categories-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Search Bar */}
      <div className="sidebar-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search cliparts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </div>

      {/* Cliparts Grid */}
      <div className="items-grid">
        {loading && (
          <div className="grid-message">
            <div className="spinner"></div>
            <p>Loading cliparts...</p>
          </div>
        )}

        {error && (
          <div className="grid-message error">
            <p>Error: {error}</p>
            <button onClick={loadCliparts} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filteredCliparts.length === 0 && (
          <div className="grid-message">
            <p>No cliparts found</p>
          </div>
        )}

        {!loading && !error && filteredCliparts.map((clipart) => (
          <div
            key={clipart.id}
            className="grid-item"
            onClick={() => handleClipartClick(clipart.id)}
            title={clipart.name}
          >
            <div className="item-preview">
              {clipart.thumbnail ? (
                <img src={clipart.thumbnail} alt={clipart.name} />
              ) : clipart.svg ? (
                <div 
                  dangerouslySetInnerHTML={{ __html: clipart.svg }}
                  className="svg-preview"
                />
              ) : (
                <div className="item-placeholder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                  </svg>
                </div>
              )}
            </div>
            <div className="item-name">{clipart.name}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      {!loading && !error && cliparts.length > 0 && (
        <div className="sidebar-footer">
          Showing {filteredCliparts.length} of {cliparts.length} cliparts
        </div>
      )}
    </div>
    </div>
  );
};

export default Cliparts;
