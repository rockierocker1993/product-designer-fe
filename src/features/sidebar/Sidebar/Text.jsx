import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTextItem } from "../../../store/components/AddCanvasItemSlice";
import { fetchTextStylesList, fetchFontsList } from "../../../api/textsApi";
import { SidebarPanelShell, SidebarGridState } from "./components";
import { useLoadableData } from "../../../hooks";

const Text = () => {
  const dispatch = useDispatch();
  const {
    data: textStyles,
    loading: loadingTextStyles,
    error: textStylesError,
    reload: loadTextStyles,
  } = useLoadableData(fetchTextStylesList);
  const {
    data: fonts,
    loading: loadingFonts,
    error: fontsError,
    reload: loadFonts,
  } = useLoadableData(fetchFontsList);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState('styles'); // 'styles' or 'fonts'

  const loading = loadingTextStyles || loadingFonts;
  const error = textStylesError || fontsError;

  const loadTextData = async () => {
    await Promise.all([loadTextStyles(), loadFonts()]);
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

  const footerText = !loading && !error
    ? activeTab === 'styles'
      ? `${filteredStyles.length} of ${textStyles.length} styles`
      : `${filteredFonts.length} of ${fonts.length} fonts`
    : null;

  const textAction = (
    <button className="add-text-btn" onClick={handleAddText}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <polyline points="4 7 4 4 20 4 20 7"/>
        <line x1="9" y1="20" x2="15" y2="20"/>
        <line x1="12" y1="4" x2="12" y2="20"/>
      </svg>
      Add Text
    </button>
  );

  const textFilters = (
    <>
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
    </>
  );

  return (
    <SidebarPanelShell
      title="Text"
      subtitle="Add text to your design"
      actions={textAction}
      filters={textFilters}
      filtersClassName="sidebar-tabs"
      searchPlaceholder={`Search ${activeTab}...`}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      footer={footerText}
    >
      <div className="text-content">
        <SidebarGridState
          loading={loading}
          loadingText={`Loading ${activeTab}...`}
          error={error}
          onRetry={loadTextData}
          empty={false}
          emptyText=""
        />

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
    </SidebarPanelShell>
  );
};

export default Text;
