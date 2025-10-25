// src/components/TicketForm/TicketForm.tsx

import React, { useState } from 'react';
import { TicketPriority } from '../../types';
// 1. ¡IMPORTAMOS NUESTRO HOOK DE CONTEXTO!
import { useTickets } from '../../context/TicketsContext';

// 2. ¡NO MÁS PROPS!
// La interfaz de props ha desaparecido.
// La firma del componente ya no recibe props.
export const TicketForm: React.FC = () => {
  
  // 3. ¡CONSUMIMOS EL CONTEXTO!
  // "Llamamos" al contexto y extraemos la función que necesitamos.
  const { handleAddNewTicket } = useTickets();

  // El estado interno del formulario sigue siendo el mismo
  const [machineId, setMachineId] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TicketPriority>('Media');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!machineId || !description) {
      alert('Por favor, completa la máquina y la descripción.');
      return;
    }

    // 4. USAMOS LA FUNCIÓN DEL CONTEXTO
    // En lugar de llamar a 'onNewTicket' (que venía de props),
    // llamamos a 'handleAddNewTicket' (que vino del contexto).
    handleAddNewTicket({
      machineId,
      description,
      priority
    });

    // Limpiamos el formulario
    setMachineId('');
    setDescription('');
    setPriority('Media');
  };

  // El JSX no cambia en absoluto
  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <h3>Crear Nuevo Ticket</h3>
      
      <div className="form-group">
        <label htmlFor="machineId">Máquina:</label>
        <input
          type="text"
          id="machineId"
          value={machineId} 
          onChange={(e) => setMachineId(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Prioridad:</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TicketPriority)}
        >
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
      </div>

      <button type="submit">Enviar Ticket</button>
    </form>
  );
};

export default TicketForm;