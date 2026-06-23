import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Bug } from "lucide-react";

import { obtenerEtapas } from "../services/etapaService";
import { obtenerTiposError } from "../services/tipoErrorService";
import { crearRegistroError } from "../services/registroErrorService";

import { Card, CardContent } from "../app/components/ui/card";
import { Input } from "../app/components/ui/input";
import { Textarea } from "../app/components/ui/textarea";
import { Button } from "../app/components/ui/button";

import { obtenerIdUsuario } from "../utils/auth";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../app/components/ui/select";

export default function RegistroErrorNuevoPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [etapas, setEtapas] = useState<any[]>([]);
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [tiposError, setTiposError] = useState<any[]>([]);
  const [errorFormulario, setErrorFormulario] = useState("");

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

        const etapasProyecto = etapasData.filter(
          (etapa) => etapa.proyecto.idProyecto === Number(id),
        );

        setEtapas(etapasProyecto);

        const tipos = await obtenerTiposError();

        if (etapasProyecto.length > 0) {
          setNombreProyecto(etapasProyecto[0].proyecto.nombreProyecto);
        }

        setTiposError(tipos);
      } catch (error) {
        console.error(error);
      }
    }

    cargarDatos();
  }, [id]);

  function validarFormulario(): boolean {
    if (!formulario.codError.trim()) {
      setErrorFormulario("Debe ingresar un código");
      return false;
    }

    if (formulario.codError.trim().length < 3) {
      setErrorFormulario("El código debe tener mínimo 3 caracteres");
      return false;
    }

    if (formulario.codError.trim().length > 10) {
      setErrorFormulario("El código no puede superar 10 caracteres");
      return false;
    }

    if (!formulario.idTipoError) {
      setErrorFormulario("Debe seleccionar un tipo de error");
      return false;
    }

    if (!formulario.idEtapa) {
      setErrorFormulario("Debe seleccionar una etapa");
      return false;
    }

    if (!formulario.descripcionError.trim()) {
      setErrorFormulario("Debe ingresar una descripción");
      return false;
    }

    if (formulario.descripcionError.trim().length < 10) {
      setErrorFormulario("La descripción debe tener mínimo 10 caracteres");
      return false;
    }

    if (formulario.descripcionError.trim().length > 500) {
      setErrorFormulario("La descripción no puede superar 500 caracteres");
      return false;
    }

    if (formulario.comentarioError.trim().length > 500) {
      setErrorFormulario("El comentario no puede superar 500 caracteres");
      return false;
    }

    setErrorFormulario("");

    return true;
  }

  async function guardar() {
    if (!validarFormulario()) {
      return;
    }

    try {
      await crearRegistroError({
        codError: formulario.codError,
        descripcionError: formulario.descripcionError,
        comentarioError: formulario.comentarioError,

        tipoError: {
          idTipoError: Number(formulario.idTipoError),
        },

        etapa: {
          idEtapa: Number(formulario.idEtapa),
        },

        desarrollador: {
          idUsuario: obtenerIdUsuario(),
        },
      });

      toast.success("Error registrado correctamente");

      navigate(`/dashboard/proyectos/${id}`);
    } catch (error) {
      console.error(error);

      toast.error("No se pudo registrar el error");
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
              <Bug className="h-8 w-8 text-primary" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">Registrar Error</h1>

              <p className="text-sm">
                Proyecto:
                <span className="font-medium ml-1">{nombreProyecto}</span>
              </p>

              <p className="text-muted-foreground">
                Complete la información para registrar un nuevo error en el
                proyecto.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Código <span className="text-red-500">*</span>
            </label>

            <Input
              value={formulario.codError}
              placeholder="Ej: ERR-001"
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  codError: e.target.value,
                })
              }
            />
          </div>

          {/* Tipo Error + Etapa */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Tipo de Error <span className="text-red-500">*</span>
              </label>

              <Select
                value={formulario.idTipoError}
                onValueChange={(value) =>
                  setFormulario({
                    ...formulario,
                    idTipoError: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un tipo de error" />
                </SelectTrigger>

                <SelectContent>
                  {tiposError.map((tipo) => (
                    <SelectItem
                      key={tipo.idTipoError}
                      value={String(tipo.idTipoError)}
                    >
                      {tipo.nombreTipo}
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

          {/* Descripción */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Descripción <span className="text-red-500">*</span>
            </label>
            <Textarea
              className="min-h-[140px]"
              placeholder="Describa el error encontrado..."
              value={formulario.descripcionError}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  descripcionError: e.target.value,
                })
              }
            />

            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Mínimo 10 y máximo 500 caracteres.</span>

              <span>{formulario.descripcionError.length}/500</span>
            </div>
          </div>

          {/* Comentario */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Comentario <span className="text-red-500">*</span>
            </label>

            <Textarea
              className="min-h-[120px]"
              placeholder="Agregue comentarios adicionales..."
              value={formulario.comentarioError}
              onChange={(e) =>
                setFormulario({
                  ...formulario,
                  comentarioError: e.target.value,
                })
              }
            />

            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Máximo 500 caracteres.</span>

              <span>{formulario.comentarioError.length}/500</span>
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
              onClick={() => navigate(`/dashboard/proyectos/${id}`)}
            >
              Cancelar
            </Button>

            <Button onClick={guardar}>Guardar Error</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
