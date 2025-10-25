// src/pages/HomePage.tsx

import React from 'react';
import TicketForm from '../components/TicketForm/TicketForm';
import TicketList from '../components/TicketList/TicketList';

// Esta página es simple: solo renderiza
// los dos componentes principales de nuestra vista de inicio
const HomePage: React.FC = () => {
  return (
    <>
      <TicketForm />
      <TicketList />
    </>
  );
};

export default HomePage;