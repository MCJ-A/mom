// src/pages/HomePage.tsx
import React from 'react';
import TicketForm from '../components/TicketForm/TicketForm';
import TicketList from '../components/TicketList/TicketList';
import { useTickets } from '../context/TicketsContext'; 
import { useAuth } from '../context/AuthContext'; // Importamos useAuth

const HomePage: React.FC = () => {
  const { isLoadingTickets, ticketError, tickets } = useTickets(); // Obtenemos el estado
  const { user } = useAuth(); // Obtenemos el usuario

  return (
    <>
      {/* Mostramos un saludo si el usuario existe */}
      {user && <h2 style={{textAlign: 'center'}}>Bienvenido, {user.email}</h2>}
      
      {/* El formulario siempre se muestra */}
      <TicketForm />

      {/* --- Lógica de Carga y Error para la LISTA --- */}
      {isLoadingTickets && (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h3>Cargando tickets... ⏳</h3>
        </div>
      )}

      {ticketError && (
        <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>
          <h3>Error al Cargar Tickets 😥</h3>
          <p>{ticketError}</p>
        </div>
      )}

      {/* Si no estamos cargando Y no hay error, mostramos la lista */}
      {!isLoadingTickets && !ticketError && (
        <TicketList />
      )}
    </>
  );
};

export default HomePage;