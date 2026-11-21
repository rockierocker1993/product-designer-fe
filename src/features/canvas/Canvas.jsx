import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCanvas, resizeCanvas} from "./controll/canvasController";
import { addImage } from "./controll/canvasAddItemControll";
import "../../assets/css/canvas.css";
import ZoomControl from "./ZoomControl";

const PRODUCT_WIDTH = 500;
const PRODUCT_HEIGHT = 600;
const PRODUCT_BACKGROUND = "#f5f5f5";
const PRODUCT_PADING = 50;

const DESIGN_MODE = "FREEFORM"; // BOUNDARY or FREEFORM
const DESIGN_BOUNDARY = {
  left: 0,
  top: 0,
  width: 200,
  height: 250,
};

const OUTSIDE_OPACITY = 0.05;

export default function Canvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const [canvasZoom, setCanvasZoom] = useState(null);
  let originalWorkspaceWidth = null;
  let originalWorkspaceHeight = null;

  //redux
  const canvasItem = useSelector((state) => state.addCanvasItem.canvasItem);

  useEffect(() => {
    if (!fabricRef.current) return;
    if (canvasItem.type === "shape") {
      // Add shape to canvas
    } else if (canvasItem.type === "image") {
      // Add image to canvas
      addImage(fabricRef.current, canvasItem.data.urlThumbnail);
    } else if (canvasItem.type === "text") {
      // Add text to canvas
    } else if (canvasItem.type === "template") {
      // Add template to canvas
    } else if (canvasItem.type === "clipart") {
      // Add clipart to canvas
    }
  }, [canvasItem]);

  useEffect(() => {
    // belum fix
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas(fabricRef, containerRef, originalWorkspaceHeight, originalWorkspaceWidth);
    });
    resizeObserver.observe(containerRef.current);
    return () => {
      resizeObserver?.disconnect();
    };
  }, []);


  useEffect(() => {
    if (containerRef.current === null) return;
    originalWorkspaceHeight = containerRef.current.clientHeight;
    originalWorkspaceWidth = containerRef.current.clientWidth;
    let cleanCanvasEventHandlers;
    const setup = async () => {
      const cleanup = await initializeCanvas(containerRef, fabricRef, canvasRef, {
        height: PRODUCT_HEIGHT,
        width: PRODUCT_WIDTH,
        mockupBackgroundColor: PRODUCT_BACKGROUND,
        mockupUrl: "http://localhost:8877/api/storage/preview/images/product/tshirtfront.png",
        mockupBackgroundPadding: PRODUCT_PADING,
        designMode: DESIGN_MODE,
        outsideOpacity: OUTSIDE_OPACITY,
        boundary: DESIGN_BOUNDARY
      });
      cleanCanvasEventHandlers = cleanup?.cleanCanvasEventHandlers;
    };
    setup();
    resizeCanvas(fabricRef, containerRef, originalWorkspaceHeight, originalWorkspaceWidth);
    setCanvasZoom(fabricRef.current);
    return () => {
      cleanCanvasEventHandlers?.();
      const canvas = fabricRef.current;
      if (canvas) {
        fabricRef.current = null;
        canvas.dispose();
      }
    };
  }, [PRODUCT_WIDTH, PRODUCT_HEIGHT]);


  return (
    <>
      <div className="canvas-workspace" ref={containerRef}>
        <canvas ref={canvasRef} />
      </div>
      <div className="canvas-editor-bottom-dock ">
        {canvasZoom && <ZoomControl canvas={canvasZoom} />}
      </div>
    </>
  );
}


// import React, { useEffect, useRef, useState } from "react";
// import { fabric } from "fabric";
// import "../../../../assets/css/canvas.css";
// import { addRectangle, resizeCanvas } from "../../controll/canvas";

// const CANVAS_WIDTH = 800;
// const CANVAS_HEIGHT = 600;
// const PRINT_AREA = {
//   left: 280,
//   top: 210,
//   width: 240,
//   height: 320,
// };

// const product = {
//   name: "T-Shirt",
//   image: "http://localhost:8877/api/storage/preview/images/product/tshirtfront.png",
//   width: 600,
//   height: 800,
//   designCordinate: {
//     right: 320,
//     left: 100,
//     top: 100,
//     bottom: 240
//   },
// };
// const Canvas = () => {

