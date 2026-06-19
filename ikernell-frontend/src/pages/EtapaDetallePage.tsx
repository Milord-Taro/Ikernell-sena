import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { obtenerEtapas } from "../services/etapaService";
import { obtenerActividades } from "../services/actividadService";

import type { Etapa } from "../types/Etapa";
import type { Actividad } from "../types/Actividad";

export default function EtapaDetallePage() {
  const { id } = useParams();

  const [etapa, setEtapa] = useState<Etapa | null>(null);
  const [actividades, setActividades] = useState<Actividad[]>([]);

  useEffect(() => {
    async function cargarDatos() {
      if (!id) return;

      try {
        const etapas = await obtenerEtapas();

        const etapaEncontrada =
          etapas.find(
            (e: Etapa) =>
              e.idEtapa === Number(id)
          ) || null;

        setEtapa(etapaEncontrada);

        const actividadesData =
          await obtenerActividades();

        const actividadesEtapa =
          actividadesData.filter(
            (actividad: Actividad) =>
              actividad.etapa.idEtapa === Number(id)
          );

        setActividades(actividadesEtapa);

      } catch (error) {
        console.error(error);
      }
    }

    cargarDatos();
  }, [id]);

  if (!etapa) {
    return <p>Cargando etapa...</p>;
  }

  return (
    <div>
      <h1>{etapa.nombreEtapa}</h1>

      <p>
        {etapa.descripcionEtapa}
      </p>

      <p>
        Proyecto:
        {" "}
        {etapa.proyecto.nombreProyecto}
      </p>

      <hr />

      <h2>Actividades</h2>

      {actividades.length === 0 ? (
        <p>No hay actividades registradas.</p>
      ) : (
        actividades.map((actividad) => (
          <div
            key={actividad.idActividad}
            style={{
              marginBottom: "10px",
            }}
          >
            <Link
              to={`/dashboard/actividades/${actividad.idActividad}`}
            >
              {actividad.nombreActividad}
            </Link>

            <div>
              Estado:
              {" "}
              {actividad.estadoActividad}
            </div>
          </div>
        ))
      )}
    </div>
  );
}