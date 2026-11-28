export default function InputRange({ 
    min = 0,
    max = 100,
    value = 100,
    step = 1,
    onChange = (e) => {},
    label = "Range",
    numberFormat = "number"
}) {
    return (
        <div>
            <div className="input-range-header">
                <span>{label}</span>
                <strong>{
                    numberFormat === "percentage" ? `${value}%` : 
                    numberFormat === "degrees" ? `${value}°` : 
                    value
                }</strong>
            </div>
            <input className="input-range" type="range" min={min} max={max} value={value} step={step} onChange={onChange} />
        </div>
    );
}