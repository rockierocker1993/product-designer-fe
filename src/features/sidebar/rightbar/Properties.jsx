import { useEffect, useState } from "react";
import TextProperties from "./TextProperties";
import DefaultProperties from "./DefaultProperties";

export default function Properties({
    showFontPicker
}) {
    const [properties, setProperties] = useState(null);
    useEffect(() => {
        setProperties(<TextProperties showFontPicker={showFontPicker} />);
    }, []);
    return (
        <div className="rightbar-container-content">
            <div className="section-body">
                <DefaultProperties />
                <div className="horizontal-line mt-2"></div>
                {properties}
            </div>
        </div>
    );
}