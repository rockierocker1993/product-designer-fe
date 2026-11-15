
import './assets/css/App.css'
import Leftbar from './features/sidebar/leftbar/Leftbar';
import CanvasEditor from './features/canvas/CanvasEditor/CanvasEditor';

function App() {

  return (
      <div className="editor-app-shell">
        <Leftbar />
        <CanvasEditor />
        <div className="app-theme-toggle">
        </div>
      </div>
  )
}

export default App
