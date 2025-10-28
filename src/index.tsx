// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { TicketsProvider } from './context/TicketsContext';
import { AuthProvider } from './context/AuthContext'; // <-- ¡NUEVA IMPORTACIÓN!

import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Ahora tenemos DOS proveedores. 
        El orden aquí no importa mucho, pero envolver TicketsProvider
        con AuthProvider tiene sentido.
      */}
      <AuthProvider>
        <TicketsProvider>
          <App />
        </TicketsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);