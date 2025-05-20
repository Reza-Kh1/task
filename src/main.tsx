import React from 'react'
import { ThemeProvider, createTheme } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import toast from 'react-hot-toast';
const cache = createCache({ key: 'css', prepend: true });
const theme = createTheme();
const query = new QueryClient({
  queryCache: new QueryCache({
    onError: (err: any) => {
      console.log(err?.response?.status);
      if (err?.response?.status === 403) {
        toast.error("شما اجازه این کار ر ا ندارید !");
        window.location.href = "/";
      } else {
        toast.error("در ارتباط با دیتابیس با خطا روبرو شدیم");
      }
    },
  }),
});

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={query}>
      <BrowserRouter>
        <CacheProvider value={cache}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </CacheProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
