import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { obtenerEtapas } from "../services/etapaService";
import { obtenerTiposError } from "../services/tipoErrorService";
import { crearRegistroError } from "../services/registroErrorService";

export default function RegistroErrorNuevoPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [etapas, setEtapas] = useState<any[]>([]);
  const [tiposError, setTiposError] = useState<any[]>([]);

  const [formulario, setFormulario] = useState({
    codError: "",
    descripcionError: "",
    comentarioError: "",
    idTipoError: "",
    idEtapa: "",
  });

  useEffect(() => {
    async function cargarDatos() {
      try {
        const etapasData = await obtenerEtapas();

        const etapasProyecto =
          etapasData.filter(
            (etapa) =>
              etapa.proyecto.idProyecto === Number(id)
          );

        setEtapas(etapasProyecto);

        const tipos =
          await obtenerTiposError();

        setTiposError(tipos);

      } catch (error) {
        console.error(error);
      }
    }

    cargarDatos();
  }, [id]);

  async function guardar() {
    try {
      await crearRegistroError({
        codError: formulario.codError,
        descripcionError:
          formulario.descripcionError,
        comentarioError:
          formulario.comentarioError,

        tipoError: {
          idTipoError:
            Number(formulario.idTipoError),
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
      <h1>Registrar Error</h1>

      <div>
        <label>Código</label>

        <input
          value={formulario.codError}
          onChange={(e) =>
            setFormulario({
              ...formulario,
              codError: e.target.value,
            })
          }
        />
      </div>

      <br />

      <div>
        <label>Tipo Error</label>

        <select
          value={formulario.idTipoError}
          onChange={(e) =>
            setFormulario({
              ...formulario,
              idTipoError: e.target.value,
            })
          }
        >
          <option value="">
            Seleccione
          </option>

          {tiposError.map((tipo) => (
            <option
              key={tipo.idTipoError}
              value={tipo.idTipoError}
            >
              {tipo.nombreTipo}
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
        <label>Descripción</label>

        <textarea
          value={formulario.descripcionError}
          onChange={(e) =>
            setFormulario({
              ...formulario,
              descripcionError:
                e.target.value,
            })
          }
        />
      </div>

      <br />

      <div>
        <label>Comentario</label>

        <textarea
          value={formulario.comentarioError}
          onChange={(e) =>
            setFormulario({
              ...formulario,
              comentarioError:
                e.target.value,
            })
          }
        />
      </div>

      <br />

      <button onClick={guardar}>
        Guardar Error
      </button>
    </div>
  );
}