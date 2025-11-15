// src/context/TicketsContext.tsx

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { MomTicket, TicketPriority } from '../types';
import { useAuth } from './AuthContext'; // <-- ¡NUEVO! Importamos el AuthContext

// (¡Usa tu URL de Render!)
const API_BASE_URL = 'https://mom-api-bnrp.onrender.com';

// 1. ACTUALIZAMOS LA INTERFAZ
interface ITicketsContext {
  tickets: MomTicket[];
  isLoadingTickets: boolean; // <-- ¡NUEVO!
  ticketError: string | null;      // <-- ¡NUEVO!
  handleAddNewTicket: (data: { machineId: string; description: string; priority: TicketPriority; }) => Promise<void>;
  handleUpdateStatus: (id: string) => Promise<void>;
  handleDeleteTicket: (id: string) => Promise<void>;
}

const TicketsContext = createContext<ITicketsContext | null>(null);

export const TicketsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<MomTicket[]>([]);
  // 2. AÑADIMOS LOS NUEVOS ESTADOS
  const [isLoadingTickets, setIsLoadingTickets] = useState(true); // Inicia en 'true'
  const [ticketError, setTicketError] = useState<string | null>(null);
  
  // ¡Obtenemos el token del AuthContext!
  const { token } = useAuth();

  // 3. ACTUALIZAMOS useEffect (fetchTickets)
  useEffect(() => {
    // No intentes cargar tickets si no tenemos token
    if (!token) {
        setIsLoadingTickets(false); // Dejamos de cargar
        setTickets([]); // Vaciamos los tickets
        return;
    }

    const fetchTickets = async () => {
      setIsLoadingTickets(true); // Empezamos a cargar
      setTicketError(null);      // Limpiamos errores antiguos

      try {
        const response = await fetch(`${API_BASE_URL}/api/tickets`, {
          headers: {
            // ¡Adjuntamos el token para peticiones seguras!
            'Authorization': `Bearer ${token}` 
          }
        });
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudieron cargar los tickets`);
        }
        
        const data = await response.json();
        setTickets(data);
      } catch (error: any) {
        setTicketError(error.message || 'Ocurrió un error desconocido al cargar.');
      } finally {
        setIsLoadingTickets(false); // Terminamos de cargar (con éxito o error)
      }
    };
    
    fetchTickets();
  }, [token]); // <-- ¡NUEVO! Hacemos que se vuelva a ejecutar si el 'token' cambia (ej. al iniciar/cerrar sesión)

  // (Las funciones 'handleAddNewTicket', 'handleUpdateStatus', 'handleDeleteTicket'
  // las actualizaremos después para que también usen el token y manejen errores)
  
  // ... (tus funciones handleAddNewTicket, handleUpdateStatus, handleDeleteTicket sin cambios por ahora) ...
  const handleAddNewTicket = async (data: { machineId: string; description: string; priority: TicketPriority; }) => {
     if (!token) { console.error("No hay token"); return; }
     try {
       const response = await fetch(`${API_BASE_URL}/api/tickets`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
         body: JSON.stringify(data),
       });
       if (!response.ok) { throw new Error('La respuesta del servidor no fue OK'); }
       const newTicketFromServer = await response.json();
       setTickets(prevTickets => [...prevTickets, newTicketFromServer]);
     } catch (error) {
       console.error('Error al crear el nuevo ticket:', error);
       setTicketError('Error al crear el ticket. Inténtalo de nuevo.');
     }
  };
  const handleUpdateStatus = async (id: string) => {
    if (!token) { console.error("No hay token"); return; }
     try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/${id}`, { 
          method: 'PATCH',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) { throw new Error('La respuesta del servidor no fue OK'); }
        const updatedTicketFromServer = await response.json();
        setTickets(prevTickets =>
          prevTickets.map(ticket => ticket.id === id ? updatedTicketFromServer : ticket)
        );
    } catch (error) {
        console.error('Error al actualizar el ticket:', error);
        setTicketError('Error al actualizar el ticket. Inténtalo de nuevo.');
    }
  };
  const handleDeleteTicket = async (id: string) => {
    if (!token) { console.error("No hay token"); return; }
    if (!window.confirm('¿Estás seguro de que quieres eliminar este ticket?')) { return; }
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/${id}`, { 
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) { throw new Error('La respuesta del servidor no fue OK'); }
        setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== id));
    } catch (error) {
        console.error('Error al eliminar el ticket:', error);
        setTicketError('Error al eliminar el ticket. Inténtalo de nuevo.');
    }
  };

  // 4. AÑADIMOS LOS NUEVOS VALORES AL 'value'
  const value = {
    tickets,
    isLoadingTickets, // <-- ¡NUEVO!
    ticketError,      // <-- ¡NUEVO!
    handleAddNewTicket,
    handleUpdateStatus,
    handleDeleteTicket,
  };

  return (
    <TicketsContext.Provider value={value}>
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketsContext);
  if (!context) { throw new Error('useTickets debe ser usado dentro de un TicketsProvider'); }
  return context;
};