import { api } from './api';
import type { MensajeContactoRequest } from '../types/mensaje';

// POST /api/mensajes-contacto es público (RF-002): no requiere sesión,
// el cliente api.ts ya maneja eso solo (no manda Authorization si no hay token).
export async function enviarMensajeContacto(request: MensajeContactoRequest): Promise<void> {
  await api.post<void>('/mensajes-contacto', request);
}
