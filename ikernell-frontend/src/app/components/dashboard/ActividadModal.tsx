import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Props {
  open: boolean;
  onClose: () => void;

  actividad: any;
  setActividad: (actividad: any) => void;

  onGuardar: () => void;

  editando: boolean;

  etapas: any[];
  usuarios: any[];
  error: string;

  ocultarEtapa?: boolean;
}

export default function ActividadModal({
  open,
  onClose,
  actividad,
  setActividad,
  onGuardar,
  editando,
  etapas,
  usuarios,
  error,
  ocultarEtapa = false,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>
            {editando ? "Editar Actividad" : "Nueva Actividad"}
          </DialogTitle>
        </DialogHeader>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "10px",
          }}
        >
          <Input
            placeholder="Nombre"
            value={actividad.nombreActividad}
            onChange={(e) =>
              setActividad({
                ...actividad,
                nombreActividad: e.target.value,
              })
            }
          />

          <Textarea
            placeholder="Descripción"
            value={actividad.descripcionActividad}
            onChange={(e) =>
              setActividad({
                ...actividad,
                descripcionActividad: e.target.value,
              })
            }
          />

          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <Input
              type="date"
              value={actividad.fechaInicioActividad}
              onChange={(e) =>
                setActividad({
                  ...actividad,
                  fechaInicioActividad: e.target.value,
                })
              }
            />

            <Input
              type="date"
              value={actividad.fechaFinActividad}
              onChange={(e) =>
                setActividad({
                  ...actividad,
                  fechaFinActividad: e.target.value,
                })
              }
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            {!ocultarEtapa && (
              <select
                value={actividad.etapa.idEtapa}
                onChange={(e) =>
                  setActividad({
                    ...actividad,
                    etapa: {
                      idEtapa: Number(e.target.value),
                    },
                  })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value={0}>Seleccionar etapa</option>

                {etapas.map((etapa) => (
                  <option
                    key={etapa.idEtapa}
                    value={etapa.idEtapa}
                  >
                    [{etapa.codEtapa}] {etapa.proyecto?.nombreProyecto} -{" "}
                    {etapa.nombreEtapa}
                  </option>
                ))}
              </select>
            )}

            <select
              value={actividad.desarrollador.idUsuario}
              onChange={(e) =>
                setActividad({
                  ...actividad,
                  desarrollador: {
                    idUsuario: Number(e.target.value),
                  },
                })
              }
              className="w-full p-2 border rounded-md"
            >
              <option value={0}>Seleccionar desarrollador</option>

              {usuarios
                .filter((u) => u.rol?.nombreRol === "Desarrollador")
                .map((usuario) => (
                  <option
                    key={usuario.idUsuario}
                    value={usuario.idUsuario}
                  >
                    {usuario.nombre} {usuario.apellido}
                  </option>
                ))}
            </select>
          </div>


          {error && (
            <div
              className="
      bg-red-100
      text-red-700
      p-3
      rounded-md
      text-sm
    "
            >
              {error}
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>

            <Button onClick={onGuardar}>
              {editando ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
