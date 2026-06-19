import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { obtenerEtapas } from "../services/etapaService";
import { obtenerErroresPorEtapa } from "../services/registroErrorService";

export default function ProyectoErroresPage() {

  const { id } = useParams();

  const [errores, setErrores] =
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

        let erroresProyecto: any[] = [];

        for (const etapa of etapasProyecto) {

          const erroresEtapa =
            await obtenerErroresPorEtapa(
              etapa.idEtapa
            );

          erroresProyecto = [
            ...erroresProyecto,
            ...erroresEtapa,
          ];
        }

        setErrores(erroresProyecto);

      } catch (error) {
        console.error(error);
      }
    }

    cargar();

  }, [id]);

  return (
    <div>

      <h1>
        Historial de Errores
      </h1>

      {errores.map((error) => (

        <div
          key={error.idError}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>
            {error.codError}
          </h3>

          <p>
            {error.descripcionError}
          </p>

          <p>
            Estado:
            {" "}
            {error.estadoError}
          </p>

          <p>
            Tipo:
            {" "}
            {error.tipoError?.nombreTipo}
          </p>

          <p>
            Etapa:
            {" "}
            {error.etapa?.nombreEtapa}
          </p>

        </div>

      ))}

    </div>
  );
}