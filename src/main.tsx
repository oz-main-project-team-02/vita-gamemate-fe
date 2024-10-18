import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './global.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

async function enableMocking() {
  if (import.meta.env.VITE_NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser.ts');
  return worker.start({ onUnhandledRequest: 'bypass' });
}

const queryClient = new QueryClient();

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  );
});
