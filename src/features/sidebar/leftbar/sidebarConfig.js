import {
  ShirtIcon,
  ImageIcon,
  TypeIcon,
  LayoutTemplateIcon,
  SparklesIcon,
  ShapesIcon,
  Upload,
  Grid3X3,
  Layers,
  CircleHelp,
} from "lucide-react";

export const primaryMenuItems = [
  { id: "product", label: "Product", icon: ShirtIcon },
  { id: "images", label: "Images", icon: ImageIcon },
  { id: "text", label: "Text", icon: TypeIcon },
  { id: "templates", label: "Templates", icon: LayoutTemplateIcon },
  { id: "cliparts", label: "Cliparts", icon: SparklesIcon },
  { id: "shapes", label: "Shapes", icon: ShapesIcon },
];

export const secondaryMenuItems = [
  { id: "uploads", label: "Uploads", icon: Upload, ariaLabel: "Uploads" },
  { id: "more", label: "More", icon: Grid3X3, ariaLabel: "More" },
  { id: "layers", label: "Layers", icon: Layers, ariaLabel: "Layers" },
  { id: "help", label: "Help", icon: CircleHelp, ariaLabel: "Help" },
];
