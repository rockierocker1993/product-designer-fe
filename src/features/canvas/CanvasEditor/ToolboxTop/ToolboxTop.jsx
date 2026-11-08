import React, { lazy, Suspense, useRef, useState } from "react";
import { Undo2, Redo2, MousePointer2, Sparkles, Palette, Move, SlidersHorizontal } from "lucide-react";

const loadTooltipTransforms = () => import("./TooltipTransforms");
const loadTooltipPosition = () => import("./TooltipPosition");
const loadTooltipFillOptions = () => import("./TooltipFillOptions");

const TooltipTransforms = lazy(loadTooltipTransforms);
const TooltipPosition = lazy(loadTooltipPosition);
const TooltipFillOptions = lazy(loadTooltipFillOptions);

const LazyToolButtonFallback = ({ icon: Icon, label }) => {
  return (
    <button
      type="button"
      className="toolbox-ghost-btn toolbox-ghost-btn-loading"
      aria-label={label}
      disabled
    >
      <span className="toolbox-ghost-btn-skeleton" aria-hidden="true" />
      <Icon size={16} />
    </button>
  );
};

function ToolboxTop({ 
  onTransform, 
  onPosition
}) {
  const [activePopover, setActivePopover] = useState(null);
  const hasPreloadedTooltipsRef = useRef(false);

  const preloadTooltips = () => {
    if (hasPreloadedTooltipsRef.current) return;

    hasPreloadedTooltipsRef.current = true;
    loadTooltipFillOptions();
    loadTooltipPosition();
    loadTooltipTransforms();
  };

  const handlePopoverToggle = (popoverName) => {
    setActivePopover(prevActive => prevActive === popoverName ? null : popoverName);
  };

  return <div className="toolbox-top">
    <div className="toolbox-section">
      <button type="button" className="toolbox-ghost-btn" aria-label="Select tool">
        <MousePointer2 size={16} />
      </button>
      <button type="button" className="toolbox-ghost-btn" aria-label="Undo">
        <Undo2 size={16} />
      </button>
      <button type="button" className="toolbox-ghost-btn" aria-label="Redo">
        <Redo2 size={16} />
      </button>
    </div>

    <div className="toolbox-divider" />

    <div
      className="toolbox-section toolbox-section-actions"
      onMouseEnter={preloadTooltips}
      onFocus={preloadTooltips}
    >
      <Suspense fallback={<LazyToolButtonFallback icon={Palette} label="Fill options" />}>
        <TooltipFillOptions
          isOpen={activePopover === 'fill'}
          onToggle={() => handlePopoverToggle('fill')}
        />
      </Suspense>
      <Suspense fallback={<LazyToolButtonFallback icon={Move} label="Position options" />}>
        <TooltipPosition
          onPosition={onPosition}
          isOpen={activePopover === 'position'}
          onToggle={() => handlePopoverToggle('position')}
        />
      </Suspense>
      <Suspense fallback={<LazyToolButtonFallback icon={SlidersHorizontal} label="Transform options" />}>
        <TooltipTransforms
          onTransform={onTransform}
          isOpen={activePopover === 'transform'}
          onToggle={() => handlePopoverToggle('transform')}
        />
      </Suspense>

      <button type="button" className="toolbox-ghost-btn" aria-label="Magic tool">
        <Sparkles size={16} />
      </button>
    </div>
  </div>
}

export default ToolboxTop;