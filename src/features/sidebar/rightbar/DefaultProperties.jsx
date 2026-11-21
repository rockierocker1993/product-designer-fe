
import {
	Bold,
	Italic,
	Underline,
	Strikethrough,
	FlipHorizontal,
	FlipVertical,
	RotateCw,
	Sparkles,
	Waves,
	RefreshCcw,
	Check,
	Menu,
	SlidersHorizontal,
	Type,
	ChevronDown,
	ChevronUp,
} from "lucide-react";

const DefaultProperties = () => {

    const alignActions = [
        { id: "align-left", label: "Align Left", glyph: "left", active: true },
        { id: "align-center", label: "Align Center", glyph: "center" },
        { id: "align-right", label: "Align Right", glyph: "right" },
        { id: "align-top", label: "Align Top", glyph: "top" },
        { id: "align-middle", label: "Align Middle", glyph: "middle" },
        { id: "align-bottom", label: "Align Bottom", glyph: "bottom" },
        { id: "align-more", label: "More Align Options", glyph: "menu" },
    ];
    const ObjectAlignIcon = ({ type }) => {
        if (type === "menu") {
            return <Menu size={12} strokeWidth={2.1} />;
        }

        return (
            <span className={`rp-object-align-icon ${type}`} aria-hidden="true">
                <span className="rp-object-align-ref" />
                <span className="rp-object-align-shape" />
            </span>
        );
    };

    const textTransformActions = [
        { id: "flip-x", label: "Flip X", icon: FlipHorizontal },
        { id: "flip-y", label: "Flip Y", icon: FlipVertical },
        { id: "rotate", label: "Rotate", icon: RotateCw },
    ];

    return (
        <>
            <h4 className="section-title mb-1 mt-2">Alignment</h4>
            <div className="btn-row-align-strip" role="group" aria-label="Object align options">
                {alignActions.map((item) => {
                    return (
                        <button
                            key={item.id}
                            className={`align-btn ${item.active ? "is-active" : ""}`.trim()}
                            type="button"
                            aria-label={item.label}
                            title={item.label}
                        >
                            <ObjectAlignIcon type={item.glyph} />
                        </button>
                    );
                })}
            </div>
            <div className="horizontal-line mt-2"></div>
            <h4 className="section-title mb-1 mt-2">Transform</h4>
            <div className="grid-2">
                <label className="field-label">
                    <span>X</span>
                    <input className="input" defaultValue="481" aria-label="Transform X" />
                </label>
                <label className="field-label">
                    <span>Y</span>
                    <input className="input" defaultValue="270" aria-label="Transform Y" />
                </label>
            </div>
            <div className="btn-row" role="group" aria-label="Transform actions">
                {textTransformActions.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button key={item.id} className="chip-btn" type="button" title={item.label}>
                            <Icon size={13} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </div>
            <div className="horizontal-line mt-2"></div>
            <h4 className="section-title mb-1 mt-2">Opacity</h4>
            <div>
                <div className="input-range-header">
					<strong>100%</strong>
				</div>
				<input className="input-range" type="range" min="0" max="100" defaultValue="100" />
            </div>
        </>
    );
};

export default DefaultProperties;