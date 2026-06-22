import { useEffect, useState } from "react";
import { PauseCircle } from "lucide-react";

import { obtenerProyectos } from "../services/proyectoService";
import { obtenerUsuarios } from "../services/usuarioService";
import { obtenerErrores } from "../services/registroErrorService";
import { obtenerMensajes } from "../services/mensajeService";
import { obtenerActividades } from "../services/actividadService";
import { obtenerInterrupciones } from "../services/interrupcionService";

import {
  FolderKanban,
  Users,
  Bug,
  MessageSquare,
  ListTodo,
} from "lucide-react";

export default function DashboardHomePage() {
  const [totalProyectos, setTotalProyectos] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalErrores, setTotalErrores] = useState(0);
  const [totalMensajes, setTotalMensajes] = useState(0);
  const [totalActividades, setTotalActividades] = useState(0);
  const [totalInterrupciones, setTotalInterrupciones] = useState(0);

  const [erroresRecientes, setErroresRecientes] = useState<any[]>([]);
  const [interrupcionesRecientes, setInterrupcionesRecientes] = useState<any[]>(
    [],
  );
  const [actividadesPendientes, setActividadesPendientes] = useState<any[]>([]);

  useEffect(() => {
    cargarDashboard();
  }, []);

  async function cargarDashboard() {
    try {
      const proyectos = await obtenerProyectos();
      const usuarios = await obtenerUsuarios();
      const errores = await obtenerErrores();
      const mensajes = await obtenerMensajes();
      const actividades = await obtenerActividades();
      const interrupciones = await obtenerInterrupciones();

      setTotalProyectos(proyectos.length);
      setTotalUsuarios(usuarios.length);
      setTotalErrores(errores.length);
      setTotalMensajes(mensajes.length);
      setTotalActividades(actividades.length);
      setErroresRecientes(errores);
      setTotalInterrupciones(interrupciones.length);
      setInterrupcionesRecientes(interrupciones);
      setActividadesPendientes(
        actividades.filter((a) => a.estadoActividad === "Pendiente"),
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard IKernell</h1>

        <p className="text-slate-500">Bienvenido al sistema de gestión.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Proyectos</h3>

            <FolderKanban size={22} />
          </div>

          <p className="text-3xl font-bold mt-3">{totalProyectos}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Usuarios</h3>

            <Users size={22} />
          </div>

          <p className="text-3xl font-bold mt-3">{totalUsuarios}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Errores</h3>

            <Bug size={22} />
          </div>

          <p className="text-3xl font-bold mt-3">{totalErrores}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Interrupciones</h3>

            <PauseCircle size={22} />
          </div>

          <p className="text-3xl font-bold mt-3">{totalInterrupciones}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Mensajes</h3>

            <MessageSquare size={22} />
          </div>

          <p className="text-3xl font-bold mt-3">{totalMensajes}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Actividades</h3>

            <ListTodo size={22} />
          </div>

          <p className="text-3xl font-bold mt-3">{totalActividades}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="font-bold text-lg mb-4">Últimos errores</h2>

          {erroresRecientes.slice(0, 5).map((error) => (
            <div key={error.idError} className="border-b py-2">
              <strong>{error.codError}</strong>

              <p>{error.descripcionError}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="font-bold text-lg mb-4">Últimas interrupciones</h2>

          {interrupcionesRecientes.slice(0, 5).map((interrupcion) => (
            <div key={interrupcion.idInterrupcion} className="border-b py-2">
              <strong>{interrupcion.codInterrupcion}</strong>

              <p>{interrupcion.descripcionInterrupcion}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="font-bold text-lg mb-4">Actividades pendientes</h2>

        {actividadesPendientes.length === 0 ? (
          <p>No hay actividades pendientes.</p>
        ) : (
          actividadesPendientes.map((actividad) => (
            <div key={actividad.idActividad} className="border-b py-2">
              <strong>{actividad.codActividad}</strong>

              <p>{actividad.nombreActividad}</p>

              <span className="text-sm text-orange-500">
                {actividad.estadoActividad}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
