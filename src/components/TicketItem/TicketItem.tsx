// src/components/TicketItem/TicketItem.tsx

import React from 'react';
// 1. ¡IMPORTAMOS 'Link' DE REACT ROUTER!
import { Link } from 'react-router-dom'; 

import { MomTicket } from '../../types';
import { useTickets } from '../../context/TicketsContext';

interface TicketItemProps {
  ticket: MomTicket;
}

export const TicketItem: React.FC<TicketItemProps> = ({ ticket }) => {
  
  const { handleUpdateStatus, handleDeleteTicket } = useTickets();
  
  return (
    // Asegúrate de que tu <li> tenga la clase "ticket-item"
    <li className="ticket-item"> 
      
      {/* 2. EL CONTENEDOR <Link> */}
      {/* Tu CSS ('App.css') tiene estilos para ".ticket-link" */}
      <Link to={`/ticket/${ticket.id}`} className="ticket-link">
        <strong>Máquina: {ticket.machineId}</strong>
        <p>{ticket.description}</p>
      </Link>
      
      {/* 3. EL CONTENEDOR DE INFORMACIÓN */}
      {/* Tu CSS tiene estilos para ".ticket-info" */}
      <div className="ticket-info">
        <span>Prioridad: {ticket.priority}</span> | 
        <span>Estado: {ticket.status}</span>
      </div>
      
      {/* 4. EL CONTENEDOR DE ACCIONES (BOTONES) */}
      {/* Tu CSS tiene estilos para ".ticket-actions" */}
      <div className="ticket-actions">
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
      </div>
    </li>
  );
};

export default TicketItem;