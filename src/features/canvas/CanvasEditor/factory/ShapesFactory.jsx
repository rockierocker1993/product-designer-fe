import { fabric } from "fabric";
import { fetchShapeById } from "../../../../api/shapesApi";

/**
 * Create shape from API SVG data
 * @param {Object} canvas - Fabric.js canvas instance
 * @param {string} shapeId - Shape ID to fetch from API
 * @param {Object} config - Configuration object for the shape
 */
export const createShapeFromAPI = async (canvas, shapeId, config) => {
  try {
    console.log('Fetching shape from API:', shapeId);
    const shapeData = await fetchShapeById(shapeId);
    
    console.log('Shape data received:', shapeData);
    
    if (!shapeData || !shapeData.svg) {
      throw new Error(`No SVG data found for shape: ${shapeId}`);
    }

    // Decode SVG if it's escaped
    let svgString = shapeData.svg;
    if (svgString.includes('\\u003c')) {
      // SVG is Unicode escaped, decode it
      svgString = svgString
        .replace(/\\u003c/g, '<')
        .replace(/\\u003e/g, '>')
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"');
    }

    console.log('SVG string to load:', svgString);

    // Load SVG from API response
    fabric.loadSVGFromString(svgString, (objects, options) => {
      if (!objects || objects.length === 0) {
        console.error('No objects loaded from SVG');
        createRectangleShape(canvas, config);
        return;
      }

      const shape = fabric.util.groupSVGElements(objects, options);
      shape.set({
        left: config.left,
        top: config.top,
        fill: config.fill || shapeData.defaultColor
      });
      
      // Add custom properties from API if available
      if (shapeData.metadata) {
        shape.set({
          shapeName: shapeData.name,
          shapeCategory: shapeData.category,
          shapeId: shapeData.id
        });
      }
      
      canvas.add(shape);
      canvas.renderAll();
      console.log('Shape added to canvas successfully');
    });
  } catch (error) {
    console.error('Error creating shape from API:', error);
    // Fallback to default shape if API fails
    createRectangleShape(canvas, config);
  }
};

export const createRectangleShape = (canvas, config) => {
  const rect = new fabric.Rect(config);
  canvas.add(rect);
}

export const createCircleShape = (canvas, config) => {
  const circle = new fabric.Circle({
    ...config,
    radius: 50
  });
  canvas.add(circle);
}

export const createTriangleShape = (canvas, config) => {
  const triangle = new fabric.Triangle(config);
  canvas.add(triangle);
}

export const createPolygonShape = (canvas, config) => {
  const polygon = new fabric.Polygon([
    { x: 50, y: 0 },
    { x: 100, y: 50 },
    { x: 75, y: 100 },
    { x: 25, y: 100 },
    { x: 0, y: 50 }
  ], {
    ...config,
    width: 100,
    height: 100
  });
  canvas.add(polygon);
}

export const createStarShape = (canvas, config) => {
  const points = [];
  const spikes = 5;
  const outerRadius = 50;
  const innerRadius = 25;
  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (Math.PI * i) / spikes;
    points.push({
      x: 50 + radius * Math.sin(angle),
      y: 50 - radius * Math.cos(angle)
    });
  }
  const star = new fabric.Polygon(points, {
    ...config,
    width: 100,
    height: 100
  });
  canvas.add(star);
}

export const createHeartShape = (canvas, config) => {
  const heartPath = 'M 50,30 C 50,20 40,10 30,10 20,10 10,20 10,30 10,45 25,55 50,80 75,55 90,45 90,30 90,20 80,10 70,10 60,10 50,20 50,30 Z';
  fabric.loadSVGFromString(`<svg><path d="${heartPath}" fill="${config.fill}"/></svg>`, (objects, options) => {
    const heart = fabric.util.groupSVGElements(objects, options);
    heart.set({
      left: config.left,
      top: config.top,
      scaleX: 1,
      scaleY: 1
    });
    canvas.add(heart);
  });
}

export const createFlowerShape = (canvas, config) => {
  const flowerSVG = `
    <svg viewBox="0 0 100 100" width="100" height="100">
      <g fill="${config.fill}">
        <ellipse cx="50" cy="30" rx="15" ry="25" />
        <ellipse cx="50" cy="70" rx="15" ry="25" />
        <ellipse cx="30" cy="50" rx="25" ry="15" />
        <ellipse cx="70" cy="50" rx="25" ry="15" />
        <ellipse cx="35" cy="35" rx="20" ry="20" transform="rotate(-45 35 35)" />
        <ellipse cx="65" cy="35" rx="20" ry="20" transform="rotate(45 65 35)" />
        <ellipse cx="35" cy="65" rx="20" ry="20" transform="rotate(45 35 65)" />
        <ellipse cx="65" cy="65" rx="20" ry="20" transform="rotate(-45 65 65)" />
        <circle cx="50" cy="50" r="12" fill="#FFA500"/>
      </g>
    </svg>
  `;
  fabric.loadSVGFromString(flowerSVG, (objects, options) => {
    const flower = fabric.util.groupSVGElements(objects, options);
    flower.set({
      left: config.left,
      top: config.top
    });
    canvas.add(flower);
  });
}

export const createBirdShape = (canvas, config) => {
  const birdSVG = `
    <svg viewBox="0 0 100 100" width="100" height="100">
      <g fill="${config.fill}">
        <ellipse cx="50" cy="50" rx="25" ry="20"/>
        <ellipse cx="65" cy="45" rx="10" ry="8"/>
        <path d="M 25,45 Q 10,35 15,25 Q 20,35 25,40 Z"/>
        <path d="M 25,55 Q 10,65 15,75 Q 20,65 25,60 Z"/>
        <polygon points="75,48 85,45 85,52"/>
        <circle cx="60" cy="42" r="2" fill="white"/>
      </g>
    </svg>
  `;
  fabric.loadSVGFromString(birdSVG, (objects, options) => {
    const bird = fabric.util.groupSVGElements(objects, options);
    bird.set({
      left: config.left,
      top: config.top
    });
    canvas.add(bird);
  });
}

