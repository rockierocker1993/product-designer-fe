import React from "react";

const DESIGN_VIEWS = [
  {
    id: "front",
    label: "Front",
    image: "http://localhost:8877/api/storage/preview/images/product/tshirtfront.png",
  },
  {
    id: "back",
    label: "Back",
    image: "http://localhost:8877/api/storage/preview/images/product/tshirtfront.png",
  },
  {
    id: "sleeve",
    label: "Sleeve",
    image: "http://localhost:8877/api/storage/preview/images/product/tshirtfront.png",
  },
];

const MockupSwitcher = ({
  activeView,
  onChange,
}) => {
  const currentIndex = DESIGN_VIEWS.findIndex(
    (view) => view.id === activeView
  );

  const handlePrevious = () => {
    const index = Math.max(0, currentIndex - 1);
    onChange(DESIGN_VIEWS[index].id);
  };

  const handleNext = () => {
    const index = Math.min(
      DESIGN_VIEWS.length - 1,
      currentIndex + 1
    );
    onChange(DESIGN_VIEWS[index].id);
  };

  return (
    <div className="mockup-switcher">
      <button
        className="mockup-switcher-arrow"
        onClick={handlePrevious}
        disabled={currentIndex <= 0}
        aria-label="Previous design"
      >
        ↑
      </button>

      <div className="mockup-switcher-list">
        {DESIGN_VIEWS.map((view) => (
          <button
            key={view.id}
            className={`mockup-switcher-item ${
              activeView === view.id ? "active" : ""
            }`}
            onClick={() => onChange(view.id)}
          >
            <div className="mockup-switcher-thumbnail">
              <img src={view.image} alt={view.label} />
            </div>

            <span className="mockup-switcher-label">
              {view.label}
            </span>
          </button>
        ))}
      </div>

      <button
        className="mockup-switcher-arrow"
        onClick={handleNext}
        disabled={currentIndex >= DESIGN_VIEWS.length - 1}
        aria-label="Next design"
      >
        ↓
      </button>
    </div>
  );
};

export default MockupSwitcher;