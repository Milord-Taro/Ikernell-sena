import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { obtenerEtapas } from "../services/etapaService";
import { obtenerInterrupcionesPorEtapa } from "../services/interrupcionService";

export default function ProyectoInterrupcionesPage() {

  const { id } = useParams();

  const [interrupciones, setInterrupciones] =
    useState<any[]>([]);

  useEffect(() => {

    async function cargar() {

      try {

        const etapas =
          await obtenerEtapas();

        const etapasProyecto =
          etapas.filter(
            (e) =>
              e.proyecto?.idProyecto === Number(id)
          );

        let interrupcionesProyecto: any[] = [];

        for (const etapa of etapasProyecto) {

          const interrupcionesEtapa =
            await obtenerInterrupcionesPorEtapa(
              etapa.idEtapa
            );

          interrupcionesProyecto = [
            ...interrupcionesProyecto,
            ...interrupcionesEtapa,
          ];
        }

        setInterrupciones(
          interrupcionesProyecto
        );

      } catch (error) {
        console.error(error);
      }
    }

    cargar();

  }, [id]);

  return (
    <div>

      <h1>
        Historial de Interrupciones
      </h1>

      {interrupciones.length === 0 ? (
        <p>
          No hay interrupciones registradas.
        </p>
      ) : (
        interrupciones.map(
          (interrupcion) => (

            <div
              key={
                interrupcion.idInterrupcion
              }
              style={{
                border:
                  "1px solid #ddd",
                padding: "12px",
                marginBottom: "12px",
                borderRadius: "8px",
              }}
            >
              <h3>
                {
                  interrupcion.codInterrupcion
                }
              </h3>

              <p>
                {
                  interrupcion.descripcionInterrupcion
                }
              </p>

              <p>
                Tipo:
                {" "}
                {
                  interrupcion
                    .tipoInterrupcion
                    ?.nombreTipoInterrupcion
                }
              </p>

              <p>
                Etapa:
                {" "}
                {
                  interrupcion
                    .etapa
                    ?.nombreEtapa
                }
              </p>

              <p>
                Duración:
                {" "}
                {
                  interrupcion
                    .duracionInterrupcion
                }
                {" "}min
              </p>

            </div>
          )
        )
      )}

    </div>
  );
}