export const createCloudShape = (canvas, config) => {
  const cloudSVG = `
    <svg viewBox="0 0 100 100" width="100" height="100">
      <g fill="${config.fill}">
        <circle cx="35" cy="55" r="18"/>
        <circle cx="55" cy="45" r="22"/>
        <circle cx="70" cy="55" r="18"/>
        <circle cx="50" cy="65" r="20"/>
      </g>
    </svg>
  `;
  fabric.loadSVGFromString(cloudSVG, (objects, options) => {
    const cloud = fabric.util.groupSVGElements(objects, options);
    cloud.set({
      left: config.left,
      top: config.top
    });
    canvas.add(cloud);
  });
}

export const createTreeShape = (canvas, config) => {
  const treeSVG = `
    <svg viewBox="0 0 100 100" width="100" height="100">
      <g>
        <rect x="42" y="65" width="16" height="30" fill="#8B4513"/>
        <polygon points="50,15 20,50 30,50 10,70 40,70 40,60 60,60 60,70 90,70 70,50 80,50" fill="${config.fill}"/>
      </g>
    </svg>
  `;
  fabric.loadSVGFromString(treeSVG, (objects, options) => {
    const tree = fabric.util.groupSVGElements(objects, options);
    tree.set({
      left: config.left,
      top: config.top
    });
    canvas.add(tree);
  });
}

export const createButterflyShape = (canvas, config) => {
  const butterflySVG = `
    <svg viewBox="0 0 100 100" width="100" height="100">
      <g fill="${config.fill}">
        <ellipse cx="50" cy="50" rx="5" ry="30"/>
        <path d="M 30,30 Q 15,25 10,35 Q 15,45 25,40 Q 28,38 30,40 Z"/>
        <path d="M 70,30 Q 85,25 90,35 Q 85,45 75,40 Q 72,38 70,40 Z"/>
        <path d="M 35,55 Q 20,60 18,70 Q 23,78 32,72 Q 34,70 35,65 Z"/>
        <path d="M 65,55 Q 80,60 82,70 Q 77,78 68,72 Q 66,70 65,65 Z"/>
        <circle cx="48" cy="35" r="3" fill="white"/>
        <circle cx="52" cy="35" r="3" fill="white"/>
      </g>
    </svg>
  `;
  fabric.loadSVGFromString(butterflySVG, (objects, options) => {
    const butterfly = fabric.util.groupSVGElements(objects, options);
    butterfly.set({
      left: config.left,
      top: config.top
    });
    canvas.add(butterfly);
  });
}

export const createSunShape = (canvas, config) => {
  const sunSVG = `
    <svg viewBox="0 0 100 100" width="100" height="100">
      <g fill="${config.fill}">
        <circle cx="50" cy="50" r="20"/>
        ${[...Array(12)].map((_, i) => {
    const angle = (i * 30) * Math.PI / 180;
    const x1 = 50 + 25 * Math.cos(angle);
    const y1 = 50 + 25 * Math.sin(angle);
    const x2 = 50 + 35 * Math.cos(angle);
    const y2 = 50 + 35 * Math.sin(angle);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${config.fill}" stroke-width="3" stroke-linecap="round"/>`;
  }).join('')}
      </g>
    </svg>
  `;
  fabric.loadSVGFromString(sunSVG, (objects, options) => {
    const sun = fabric.util.groupSVGElements(objects, options);
    sun.set({
      left: config.left,
      top: config.top
    });
    canvas.add(sun);
  });
}

export const createMoonShape = (canvas, config) => {
  const moonSVG = `
    <svg viewBox="0 0 100 100" width="100" height="100">
      <path d="M 50,10 A 40,40 0 1,0 50,90 A 30,30 0 1,1 50,10 Z" fill="${config.fill}"/>
    </svg>
  `;
  fabric.loadSVGFromString(moonSVG, (objects, options) => {
    const moon = fabric.util.groupSVGElements(objects, options);
    moon.set({
      left: config.left,
      top: config.top
    });
    canvas.add(moon);
  });
}

// Factory function untuk membuat shape berdasarkan tipe
export const createShape = async (canvas, shapeType, options = {}) => {
  // Default configuration
  const config = {
    top: 100,
    left: 50,
    height: 60,
    width: 100,
    fill: "#0c0c0cff",
    ...options
  };

  // Check if this is an API shape (prefixed with 'api-' or contains shape ID)
  if (shapeType && shapeType.startsWith('api-')) {
    const shapeId = shapeType.replace('api-', '');
    await createShapeFromAPI(canvas, shapeId, config);
    return;
  }

  // Local/built-in shapes
  const shapeCreators = {
    rectangle: createRectangleShape,
    circle: createCircleShape,
    triangle: createTriangleShape,
    polygon: createPolygonShape,
    star: createStarShape,
    heart: createHeartShape,
    flower: createFlowerShape,
    bird: createBirdShape,
    cloud: createCloudShape,
    tree: createTreeShape,
    butterfly: createButterflyShape,
    sun: createSunShape,
    moon: createMoonShape
  };

  const creator = shapeCreators[shapeType];
  if (creator) {
    creator(canvas, config);
  } else {
    // If not found in local shapes, try to fetch from API
    console.log(`Shape "${shapeType}" not found locally, trying API...`);
    await createShapeFromAPI(canvas, shapeType, config);
  }
}
