import { hexToRgbaHex, rgbaHexToOpacity } from "../utils/colorUtil";

export default function ColorPicker({
    colorHex = "#FFFFFFFF",
    onChange
}) {
    
    if(!colorHex) return null;
    const color = colorHex.slice(0, 7);
    const opacity = rgbaHexToOpacity(colorHex);

    const handleColorChange = (event) => {
        onChange?.(hexToRgbaHex(event.target.value, opacity));
    };

    const handleOpacityChange = (event) => {
        onChange?.(hexToRgbaHex(color, Number(event.target.value)));
    };

    return (
        <div className="color-row">
            <input
                className="input-color-picker"
                type="color"
                value={color}
                onChange={handleColorChange}
            />

            <div>
                <div className="input-range-header">
                    <span>{colorHex.toUpperCase()}</span>
                    <strong>{opacity}%</strong>
                </div>

                <input
                    className="input-range"
                    type="range"
                    min="0"
                    max="100"
                    value={opacity}
                    onChange={handleOpacityChange}
                />
            </div>
        </div>
    );
}
