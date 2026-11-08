import React from "react";

const SidebarGridState = ({
  loading,
  loadingText,
  error,
  onRetry,
  empty,
  emptyText,
}) => {
  if (loading) {
    return (
      <div className="grid-message">
        <div className="spinner"></div>
        <p>{loadingText}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid-message error">
        <p>Error: {error}</p>
        <button onClick={onRetry} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="grid-message">
        <p>{emptyText}</p>
      </div>
    );
  }

  return null;
};

export default SidebarGridState;
