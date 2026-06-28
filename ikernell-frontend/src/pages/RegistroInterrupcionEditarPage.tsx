import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Clock } from "lucide-react";

import { obtenerEtapas } from "../services/etapaService";
import { obtenerTiposInterrupcion } from "../services/tipoInterrupcionService";

import {
  obtenerInterrupcionPorId,
  actualizarInterrupcion,
} from "../services/interrupcionService";

import { obtenerIdUsuario } from "../utils/auth";

import { Card, CardContent } from "../app/components/ui/card";
import { Input } from "../app/components/ui/input";
import { Textarea } from "../app/components/ui/textarea";
import { Button } from "../app/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../app/components/ui/select";

export default function RegistroInterrupcionEditarPage() {
  const { id } = useParams();
  const idInterrupcion = Number(id);

  const navigate = useNavigate();

  const [etapas, setEtapas] = useState<any[]>([]);
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [idDesarrollador, setIdDesarrollador] = useState<number | null>(null);
  const [tiposInterrupcion, setTiposInterrupcion] = useState<any[]>([]);
  const [errorFormulario, setErrorFormulario] = useState("");

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
        const interrupcion = await obtenerInterrupcionPorId(idInterrupcion);
        const idUsuarioActual = obtenerIdUsuario();

        if (interrupcion.desarrollador.idUsuario !== idUsuarioActual) {
          toast.error(
            "Solo el desarrollador responsable puede editar esta interrupción",
          );
          navigate("/dashboard/interrupciones");
          return;
        }

        setFormulario({
          codInterrupcion: interrupcion.codInterrupcion,

          descripcionInterrupcion: interrupcion.descripcionInterrupcion,

          duracionInterrupcion: String(interrupcion.duracionInterrupcion),

          idTipoInterrupcion: String(
            interrupcion.tipoInterrupcion.idTipoInterrupcion,
          ),

          idEtapa: String(interrupcion.etapa.idEtapa),
        });

        setIdDesarrollador(interrupcion.desarrollador.idUsuario);

        const etapasData = await obtenerEtapas();

        setEtapas(etapasData);

        const tipos = await obtenerTiposInterrupcion();

        const etapaActual = etapasData.find(
          (e) => e.idEtapa === interrupcion.etapa.idEtapa,
        );

        if (etapaActual) {
          setNombreProyecto(etapaActual.proyecto.nombreProyecto);
        }

        setTiposInterrupcion(tipos);
      } catch (error) {
        console.error(error);
      }
    }

    cargarDatos();
  }, [idInterrupcion]);

  function validarFormulario(): boolean {
    if (!formulario.codInterrupcion.trim()) {
      setErrorFormulario("Debe ingresar un código");
      return false;
    }

    if (formulario.codInterrupcion.trim().length < 3) {
      setErrorFormulario("El código debe tener mínimo 3 caracteres");
      return false;
    }

    if (formulario.codInterrupcion.trim().length > 10) {
      setErrorFormulario("El código no puede superar 10 caracteres");
      return false;
    }

    if (!formulario.idTipoInterrupcion) {
      setErrorFormulario("Debe seleccionar un tipo de error");
      return false;
    }

    if (!formulario.idEtapa) {
      setErrorFormulario("Debe seleccionar una etapa");
      return false;
    }

    if (!formulario.descripcionInterrupcion.trim()) {
      setErrorFormulario("Debe ingresar una descripción");
      return false;
    }

    if (formulario.descripcionInterrupcion.trim().length < 10) {
      setErrorFormulario("La descripción debe tener mínimo 10 caracteres");
      return false;
    }

    if (formulario.descripcionInterrupcion.trim().length > 500) {
      setErrorFormulario("La descripción no puede superar 500 caracteres");
      return false;
    }

    if (
      Number(formulario.duracionInterrupcion) <= 0 ||
      Number(formulario.duracionInterrupcion) > 1440
    ) {
      setErrorFormulario("La duración debe estar entre 1 y 1440 minutos");

      return false;
    }

    setErrorFormulario("");

    return true;
  }

  async function actualizar() {
    if (!validarFormulario()) {
      return;
    }
    if (!idDesarrollador) {
      toast.error("No se pudo obtener el desarrollador original");
      return;
    }
    try {
      await actualizarInterrupcion(idInterrupcion, {
        codInterrupcion: formulario.codInterrupcion,

        descripcionInterrupcion: formulario.descripcionInterrupcion,

        duracionInterrupcion: Number(formulario.duracionInterrupcion),

        fechaInterrupcion: new Date().toISOString().split("T")[0],

        tipoInterrupcion: {
          idTipoInterrupcion: Number(formulario.idTipoInterrupcion),
        },

        etapa: {
          idEtapa: Number(formulario.idEtapa),
        },

        desarrollador: {
          idUsuario: idDesarrollador,
        },
      });

      toast.success("Interrupción actualizada correctamente");

      navigate("/dashboard/interrupciones");
    } catch (error) {
      console.error(error);

      toast.error("No se pudo actualizar la interrupción");
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-start gap-4">
            <div
              className="
              h-16
              w-16
              rounded-2xl
              bg-primary/10
              flex
              items-center
              justify-center
            "
            >
              <Clock className="h-8 w-8 text-primary" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">Editar Interrupción</h1>

              <p className="text-sm">
                Proyecto:
                <span className="font-medium ml-1">{nombreProyecto}</span>
              </p>

              <p className="text-muted-foreground">
                Modifique la información de la interrupción registrada.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Código <span className="text-red-500">*</span>
            </label>

            <Input
              value={formulario.codInterrupcion}
              placeholder="Ej: INT-001"
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  codInterrupcion: e.target.value,
                })
              }
            />
          </div>

          {/* Tipo Interrupción + Etapa */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Tipo de Interrupción <span className="text-red-500">*</span>
              </label>

              <Select
                value={formulario.idTipoInterrupcion}
                onValueChange={(value) =>
                  setFormulario({
                    ...formulario,
                    idTipoInterrupcion: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un tipo de error" />
                </SelectTrigger>

                <SelectContent>
                  {tiposInterrupcion.map((tipo) => (
                    <SelectItem
                      key={tipo.idTipoInterrupcion}
                      value={String(tipo.idTipoInterrupcion)}
                    >
                      {tipo.nombreTipoInterrupcion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Etapa <span className="text-red-500">*</span>
              </label>

              <Select
                value={formulario.idEtapa}
                onValueChange={(value) =>
                  setFormulario({
                    ...formulario,
                    idEtapa: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una etapa" />
                </SelectTrigger>

                <SelectContent>
                  {etapas.map((etapa) => (
                    <SelectItem
                      key={etapa.idEtapa}
                      value={String(etapa.idEtapa)}
                    >
                      {etapa.nombreEtapa}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Duración (minutos)
              <span className="text-red-500">*</span>
            </label>

            <Input
              type="number"
              min="1"
              max="1440"
              value={formulario.duracionInterrupcion}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  duracionInterrupcion: e.target.value,
                })
              }
            />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Descripción <span className="text-red-500">*</span>
            </label>
            <Textarea
              className="min-h-[140px]"
              placeholder="Describa la interrupciónencontrado..."
              value={formulario.descripcionInterrupcion}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  descripcionInterrupcion: e.target.value,
                })
              }
            />

            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Mínimo 10 y máximo 500 caracteres.</span>

              <span>{formulario.descripcionInterrupcion.length}/500</span>
            </div>
          </div>

          {errorFormulario && (
            <div
              className="
      flex
      items-center
      gap-2
      rounded-lg
      border
      border-red-200
      bg-red-50
      px-4
      py-3
      text-red-600
    "
            >
              {errorFormulario}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard/interrupciones")}
            >
              Cancelar
            </Button>

            <Button onClick={actualizar}>Actualizar Interrupción</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
