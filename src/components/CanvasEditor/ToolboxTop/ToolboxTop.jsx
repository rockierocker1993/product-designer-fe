import { Image, OverlayTrigger, Popover } from "react-bootstrap";
import TooltipTransforms from "./TooltipTransforms";
import TooltipPosition from "./TooltipPosition";
import TooltipFillOptions from "./TooltipFillOptions";

function ToolboxTop() {
  

  return <div className="toolbox-top d-flex justify-content-between align-items-center bg-white">
    <div className="d-flex align-items-center gap-3">
      <Image src="https://lumise.com/wp-content/uploads/2018/05/logo.png" alt="logo" height="30" />
      <nav className="d-none d-md-flex gap-3">
        <a href="#" className="text-white text-decoration-none">File</a>
        <a href="#" className="text-white text-decoration-none">Designs</a>
        <a href="#" className="text-white text-decoration-none">Print</a>
        <a href="#" className="text-white text-decoration-none">Help</a>
      </nav>
    </div>
    <div>
      <TooltipFillOptions></TooltipFillOptions>
      <TooltipPosition></TooltipPosition>
      <TooltipTransforms></TooltipTransforms>
    </div>
  </div>
}

export default ToolboxTop;