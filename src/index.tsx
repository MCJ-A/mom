// src/index.tsx

import React from 'react';
// 1. IMPORTAMOS "createRoot"
import ReactDOM from 'react-dom/client'; 

import { BrowserRouter } from 'react-router-dom';
import { TicketsProvider } from './context/TicketsContext';

import App from './App';
import './index.css';

// 2. USAMOS LA SINTAXIS "createRoot" (DE REACT 18)
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// 3. USAMOS "root.render"
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TicketsProvider>
        <App />
      </TicketsProvider>
    </BrowserRouter>
  </React.StrictMode>
);