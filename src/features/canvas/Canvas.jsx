import React, { use, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeCanvas, resizeCanvas, alignmentSelectedObject, transformSelectedObject } from "./controll/canvasController";
import { addImage, addText } from "./controll/canvasAddItemControll";
import "../../assets/css/canvas.css";
import ZoomControl from "./ZoomControl";
import { alignment } from "../../store/ObjectAlignment";

export default function Canvas({ isActive = true, config, canvasWorkspaceRef }) {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const calculatedBoundaryRef = useRef(null); //first set on initializeCanvas function
  const [canvasZoom, setCanvasZoom] = useState(null);

  let originalWorkspaceWidth = null;
  let originalWorkspaceHeight = null;

  useEffect(() => {
    console.log("Canvas isActive:", isActive);
  }, [isActive]);
  //redux
  // Redux state for canvas items
  const canvasItem = useSelector((state) => state.addCanvasItem.canvasItem);
  useEffect(() => {
    if (!fabricRef.current || !isActive) return;
    if (canvasItem.type === "shape") {
      // Add shape to canvas
    } else if (canvasItem.type === "image") {
      // Add image to canvas
      addImage(fabricRef.current, canvasItem.data.id, canvasItem.data.urlThumbnail, { boundary: calculatedBoundaryRef.current });
    } else if (canvasItem.type === "text") {
      // Add text to canvas
      addText(fabricRef.current, canvasItem.data.id, canvasItem.data.text, { boundary: calculatedBoundaryRef.current });
    } else if (canvasItem.type === "template") {
      // Add template to canvas
    } else if (canvasItem.type === "clipart") {
      // Add clipart to canvas
    }
  }, [canvasItem]);

  // Redux state for object alignment
  const objectAligment = useSelector((state) => state.objectAligment.alignment);
  useEffect(() => {
    if (!fabricRef.current || !isActive) return;
    if (objectAligment) {
      alignmentSelectedObject(fabricRef.current, calculatedBoundaryRef.current, objectAligment);
      dispatch(alignment(null)); // Reset alignment after applying it
    }
  }, [objectAligment]);


  // Redux state for object transform
  const propertiesValue = useSelector((state) => state.propertiesValue);
  useEffect(() => {
    if (!fabricRef.current || !isActive) return;
    if (propertiesValue && propertiesValue.renderObject) {
      transformSelectedObject(fabricRef.current, propertiesValue);
    }
  }, [propertiesValue]);


  useEffect(() => {
    // belum fix
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas(fabricRef, canvasWorkspaceRef, originalWorkspaceHeight, originalWorkspaceWidth);
    });
    resizeObserver.observe(canvasWorkspaceRef.current);
    return () => {
      resizeObserver?.disconnect();
    };
  }, []);


  useEffect(() => {
    if (canvasWorkspaceRef.current === null) return;
    let cleanCanvasEventHandlers;
    const setup = async () => {
      const cleanup = await initializeCanvas(canvasWorkspaceRef, fabricRef, canvasRef, calculatedBoundaryRef, {
        height: config.height,
        width: config.width,
        mockupBackgroundColor: config.mockupBackgroundColor,
        mockupUrl: config.mockupUrl,
        mockupBackgroundPadding: config.mockupBackgroundPadding,
        designMode: config.designMode,
        outsideOpacity: config.outsideOpacity,
        boundary: config.boundary
      }, dispatch);
      cleanCanvasEventHandlers = cleanup?.cleanCanvasEventHandlers;
    };
    setup();
    originalWorkspaceHeight = canvasWorkspaceRef.current.clientHeight;
    originalWorkspaceWidth = canvasWorkspaceRef.current.clientWidth;
    resizeCanvas(fabricRef, canvasWorkspaceRef, originalWorkspaceHeight, originalWorkspaceWidth);
    setCanvasZoom(fabricRef.current);
    return () => {
      cleanCanvasEventHandlers?.();
      const canvas = fabricRef.current;
      if (canvas) {
        fabricRef.current = null;
        canvas.dispose();
      }
    };
  }, []);


  return (
    <>
      <div hidden={!isActive} style={{ display: "flex", justifyContent: "center" }}>
        <canvas ref={canvasRef} />
        <div className="canvas-editor-bottom-dock ">
          {canvasZoom && <ZoomControl canvas={canvasZoom} />}
        </div>
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
