import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTextItem } from "../../../store/components/AddCanvasItemSlice";
import { fetchTextStylesList, fetchFontsList } from "../../../api/textsApi";
import '../../../assets/css/sidebar.css';

const Text = () => {
  const dispatch = useDispatch();
  const [textStyles, setTextStyles] = useState([]);
  const [fonts, setFonts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState('styles'); // 'styles' or 'fonts'

  useEffect(() => {
    loadTextData();
  }, []);

  const loadTextData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [stylesData, fontsData] = await Promise.all([
        fetchTextStylesList(),
        fetchFontsList()
      ]);
      setTextStyles(stylesData);
      setFonts(fontsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddText = () => {
    dispatch(addTextItem('text-default'));
  };

  const handleStyleClick = (styleId) => {
    dispatch(addTextItem(`text-style-${styleId}`));
  };

  const handleFontClick = (fontFamily) => {
    dispatch(addTextItem(`text-font-${fontFamily}`));
  };

  const filteredStyles = textStyles.filter(style => 
    style.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFonts = fonts.filter(font => 
    font.family?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="col column menu-detail">
    <div className="sidebar-content">
      <div className="sidebar-header">
        <h3 className="sidebar-title">Text</h3>
        <p className="sidebar-subtitle">Add text to your design</p>
      </div>

      {/* Add Text Button */}
      <div className="sidebar-actions">
        <button className="add-text-btn" onClick={handleAddText}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="4 7 4 4 20 4 20 7"/>
            <line x1="9" y1="20" x2="15" y2="20"/>
            <line x1="12" y1="4" x2="12" y2="20"/>
          </svg>
          Add Text
        </button>
      </div>

      {/* Tabs */}
      <div className="sidebar-tabs">
        <button 
          className={`tab-btn ${activeTab === 'styles' ? 'active' : ''}`}
          onClick={() => setActiveTab('styles')}
        >
          Text Styles
        </button>
        <button 
          className={`tab-btn ${activeTab === 'fonts' ? 'active' : ''}`}
          onClick={() => setActiveTab('fonts')}
        >
          Fonts
        </button>
      </div>

      {/* Search Bar */}
      <div className="sidebar-search">
        <input
          type="text"
          className="search-input"
          placeholder={`Search ${activeTab}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </div>

      {/* Content */}
      <div className="text-content">
        {loading && (
          <div className="grid-message">
            <div className="spinner"></div>
            <p>Loading {activeTab}...</p>
          </div>
        )}

        {error && (
          <div className="grid-message error">
            <p>Error: {error}</p>
            <button onClick={loadTextData} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        {/* Text Styles */}
        {!loading && !error && activeTab === 'styles' && (
          <div className="text-styles-list">
            {filteredStyles.length === 0 ? (
              <div className="grid-message">
                <p>No text styles found</p>
              </div>
            ) : (
              filteredStyles.map((style) => (
                <div
                  key={style.id}
                  className="text-style-item"
                  onClick={() => handleStyleClick(style.id)}
                >
                  <div 
                    className="text-preview"
                    style={{
                      fontFamily: style.fontFamily,
                      fontSize: style.fontSize,
                      fontWeight: style.fontWeight,
                      color: style.color
                    }}
                  >
                    {style.previewText || 'Sample Text'}
                  </div>
                  <div className="text-style-name">{style.name}</div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Fonts */}
        {!loading && !error && activeTab === 'fonts' && (
          <div className="fonts-list">
            {filteredFonts.length === 0 ? (
              <div className="grid-message">
                <p>No fonts found</p>
              </div>
            ) : (
              filteredFonts.map((font) => (
                <div
                  key={font.family}
                  className="font-item"
                  onClick={() => handleFontClick(font.family)}
                >
                  <div 
                    className="font-preview"
                    style={{ fontFamily: font.family }}
                  >
                    {font.family}
                  </div>
                  <div className="font-sample" style={{ fontFamily: font.family }}>
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      {!loading && !error && (
        <div className="sidebar-footer">
          {activeTab === 'styles' 
            ? `${filteredStyles.length} of ${textStyles.length} styles`
            : `${filteredFonts.length} of ${fonts.length} fonts`
          }
        </div>
      )}
    </div>
    </div>
  );
};

export default Text;
