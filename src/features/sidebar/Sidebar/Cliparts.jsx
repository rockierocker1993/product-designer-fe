
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
} from "lucide-react";

import { addClipartItem } from "../../../store/components/AddCanvasItemSlice";
import {
  searchCliparts,
  getCategory,
} from "../../../api/designDataToolsApi";

import { SidebarPanelShell, SidebarGridState } from "./components";
import { useLoadableData } from "../../../hooks";

const PAGE_SIZE = 30;

const Cliparts = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [clipartItems, setClipartItems] = useState([]);
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
    return getCategory("CLIPART");
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

    setClipartItems([]);
    setHasMore(true);
    setLoading(true);
    setLoadingMore(false);
    setError(null);
    setLoadMoreError(false);

    const fetchFirstPage = async () => {
      try {
        const response = await searchCliparts(
          1,
          PAGE_SIZE,
          searchTerm,
          selectedCategory
        );

        if (cancelled) return;

        const items = extractItems(response);

        setClipartItems(items);

        const moreAvailable = items.length >= PAGE_SIZE;

        pageRef.current = 1;
        hasMoreRef.current = moreAvailable;
        setHasMore(moreAvailable);
      } catch (err) {
        if (cancelled) return;

        setError(err);
        setClipartItems([]);
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
      const response = await searchCliparts(
        nextPage,
        PAGE_SIZE,
        searchTerm,
        selectedCategory
      );

      // Ignore stale requests
      if (requestId !== requestIdRef.current) return;

      const items = extractItems(response);

      // Append new data
      setClipartItems((previousItems) => [
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
  }, [loadMore, loading, hasMore, clipartItems.length]);

  // Handle clipart selection
  const handleClipartClick = (clipartId) => {
    dispatch(addClipartItem(`clipart-${clipartId}`));
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
    <div className="sidebar-search-wrapper">
      <input
        type="text"
        className="sidebar-search-input"
        placeholder="Search cliparts"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <Search size={20} className="sidebar-search-icon" />
    </div>
  );

  // Category filters
  const categoryFilters = (
    <div className="clipart-tabs-scroll">
      {showCategoryScrollButtons && (
        <button
          type="button"
          className="clipart-tab-arrow clipart-tab-arrow-left"
          onClick={() => scrollCategoryTabs(-1)}
          aria-label="Scroll categories left"
        >
          <ChevronLeft size={12} />
        </button>
      )}

      <div ref={tabListRef} className="clipart-tabs">
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
          className="clipart-tab-arrow clipart-tab-arrow-right"
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
      filtersClassName="clipart-tabs-panel"
      showSearch={false}
    >
      <div
        className="clipart-showcase-content"
        ref={scrollContainerRef}
      >
        <SidebarGridState
          loading={loading}
          loadingText="Loading cliparts..."
          error={error}
          empty={
            !loading &&
            !error &&
            clipartItems.length === 0
          }
          emptyText="No cliparts found"
        />

        {!loading && !error && clipartItems.length > 0 && (
          <div className="clipart-grid">
            {clipartItems.map((clipart) => (
              <div
                key={clipart.id}
                className="clipart-card-btn"
                onClick={() => handleClipartClick(clipart.id)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    handleClipartClick(clipart.id);
                  }
                }}
                role="button"
                tabIndex={0}
                title={clipart.name}
              >
                <div className="clipart-card-preview">
                  {clipart.svg ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: clipart.svg,
                      }}
                      className="svg-preview"
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
                  className="clipart-card-action"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleClipartClick(clipart.id);
                  }}
                  aria-label={`Add ${clipart.name}`}
                  title={`Add ${clipart.name}`}
                >
                  <Plus size={12} strokeWidth={2.5} />
                </button>
              </div>
            ))}

            {/* Infinite scroll trigger */}
            {hasMore && (
              <div
                ref={loadMoreRef}
                className="clipart-load-more-trigger"
              />
            )}
          </div>
        )}

        {loadingMore && (
          <div className="clipart-loading-more">
            Loading more cliparts...
          </div>
        )}

        {loadMoreError && (
          <div className="clipart-load-more-error">
            <span>Failed to load more cliparts.</span>
            <button type="button" onClick={loadMore}>
              Retry
            </button>
          </div>
        )}

      </div>
    </SidebarPanelShell>
  );
};

export default Cliparts;
