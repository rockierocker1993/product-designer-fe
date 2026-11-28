
import { useCallback, useEffect, useRef, useState } from "react";
import { fetchFonts } from "./righbarControll";

const PAGE_SIZE = 10;

export const useFontPickerController = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categoryItems, setCategoryItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [fonts, setFonts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [loadMoreError, setLoadMoreError] = useState(false);

    // Refs
    const scrollContainerRef = useRef(null);
    const loadMoreRef = useRef(null);
    const observerRef = useRef(null);

    const pageRef = useRef(1);
    const hasMoreRef = useRef(true);
    const loadingMoreRef = useRef(false);
    const requestIdRef = useRef(0);

    // Fetch initial fonts
    useEffect(() => {
        const requestId = ++requestIdRef.current;

        pageRef.current = 1;
        hasMoreRef.current = true;
        loadingMoreRef.current = false;

        setFonts([]);
        setHasMore(true);
        setLoading(true);
        setLoadingMore(false);
        setError(null);
        setLoadMoreError(false);

        const fetchInitialFonts = async () => {
            try {
                const items = await fetchFonts(
                    1,
                    PAGE_SIZE,
                    searchTerm,
                    selectedCategory
                );

                if (requestId !== requestIdRef.current) return;

                setFonts(items);

                const moreAvailable = items.length >= PAGE_SIZE;

                pageRef.current = 1;
                hasMoreRef.current = moreAvailable;
                setHasMore(moreAvailable);

            } catch (err) {
                if (requestId !== requestIdRef.current) return;

                setError(err);
                setFonts([]);

            } finally {
                if (requestId === requestIdRef.current) {
                    setLoading(false);
                }
            }
        };

        fetchInitialFonts();

        return () => {
            // Invalidate previous request
            if (requestId === requestIdRef.current) {
                requestIdRef.current++;
            }
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
            const items = await fetchFonts(
                nextPage,
                PAGE_SIZE,
                searchTerm,
                selectedCategory
            );

            // Ignore stale requests
            if (requestId !== requestIdRef.current) return;

            setFonts(previousItems => [
                ...previousItems,
                ...items
            ]);

            pageRef.current = nextPage;

            const moreAvailable = items.length >= PAGE_SIZE;

            hasMoreRef.current = moreAvailable;
            setHasMore(moreAvailable);

        } catch (err) {
            if (requestId !== requestIdRef.current) return;

            console.error("Error loading more fonts:", err);
            setLoadMoreError(true);

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
            entries => {
                if (entries[0]?.isIntersecting) {
                    loadMore();
                }
            },
            {
                root,
                rootMargin: "150px",
                threshold: 0
            }
        );

        observerRef.current.observe(target);

        return () => {
            observerRef.current?.disconnect();
        };

    }, [loadMore, loading, hasMore, fonts.length]);

    // Category handler
    const handleCategoryChange = useCallback(category => {
        setSelectedCategory(category);
    }, []);

    return {
        // States
        selectedCategory,
        categoryItems,
        searchTerm,
        fonts,
        hasMore,
        loading,
        loadingMore,
        error,
        loadMoreError,

        // State setters
        setCategoryItems,
        setSearchTerm,

        // Handlers
        handleCategoryChange,
        loadMore,

        // Refs
        scrollContainerRef,
        loadMoreRef
    };
};
