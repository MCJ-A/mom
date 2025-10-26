// src/App.tsx

import React from 'react';
// 1. IMPORTAMOS LOS COMPONENTES DEL ROUTER
import { Routes, Route } from 'react-router-dom';

// 2. IMPORTAMOS NUESTRAS "PÁGINAS"
import HomePage from './pages/HomePage';
import TicketDetailPage from './pages/TicketDetailPage';

import './App.css';

function App() {
  return (
    // Ya NO necesitamos <TicketsProvider> aquí
    <div className="App">
      {/* 3. MAQUETACIÓN (LAYOUT) */}
      {/* Este header se mostrará en TODAS las páginas */}
      <header className="App-header">
        <h1>Proyecto MOM (Mantenimiento Operario Máquina)</h1>
      </header>

      {/* 4. DEFINICIÓN DE RUTAS */}
      {/* <main> contendrá la página que cambie */}
      <main>
        <Routes>
          {/* Ruta para la página de inicio */}
          <Route path="/" element={<HomePage />} />
          
          {/* Ruta para la página de detalles
              El ":id" es un "parámetro" dinámico.
              Coincidirá con /ticket/T-001, /ticket/T-002, etc. */}
          <Route path="/ticket/:id" element={<TicketDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;