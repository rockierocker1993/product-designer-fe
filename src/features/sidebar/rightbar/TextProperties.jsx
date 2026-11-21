import React, { useState } from "react";
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
import CollapsibleSection from "../../../components/CollapsibleSection";

const textTransformActions = [
	{ id: "flip-x", label: "Flip X", icon: FlipHorizontal },
	{ id: "flip-y", label: "Flip Y", icon: FlipVertical },
	{ id: "rotate", label: "Rotate", icon: RotateCw },
];

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

const decorationActions = [
	{ id: "none", label: "None", icon: Type },
	{ id: "underline", label: "Underline", icon: Underline },
	{ id: "strike", label: "Strike", icon: Strikethrough },
];

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


const TextProperties = () => {
	return (
		<>
			<h4 className="section-title mb-1 mt-2">Text Color</h4>
			<div className="color-row">
				<input
					className="input-color-picker"
					type="color"
					defaultValue="#FFFFFF"
					aria-label="Text color"
				/>
				<span className="badge-percentage">#FFFFFF</span>
				<div class="input-percentage">
					<input
						type="number"
						min="1"
						max="100"
						step="1"
					/>
					<span class="percentage-suffix">%</span>
				</div>
			</div>
			<button className="outline-btn" type="button">
				Browse Color Palettes
			</button>
			<CollapsibleSection title="Border">
				<div className="color-row">
					<input
						className="input-color-picker"
						type="color"
						defaultValue="#FFFFFF"
						aria-label="Text color"
					/>
					<span className="badge-percentage">#FFFFFF</span>
					<div class="input-percentage">
						<input
							type="number"
							min="1"
							max="100"
							step="1"
						/>
						<span class="percentage-suffix">%</span>
					</div>
				</div>
				<div className="mt-0">
					<div className="input-range-header">
						<span>Border Weight</span>
						<strong>5.00</strong>
					</div>
					<input className="input-range" type="range" min="0" max="100" defaultValue="100" />
				</div>
			</CollapsibleSection>

			<CollapsibleSection title="Text Style">
				<label className="field-label">
					<span>Font Family</span>
					<select className="input" aria-label="Font family" defaultValue="Bungee">
						<option value="Bungee">Bungee</option>
						<option value="Montserrat">Montserrat</option>
						<option value="Oswald">Oswald</option>
					</select>
					<select className="input" aria-label="Font family" defaultValue="Bungee">
						<option value="Bungee">Regular</option>
						<option value="Montserrat">Medium</option>
						<option value="Oswald">Bold</option>
					</select>
				</label>
				<div className="grid-3">
					<label className="field-label">
						<span>Font size</span>
						<input className="input" defaultValue="238" aria-label="Font size" />
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
					<div class="input-percentage">
						<input
							type="number"
							min="1"
							max="100"
							step="1"
						/>
						<span class="percentage-suffix">%</span>
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
					<div class="input-percentage">
						<input
							type="number"
							min="1"
							max="100"
							step="1"
						/>
						<span class="percentage-suffix">%</span>
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
