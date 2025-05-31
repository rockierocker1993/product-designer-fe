
import './assets/css/App.css'
import Sidebar from './components/Sidebar/Sidebar';
import CanvasEditor from './components/CanvasEditor/CanvasEditor';

function App() {

  return (
      <div className="d-flex full-height">
        <Sidebar></Sidebar>
        <CanvasEditor></CanvasEditor>
      </div>
  )
}

export default App
