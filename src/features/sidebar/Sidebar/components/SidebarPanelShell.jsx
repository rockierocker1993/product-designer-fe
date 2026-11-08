import React from "react";

const SidebarPanelShell = ({
  title,
  subtitle,
  actions,
  actionsClassName = "sidebar-actions",
  filters,
  filtersClassName = "categories-filter",
  searchPlaceholder,
  searchTerm,
  onSearchChange,
  showSearch = true,
  children,
  footer,
}) => {
  return (
    <div className="col column menu-detail">
      <div className="sidebar-content">

        {actions ? <div className={actionsClassName}>{actions}</div> : null}
        {filters ? <div className={filtersClassName}>{filters}</div> : null}

        {showSearch ? (
          <div className="sidebar-search">
            <input
              type="text"
              className="search-input"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
            />
            <svg
              className="search-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
        ) : null}

        {children}

        {footer ? <div className="sidebar-footer">{footer}</div> : null}
      </div>
    </div>
  );
};

export default SidebarPanelShell;
