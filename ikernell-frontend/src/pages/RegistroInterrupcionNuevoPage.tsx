import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { obtenerEtapas } from "../services/etapaService";
import { obtenerTiposInterrupcion } from "../services/tipoInterrupcionService";
import { crearInterrupcion } from "../services/interrupcionService";

export default function RegistroInterrupcionNuevoPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [etapas, setEtapas] = useState<any[]>([]);
  const [tiposInterrupcion, setTiposInterrupcion] = useState<any[]>([]);

  const [formulario, setFormulario] = useState({
    codInterrupcion: "",
    descripcionInterrupcion: "",
    duracionInterrupcion: "",
    idTipoInterrupcion: "",
    idEtapa: "",
  });

  useEffect(() => {
    async function cargarDatos() {
      try {
        const etapasData = await obtenerEtapas();

        const etapasProyecto = etapasData.filter(
          (etapa) =>
            etapa.proyecto?.idProyecto === Number(id)
        );

        setEtapas(etapasProyecto);

        const tipos =
          await obtenerTiposInterrupcion();

        setTiposInterrupcion(tipos);

      } catch (error) {
        console.error(error);
      }
    }

    cargarDatos();
  }, [id]);

  async function guardar() {
    try {
      await crearInterrupcion({
        codInterrupcion:
          formulario.codInterrupcion,

        descripcionInterrupcion:
          formulario.descripcionInterrupcion,

        duracionInterrupcion:
          Number(formulario.duracionInterrupcion),

        fechaInterrupcion:
          new Date()
            .toISOString()
            .split("T")[0],

        tipoInterrupcion: {
          idTipoInterrupcion:
            Number(
              formulario.idTipoInterrupcion
            ),
        },

        etapa: {
          idEtapa:
            Number(formulario.idEtapa),
        },

        desarrollador: {
          idUsuario: 3,
        },
      });

      navigate(
        `/dashboard/proyectos/${id}`
      );

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Registrar Interrupción</h1>

      <div>
        <label>Código</label>

        <input
          value={formulario.codInterrupcion}
          onChange={(e) =>
            setFormulario({
              ...formulario,
              codInterrupcion:
                e.target.value,
            })
          }
        />
      </div>

      <br />

      <div>
        <label>Tipo Interrupción</label>

        <select
          value={formulario.idTipoInterrupcion}
          onChange={(e) =>
            setFormulario({
              ...formulario,
              idTipoInterrupcion:
                e.target.value,
            })
          }
        >
          <option value="">
            Seleccione
          </option>

          {tiposInterrupcion.map((tipo) => (
            <option
              key={tipo.idTipoInterrupcion}
              value={tipo.idTipoInterrupcion}
            >
              {tipo.nombreTipoInterrupcion}
            </option>
          ))}
        </select>
      </div>

      <br />

      <div>
        <label>Etapa</label>

        <select
          value={formulario.idEtapa}
          onChange={(e) =>
            setFormulario({
              ...formulario,
              idEtapa: e.target.value,
            })
          }
        >
          <option value="">
            Seleccione
          </option>

          {etapas.map((etapa) => (
            <option
              key={etapa.idEtapa}
              value={etapa.idEtapa}
            >
              {etapa.nombreEtapa}
            </option>
          ))}
        </select>
      </div>

      <br />

      <div>
        <label>Duración (minutos)</label>

        <input
          type="number"
          value={
            formulario.duracionInterrupcion
          }
          onChange={(e) =>
            setFormulario({
              ...formulario,
              duracionInterrupcion:
                e.target.value,
            })
          }
        />
      </div>

      <br />

      <div>
        <label>Descripción</label>

        <textarea
          value={
            formulario.descripcionInterrupcion
          }
          onChange={(e) =>
            setFormulario({
              ...formulario,
              descripcionInterrupcion:
                e.target.value,
            })
          }
        />
      </div>

      <br />

      <button onClick={guardar}>
        Guardar Interrupción
      </button>
    </div>
  );
}