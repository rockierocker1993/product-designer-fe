backlog
pindah icon ke https://tablericons.com/



on progress
Complete code TooltipPosition - done
Customize transform control - on progress



need to read
https://github.com/fabricjs/fabric.js/discussions/7200

https://blog.ablo.ai/how-to-create-a-canvas-with-a-limited-drawing-area-on-a-background-image-in-fabricjs

https://medium.com/@luizzappa/custom-icon-and-cursor-in-fabric-js-controls-4714ba0ac28f



need to implement
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js"></script>
  <style>
    canvas { border: 1px dashed #ccc; }
  </style>
</head>
<body>
<canvas id="c" width="600" height="400"></canvas>

<script>
const deleteIcon = "data:image/svg+xml;base64," + btoa(`
<svg fill="red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<path d="M18.3 5.71L12 12.01l-6.3-6.3-1.41 1.42L10.59 13.4l-6.3 6.3 1.41 1.41 6.3-6.29 6.3 6.29 1.41-1.41-6.29-6.3 6.29-6.3z"/>
</svg>
`);
const duplicateIcon = "data:image/svg+xml;base64," + btoa(`
<svg fill="blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v16h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 18H8V7h11v16z"/>
</svg>
`);
const rotateIcon = "data:image/svg+xml;base64," + btoa(`
<svg fill="green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<path d="M15.55 5.55A7.96 7.96 0 0012 4V1L7 6l5 5V7c2.76 0 5 2.24 5 5a5 5 0 01-9.9 1h-2.02A7.002 7.002 0 0012 19c3.87 0 7-3.13 7-7 0-1.93-.78-3.68-2.05-4.95z"/>
</svg>
`);

function renderIcon(icon) {
  const img = new Image();
  img.src = icon;
  return function render(ctx, left, top, styleOverride, fabricObject) {
    const size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(img, -size/2, -size/2, size, size);
    ctx.restore();
  }
}

const canvas = new fabric.Canvas('c');

// DELETE CONTROL
fabric.Object.prototype.controls.deleteControl = new fabric.Control({
  x: -0.5,
  y: -0.5,
  offsetX: -8,
  offsetY: -8,
  cursorStyle: 'pointer',
  mouseUpHandler: function(eventData, transform) {
    const target = transform.target;
    target.canvas.remove(target);
    target.canvas.requestRenderAll();
  },
  render: renderIcon(deleteIcon),
  cornerSize: 24
});

// DUPLICATE CONTROL
fabric.Object.prototype.controls.duplicateControl = new fabric.Control({
  x: -0.5,
  y: 0.5,
  offsetX: -8,
  offsetY: 8,
  cursorStyle: 'pointer',
  mouseUpHandler: function(eventData, transform) {
    const target = transform.target;
    target.clone(function(clone) {
      clone.set({
        left: target.left + 20,
        top: target.top + 20
      });
      target.canvas.add(clone);
      target.canvas.setActiveObject(clone);
    });
  },
  render: renderIcon(duplicateIcon),
  cornerSize: 24
});

// ROTATE CONTROL (kanan atas)
fabric.Object.prototype.controls.rotateCustom = new fabric.Control({
  x: 0.5,
  y: -0.5,
  offsetX: 8,
  offsetY: -8,
  cursorStyle: 'crosshair',
  actionHandler: fabric.controlsUtils.rotationWithSnapping,
  actionName: 'rotate',
  render: renderIcon(rotateIcon),
  cornerSize: 24
});

// Tambahkan contoh gambar
fabric.Image.fromURL("data:image/jpeg;base64,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", function(img) {
  img.set({
    left: 150,
    top: 100,
    hasBorders: true,
    cornerColor: 'transparent',
    transparentCorners: false
  });
  img.setControlVisible('mtr', false);
  canvas.add(img).setActiveObject(img);
});
</script>
</body>
</html>


import React from 'react'

export const abacus = () => {
  return (
    <!--
tags: [abacus, math, counting, adding up]
version: "1.58"
category: Math
unicode: "f05c"
-->
<svg aria-hidden="true"
  xmlns="http://www.w3.org/2000/svg"
  width="32"
  height="32"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#ff9500"
  stroke-width="1"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 3v18" />
  <path d="M19 21v-18" />
  <path d="M5 7h14" />
  <path d="M5 15h14" />
  <path d="M8 13v4" />
  <path d="M11 13v4" />
  <path d="M16 13v4" />
  <path d="M14 5v4" />
  <path d="M11 5v4" />
  <path d="M8 5v4" />
  <path d="M3 21h18" />
</svg>

  )
}