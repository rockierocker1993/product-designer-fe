# 🎨 Product Designer Frontend

A powerful web-based product designer built with React, Redux, and Fabric.js. This application allows users to create custom designs on t-shirts by adding shapes, images, text, templates, and cliparts to a canvas.

## ✨ Features

- 🖼️ **Canvas Editor**: Interactive canvas with Fabric.js and custom controls
- 👕 **Product Customization**: T-shirt design with color change capability
- 🎨 **Shapes Library**: Dynamic shapes from API with SVG support
- 📸 **Image Upload**: Upload and manage images
- ✏️ **Text Styles**: Multiple text styles and fonts
- 📄 **Templates**: Pre-designed templates for quick start
- 🎭 **Cliparts**: Extensive clipart library with categories
- 🔍 **Search & Filter**: Real-time search across all menus
- 🎯 **Drag & Drop**: Intuitive drag and drop interface
- 🎨 **Theme Support**: Customizable color themes via environment variables
- 📱 **Responsive UI**: Modern and clean user interface
- 💾 **State Management**: Redux for global state
- 🔄 **API Integration**: Dynamic content loading from backend
- ✂️ **Design Area**: Clipping area with 3:5 ratio (150x250px)
- 🔧 **Custom Controls**: Delete, duplicate, rotate, and resize with icon controls

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Backend API running (default: http://localhost:8080)

### Installation

```bash
# Clone repository
git clone <repository-url>
cd product-designer-fe

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure your API URL in .env
VITE_API_URL=http://localhost:8080

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── api/                    # API layer - backend communication
│   ├── apiUtils.js        # Request helper + error handling
│   ├── resourceApiFactory.js # Shared list/byId/byCategory/search factory
│   ├── shapesApi.js       # Shapes resource API
│   ├── productsApi.js     # Products resource API
│   ├── imagesApi.js       # Images resource API + upload endpoint
│   ├── textsApi.js        # Text styles resource API + fonts endpoint
│   ├── templatesApi.js    # Templates resource API
│   ├── clipartsApi.js     # Cliparts resource API
│   └── index.js           # API exports
│
├── assets/                 # Static assets
│   ├── css/               # Component-specific CSS files
│   │   ├── App.css
│   │   ├── canvas-editor.css
│   │   ├── index.css
│   │   └── sidebar.css
│   └── fonts/             # Custom fonts (if any)
│
├── features/               # Feature-based components
│   ├── canvas/            # Canvas editor feature
│   │   └── CanvasEditor/
│   │       ├── CanvasEditor.jsx      # Main canvas container/orchestrator
│   │       ├── Settings.jsx          # Canvas settings panel
│   │       ├── canvasUtils.js        # Canvas utility functions
│   │       ├── customControls.js     # Fabric.js custom controls
│   │       ├── dragDropHandlers.js   # Drag & drop handlers
│   │       ├── components/           # Presentational editor pieces
│   │       ├── factory/
│   │       │   └── ShapesFactory.jsx # Shape creation factory
│   │       ├── config/               # UI config for editor panels
│   │       └── ToolboxTop/
│   │           ├── ToolboxTop.jsx
│   │           ├── TooltipFillOptions.jsx
│   │           ├── TooltipPosition.jsx
│   │           └── TooltipTransforms.jsx
│   └── sidebar/           # Sidebar feature
│       └── Sidebar/
│           ├── Sidebar.jsx    # Main sidebar container
│           ├── sidebarConfig.js # Config-driven menu definition
│           ├── components/     # Shared sidebar panel shell/state UI
│           ├── Product.jsx    # Product selection menu
│           ├── Images.jsx     # Images library menu
│           ├── Text.jsx       # Text styles & fonts menu
│           ├── Templates.jsx  # Templates gallery menu
│           ├── Cliparts.jsx   # Cliparts library menu
│           └── Shape.jsx      # Shapes library menu
│
├── config/                 # Configuration files
│   └── index.js           # Environment & app configuration
│
├── hooks/                  # Shared custom React hooks
│   ├── useLoadableData.js # Generic load/error/retry pattern
│   ├── useShapes.js       # Shapes-oriented hooks
│   └── index.js           # Hooks barrel export
│
├── lib/                    # Utilities & helpers
│   ├── constants/         # Application constants
│   │   └── index.js       # Shape types, item types, menu types, etc.
│   ├── utils/             # Utility functions
│   │   ├── helpers.js     # General helper functions
│   │   ├── validation.js  # Validation utilities
│   │   └── index.js       # Utils exports
│   └── index.js           # Lib exports
│
├── store/                  # Redux state management
│   ├── store.jsx          # Redux store configuration
│   └── components/        # Feature-based slices
│       ├── AddCanvasItemSlice.jsx    # Canvas item management
│       ├── CanvasEditor/
│       │   └── ToolBoxTop/
│       │       ├── TooltipPositionSlice.jsx
│       │       └── TooltipTransformSlice.jsx
│       └── Sidebar/
│           └── ShapesSlice.jsx
│
├── styles/                 # Global styles
│   └── global.css         # Global CSS variables & utility classes
│
├── App.jsx                 # Main App component
├── main.jsx               # Application entry point
├── constant.jsx           # Legacy constants (to be migrated)
└── IconConstant.jsx       # Icon constants with Lucide icons
```

## 🛠️ Tech Stack

- **React 18+** - UI framework with functional components and hooks
- **Redux Toolkit** - State management with modern Redux patterns
- **Fabric.js 5.x** - Canvas manipulation and object rendering
- **Vite** - Build tool and dev server with HMR
- **Bootstrap 5** - UI components and responsive grid
- **Lucide Icons** - Modern icon library for custom controls

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server with HMR

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

## 🎯 Key Components

### Sidebar Menus (`src/features/sidebar/`)

Each sidebar menu follows a consistent pattern:
- **Search functionality** with debounced input
- **Grid display** with responsive columns
- **Loading states** with spinner
- **Error handling** with retry button
- **Empty states** when no items found
- **Click handlers** to add items to canvas
- **Shared shell/state components** (`SidebarPanelShell`, `SidebarGridState`)
- **Shared data hook** (`useLoadableData`) for list loading/reload

Available menus:
- **Product**: T-shirt product selection with color customization
- **Images**: Image library with upload functionality
- **Text**: Text styles and font management
- **Templates**: Pre-designed templates
- **Cliparts**: Categorized clipart library
- **Shapes**: Dynamic shapes from API with SVG support

### Canvas Editor (`src/features/canvas/CanvasEditor/`)

**Main Container (CanvasEditor.jsx)**
- Fabric.js canvas initialization and lifecycle
- T-shirt background rendering
- Design area setup and clipping
- Redux state integration
- Composition of presentational subcomponents (topbar, stage, properties panel)

### Architecture Patterns (Updated)

- **Feature-first organization**: sidebar and canvas editor keep their own local components/config.
- **Config-driven UI**: repetitive menu/tool/color data is moved into config files.
- **Shared async pattern**: list fetch flows use `useLoadableData` for consistent loading/error/retry behavior.
- **Resource API factory**: API modules use a common `createResourceApi` pattern for list/detail/category/search endpoints.
- **Barrel exports**: `components/index.js` and `hooks/index.js` reduce import noise.

**Utility Modules**
- **canvasUtils.js**: Canvas operation utilities
  - `transformSelectedObject()` - Apply rotation, skew, flip
  - `lockUnlockSelectedObject()` - Toggle object lock
  - `movePositionSelectedObject()` - Position objects in design area
  - `handleObjectSelection()` - Extract object properties to Redux
  - `getColorFilter()` - Convert hex to CSS filter for t-shirt color

- **customControls.js**: Fabric.js custom controls
  - `customTransformControl()` - Setup DELETE, DUPLICATE, ROTATE, RESIZE controls with Lucide icons
  - `setupControlsVisibility()` - Hide default Fabric controls
  - Icon rendering with zoom-independent sizing

- **dragDropHandlers.js**: Drag & drop functionality
  - `handleDragOver()` - Visual feedback during drag
  - `handleDragLeave()` - Remove visual feedback
  - `handleDrop()` - Create shape at drop position

**Features**
- Custom transform controls (delete, duplicate, rotate, resize) with icon visualization
- Object selection and manipulation with live property updates
- Per-object clipping (controls stay visible outside design area)
- T-shirt color customization with CSS filters
- Drag and drop support for shapes
- Canvas transparency overlay on t-shirt background

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# API Configuration
VITE_API_URL=http://localhost:8080

# Theme Configuration (Primary Colors)
VITE_PRIMARY_COLOR=#084D42      # Main application color
VITE_SECONDARY_COLOR=#0a5f51    # Secondary color
VITE_ACCENT_COLOR=#FE7743       # Accent color

# Background Colors
VITE_BG_LIGHT=#ffffff           # Background for light mode
VITE_BG_DARK=#1a1a1a           # Background for dark mode
VITE_BG_NEUTRAL=#f5f5f5        # Neutral background
VITE_BG_CANVAS=#ffffff         # Canvas editor background

# Text Colors
VITE_TEXT_PRIMARY=#1a1a1a      # Primary text color
VITE_TEXT_SECONDARY=#6b7280    # Secondary text color
VITE_TEXT_LIGHT=#ffffff        # Text color for dark mode

# Border Colors
VITE_BORDER_COLOR=#e5e7eb      # Default border color
VITE_BORDER_FOCUS=#084D42      # Border color on focus

# Status Colors
VITE_SUCCESS_COLOR=#10B981     # Success/completed status
VITE_WARNING_COLOR=#F59E0B     # Warning status
VITE_ERROR_COLOR=#E5484D       # Error/failed status
VITE_INFO_COLOR=#3B82F6        # Info status
```

### Theme Customization

All colors can be customized via environment variables. The theme configuration is loaded from `src/config/index.js` and applied as CSS variables throughout the application.

**Available CSS Variables:**
```css
--primary-color
--secondary-color
--accent-color
--bg-light
--bg-dark
--bg-neutral
--bg-canvas
--text-primary
--text-secondary
--text-light
--border-color
--border-focus
--success-color
--warning-color
--error-color
--info-color
```

**Usage Example:**
```css
.my-component {
  color: var(--primary-color);
  background-color: var(--bg-light);
  border: 1px solid var(--border-color);
}
```

### API Endpoints

The application expects the following API endpoints:

- `GET /shapes` - List all shapes
- `GET /shapes/:id` - Get shape by ID (returns SVG data)
- `GET /products` - List all products
- `GET /images` - List all images
- `POST /images/upload` - Upload image
- `GET /templates` - List all templates
- `GET /cliparts` - List all cliparts
- `GET /text-styles` - List text styles
- `GET /fonts` - List available fonts

## 🎨 Styling

The project uses a combination of:

- **Component-specific CSS** in `src/assets/css/`
- **Global CSS** with CSS variables for theming in `src/styles/`
- **Bootstrap 5** for layout and utilities
- **CSS Variables** loaded from environment variables

### Styling Approach

All theme colors are defined in `.env` file and automatically loaded as CSS variables:

1. **Environment Variables** → Define colors in `.env`
2. **Config Module** → Load via `src/config/index.js`
3. **CSS Variables** → Applied to `:root` in `src/assets/css/index.css`
4. **Components** → Use CSS variables via `var(--variable-name)`

**Example:**
```javascript
// .env
VITE_PRIMARY_COLOR=#084D42

// Automatically available as:
// CSS: var(--primary-color)
// JS: import { THEME_CONFIG } from './config'
```

## 🔄 State Management

Redux Toolkit is used for global state management:

### Slices
- **AddCanvasItemSlice**: Manages adding items to canvas
  - `addShapesItem`, `addProductItem`, `addImageItem`, etc.
  - `breakStateAddShapesItem`: Reset state after adding

- **TooltipPositionSlice**: Manages object positioning
  - `lockObject`, `unlockObject`: Toggle object lock state
  - Position coordinates tracking

- **TooltipTransformSlice**: Manages object transforms
  - `setRotate`, `setSkewX`, `setSkewY`, `setFlipX`, `setFlipY`
  - Real-time transform updates during object manipulation

- **ShapesSlice**: Manages shapes state and selection

### Data Flow
```
User Action → Component Handler → Redux Action → 
→ Canvas Editor Effect → API Fetch (if needed) → 
→ Fabric.js Object Creation → Canvas Render
```

## 📝 API Integration

All API calls are centralized in `src/api/`:

### API Utils (`apiUtils.js`)
Generic utilities used by all API modules:
- `showLoading()`: Display loading overlay
- `hideLoading()`: Hide loading overlay  
- `handleApiError()`: Show error alerts with user-friendly messages
- `apiRequest()`: Generic API request wrapper with loading & error handling

### API Modules
Each API module follows the same structure:
```javascript
- fetchXList()        // Get all items
- fetchXById(id)      // Get single item
- fetchXByCategory()  // Get items by category (if applicable)
- searchX(query)      // Search items
```

**Example:**
```javascript
import { fetchShapeById } from './api/shapesApi';

// Fetch shape with automatic loading and error handling
const svgData = await fetchShapeById('shape-123');
```

## 🛠️ Development Guidelines

1. **Keep components small and focused** - Split large files into modular utilities
2. **Use custom hooks for reusable logic** - Centralize data fetching
3. **Put API calls in `api/` folder** - Maintain separation of concerns
4. **Use constants from `lib/constants/`** - Avoid magic strings
5. **Follow existing patterns** when adding features
6. **Add loading & error states** for all async operations
7. **Use Redux for shared state only** - Local state for component-specific data
8. **Keep business logic in utilities** - Not in components
9. **Extract utility functions** - Create separate files for related functions (e.g., canvasUtils.js, dragDropHandlers.js)
10. **Use Lucide icons** - For consistent icon design

### Code Organization Example

When a component file exceeds ~400 lines, consider splitting it:

```javascript
// Before: CanvasEditor.jsx (659 lines)

// After:
// CanvasEditor.jsx (354 lines) - Main component
// canvasUtils.js - Canvas operations
// customControls.js - Fabric.js controls
// dragDropHandlers.js - Drag & drop logic
```

## 🚧 Roadmap

**Completed ✅**
- [x] Drag and drop support for shapes
- [x] Custom transform controls with icons
- [x] T-shirt color customization
- [x] Design area with clipping
- [x] Modular code structure

**In Progress 🔄**
- [ ] Move color picker to Settings panel
- [ ] Connect color picker to product selection
- [ ] Template customization

**Planned 📋**
- [ ] Undo/redo functionality
- [ ] Keyboard shortcuts
- [ ] Export to PNG/PDF/SVG
- [ ] Layer management panel
- [ ] Collaborative editing
- [ ] Animation support
- [ ] Mobile responsive canvas
- [ ] Image filters and effects
- [ ] Text path support
- [ ] Font upload functionality
- [ ] Save/load designs to database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Developed with ❤️ by the Product Designer team

## 📞 Support

For support, email support@productdesigner.com or open an issue in the repository.
