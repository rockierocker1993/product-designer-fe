
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Plus
} from "lucide-react";
import { addClipartItem } from "../../../store/components/AddCanvasItemSlice";
import {
  searchCliparts,
} from "../../../api/designDataToolsApi";

import { PanelShell } from "../";
import { CardPreviewAnimationSkeleton } from "../../../components/SkeletonAnimation";

const PAGE_SIZE = 30;
const SKELETON_ANIMATION_SIZE = 9;

const Cliparts = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryItems, setCategoryItems] = useState([]);

  const [clipartItems, setClipartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [loadMoreError, setLoadMoreError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Refs
  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  const pageRef = useRef(1);
  const hasMoreRef = useRef(true);
  const loadingMoreRef = useRef(false);
  const requestIdRef = useRef(0);

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
  }

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
        const items = await searchCliparts(
          1,
          PAGE_SIZE,
          searchTerm,
          selectedCategory
        );

        if (cancelled) return;

        setClipartItems(items);
        console.log("Fetched clipart items:", items);
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
      const items = await searchCliparts(
        nextPage,
        PAGE_SIZE,
        searchTerm,
        selectedCategory
      );

      // Ignore stale requests
      if (requestId !== requestIdRef.current) return;

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
        console.error("Error loading more cliparts:", err);
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


  return (
    <PanelShell
      search={{
        searchTerm: searchTerm,
        setSearchTerm: setSearchTerm,
        placeholder: "Search cliparts...",
      }}
      categoryFilter={{
        categoryName: "CLIPART",
        selectedCategory: selectedCategory,
        handleCategoryChange: handleCategoryChange
      }}
    >
      <div className="sidebar-showcase-content" ref={scrollContainerRef}>
        <div className="sidebar-grid">
          {clipartItems.length > 0 && (
            <>
              {
                clipartItems.map((clipart) => (
                  <div
                    key={clipart.id}
                    className="sidebar-card-btn"
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
                    <div className="sidebar-card-preview">
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
                      className="sidebar-card-action"
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
                ))
              }

              {/* Infinite scroll trigger */}
              {hasMore && (
                <div
                  ref={loadMoreRef}
                  className="load-more-trigger"
                />
              )}
            </>
          )}
          {loading && !error && (
            <CardPreviewAnimationSkeleton count={SKELETON_ANIMATION_SIZE} />
          )}
          {loadMoreError && (
            <div className="load-more-error">
              <span>Failed to load more cliparts.</span>
              <button type="button" onClick={loadMore}>
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
      <div style={{ marginBottom: 4 }}></div>
    </PanelShell>
  );
};

export default Cliparts;
