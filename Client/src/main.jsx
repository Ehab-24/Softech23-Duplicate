import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import './index.css';
import Router from './components/Router.jsx';

const routes = createRoutesFromElements(Router);
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);