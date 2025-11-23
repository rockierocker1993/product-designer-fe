import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTemplateItem } from "../../../store/components/AddCanvasItemSlice";
import { fetchTemplatesList } from "../../../api/templatesApi";
import '../../../assets/css/sidebar.css';

const Templates = () => {
  const dispatch = useDispatch();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTemplatesList();
      setTemplates(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateClick = (templateId) => {
    dispatch(addTemplateItem(`template-${templateId}`));
  };

  const filteredTemplates = templates.filter(template => 
    template.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="col column menu-detail">
    <div className="sidebar-content">
      <div className="sidebar-header">
        <h3 className="sidebar-title">Templates</h3>
        <p className="sidebar-subtitle">Choose a template to start</p>
      </div>

      {/* Search Bar */}
      <div className="sidebar-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </div>

      {/* Templates Grid */}
      <div className="items-grid templates-grid">
        {loading && (
          <div className="grid-message">
            <div className="spinner"></div>
            <p>Loading templates...</p>
          </div>
        )}

        {error && (
          <div className="grid-message error">
            <p>Error: {error}</p>
            <button onClick={loadTemplates} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filteredTemplates.length === 0 && (
          <div className="grid-message">
            <p>No templates found</p>
          </div>
        )}

        {!loading && !error && filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="grid-item template-item"
            onClick={() => handleTemplateClick(template.id)}
            title={template.name}
          >
            <div className="item-preview template-preview">
              {template.thumbnail ? (
                <img src={template.thumbnail} alt={template.name} />
              ) : (
                <div className="item-placeholder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <line x1="3" y1="9" x2="21" y2="9"/>
                    <line x1="9" y1="21" x2="9" y2="9"/>
                  </svg>
                </div>
              )}
              {template.premium && (
                <span className="premium-badge">PRO</span>
              )}
            </div>
            <div className="item-info">
              <div className="item-name">{template.name}</div>
              {template.category && (
                <div className="item-category">{template.category}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      {!loading && !error && templates.length > 0 && (
        <div className="sidebar-footer">
          Showing {filteredTemplates.length} of {templates.length} templates
        </div>
      )}
    </div>
    </div>
  );
};

export default Templates;
