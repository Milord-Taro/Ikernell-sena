import type { UsuarioResumenResponse } from './usuario';

export type EstadoMensaje = 'Pendiente' | 'Leído' | 'Atendido';

export const ESTADOS_MENSAJE: EstadoMensaje[] = ['Pendiente', 'Leído', 'Atendido'];

export interface MensajeContactoRequest {
  nombreRemitente: string;
  correoElectronico: string;
  asunto: string;
  detalle: string;
}

export interface MensajeContactoResponse {
  idMensajeContacto: number;
  codigoMensaje: string;
  nombreRemitente: string;
  correoElectronico: string;
  asunto: string;
  detalle: string;
  estado: EstadoMensaje;
  respuesta: string | null;
  responsable: UsuarioResumenResponse | null;
  fechaEnvio: string;
  fechaAtencion: string | null;
}

export interface RespuestaMensajeRequest {
  respuesta: string;
}
