
import { useEffect, useMemo, useRef, useState } from "react";
import "../assets/css/combobox.css";

export default function Combobox({
    options = [],
    value,
    onChange,
    placeholder = "Search...",
    pageSize = 10,
    labelKey = "label",
    valueKey = "value",
    disabled = false
}) {
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [activeIndex, setActiveIndex] = useState(-1);

    const selectedOption = options.find(
        item => item[valueKey] === value
    );

    const filteredOptions = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) return options;

        return options.filter(item =>
            String(item[labelKey] ?? "")
                .toLowerCase()
                .includes(keyword)
        );
    }, [options, search, labelKey]);

    const visibleOptions = useMemo(() => {
        return filteredOptions.slice(0, page * pageSize);
    }, [filteredOptions, page, pageSize]);

    const hasMore = visibleOptions.length < filteredOptions.length;

    useEffect(() => {
        setPage(1);
        setActiveIndex(-1);
    }, [search]);

    useEffect(() => {
        const handleClickOutside = event => {
            if (!containerRef.current?.contains(event.target)) {
                setOpen(false);
                setSearch("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = option => {
        onChange?.(option[valueKey], option);
        setOpen(false);
        setSearch("");
        setActiveIndex(-1);
    };

    const handleKeyDown = event => {
        if (disabled) return;

        if (event.key === "ArrowDown") {
            event.preventDefault();

            if (!open) {
                setOpen(true);
                return;
            }

            setActiveIndex(prev =>
                Math.min(prev + 1, visibleOptions.length - 1)
            );
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();

            setActiveIndex(prev => Math.max(prev - 1, 0));
        }

        if (event.key === "Enter" && open && activeIndex >= 0) {
            event.preventDefault();
            handleSelect(visibleOptions[activeIndex]);
        }

        if (event.key === "Escape") {
            setOpen(false);
            setSearch("");
            setActiveIndex(-1);
        }
    };

    return (
        <div
            className="combobox"
            ref={containerRef}
        >
            <div
                className={`combobox-control ${open ? "is-open" : ""}`}
                onClick={() => {
                    if (disabled) return;

                    setOpen(true);
                    inputRef.current?.focus();
                }}
            >
                <input
                    ref={inputRef}
                    value={open ? search : selectedOption?.[labelKey] ?? ""}
                    placeholder={placeholder}
                    disabled={disabled}
                    onFocus={() => setOpen(true)}
                    onChange={event => setSearch(event.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <button
                    type="button"
                    className="combobox-arrow"
                    tabIndex={-1}
                    disabled={disabled}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="m6 9 6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            {open && (
                <div className="combobox-dropdown">
                    <div className="combobox-options">
                        {visibleOptions.length > 0 ? (
                            visibleOptions.map((option, index) => (
                                <div
                                    key={option[valueKey]}
                                    className={[
                                        "combobox-option",
                                        option[valueKey] === value
                                            ? "is-selected"
                                            : "",
                                        index === activeIndex
                                            ? "is-active"
                                            : ""
                                    ].join(" ")}
                                    onMouseEnter={() =>
                                        setActiveIndex(index)
                                    }
                                    onMouseDown={event =>
                                        event.preventDefault()
                                    }
                                    onClick={() => handleSelect(option)}
                                >
                                    {option[labelKey]}
                                </div>
                            ))
                        ) : (
                            <div className="combobox-empty">
                                No results found
                            </div>
                        )}
                    </div>

                    {hasMore && (
                        <button
                            type="button"
                            className="combobox-load-more"
                            onMouseDown={event =>
                                event.preventDefault()
                            }
                            onClick={() => setPage(prev => prev + 1)}
                        >
                            Load more ({visibleOptions.length} / {filteredOptions.length})
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
