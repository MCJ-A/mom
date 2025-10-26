// src/context/TicketsContext.tsx

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { MomTicket, TicketPriority, TicketStatus } from '../types';

// ¡AQUÍ ESTÁ EL CAMBIO!
// Definimos la URL de nuestra API en vivo
const API_BASE_URL = 'https://mom-api-bnrp.onrender.com';

interface ITicketsContext {
  tickets: MomTicket[];
  handleAddNewTicket: (data: { 
    machineId: string; 
    description: string; 
    priority: TicketPriority; 
  }) => void;
  handleUpdateStatus: (id: string) => void;
  handleDeleteTicket: (id: string) => void;
}

const TicketsContext = createContext<ITicketsContext | null>(null);

export const TicketsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const [tickets, setTickets] = useState<MomTicket[]>([]);

  // LEER (GET) - Actualizado
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/tickets`); // <-- CAMBIO
        const data = await response.json();
        setTickets(data); 
      } catch (error) {
        console.error('Error al cargar los tickets:', error);
      }
    };
    fetchTickets();
  }, []);

  // CREAR (POST) - Actualizado
  const handleAddNewTicket = async (data: { 
    machineId: string; 
    description: string; 
    priority: TicketPriority; 
  }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tickets`, { // <-- CAMBIO
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      });

      if (!response.ok) {
        throw new Error('La respuesta del servidor no fue OK');
      }
      const newTicketFromServer = await response.json();
      setTickets(prevTickets => [...prevTickets, newTicketFromServer]);
    } catch (error) {
      console.error('Error al crear el nuevo ticket:', error);
    }
  };

  // ACTUALIZAR (PATCH) - Actualizado
  const handleUpdateStatus = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tickets/${id}`, { // <-- CAMBIO
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('La respuesta del servidor no fue OK');
      }
      const updatedTicketFromServer = await response.json();
      setTickets(prevTickets => 
        prevTickets.map(ticket => 
          ticket.id === id ? updatedTicketFromServer : ticket
        )
      );
    } catch (error) {
      console.error('Error al actualizar el ticket:', error);
    }
  };

  // ELIMINAR (DELETE) - Actualizado
  const handleDeleteTicket = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este ticket?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/tickets/${id}`, { // <-- CAMBIO
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('La respuesta del servidor no fue OK');
      }

      setTickets(prevTickets => 
        prevTickets.filter(ticket => ticket.id !== id)
      );

    } catch (error) {
      console.error('Error al eliminar el ticket:', error);
    }
  };

  const value = {
    tickets,
    handleAddNewTicket,
    handleUpdateStatus,
    handleDeleteTicket
  };

  return (
    <TicketsContext.Provider value={value}>
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketsContext);
  if (!context) {
    throw new Error('useTickets debe ser usado dentro de un TicketsProvider');
  }
  return context;
};