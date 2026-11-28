import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Plus } from "lucide-react";
import {
  searchImages,
} from "../../../api/designDataToolsApi";

import { LeftbarPanelShell } from "../";
import { CardPreviewAnimationSkeleton, UploadImageSkeleton } from "../../../components/SkeletonAnimation";
import { addImage } from "../../../store/CanvasAddItem";

const PAGE_SIZE = 30;
const SKELETON_ANIMATION_SIZE = 9;

const Images = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  // Upload progress handler
  const [uploadImagesPreview, setUploadImagesPreview] = useState([]);


  const [imageItems, setImageItems] = useState([]);
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
        const items = await searchImages(
          1,
          PAGE_SIZE,
          searchTerm,
          selectedCategory
        );

        if (cancelled) return;

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
      const items = await searchImages(
        nextPage,
        PAGE_SIZE,
        searchTerm,
        selectedCategory
      );

      // Ignore stale requests
      if (requestId !== requestIdRef.current) return;

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
  const handleImageClick = (image) => {
    dispatch(addImage({ type: "image", data: image.toJSON() }));
  };


  // HandleUploadImage
  const onProgressUpload = async (progress) => {
  }
  const onUpload = async (upload) => {
    selectedCategory !== "Uploads" && setSelectedCategory("Uploads");
    setUploadImagesPreview(prev => [
      ...prev,
      upload
    ]);
  }
  const onSuccessUpload = async (id, imageItem) => {
    setUploadImagesPreview(prev =>
      prev.filter(item => String(item.id) !== String(id))
    );
    setImageItems(prev => {
      if (prev.some(item => item.id === imageItem.id)) {
        return prev;
      }
      prev.unshift(imageItem);
      return prev;
    });
  }
  const onFailedUpload = async () => {
  }

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
  }

  return (
    <PanelShell
      search={{
        searchTerm: searchTerm,
        setSearchTerm: setSearchTerm,
        placeholder: "Search images...",
      }}
      categoryFilter={{
        categoryName: "IMAGE",
        selectedCategory: selectedCategory,
        handleCategoryChange: handleCategoryChange
      }}
      uploadImage={{
        onProgress: onProgressUpload,
        onUpload: onUpload,
        onSuccess: onSuccessUpload,
        onFailed: onFailedUpload,
      }}
    >
      <div className="sidebar-showcase-content" ref={scrollContainerRef}>
        <div className="sidebar-grid">
          {imageItems.length > 0 && (
            <>
              {uploadImagesPreview?.length > 0 &&
                uploadImagesPreview.map((item) => (
                  <UploadImageSkeleton
                    key={item.id}
                    imagePreview={item.preview}
                  />
                ))
              }
              {
                imageItems.map((image) => (
                  <div
                    key={image.id}
                    className="sidebar-card-btn"
                    onClick={() => handleImageClick(image)}
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
                    <div className="sidebar-card-preview">
                      {image.urlThumbnail ? (
                        <img src={image.urlThumbnail} alt={image.name} />
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
                        handleImageClick(image.id);
                      }}
                      aria-label={`Add ${image.name}`}
                      title={`Add ${image.name}`}
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
              <span>Failed to load more images.</span>
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

export default Images;
