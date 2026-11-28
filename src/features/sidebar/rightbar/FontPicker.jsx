
import "../../../assets/css/font-picker.css";

import { CardPreviewAnimationSkeleton } from "../../../components/SkeletonAnimation";
import PanelShell from "../../../components/PanelShell";
import { FontItem } from "../../../components/FontItem";

import { useFontPickerController } from "./controll/fontPickerControll";

const SKELETON_ANIMATION_SIZE = 9;

const FontPicker = ({ onSelect }) => {

    const {
        selectedCategory,
        categoryItems,
        searchTerm,
        fonts,
        hasMore,
        loading,
        loadingMore,
        error,
        loadMoreError,

        setCategoryItems,
        setSearchTerm,

        handleCategoryChange,
        loadMore,

        scrollContainerRef,
        loadMoreRef
    } = useFontPickerController();

    return (
        <PanelShell
            search={{
                searchTerm,
                setSearchTerm,
                placeholder: "Search fonts..."
            }}
            categoryFilter={{
                categoryName: "FONT",
                selectedCategory,
                categoryItems,
                setCategoryItems,
                handleCategoryChange
            }}
        >
            <div className="sidebar-showcase-content" ref={scrollContainerRef}>
                {fonts.length > 0 && (
                    <>
                        {fonts.map(font => (
                            <FontItem
                                key={font?.name}
                                font={font}
                                selected={font?.selected}
                                onClick={() => onSelect?.(font)}
                            />
                        ))}

                        {hasMore && (
                            <div
                                ref={loadMoreRef}
                                className="load-more-trigger"
                            />
                        )}
                    </>
                )}

                {loading && !error && (
                    <CardPreviewAnimationSkeleton
                        count={SKELETON_ANIMATION_SIZE}
                    />
                )}

                {error && !fonts.length && (
                    <div className="load-more-error">
                        <span>Failed to load fonts.</span>
                        <button
                            type="button"
                            onClick={() => setSearchTerm(value => value)}
                        >
                            Retry
                        </button>
                    </div>
                )}

                {loadMoreError && (
                    <div className="load-more-error">
                        <span>Failed to load more fonts.</span>
                        <button
                            type="button"
                            onClick={loadMore}
                            disabled={loadingMore}
                        >
                            {loadingMore ? "Loading..." : "Retry"}
                        </button>
                    </div>
                )}
            </div>

            <div style={{ marginBottom: 4 }} />
        </PanelShell>
    );
};

export default FontPicker;
