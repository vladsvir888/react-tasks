import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import { BrowserRouter } from 'react-router';
import ThemeProvider from './components/theme/ThemeProvider.tsx';
import { Provider } from 'react-redux';
import store from './store/index.ts';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
