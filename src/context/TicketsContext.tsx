// src/context/TicketsContext.tsx

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
// Importamos nuestros tipos
import { MomTicket, TicketPriority, TicketStatus } from '../types';

// --- COPIAMOS ESTO DE APP.TSX ---
// Estos son los datos que se cargarán SÓLO si el localStorage está vacío
const INITIAL_TICKETS: MomTicket[] = [
  {
    id: 'T-001',
    machineId: 'PRENSA-B1',
    description: 'Ruido extraño en el motor principal.',
    reportedBy: 'Javier Pérez',
    createdAt: new Date('2025-10-24T10:00:00Z').toISOString(),
    status: 'Pendiente',
    priority: 'Alta'
  },
  {
    id: 'T-002',
    machineId: 'CORTE-A3',
    description: 'La cuchilla no está cortando de forma limpia.',
    reportedBy: 'Maria Gómez',
    createdAt: new Date('2025-10-25T09:30:00Z').toISOString(),
    status: 'En Progreso',
    priority: 'Media'
  },
];
// Esta será la "llave" que usaremos para guardar en localStorage
const LOCAL_STORAGE_KEY = 'mom:tickets';
// --- FIN DE LA COPIA ---


// 1. DEFINIMOS LA "FORMA" DE NUESTRO CONTEXTO
// ¿Qué datos y funciones pondremos "en el aire"?
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

// 2. CREAMOS EL CONTEXTO
// Lo creamos 'null' al inicio, pero TypeScript necesita 
// que le digamos qué "forma" tendrá (ITicketsContext).
const TicketsContext = createContext<ITicketsContext | null>(null);

// 3. CREAMOS EL COMPONENTE "PROVEEDOR"
// Este es el componente que "envolverá" nuestra app.
// Contendrá toda la lógica que ANTES estaba en App.tsx
export const TicketsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  // --- TODA LA LÓGICA DE ESTADO SE MUDÓ AQUÍ ---
  const [tickets, setTickets] = useState<MomTicket[]>(() => {
    const storedTickets = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTickets) return JSON.parse(storedTickets);
    return INITIAL_TICKETS;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tickets));
  }, [tickets]);

  const handleAddNewTicket = (data: { 
    machineId: string; 
    description: string; 
    priority: TicketPriority; 
  }) => {
    const newTicket: MomTicket = {
      id: `T-${String(Date.now()).slice(-4)}`,
      machineId: data.machineId,
      description: data.description,
      priority: data.priority,
      reportedBy: 'Operario Actual',
      createdAt: new Date().toISOString(),
      status: 'Pendiente'
    };
    setTickets(prevTickets => [...prevTickets, newTicket]);
  };

  const handleUpdateStatus = (id: string) => {
    const getNextStatus = (currentStatus: TicketStatus): TicketStatus => {
      if (currentStatus === 'Pendiente') return 'En Progreso';
      if (currentStatus === 'En Progreso') return 'Completado';
      return 'Completado';
    };
    setTickets(prevTickets => 
      prevTickets.map(ticket => {
        if (ticket.id !== id) return ticket;
        return { ...ticket, status: getNextStatus(ticket.status) };
      })
    );
  };

  const handleDeleteTicket = (id: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este ticket?')) {
      return;
    }
    setTickets(prevTickets => 
      prevTickets.filter(ticket => ticket.id !== id)
    );
  };
  // --- FIN DE LA LÓGICA DE ESTADO ---

  // 4. "PROVEEMOS" EL VALOR
  // Creamos un objeto 'value' que coincide con nuestra interfaz ITicketsContext
  const value = {
    tickets,
    handleAddNewTicket,
    handleUpdateStatus,
    handleDeleteTicket
  };

  // Retornamos el "Proveedor" de Contexto, "envolviendo" a los hijos
  // y pasándoles nuestro objeto 'value'.
  return (
    <TicketsContext.Provider value={value}>
      {children}
    </TicketsContext.Provider>
  );
};


// 5. CREAMOS UN "HOOK" PERSONALIZADO (¡MUY RECOMENDADO!)
// Esto facilita consumir el contexto en otros componentes
// y nos da un error claro si lo intentamos usar fuera del Proveedor.
export const useTickets = () => {
  const context = useContext(TicketsContext);
  
  if (!context) {
    throw new Error('useTickets debe ser usado dentro de un TicketsProvider');
  }
  
  return context;
};