// src/components/TicketItem/TicketItem.tsx

import React from 'react';
import { MomTicket } from '../../types';
// 1. ¡IMPORTAMOS EL HOOK!
import { useTickets } from '../../context/TicketsContext';

// 2. ¡INTERFAZ SIMPLIFICADA!
// Las únicas props que este componente necesita son
// el 'ticket' que debe mostrar. ¡Ya no espera las funciones!
interface TicketItemProps {
  ticket: MomTicket;
}

// 3. RECIBIMOS SÓLO LA PROP 'ticket'
export const TicketItem: React.FC<TicketItemProps> = ({ ticket }) => {
  
  // 4. ¡CONSUMIMOS EL CONTEXTO!
  // Extraemos las funciones que necesitamos para los botones.
  const { handleUpdateStatus, handleDeleteTicket } = useTickets();
  
  return (
    <li key={ticket.id} className="ticket-item">
      
      <strong>Máquina: {ticket.machineId}</strong>
      <p>{ticket.description}</p>
      <span>Prioridad: {ticket.priority}</span> | 
      <span>Estado: {ticket.status}</span>
      
      {/* 5. ¡CONECTADO DIRECTAMENTE AL CONTEXTO! */}
      {/* Este código no cambia, pero ahora 'handleUpdateStatus'
          y 'handleDeleteTicket' vienen del 'useTickets()' hook,
          no de las props. */}
      <button 
        className="btn-update"
        onClick={() => handleUpdateStatus(ticket.id)}
        disabled={ticket.status === 'Completado'}
      >
        Avanzar Estado
      </button>

      <button 
        className="btn-delete"
        onClick={() => handleDeleteTicket(ticket.id)}
      >
        Eliminar
      </button>
    </li>
  );
};

export default TicketItem;