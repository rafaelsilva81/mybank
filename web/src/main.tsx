import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import App from './pages/App';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

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
