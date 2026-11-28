import React from "react";


const MockupSwitcher = ({
    mockupViews,
    activeView,
    onChange,
}) => {
    const currentIndex = mockupViews.findIndex(
        (view) => view.position === activeView
    );

    const handlePrevious = () => {
        const index = Math.max(0, currentIndex - 1);
        onChange(mockupViews[index].position);
    };

    const handleNext = () => {
        const index = Math.min(
            mockupViews.length - 1,
            currentIndex + 1
        );
        onChange(mockupViews[index].position);
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
                {mockupViews.map((view) => (
                    <button
                        key={view.position}
                        className={`mockup-switcher-item ${activeView === view.id ? "active" : ""
                            }`}
                        onClick={() => onChange(view.position)}
                    >
                        <div className="mockup-switcher-thumbnail">
                            <img src={view.mockupUrlThumbnail} alt={view.position} />
                        </div>

                        <span className="mockup-switcher-label">
                            {view.position}
                        </span>
                    </button>
                ))}
            </div>

            <button
                className="mockup-switcher-arrow"
                onClick={handleNext}
                disabled={currentIndex >= mockupViews.length - 1}
                aria-label="Next design"
            >
                ↓
            </button>
        </div>
    );
};

export default MockupSwitcher;