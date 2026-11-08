import React from "react";

const EditorTopbar = ({ projectName }) => {
  return (
    <div className="editor-topbar">
      <div className="project-name-inline">{projectName}</div>
      <div className="topbar-actions">
        <button className="topbar-action-btn" type="button">
          Share
        </button>
        <button className="topbar-action-btn topbar-action-btn-primary" type="button">
          Export
        </button>
      </div>
    </div>
  );
};

export default EditorTopbar;
