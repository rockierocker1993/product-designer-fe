
import './assets/css/App.css'
import Sidebar from './features/sidebar/Sidebar/Sidebar';
import CanvasEditor from './features/canvas/CanvasEditor/CanvasEditor';
import ThemeToggle from './components/ThemeToggle';

function App() {

  return (
      <div className="d-flex full-height">
        <Sidebar></Sidebar>
        <CanvasEditor></CanvasEditor>
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
          <ThemeToggle />
        </div>
      </div>
  )
}

export default App
