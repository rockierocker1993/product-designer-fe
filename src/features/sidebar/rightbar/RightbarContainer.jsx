import React from "react";

const RightbarContainer = ({ title, subtitle, children }) => {
  return (
    <aside className="rightbar-container" aria-label="Editor right sidebar">
      <header className="rightbar-container-header">
        <h3>{title}</h3>
        {subtitle ? <p>{subtitle}</p> : null}
      </header>
      <div className="rightbar-container-content">{children}</div>
    </aside>
  );
};

export default RightbarContainer;
