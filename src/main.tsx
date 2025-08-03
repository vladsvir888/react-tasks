import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import { BrowserRouter } from 'react-router';
import ThemeProvider from './providers/theme.tsx';
import ReduxProvider from './providers/redux.tsx';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ReduxProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ReduxProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
