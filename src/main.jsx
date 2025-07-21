import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App.jsx';
import { router } from "./Routes/routes.jsx";
import { AuthProvider } from "./Provider/AuthContext.jsx";
import { ApiQueryProvider } from "./Provider/ApiQueryProvider.jsx";
import '@copilotkit/react-ui/styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApiQueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ApiQueryProvider>
  </StrictMode>
);