import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import App from './pages/App';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
      onError: (err) => {
        if (err instanceof AxiosError && err.response?.status === 401) {
          localStorage.removeItem('token');
          toast('Session expired, please login again', { type: 'error' });
          window.location.href = '/login';
        }
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <ToastContainer
        position='bottom-right'
        hideProgressBar
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme='dark'
      />
      <App />
    </React.StrictMode>
  </QueryClientProvider>
);
