import React from "react";

const PropertiesBlock = ({ title, className = "", children }) => {
  const blockClassName = ["properties-block", className].filter(Boolean).join(" ");

  return (
    <div className={blockClassName}>
      <div className="properties-title">{title}</div>
      {children}
    </div>
  );
};

export default PropertiesBlock;