//   const containerRef = useRef(null);
//   const canvasElementRef = useRef(null);
//   const fabricCanvasRef = useRef(null);

//   const [mockupLoaded, setMockupLoaded] = useState(false);

//   const resizeCanvas = () => {
//     const canvas = fabricCanvasRef.current;
//     const container = containerRef.current;

//     if (!canvas || !container) return;

//     const { width, height } = product;

//     const availableWidth = container.clientWidth - 32;
//     const availableHeight = container.clientHeight - 32;

//     const scale = Math.min(
//       availableWidth / width,
//       availableHeight / height,
//       1
//     );
//     console.log(scale);
//     canvas.setZoom(scale);

//     canvas.setDimensions({
//       width: (width * scale) - (product.designCordinate.left + product.designCordinate.right),
//       height: (height * scale) - (product.designCordinate.top + product.designCordinate.bottom),
//     });

//     canvas.renderAll();
//   };

//   useEffect(() => {
//     if (!canvasElementRef.current) return;

//     const canvas = new fabric.Canvas(canvasElementRef.current, {
//       width: product.width - (product.designCordinate.left + product.designCordinate.right),
//       height: product.height - (product.designCordinate.top + product.designCordinate.bottom),
//       backgroundColor: "transparent",
//       preserveObjectStacking: true,
//     });

//     fabricCanvasRef.current = canvas;

//     const observer = new ResizeObserver(resizeCanvas);

//     observer.observe(containerRef.current);

//     resizeCanvas();

//     return () => {
//       observer.disconnect();
//       fabricCanvasRef.current = null;
//       canvas.dispose();
//     };
//   }, [product.width, product.height]);

//   useEffect(() => {
//     setMockupLoaded(false);
//   }, [product.image]);

//   const addText = () => {
//     const canvas = fabricCanvasRef.current;
//     if (!canvas) return;

//     const text = new fabric.IText("YOUR DESIGN", {
//       left: (product.width - (product.designCordinate.left + product.designCordinate.right)) / 2,
//       top: (product.height - (product.designCordinate.top + product.designCordinate.bottom)) / 2,
//       originX: "center",
//       originY: "center",
//       fontSize: 32,
//       fill: "#000000",
//     });

//     canvas.add(text);
//     canvas.setActiveObject(text);
//     canvas.renderAll();
//   };

//   return (
//     <div className="editor-container">
//       <div className="editor-toolbar">
//         <button onClick={addText}>Add Text</button>
//       </div>

//       <div className="canvas-workspace" ref={containerRef}>
//         <div
//           className="product-stage"
//           style={{
//             width: product.width,
//             height: product.height,
//             border : "1px solid #000  "
//           }}
//         >
//           <img
//             className="product-mockup"
//             src={'http://localhost:8877/api/storage/preview/images/product/tshirtfront.png'}
//             alt={'T-Shirt'}
//             onLoad={() => setMockupLoaded(true)}
//           />
//           <div className="canvas-wrapper" style={{
//             position: "absolute",
//             width: '100%',
//             height: '100%',
//             paddingTop: product.designCordinate.top,
//             paddingLeft: product.designCordinate.left,
//             paddingRight: product.designCordinate.right,
//             paddingBottom: product.designCordinate.bottom
//           }}>
//             <canvas ref={canvasElementRef} />
//           </div>
//           {mockupLoaded && (
//             <div
//               className="print-area-guide"
//               style={{
//                 left: product.designCordinate.left,
//                 top: product.designCordinate.top,
//                 width: product.designCordinate.width,
//                 height: product.designCordinate.height,
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Canvas;


// import React from "react";

// const CanvasStage = ({ onDragOver, onDragLeave, onDrop }) => {
//   return (
//     <div className="canvas-stage">
//       <div
//         className="canvas-area"
//         id="canvasArea"
//         onDragOver={onDragOver}
//         onDragLeave={onDragLeave}
//         onDrop={onDrop}
//       >
//         <div className="canvas-layer canvas-layer-1">
//           <canvas id="canvas" />
//         </div>

//         <div className="canvas-layer canvas-layer-2" id="canvasOverlayLayer" />
//       </div>
//     </div>
//   );
// };

// export default CanvasStage;
