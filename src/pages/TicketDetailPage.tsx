// src/pages/TicketDetailPage.tsx

import React from 'react';
// 1. IMPORTAMOS LOS HOOKS QUE NECESITAMOS
import { useParams, Link } from 'react-router-dom';
import { useTickets } from '../context/TicketsContext';

// 2. ¡EL COMPONENTE!
const TicketDetailPage: React.FC = () => {
  
  // 3. LEEMOS LA URL
  // 'useParams()' nos da un objeto. Si la ruta es /ticket/:id,
  // nos dará un objeto como { id: 'T-001' }
  const { id } = useParams<{ id: string }>();

  // 4. OBTENEMOS TODOS LOS TICKETS DEL CONTEXTO
  const { tickets } = useTickets();

  // 5. ENCONTRAMOS EL TICKET ESPECÍFICO
  // Usamos el método .find() de JavaScript para buscar en el array
  // el ticket cuyo 'id' coincida con el 'id' de la URL.
  const ticket = tickets.find(t => t.id === id);

  // 6. MANEJO DE ERROR (¿Qué pasa si el ticket no existe?)
  if (!ticket) {
    return (
      <div>
        <h2>Ticket no encontrado</h2>
        <p>El ticket que buscas no existe o ha sido eliminado.</p>
        <Link to="/">Volver a la lista</Link>
      </div>
    );
  }

  // 7. RENDERIZAMOS LOS DETALLES DEL TICKET
  // ¡Si encontramos el ticket, mostramos todos sus detalles!
  return (
    <div className="ticket-detail">
      {/* Añadimos un enlace para volver a la página de inicio */}
      <Link to="/" className="back-link">
        &larr; Volver a la lista
      </Link>
      
      <h2>Detalle del Ticket: {ticket.machineId}</h2>
      
      <div className="detail-grid">
        <div className="detail-item">
          <strong>ID del Ticket:</strong>
          <span>{ticket.id}</span>
        </div>
        <div className="detail-item">
          <strong>Máquina:</strong>
          <span>{ticket.machineId}</span>
        </div>
        <div className="detail-item">
          <strong>Estado:</strong>
          {/* Podríamos incluso reutilizar nuestro componente StatusBadge aquí,
              pero por ahora un 'span' simple funciona */}
          <span>{ticket.status}</span>
        </div>
        <div className="detail-item">
          <strong>Prioridad:</strong>
          <span>{ticket.priority}</span>
        </div>
        <div className="detail-item full-width">
          <strong>Descripción:</strong>
          <p>{ticket.description}</p>
        </div>
        <div className="detail-item">
          <strong>Reportado por:</strong>
          <span>{ticket.reportedBy}</span>
        </div>
        <div className="detail-item">
          <strong>Fecha de Creación:</strong>
          {/* Formateamos la fecha para que sea más legible */}
          <span>{new Date(ticket.createdAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailPage;