# Shapes API Integration

## Struktur Folder

```
src/
├── api/
│   └── shapesApi.js          # API functions untuk fetch shapes
├── hooks/
│   └── useShapes.js          # Custom React hooks untuk shapes
└── components/
    └── CanvasEditor/
        └── factory/
            └── ShapesFactory.jsx  # Factory untuk create shapes
```

## Setup

1. Copy `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

2. Update `REACT_APP_API_URL` di file `.env` dengan URL backend Anda:
```
REACT_APP_API_URL=http://your-backend-url/api
```

## API Endpoints

Backend harus menyediakan endpoints berikut:

### 1. Get All Shapes
```
GET /api/shapes
```

Response:
```json
[
  {
    "id": "bird-1",
    "name": "Bird",
    "category": "animals",
    "svg": "<svg>...</svg>",
    "defaultColor": "#084D42",
    "metadata": {
      "tags": ["animal", "flying"],
      "description": "Simple bird shape"
    }
  }
]
```

### 2. Get Shape by ID
```
GET /api/shapes/:id
```

Response:
```json
{
  "id": "bird-1",
  "name": "Bird",
  "category": "animals",
  "svg": "<svg>...</svg>",
  "defaultColor": "#084D42",
  "metadata": {
    "tags": ["animal", "flying"],
    "description": "Simple bird shape"
  }
}
```

### 3. Get Shapes by Category
```
GET /api/shapes/category/:category
```

Response: Array of shape objects (same structure as Get All Shapes)

### 4. Search Shapes
```
GET /api/shapes/search?q=keyword
```

Response: Array of matching shape objects

## Usage

### Menggunakan API Shapes di Component

```jsx
import { useShapes } from '../hooks/useShapes';

function ShapesList() {
  const { shapes, loading, error } = useShapes();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {shapes.map(shape => (
        <button key={shape.id} onClick={() => addShape(shape.id)}>
          {shape.name}
        </button>
      ))}
    </div>
  );
}
```

### Menambahkan Shape dari API ke Canvas

```jsx
import { addShapesItem } from './store/components/AddCanvasItemSlice';

// Untuk shape dari API, gunakan prefix 'api-' atau langsung ID
dispatch(addShapesItem('api-bird-1'));

// Atau langsung dengan shape ID
dispatch(addShapesItem('bird-1'));
```

### Search Shapes

```jsx
import { useSearchShapes } from '../hooks/useShapes';

function SearchShapes() {
  const { shapes, loading, search } = useSearchShapes();

  const handleSearch = (keyword) => {
    search(keyword);
  };

  return (
    <div>
      <input 
        type="text" 
        onChange={(e) => handleSearch(e.target.value)} 
        placeholder="Search shapes..."
      />
      {shapes.map(shape => (
        <div key={shape.id}>{shape.name}</div>
      ))}
    </div>
  );
}
```

### Filter by Category

```jsx
import { useShapesByCategory } from '../hooks/useShapes';

function CategoryShapes() {
  const { shapes, loading } = useShapesByCategory('animals');

  return (
    <div>
      {shapes.map(shape => (
        <div key={shape.id}>{shape.name}</div>
      ))}
    </div>
  );
}
```

## Shape Data Format

Setiap shape object harus memiliki struktur:

```json
{
  "id": "unique-shape-id",           // Required: Unique identifier
  "name": "Shape Name",              // Required: Display name
  "category": "category-name",       // Required: Category grouping
  "svg": "<svg>...</svg>",          // Required: SVG markup string
  "defaultColor": "#084D42",        // Optional: Default fill color
  "metadata": {                     // Optional: Additional data
    "tags": ["tag1", "tag2"],
    "description": "Shape description",
    "author": "Creator name"
  }
}
```

## Error Handling

Factory akan otomatis fallback ke rectangle jika:
- API request gagal
- Shape tidak ditemukan
- SVG data invalid

## Testing

Untuk testing tanpa backend, Anda bisa membuat mock API:

```javascript
// src/api/shapesApi.mock.js
export const fetchShapesList = async () => {
  return [
    {
      id: 'test-1',
      name: 'Test Shape',
      category: 'test',
      svg: '<svg><circle cx="50" cy="50" r="40"/></svg>',
      defaultColor: '#ff0000'
    }
  ];
};
```
