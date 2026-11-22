import {
    FlipHorizontal,
    FlipVertical,
    RotateCw,
    Menu,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { alignment } from "../../../store/ObjectAlignment";
import { setRotate, setSkewX, setSkewY, setFlipX, setFlipY, setWidth, setHeight } from "../../../store/ObjectTransform";
import {
    ALIGNMENT_LEFT, ALIGNMENT_CENTER,
    ALIGNMENT_RIGHT, ALIGNMENT_TOP,
    ALIGNMENT_MIDDLE, ALIGNMENT_BOTTOM
} from "../../../constant.jsx";

const DefaultProperties = () => {

    const dispatch = useDispatch();
    const objectTransform = useSelector((state) => state.objectTransform);

    const alignActions = [
        { alignment: ALIGNMENT_LEFT, label: "Align Left", glyph: "left", active: true },
        { alignment: ALIGNMENT_CENTER, label: "Align Center", glyph: "center" },
        { alignment: ALIGNMENT_RIGHT, label: "Align Right", glyph: "right" },
        { alignment: ALIGNMENT_TOP, label: "Align Top", glyph: "top" },
        { alignment: ALIGNMENT_MIDDLE, label: "Align Middle", glyph: "middle" },
        { alignment: ALIGNMENT_BOTTOM, label: "Align Bottom", glyph: "bottom" }
    ];
    
    return (
        <>
            <h4 className="section-title mb-1 mt-2">Alignment</h4>
            <div className="btn-row-align-strip-6" role="group" aria-label="Object align options">
                {alignActions.map((item) => {
                    return (
                        <button
                            key={item.alignment}
                            className="align-btn"
                            type="button"
                            aria-label={item.label}
                            title={item.label}
                            onClick={() => dispatch(alignment(item.alignment))}
                        >
                            <span className={`rp-object-align-icon ${item.glyph}`} aria-hidden="true">
                                <span className="rp-object-align-ref" />
                                <span className="rp-object-align-shape" />
                            </span>
                        </button>
                    );
                })}
            </div>
            <div className="horizontal-line mt-2"></div>
            <h4 className="section-title mb-1 mt-2">Transform</h4>
            <div className="grid-2">
                <label className="field-label">
                    <span>Width</span>
                    <input className="input remove-spinner-number" type="number" min="0" step="1" value={objectTransform.width} aria-label="Width" onChange={(e) => dispatch(setWidth({ data: parseInt(e.target.value), renderObject: true }))} />
                </label>
                <label className="field-label">
                    <span>Height</span>
                    <input className="input remove-spinner-number" type="number" min="0" step="1" value={objectTransform.height} aria-label="Height" onChange={(e) => dispatch(setHeight({ data: parseInt(e.target.value), renderObject: true }))} />
                </label>
            </div>
            <div className="btn-row" role="group" aria-label="Transform actions">
                <button className={`chip-btn ${objectTransform.flipX ? "is-active" : ""}`.trim()} type="button" title="Flip X" onClick={() => dispatch(setFlipX({ data: !objectTransform.flipX, renderObject: true }))}>
                    <FlipHorizontal size={13} />
                    <span>Flip X</span>
                </button>
                <button className={`chip-btn ${objectTransform.flipY ? "is-active" : ""}`.trim()} type="button" title="Flip Y" onClick={() => dispatch(setFlipY({ data: !objectTransform.flipY, renderObject: true }))}>
                    <FlipVertical size={13} />
                    <span>Flip Y</span>
                </button>
            </div>
            <div>
                <div className="input-range-header">
                    <span>Rotate</span>
                    <strong>{objectTransform.rotate}&deg;</strong>
                </div>
                <input className="input-range" type="range" min="0" max="360" value={objectTransform.rotate} onChange={(e) => dispatch(setRotate({ data: parseInt(e.target.value), renderObject: true }))} />
            </div>
            <div>
                <div className="input-range-header">
                    <span>Skew X</span>
                    <strong>{objectTransform.skewX}&deg;</strong>
                </div>
                <input className="input-range" type="range" min="-45" max="45" value={objectTransform.skewX} onChange={(e) => dispatch(setSkewX({ data: parseInt(e.target.value), renderObject: true }))} />
            </div>
            <div>
                <div className="input-range-header">
                    <span>Skew Y</span>
                    <strong>{objectTransform.skewY}&deg;</strong>
                </div>
                <input className="input-range" type="range" min="-45" max="45" value={objectTransform.skewY} onChange={(e) => dispatch(setSkewY({ data: parseInt(e.target.value), renderObject: true }))} />
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