import { toast } from "sonner";

export function validarProyecto(proyecto: {
  nombreProyecto: string;
  descripcionProyecto: string;
  fechaInicioProyecto: string;
  fechaFinProyecto: string;
}) {
  if (!proyecto.nombreProyecto.trim()) {
    toast.error("Ingrese un nombre");
    return false;
  }

  if (proyecto.nombreProyecto.length < 5) {
    toast.error("Nombre demasiado corto");
    return false;
  }

  if (!proyecto.descripcionProyecto.trim()) {
    toast.error("Ingrese una descripción");
    return false;
  }

  if (proyecto.descripcionProyecto.length < 10) {
    toast.error("La descripción debe tener mínimo 10 caracteres");
    return false;
  }

  if (!proyecto.fechaInicioProyecto) {
    toast.error("Seleccione fecha inicio");
    return false;
  }

  if (!proyecto.fechaFinProyecto) {
    toast.error("Seleccione fecha fin");
    return false;
  }

  if (proyecto.fechaFinProyecto < proyecto.fechaInicioProyecto) {
    toast.error("La fecha final no puede ser menor que la inicial");
    return false;
  }

  return true;
}
