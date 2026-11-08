
import './assets/css/App.css'
import Sidebar from './features/sidebar/Sidebar/Sidebar';
import CanvasEditor from './features/canvas/CanvasEditor/CanvasEditor';
import ThemeToggle from './components/ThemeToggle';

function App() {

  return (
      <div className="editor-app-shell">
        <Sidebar />
        <CanvasEditor />
        <div className="app-theme-toggle">
          <ThemeToggle />
        </div>
      </div>
  )
}

export default App
