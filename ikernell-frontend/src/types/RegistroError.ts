import { apiRequest } from "../services/apiConfig";

export interface RegistroError {

  idError: number;

  codError: string;

  descripcionError: string;

  estadoError: string;

  comentarioError: string;

  fechaRegistroError: string;

  desarrollador: {
    idUsuario: number;
    nombre: string;
    apellido: string;
  };

  etapa: {
    idEtapa: number;
    nombreEtapa: string;
  };

  tipoError: {
    idTipoError: number;
    nombreTipo: string;
  };
}

export async function obtenerErroresPorEtapa(
  idEtapa: number
) {
  return apiRequest(`/api/etapas/${idEtapa}/errores`);
}
