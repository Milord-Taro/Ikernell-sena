import { api } from './api';
import type { NotificacionResponse } from '../types/notificacion';

export function listarMisNotificaciones(soloNoLeidas = false): Promise<NotificacionResponse[]> {
  return api.get<NotificacionResponse[]>(`/notificaciones/me?soloNoLeidas=${soloNoLeidas}`);
}

export function marcarNotificacionComoLeida(idNotificacion: number): Promise<NotificacionResponse> {
  return api.patch<NotificacionResponse>(`/notificaciones/${idNotificacion}/leida`);
}
