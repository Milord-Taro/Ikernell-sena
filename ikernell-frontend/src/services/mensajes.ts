import { api } from './api';
import type {
  MensajeContactoRequest, MensajeContactoResponse, RespuestaMensajeRequest, EstadoMensaje,
} from '../types/mensaje';

// POST /api/mensajes-contacto es público (RF-002): no requiere sesión,
// el cliente api.ts ya maneja eso solo (no manda Authorization si no hay token).
export async function enviarMensajeContacto(request: MensajeContactoRequest): Promise<void> {
  await api.post<void>('/mensajes-contacto', request);
}

// NUEVO (Fase 10): bandeja de entrada, exclusiva del Coordinador.
export function listarMensajes(estado?: EstadoMensaje): Promise<MensajeContactoResponse[]> {
  return api.get<MensajeContactoResponse[]>(
    estado ? `/mensajes-contacto?estado=${encodeURIComponent(estado)}` : '/mensajes-contacto',
  );
}

export function obtenerMensajePorId(idMensajeContacto: number): Promise<MensajeContactoResponse> {
  return api.get<MensajeContactoResponse>(`/mensajes-contacto/${idMensajeContacto}`);
}

export function marcarMensajeComoLeido(idMensajeContacto: number): Promise<MensajeContactoResponse> {
  return api.patch<MensajeContactoResponse>(`/mensajes-contacto/${idMensajeContacto}/leido`);
}

export function responderMensaje(
  idMensajeContacto: number,
  request: RespuestaMensajeRequest,
): Promise<MensajeContactoResponse> {
  return api.patch<MensajeContactoResponse>(`/mensajes-contacto/${idMensajeContacto}/responder`, request);
}
