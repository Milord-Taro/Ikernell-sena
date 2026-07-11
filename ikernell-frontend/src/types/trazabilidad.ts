import type { UsuarioResponse } from './usuario';

export type OperacionTrazabilidad =
  | 'Crear'
  | 'Actualizar'
  | 'Inhabilitar'
  | 'Cambiar Estado'
  | 'Asignar'
  | 'Desasignar'
  | 'Autenticar'
  | 'Eliminar';

/** Entidades que hoy sí registran trazabilidad (ver TrazabilidadService.registrar en el backend). */
export const ENTIDADES_TRAZABILIDAD = [
  'Usuario',
  'Rol',
  'Profesion',
  'Especialidad',
  'TipoError',
  'TipoInterrupcion',
  'Etapa',
  'Actividad',
] as const;

export interface TrazabilidadResponse {
  idTrazabilidad: number;
  usuario: UsuarioResponse | null;
  entidad: string;
  codigoRegistro: string;
  operacion: OperacionTrazabilidad;
  detalle: string | null;
  direccionIp: string | null;
  fechaEvento: string;
}
