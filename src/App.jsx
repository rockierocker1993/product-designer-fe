
import './assets/css/App.css'
import Leftbar from './features/sidebar/leftbar/Leftbar';
import CanvasEditor from './features/canvas/CanvasEditor';
import Rightbar from './features/sidebar/rightbar/Rightbar';

function App() {

  return (
      <div className="editor-app-shell">
        <Leftbar />
        <CanvasEditor />
        <div className="app-theme-toggle">
        </div>
        <Rightbar />
      </div>
  )
}

export default App
