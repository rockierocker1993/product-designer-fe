import { use, useEffect, useState } from "react";
import {
	Bold,
	Italic,
	Underline,
	Strikethrough,
	Sparkles,
	Waves,
	SlidersHorizontal,
} from "lucide-react";
import CollapsibleSection from "../../../components/CollapsibleSection";
import InputRange from "../../../components/InputRange";
import ColorPicker from "../../../components/ColortPicker";
import { setTextColor, setStroke, setStrokeWidth, setFontSize } from "../../../store/PropertiesValue";
import { useDispatch, useSelector } from "react-redux";

const effectActions = [
	{ id: "arc", label: "Arc", icon: Sparkles },
	{ id: "distort", label: "Distort", icon: SlidersHorizontal },
	{ id: "wave", label: "Wave", icon: Waves },
	{ id: "wave", label: "Wave", icon: Waves },
];

const textShadow = [
	{ id: "arc", label: "Horizontal Line", icon: Sparkles },
	{ id: "distort", label: "Color Cut", icon: SlidersHorizontal },
	{ id: "wave", label: "Oblique lines", icon: Waves },
	{ id: "wave", label: "Fading color cut", icon: Waves },
];

const TextProperties = ({ showFontPicker }) => {
	const dispatch = useDispatch();
	const propertiesValue = useSelector((state) => state.propertiesValue);
	return (
		<>
			<h4 className="section-title mb-1 mt-2">Text Color</h4>
			<ColorPicker
				colorHex={propertiesValue.textColor}
				onChange={(colorHex) => dispatch(setTextColor({ data: colorHex, renderObject: true }))}
			/>
			<button className="outline-btn" type="button">
				Browse Color Palettes
			</button>
			<CollapsibleSection title="Border">
				<ColorPicker
					colorHex={propertiesValue.stroke}
					onChange={(colorHex) => {console.log("onchange"); dispatch(setStroke({ data: colorHex, renderObject: true }))}}
				/>
				<InputRange
					min={0}
					max={500}
					value={propertiesValue.strokeWidth}
					onChange={(e) => dispatch(setStrokeWidth({ data: Number(e.target.value), renderObject: true }))}
					label="Border Weight"
					numberFormat="number"
				/>
			</CollapsibleSection>

			<CollapsibleSection title="Text Style">
				<label className="field-label">
					<span>Font Family</span>
					<button className="outline-btn" type="button" onClick={showFontPicker}>Browse Fonts</button>
				</label>
				<div className="grid-3">
					<label className="field-label">
						<span>Font size</span>
						<input className="input" value={propertiesValue.fontSize} onChange={(e) => dispatch(setFontSize({ data: Number(e.target.value), renderObject: true }))} aria-label="Font size" />
					</label>
					<label className="field-label">
						<span>Letter spacing</span>
						<input className="input" defaultValue="-50" aria-label="Line height" />
					</label>
					<label className="field-label">
						<span>Line height</span>
						<input className="input" defaultValue="292" aria-label="Letter spacing" />
					</label>
				</div>
				<div className="btn-row" role="group" aria-label="Text style actions">
					<button className="icon-btn is-active" type="button" aria-label="Bold">
						<Bold size={14} />
					</button>
					<button className="icon-btn" type="button" aria-label="Italic">
						<Italic size={14} />
					</button>
					<button className="icon-btn" type="button" aria-label="Underline">
						<Underline size={14} />
					</button>
					<button className="icon-btn" type="button" aria-label="Strike through">
						<Strikethrough size={14} />
					</button>
				</div>
			</CollapsibleSection>

			<CollapsibleSection title="Transformation">
				<div className="btn-row" role="group" aria-label="Transformation effects">
					{effectActions.map((item) => {
						const Icon = item.icon;
						return (
							<button key={item.id} className="chip-btn" type="button" title={item.label}>
								<Icon size={13} />
								<span>{item.label}</span>
							</button>
						);
					})}
				</div>
				<div className="btn-row" role="group" aria-label="Transformation effects">
					{effectActions.map((item) => {
						const Icon = item.icon;
						return (
							<button key={item.id} className="chip-btn" type="button" title={item.label}>
								<Icon size={13} />
								<span>{item.label}</span>
							</button>
						);
					})}
				</div>
			</CollapsibleSection>

			<CollapsibleSection title="Text Shadow">
				<div className="btn-row" role="group" aria-label="Transformation effects">
					{textShadow.map((item) => {
						const Icon = item.icon;
						return (
							<button key={item.id} className="chip-btn" type="button" title={item.label}>
								<Icon size={13} />
								<span>{item.label}</span>
							</button>
						);
					})}
				</div>
				<div className="color-row">
					<input
						className="input-color-picker"
						type="color"
						defaultValue="#FFFFFF"
						aria-label="Text color"
					/>
					<span className="badge-percentage">#FFFFFF</span>
					<div className="input-percentage">
						<input
							type="number"
							min="1"
							max="100"
							step="1"
						/>
						<span className="percentage-suffix">%</span>
					</div>
				</div>

				<div className="mt-0">
					<div className="input-range-header">
						<span>Offset</span>
						<strong>15</strong>
					</div>
					<input className="input-range" type="range" min="0" max="50" defaultValue="15" />
				</div>
				<div className="mt-0">
					<div className="input-range-header">
						<span>Angle</span>
						<strong>15</strong>
					</div>
					<input className="input-range" type="range" min="0" max="50" defaultValue="15" />
				</div>
				<div className="mt-0">
					<div className="input-range-header">
						<span>Blur</span>
						<strong>15</strong>
					</div>
					<input className="input-range" type="range" min="0" max="50" defaultValue="15" />
				</div>
				<div className="mt-0">
					<div className="input-range-header">
						<span>Otline width</span>
						<strong>15</strong>
					</div>
					<input className="input-range" type="range" min="0" max="50" defaultValue="15" />
				</div>
			</CollapsibleSection>

			<CollapsibleSection title="Text Decoration">
				<div className="btn-row" role="group" aria-label="Transformation effects">
					{textShadow.map((item) => {
						const Icon = item.icon;
						return (
							<button key={item.id} className="chip-btn" type="button" title={item.label}>
								<Icon size={13} />
								<span>{item.label}</span>
							</button>
						);
					})}
				</div>
				<div className="color-row">
					<input
						className="input-color-picker"
						type="color"
						defaultValue="#FFFFFF"
						aria-label="Text color"
					/>
					<span className="badge-percentage">#FFFFFF</span>
					<div className="input-percentage">
						<input
							type="number"
							min="1"
							max="100"
							step="1"
						/>
						<span className="percentage-suffix">%</span>
					</div>
				</div>

				<div className="mt-0">
					<div className="input-range-header">
						<span>Weight</span>
						<strong>15</strong>
					</div>
					<input className="input-range" type="range" min="0" max="50" defaultValue="15" />
				</div>
				<div className="mt-0">
					<div className="input-range-header">
						<span>Distance</span>
						<strong>15</strong>
					</div>
					<input className="input-range" type="range" min="0" max="50" defaultValue="15" />
				</div>
			</CollapsibleSection>
		</>
	);
};

export default TextProperties;
