import type { UsuarioResponse } from './usuario';
import type { ProyectoResponse } from './proyecto';

export type RolProyecto = 'Líder' | 'Desarrollador';

/** Confirmado contra AsignacionProyectoResponse.java real: anida los
 * DTOs completos, no una versión resumida. */
export interface AsignacionProyectoResponse {
  idAsignacionProyecto: number;
  usuario: UsuarioResponse;
  proyecto: ProyectoResponse;
  rolProyecto: RolProyecto;
  fechaAsignacion: string;
  fechaDesvinculacion: string | null;
}

export interface AsignacionProyectoRequest {
  idUsuario: number;
  idProyecto: number;
  rolProyecto: RolProyecto;
}
