export function FontItem({
    font,
    selected,
    onSelect
}) {
    return (
        <div className={`font-item ${selected ? "selected" : ""}`}>
            <button className="font-preview"
                style={{
                    fontFamily: font?.name ?? "inherit",
                    fontWeight: font?.weight ?? 400
                }}
                onClick={() => onSelect?.(font)}
            >
                {font?.name ?? ""}
            </button>
        </div>
    );
}