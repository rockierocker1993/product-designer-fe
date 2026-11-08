import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTemplateItem } from "../../../store/components/AddCanvasItemSlice";
import { fetchTemplatesList } from "../../../api/templatesApi";
import { SidebarPanelShell, SidebarGridState } from "./components";
import { useLoadableData } from "../../../hooks";

const Templates = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: templates,
    loading,
    error,
    reload: loadTemplates,
  } = useLoadableData(fetchTemplatesList);

  const handleTemplateClick = (templateId) => {
    dispatch(addTemplateItem(`template-${templateId}`));
  };

  const filteredTemplates = templates.filter(template => 
    template.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const footerText = !loading && !error && templates.length > 0
    ? `Showing ${filteredTemplates.length} of ${templates.length} templates`
    : null;

  return (
    <SidebarPanelShell
      title="Templates"
      subtitle="Choose a template to start"
      searchPlaceholder="Search templates..."
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      footer={footerText}
    >
      <div className="items-grid templates-grid">
        <SidebarGridState
          loading={loading}
          loadingText="Loading templates..."
          error={error}
          onRetry={loadTemplates}
          empty={!loading && !error && filteredTemplates.length === 0}
          emptyText="No templates found"
        />

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
    </SidebarPanelShell>
  );
};

export default Templates;
