import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props {
  open: boolean;
  onClose: () => void;

  tipoInterrupcion: any;
  setTipoInterrupcion: (tipo: any) => void;

  onGuardar: () => void;

  editando: boolean;

  error: string;
}

export default function TipoInterrupcionModal({
  open,
  onClose,
  tipoInterrupcion,
  setTipoInterrupcion,
  onGuardar,
  editando,
  error,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editando ? "Editar Tipo Interrupción" : "Nuevo Tipo Interrupción"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Código"
            value={tipoInterrupcion.codTipoInterrupcion}
            onChange={(e) =>
              setTipoInterrupcion({
                ...tipoInterrupcion,
                codTipoInterrupcion: e.target.value,
              })
            }
          />

          <Input
            placeholder="Nombre"
            value={tipoInterrupcion.nombreTipoInterrupcion}
            onChange={(e) =>
              setTipoInterrupcion({
                ...tipoInterrupcion,
                nombreTipoInterrupcion: e.target.value,
              })
            }
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>

            <Button onClick={onGuardar}>
              {editando ? "Actualizar" : "Guardar"}
            </Button>
          </div>
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
      </DialogContent>
    </Dialog>
  );
}
