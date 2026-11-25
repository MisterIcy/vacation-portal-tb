import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { queryClient } from './api/queryClient';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes';
import { TokenExpirationHandler } from './components/TokenExpirationHandler';
import { theme } from './styles/theme';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <TokenExpirationHandler />
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
