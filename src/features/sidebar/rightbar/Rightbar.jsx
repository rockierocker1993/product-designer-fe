import { useEffect, useState } from "react";
import RightbarContainer from "./RightbarContainer";
import TextProperties from "./TextProperties";
import "../../../assets/css/rightbar.css"
import {
	FlipHorizontal,
	FlipVertical,
	RotateCw,
	Menu
} from "lucide-react";
import DefaultProperties from "./DefaultProperties";

const Rightbar = () => {
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


    const [children, setChildren] = useState(null);
    useEffect(() => {
        setChildren(<TextProperties />);
    }, []);
    return (
        <RightbarContainer title="Text Properties" subtitle="Control your selected text style">
            <div className="section-body">
                <DefaultProperties/>
                <div className="horizontal-line mt-2"></div>
                {children ? children : <></>}
            </div>
        </RightbarContainer>
    );
};

export default Rightbar;