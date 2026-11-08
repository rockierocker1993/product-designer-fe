import { ImageIcon, VideoIcon, Shirt, Sparkles } from "lucide-react";

export const DEFAULT_PROJECT_NAME = "Untitled Project";

export const projectColorItems = [
  { id: "black", label: "000000", opacity: "100%", swatch: "#000000" },
  { id: "wine", label: "732C56", opacity: "100%", swatch: "#732C56" },
  {
    id: "white",
    label: "FFFFFF",
    opacity: "100%",
    swatch: "#FFFFFF",
    isLight: true,
  },
  { id: "linear", label: "Linear", opacity: "", isLinear: true },
];

export const toolActionItems = [
  { id: "ai-image", label: "AI Image Board", icon: ImageIcon },
  { id: "ai-video", label: "AI Video Board", icon: VideoIcon },
  { id: "mockup", label: "Mockup", icon: Shirt },
  { id: "upgrade", label: "Upgrade", icon: Sparkles },
];
