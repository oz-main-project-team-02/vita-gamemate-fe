import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './global.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientBoundary } from './utils/QueryClientBoundary.tsx';
import { ErrorBoundary } from './utils/ErrorBoundary.tsx';
import { ErrorCatcher } from './utils/ErrorCatcher.tsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <QueryClientBoundary>
      <ErrorCatcher />
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ToastContainer />
    </QueryClientBoundary>
  </ErrorBoundary>
);
