// src/components/TicketList/TicketList.tsx

import React from 'react';
import { useTickets } from '../../context/TicketsContext'; 
import TicketItem from '../TicketItem/TicketItem'; 

export const TicketList: React.FC = () => {
  
  const { tickets } = useTickets();
  
  return (
    <div className="ticket-list-container">
      <h2>Tickets de Mantenimiento</h2>

      <ul className="ticket-list">
        {tickets.map(ticket => (
          
          <TicketItem 
            key={ticket.id} 
            ticket={ticket} // <-- ¡ASEGÚRATE DE QUE ESTA LÍNEA EXISTA!
          />

        ))}
      </ul>
    </div>
  );
};

export default TicketList;