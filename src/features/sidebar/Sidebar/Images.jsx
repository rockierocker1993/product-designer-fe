
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
} from "lucide-react";

import '../../../assets/css/image.css';
import { addClipartItem } from "../../../store/components/AddCanvasItemSlice";
import {
  searchImages,
  getCategory,
} from "../../../api/designDataToolsApi";

import { SidebarPanelShell, SidebarGridState } from "./components";
import { useLoadableData } from "../../../hooks";
import { Image } from "react-bootstrap";

const PAGE_SIZE = 30;

const Images = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [imageItems, setImageItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [loadMoreError, setLoadMoreError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [showCategoryScrollButtons, setShowCategoryScrollButtons] =
    useState(false);

  // Refs
  const tabListRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  const pageRef = useRef(1);
  const hasMoreRef = useRef(true);
  const loadingMoreRef = useRef(false);
  const requestIdRef = useRef(0);

  // Fetch categories
  const fetchCategory = useCallback(() => {
    return getCategory("IMAGE");
  }, []);

  const {
    data: categories,
    loading: categoriesLoading,
  } = useLoadableData(fetchCategory);

  const categoryItems = categories ?? [];

  // Normalize API response
  const extractItems = (response) => {
    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response?.data)) {
      return response.data;
    }

    return [];
  };

  // Fetch first page when search/category changes
  useEffect(() => {
    let cancelled = false;

    const requestId = ++requestIdRef.current;

    pageRef.current = 1;
    hasMoreRef.current = true;
    loadingMoreRef.current = false;

    setImageItems([]);
    setHasMore(true);
    setLoading(true);
    setLoadingMore(false);
    setError(null);
    setLoadMoreError(false);

    const fetchFirstPage = async () => {
      try {
        const response = await searchImages(
          1,
          PAGE_SIZE,
          searchTerm,
          selectedCategory
        );

        if (cancelled) return;

        const items = extractItems(response);

        setImageItems(items);

        const moreAvailable = items.length >= PAGE_SIZE;

        pageRef.current = 1;
        hasMoreRef.current = moreAvailable;
        setHasMore(moreAvailable);
      } catch (err) {
        if (cancelled) return;

        setError(err);
        setImageItems([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchFirstPage();

    return () => {
      cancelled = true;
    };
  }, [searchTerm, selectedCategory]);

  // Fetch next page
  const loadMore = useCallback(async () => {
    if (
      loadingMoreRef.current ||
      !hasMoreRef.current ||
      loading
    ) {
      return;
    }

    loadingMoreRef.current = true;
    setLoadingMore(true);
    setLoadMoreError(false);

    const nextPage = pageRef.current + 1;
    const requestId = requestIdRef.current;

    try {
      const response = await searchImages(
        nextPage,
        PAGE_SIZE,
        searchTerm,
        selectedCategory
      );

      // Ignore stale requests
      if (requestId !== requestIdRef.current) return;

      const items = extractItems(response);

      // Append new data
      setImageItems((previousItems) => [
        ...previousItems,
        ...items,
      ]);

      pageRef.current = nextPage;

      const moreAvailable = items.length >= PAGE_SIZE;

      hasMoreRef.current = moreAvailable;
      setHasMore(moreAvailable);

    } catch (err) {
      if (requestId === requestIdRef.current) {
        setLoadMoreError(true);
      }
    } finally {
      if (requestId === requestIdRef.current) {
        loadingMoreRef.current = false;
        setLoadingMore(false);
      }
    }
  }, [loading, searchTerm, selectedCategory]);

  // IntersectionObserver
  useEffect(() => {
    const target = loadMoreRef.current;
    const root = scrollContainerRef.current;

    if (!target || !root || loading || !hasMore) {
      return;
    }

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        root,
        rootMargin: "150px",
        threshold: 0,
      }
    );

    observerRef.current.observe(target);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loadMore, loading, hasMore, imageItems.length]);

  // Handle image selection
  const handleImageClick = (imageId) => {
    dispatch(addImageItem(`image-${imageId}`));
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

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

  // Search bar
  const searchBar = (
    <>
      <div className="sidebar-search-wrapper">
        <input
          type="text"
          className="sidebar-search-input"
          placeholder="Search images"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <Search size={20} className="sidebar-search-icon" />
      </div>
      <button className="property-outline-btn" type="button">
        Upload
      </button>
      
    </>
  );

  // Category filters
  const categoryFilters = (
    <div className="image-tabs-scroll">
      {showCategoryScrollButtons && (
        <button
          type="button"
          className="image-tab-arrow image-tab-arrow-left"
          onClick={() => scrollCategoryTabs(-1)}
          aria-label="Scroll categories left"
        >
          <ChevronLeft size={12} />
        </button>
      )}

      <div ref={tabListRef} className="image-tabs">
        <button
          type="button"
          className={`sidebar-tab-btn ${selectedCategory === "" ? "active" : ""
            }`}
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
          className="image-tab-arrow image-tab-arrow-right"
          onClick={() => scrollCategoryTabs(1)}
          aria-label="Scroll categories right"
        >
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );

  return (
    <SidebarPanelShell
      actions={searchBar}
      actionsClassName="sidebar-search-shell"
      filters={
        !categoriesLoading && categoryItems.length > 0
          ? categoryFilters
          : null
      }
      filtersClassName="image-tabs-panel"
      showSearch={false}
    >
      <div
        className="image-showcase-content"
        ref={scrollContainerRef}
      >
        <SidebarGridState
          loading={loading}
          loadingText="Loading images..."
          error={error}
          empty={
            !loading &&
            !error &&
            imageItems.length === 0
          }
          emptyText="No images found"
        />

        {!loading && !error && imageItems.length > 0 && (
          <div className="image-grid">
            {imageItems.map((image) => (
              <div
                key={image.id}
                className="image-card-btn"
                onClick={() => handleImageClick(image.id)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    handleImageClick(image.id);
                  }
                }}
                role="button"
                tabIndex={0}
                title={image.name}
              >
                <div className="image-card-preview">
                  {image.urlThumbnail ? (
                    <Image
                      src={image.urlThumbnail}
                      className="image-preview"
                    />
                  ) : (
                    <div className="item-placeholder">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="image-card-action"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleImageClick(image.id);
                  }}
                  aria-label={`Add ${image.name}`}
                  title={`Add ${image.name}`}
                >
                  <Plus size={12} strokeWidth={2.5} />
                </button>
              </div>
            ))}

            {/* Infinite scroll trigger */}
            {hasMore && (
              <div
                ref={loadMoreRef}
                className="image-load-more-trigger"
              />
            )}
          </div>
        )}

        {loadingMore && (
          <div className="image-loading-more">
            Loading more images...
          </div>
        )}

        {loadMoreError && (
          <div className="image-load-more-error">
            <span>Failed to load more images.</span>
            <button type="button" onClick={loadMore}>
              Retry
            </button>
          </div>
        )}

      </div>
    </SidebarPanelShell>
  );
};

export default Images;
