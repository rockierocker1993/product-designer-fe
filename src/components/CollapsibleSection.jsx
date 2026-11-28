import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "../assets/css/collapsible-section.css";

const CollapsibleSection = ({ title, children, defaultCollapsed = false }) => {
	const [collapsed, setCollapsed] = useState(defaultCollapsed);

	return (
		<section className={`collapsible-section ${collapsed ? "is-collapsed" : ""}`.trim()}>
			<div className="collapsible-section-head">
				<h4 className="section-title">{title}</h4>
				<button
					className="collapsible-collapse-btn"
					type="button"
					onClick={() => setCollapsed((prev) => !prev)}
					aria-label={`${collapsed ? "Expand" : "Collapse"} ${title}`}
					title={collapsed ? "Expand" : "Collapse"}
				>
					{collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
				</button>
			</div>
			<div className="section-body collapsible-section-body" hidden={collapsed}>
				{children}
			</div>
		</section>
	);
};

export default CollapsibleSection;