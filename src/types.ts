// En: src/types.ts

// Usamos 'union types' para que una variable SÓLO pueda tener uno de estos valores.
// Esto evita errores como escribir "Pendiente" a veces y "pendiente" otras.
export type TicketStatus = 'Pendiente' | 'En Progreso' | 'Completado';
export type TicketPriority = 'Baja' | 'Media' | 'Alta';

// La interfaz principal de nuestro proyecto.
// Es la definición de un "Ticket del Proyecto MOM".
export interface MomTicket {
  id: string;          // Un ID único (ej. 'T-12345')
  machineId: string;   // ID o nombre de la máquina (ej. 'PRENSA-B1')
  description: string;   // Qué está mal
  reportedBy: string;  // Nombre del operario
  createdAt: string;     // Usaremos string (ISO date) para que sea fácil de pasar en JSON
  status: TicketStatus;
  priority: TicketPriority;
}