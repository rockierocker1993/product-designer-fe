import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addShapesItem } from "../../../store/components/AddCanvasItemSlice";
import { fetchShapesList } from "../../../api/shapesApi";
import { SidebarPanelShell, SidebarGridState } from "./components";
import { useLoadableData } from "../../../hooks";

const Shape = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: shapes,
    loading,
    error,
    reload: loadShapes,
  } = useLoadableData(fetchShapesList);

  const handleShapeClick = (shapeId) => {
    dispatch(addShapesItem(`api-${shapeId}`));
  };

  const handleDragStart = (e, shape) => {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('application/json', JSON.stringify({
      type: 'shape',
      id: shape.id,
      name: shape.name,
      svg: shape.svg,
      thumbnail: shape.thumbnail
    }));
  };

  const filteredShapes = shapes.filter(shape => 
    shape.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shape.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const footerText = !loading && !error && shapes.length > 0
    ? `Showing ${filteredShapes.length} of ${shapes.length} shapes`
    : null;

  return (
    <SidebarPanelShell
      title="Shapes"
      subtitle="Click to add shape"
      searchPlaceholder="Search shapes..."
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      footer={footerText}
    >
      <div className="items-grid shapes-grid">
        <SidebarGridState
          loading={loading}
          loadingText="Loading shapes..."
          error={error}
          onRetry={loadShapes}
          empty={!loading && !error && filteredShapes.length === 0}
          emptyText="No shapes found"
        />

        {!loading && !error && filteredShapes.map((shape) => (
          <div
            key={shape.id}
            className="grid-item"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, shape)}
            onClick={() => handleShapeClick(shape.id)}
            title={shape.name}
          >
            <div className="item-preview">
              {shape.thumbnail ? (
                <img src={shape.thumbnail} alt={shape.name} />
              ) : (
                <div 
                  dangerouslySetInnerHTML={{ __html: shape.svg }}
                  className="svg-preview"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </SidebarPanelShell>
  );
};

export default Shape;
