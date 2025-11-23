import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/index.css'
import './styles/global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store/store.jsx';
import { initTheme } from './utils/theme.js';

// Initialize theme from .env configuration
initTheme();

createRoot(document.getElementById('content')).render(
  <StrictMode>
     <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
