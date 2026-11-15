import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
    getCategory,
} from "../api/designDataToolsApi";

export const CategoryFilter = ({
    selectedCategory,
    categoryName,
    handleCategoryChange,
}) => {
    const [showCategoryScrollButtons, setShowCategoryScrollButtons] = useState(false);
    const tabListRef = useRef(null);
    const [categoryItems, setCategoryItems] = useState([]);
    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            const items = await getCategory(categoryName);
            setCategoryItems(items);
        };
        fetchCategories();
    }, []);

    // Scroll category tabs
    const scrollCategoryTabs = (direction) => {
        const container = tabListRef.current;

        if (!container) return;

        container.scrollBy({
            left: direction * 180,
            behavior: "smooth",
        });
    };
    // Detect category overflow
    useEffect(() => {
        const updateCategoryOverflowState = () => {
            const container = tabListRef.current;

            if (!container) {
                setShowCategoryScrollButtons(false);
                return;
            }

            setShowCategoryScrollButtons(
                container.scrollWidth > container.clientWidth + 1
            );
        };

        updateCategoryOverflowState();

        window.addEventListener("resize", updateCategoryOverflowState);

        return () => {
            window.removeEventListener(
                "resize",
                updateCategoryOverflowState
            );
        };
    }, [categoryItems.length, selectedCategory]);

    return (
        <div className="sidebar-tabs-scroll">
            {showCategoryScrollButtons && (
                <button
                    type="button"
                    className="sidebar-tab-arrow sidebar-tab-arrow-left"
                    onClick={() => scrollCategoryTabs(-1)}
                    aria-label="Scroll categories left"
                >
                    <ChevronLeft size={12} />
                </button>
            )}

            <div ref={tabListRef} className="sidebar-tabs">
                <button
                    type="button"
                    className={`sidebar-tab-btn ${selectedCategory === "" ? "active" : ""}`}
                    onClick={() => handleCategoryChange("")}
                    aria-pressed={selectedCategory === ""}
                >
                    All
                </button>

                {categoryItems.map((category) => (
                    <button
                        key={category}
                        type="button"
                        className={`sidebar-tab-btn ${selectedCategory === category ? "active" : ""
                            }`}
                        onClick={() => handleCategoryChange(category)}
                        aria-pressed={selectedCategory === category}
                        title={`Filter ${category}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {showCategoryScrollButtons && (
                <button
                    type="button"
                    className="sidebar-tab-arrow sidebar-tab-arrow-right"
                    onClick={() => scrollCategoryTabs(1)}
                    aria-label="Scroll categories right"
                >
                    <ChevronRight size={14} />
                </button>
            )}
        </div>
    );
}