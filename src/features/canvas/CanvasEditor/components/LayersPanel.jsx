import React, { useEffect, useMemo, useState } from "react";
import { Eye, EyeOff, Lock, Unlock, GripVertical, Type, Circle } from "lucide-react";

const isLayerObject = (obj) => {
  if (!obj) return false;
  if (obj.id === "tshirt-background") return false;
  return true;
};

const ensureLayerId = (obj) => {
  if (!obj.layerId) {
    obj.layerId = `layer-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }
  return obj.layerId;
};

const truncate = (value, max = 24) => {
  if (!value) return "Untitled Layer";
  return value.length > max ? `${value.slice(0, max)}...` : value;
};

const getLayerLabel = (obj) => {
  const fromName = obj.name || obj.label || obj.id;
  if (fromName && fromName !== "tshirt-background") return truncate(fromName);

  if (obj.type === "textbox" || obj.type === "text" || obj.type === "i-text") {
    return truncate(obj.text || "Text");
  }

  if (obj.type === "group") {
    return "New Group";
  }

  if (obj.type === "path" || obj.type === "polygon" || obj.type === "rect" || obj.type === "circle") {
    return "basicShape";
  }

  if (obj.type === "image") {
    return "Image";
  }

  return truncate(obj.type || "Layer");
};

const isLocked = (obj) => {
  return !!(
    obj.lockMovementX &&
    obj.lockMovementY &&
    obj.lockScalingX &&
    obj.lockScalingY &&
    obj.lockRotation
  );
};

const toLayerEntry = (obj) => ({
  id: ensureLayerId(obj),
  label: getLayerLabel(obj),
  visible: obj.visible !== false,
  locked: isLocked(obj),
  type: obj.type,
  object: obj,
});

const moveArrayItem = (list, fromIndex, toIndex) => {
  const next = [...list];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
};

const LayersPanel = ({ canvas }) => {
  const [layers, setLayers] = useState([]);
  const [activeLayerId, setActiveLayerId] = useState(null);
  const [draggingLayerId, setDraggingLayerId] = useState(null);

  useEffect(() => {
    if (!canvas) return;

    const syncLayers = () => {
      const allObjects = canvas.getObjects();
      const editableObjects = allObjects.filter(isLayerObject);
      const entries = editableObjects.map(toLayerEntry).reverse();

      setLayers(entries);

      const activeObject = canvas.getActiveObject();
      setActiveLayerId(activeObject ? ensureLayerId(activeObject) : null);
    };

    syncLayers();

    const eventNames = [
      "object:added",
      "object:removed",
      "object:modified",
      "selection:created",
      "selection:updated",
      "selection:cleared",
    ];

    eventNames.forEach((eventName) => canvas.on(eventName, syncLayers));

    return () => {
      eventNames.forEach((eventName) => canvas.off(eventName, syncLayers));
    };
  }, [canvas]);

  const emptyState = useMemo(() => {
    return (
      <div className="layers-empty-state">
        <p>No layers yet</p>
      </div>
    );
  }, []);

  const handleSelectLayer = (layer) => {
    if (!canvas || !layer?.object) return;
    canvas.setActiveObject(layer.object);
    canvas.requestRenderAll();
    setActiveLayerId(layer.id);
  };

  const handleToggleVisibility = (event, layer) => {
    event.stopPropagation();
    if (!canvas || !layer?.object) return;

    layer.object.visible = layer.object.visible === false;

    if (layer.object.visible === false && canvas.getActiveObject() === layer.object) {
      canvas.discardActiveObject();
      setActiveLayerId(null);
    }

    canvas.requestRenderAll();
    setLayers((previous) =>
      previous.map((entry) =>
        entry.id === layer.id
          ? { ...entry, visible: layer.object.visible !== false }
          : entry,
      ),
    );
  };

  const handleToggleLock = (event, layer) => {
    event.stopPropagation();
    if (!canvas || !layer?.object) return;

    const nextLock = !isLocked(layer.object);
    layer.object.lockMovementX = nextLock;
    layer.object.lockMovementY = nextLock;
    layer.object.lockScalingX = nextLock;
    layer.object.lockScalingY = nextLock;
    layer.object.lockRotation = nextLock;
    layer.object.selectable = !nextLock;

    if (nextLock && canvas.getActiveObject() === layer.object) {
      canvas.discardActiveObject();
      setActiveLayerId(null);
    }

    canvas.requestRenderAll();
    setLayers((previous) =>
      previous.map((entry) =>
        entry.id === layer.id
          ? { ...entry, locked: nextLock }
          : entry,
      ),
    );
  };

  const handleDragStart = (layerId) => {
    setDraggingLayerId(layerId);
  };

  const handleDragEnd = () => {
    setDraggingLayerId(null);
  };

  const handleDrop = (targetLayerId) => {
    if (!canvas || !draggingLayerId || draggingLayerId === targetLayerId) return;

    const fromIndex = layers.findIndex((layer) => layer.id === draggingLayerId);
    const toIndex = layers.findIndex((layer) => layer.id === targetLayerId);
    if (fromIndex < 0 || toIndex < 0) return;

    const reordered = moveArrayItem(layers, fromIndex, toIndex);
    setLayers(reordered);

    const allObjects = canvas.getObjects();
    const indexedLayerObjects = allObjects
      .map((obj, index) => ({ obj, index }))
      .filter(({ obj }) => isLayerObject(obj));

    if (indexedLayerObjects.length === 0) return;

    const baseIndex = Math.min(...indexedLayerObjects.map((entry) => entry.index));
    const bottomToTop = [...reordered].reverse().map((entry) => entry.object);

    bottomToTop.forEach((obj, index) => {
      canvas.moveTo(obj, baseIndex + index);
    });

    canvas.requestRenderAll();
  };

  return (
    <div className="layers-panel-scroll">
      {layers.length === 0 ? emptyState : null}

      {layers.map((layer) => {
        const isActive = activeLayerId === layer.id;
        return (
          <div
            key={layer.id}
            className={`layer-item ${isActive ? "active" : ""}`}
            onClick={() => handleSelectLayer(layer)}
            draggable
            onDragStart={() => handleDragStart(layer.id)}
            onDragEnd={handleDragEnd}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => handleDrop(layer.id)}
          >
            <span className="layer-drag-handle" aria-hidden="true">
              <GripVertical size={14} />
            </span>

            <span className="layer-type-icon" aria-hidden="true">
              {layer.type === "textbox" || layer.type === "text" || layer.type === "i-text" ? (
                <Type size={13} />
              ) : (
                <Circle size={12} />
              )}
            </span>

            <span className="layer-label" title={layer.label}>
              {layer.label}
            </span>

            <button
              type="button"
              className="layer-action-btn"
              onClick={(event) => handleToggleVisibility(event, layer)}
              aria-label={layer.visible ? "Hide layer" : "Show layer"}
            >
              {layer.visible ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>

            <button
              type="button"
              className="layer-action-btn"
              onClick={(event) => handleToggleLock(event, layer)}
              aria-label={layer.locked ? "Unlock layer" : "Lock layer"}
            >
              {layer.locked ? <Lock size={14} /> : <Unlock size={14} />}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default LayersPanel;
