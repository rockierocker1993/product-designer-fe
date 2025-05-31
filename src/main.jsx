import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store/store.jsx';

createRoot(document.getElementById('content')).render(
  <StrictMode>
     <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
