import React from "react";
import { RefreshCcw } from "lucide-react";
import PropertiesBlock from "./PropertiesBlock";
import LayersPanel from "./LayersPanel";
import {
  DEFAULT_PROJECT_NAME,
  projectColorItems,
  toolActionItems,
} from "../config/editorUiConfig";

const getSwatchClassName = (colorItem) => {
  const classNames = ["swatch"];
  if (colorItem.isLight) classNames.push("swatch-light");
  if (colorItem.isLinear) classNames.push("swatch-linear");
  return classNames.join(" ");
};

const EditorPropertiesPanel = ({ canvas, tshirtColor, onTshirtColorChange }) => {
  return (
    <aside className="editor-properties-panel">
      <div className="properties-panel-header">
        <input className="project-name-input" value={DEFAULT_PROJECT_NAME} readOnly />
        <button className="refresh-button" type="button" aria-label="Refresh project name">
          <RefreshCcw size={14} />
        </button>
      </div>

      <PropertiesBlock title="Project Colors">
        <div className="color-list">
          {projectColorItems.map((colorItem) => (
            <div key={colorItem.id} className="color-row">
              <span
                className={getSwatchClassName(colorItem)}
                style={colorItem.swatch ? { background: colorItem.swatch } : undefined}
              ></span>
              <span>{colorItem.label}</span>
              <span>{colorItem.opacity}</span>
            </div>
          ))}
        </div>
        <button className="property-outline-btn" type="button">
          Browse Color Palettes
        </button>
      </PropertiesBlock>

      <PropertiesBlock title="Tools" className="properties-tools">
        {toolActionItems.map((toolItem) => {
          const Icon = toolItem.icon;
          return (
            <button key={toolItem.id} className="tool-property-btn" type="button">
              <Icon size={14} />
              {toolItem.label}
            </button>
          );
        })}
      </PropertiesBlock>

      <PropertiesBlock title="T-Shirt Color" className="tshirt-color-card">
        <input
          id="tshirtColorPicker"
          type="color"
          value={tshirtColor}
          onChange={(event) => onTshirtColorChange(event.target.value)}
        />
      </PropertiesBlock>

      <PropertiesBlock title="Layers" className="layers-panel-card">
        <LayersPanel canvas={canvas} />
      </PropertiesBlock>
    </aside>
  );
};

export default EditorPropertiesPanel;
