import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props {
  open: boolean;
  onClose: () => void;

  tipoError: any;
  setTipoError: (tipo: any) => void;

  onGuardar: () => void;

  editando: boolean;

  error: string;
}

export default function TipoErrorModal({
  open,
  onClose,
  tipoError,
  setTipoError,
  onGuardar,
  editando,
  error,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editando ? "Editar Tipo Error" : "Nuevo Tipo Error"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Código"
            value={tipoError.codTipoError}
            onChange={(e) =>
              setTipoError({
                ...tipoError,
                codTipoError: e.target.value,
              })
            }
          />

          <Input
            placeholder="Nombre"
            value={tipoError.nombreTipo}
            onChange={(e) =>
              setTipoError({
                ...tipoError,
                nombreTipo: e.target.value,
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
