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
import RightbarContainer from "./RightbarContainer";

const textTransformActions = [
	{ id: "flip-x", label: "Flip X", icon: FlipHorizontal },
	{ id: "flip-y", label: "Flip Y", icon: FlipVertical },
	{ id: "rotate", label: "Rotate", icon: RotateCw },
];

const effectActions = [
	{ id: "arc", label: "Arc", icon: Sparkles },
	{ id: "distort", label: "Distort", icon: SlidersHorizontal },
	{ id: "wave", label: "Wave", icon: Waves },
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

const CollapsibleSection = ({ title, children, defaultCollapsed = false }) => {
	const [collapsed, setCollapsed] = useState(defaultCollapsed);

	return (
		<section className={`rp-section ${collapsed ? "is-collapsed" : ""}`.trim()}>
			<div className="rp-section-head">
				<h4 className="rp-section-title">{title}</h4>
				<button
					className="rp-collapse-btn"
					type="button"
					onClick={() => setCollapsed((prev) => !prev)}
					aria-label={`${collapsed ? "Expand" : "Collapse"} ${title}`}
					title={collapsed ? "Expand" : "Collapse"}
				>
					{collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
				</button>
			</div>
			<div className="rp-section-body" hidden={collapsed}>
				{children}
			</div>
		</section>
	);
};

const TextPropertes = () => {
	return (
		<RightbarContainer title="Text Properties" subtitle="Control your selected text style">
			<CollapsibleSection title="Text">
				<input className="rp-input" defaultValue="Vortex" aria-label="Text content" />
			</CollapsibleSection>

			<CollapsibleSection title="Object Alignment">
				<div className="rp-align-strip" role="group" aria-label="Object align options">
					{alignActions.map((item) => {
						return (
							<button
								key={item.id}
								className={`rp-align-btn ${item.active ? "is-active" : ""}`.trim()}
								type="button"
								aria-label={item.label}
								title={item.label}
							>
								<ObjectAlignIcon type={item.glyph} />
							</button>
						);
					})}
				</div>
			</CollapsibleSection>

			<CollapsibleSection title="Transform">
				<div className="rp-grid-2">
					<label className="rp-field">
						<span>X</span>
						<input className="rp-input" defaultValue="481" aria-label="Transform X" />
					</label>
					<label className="rp-field">
						<span>Y</span>
						<input className="rp-input" defaultValue="270" aria-label="Transform Y" />
					</label>
				</div>
				<div className="rp-icon-row" role="group" aria-label="Transform actions">
					{textTransformActions.map((item) => {
						const Icon = item.icon;
						return (
							<button key={item.id} className="rp-chip-btn" type="button" title={item.label}>
								<Icon size={13} />
								<span>{item.label}</span>
							</button>
						);
					})}
				</div>
			</CollapsibleSection>

			<CollapsibleSection title="Layer">
				<div className="rp-range-header">
					<span>Opacity</span>
					<strong>100%</strong>
				</div>
				<input className="rp-range" type="range" min="0" max="100" defaultValue="100" />
			</CollapsibleSection>

			<CollapsibleSection title="Text Color">
				<div className="rp-color-row">
					<input
						className="rp-color-picker"
						type="color"
						defaultValue="#FFFFFF"
						aria-label="Text color"
					/>
					<input className="rp-input" defaultValue="#FFFFFF" aria-label="Hex text color" />
					<span className="rp-badge">100%</span>
				</div>
				<button className="rp-outline-btn" type="button">
					Browse Color Palettes
				</button>
			</CollapsibleSection>

			<CollapsibleSection title="Border">
				<div className="rp-color-row">
					<input
						className="rp-color-picker"
						type="color"
						defaultValue="#FFFFFF"
						aria-label="Border color"
					/>
					<input className="rp-input" defaultValue="#FFFFFF" aria-label="Hex border color" />
					<span className="rp-badge">100%</span>
				</div>
				<label className="rp-field">
					<span>Border Weight</span>
					<input className="rp-input" defaultValue="5.53" aria-label="Border weight" />
				</label>
			</CollapsibleSection>

			<CollapsibleSection title="Text Style">
				<label className="rp-field">
					<span>Font Family</span>
					<select className="rp-input" aria-label="Font family" defaultValue="Bungee">
						<option value="Bungee">Bungee</option>
						<option value="Montserrat">Montserrat</option>
						<option value="Oswald">Oswald</option>
					</select>
				</label>
				<div className="rp-grid-3">
					<label className="rp-field">
						<span>Size</span>
						<input className="rp-input" defaultValue="238" aria-label="Font size" />
					</label>
					<label className="rp-field">
						<span>Height</span>
						<input className="rp-input" defaultValue="-50" aria-label="Line height" />
					</label>
					<label className="rp-field">
						<span>Spacing</span>
						<input className="rp-input" defaultValue="292" aria-label="Letter spacing" />
					</label>
				</div>
				<div className="rp-icon-row" role="group" aria-label="Text style actions">
					<button className="rp-icon-btn is-active" type="button" aria-label="Bold">
						<Bold size={14} />
					</button>
					<button className="rp-icon-btn" type="button" aria-label="Italic">
						<Italic size={14} />
					</button>
					<button className="rp-icon-btn" type="button" aria-label="Underline">
						<Underline size={14} />
					</button>
					<button className="rp-icon-btn" type="button" aria-label="Strike through">
						<Strikethrough size={14} />
					</button>
				</div>
			</CollapsibleSection>

			<CollapsibleSection title="Transformation">
				<div className="rp-icon-row" role="group" aria-label="Transformation effects">
					{effectActions.map((item) => {
						const Icon = item.icon;
						return (
							<button key={item.id} className="rp-chip-btn" type="button" title={item.label}>
								<Icon size={13} />
								<span>{item.label}</span>
							</button>
						);
					})}
				</div>
			</CollapsibleSection>

			<CollapsibleSection title="Text Shadow">
				<div className="rp-color-row">
					<input
						className="rp-color-picker"
						type="color"
						defaultValue="#FFFFFF"
						aria-label="Shadow color"
					/>
					<input className="rp-input" defaultValue="#FFFFFF" aria-label="Hex shadow color" />
					<span className="rp-badge">100%</span>
				</div>
				<div className="rp-grid-2">
					<label className="rp-field">
						<span>Offset</span>
						<input className="rp-input" defaultValue="3" aria-label="Shadow offset" />
					</label>
					<label className="rp-field">
						<span>Angle</span>
						<input className="rp-input" defaultValue="-89" aria-label="Shadow angle" />
					</label>
				</div>
				<div className="rp-range-header">
					<span>Blur</span>
					<strong>15</strong>
				</div>
				<input className="rp-range" type="range" min="0" max="50" defaultValue="15" />
			</CollapsibleSection>

			<CollapsibleSection title="Text Decoration">
				<div className="rp-icon-row" role="group" aria-label="Decoration actions">
					{decorationActions.map((item) => {
						const Icon = item.icon;
						return (
							<button key={item.id} className="rp-chip-btn" type="button" title={item.label}>
								<Icon size={13} />
								<span>{item.label}</span>
							</button>
						);
					})}
				</div>
				<div className="rp-grid-2">
					<label className="rp-field">
						<span>Weight</span>
						<input className="rp-input" defaultValue="5" aria-label="Decoration weight" />
					</label>
					<label className="rp-field">
						<span>Distance</span>
						<input className="rp-input" defaultValue="50%" aria-label="Decoration distance" />
					</label>
				</div>
			</CollapsibleSection>

			<footer className="rp-footer-actions">
				<button className="rp-secondary-btn" type="button">
					<RefreshCcw size={14} />
					Reset
				</button>
				<button className="rp-primary-btn" type="button">
					<Check size={14} />
					Confirm
				</button>
			</footer>
		</RightbarContainer>
	);
};

export default TextPropertes;
