import { useEffect, useState, type FormEvent } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input, Textarea } from '../../components/ui/FormControls';
import type { ValoresFormularioCatalogo } from './config';

interface CatalogoFormModalProps {
  open: boolean;
  titulo: string;
  valoresIniciales?: ValoresFormularioCatalogo;
  onClose: () => void;
  onGuardar: (valores: ValoresFormularioCatalogo) => Promise<void>;
}

const valoresVacios: ValoresFormularioCatalogo = { codigo: '', nombre: '', descripcion: '' };

// Espejo de los límites reales en RolRequest/ProfesionRequest/
// EspecialidadRequest.java -- los 3 comparten exactamente el mismo molde.
const LIMITES = {
  codigo: 20,
  nombre: 100,
  descripcion: 255,
} as const;

export function CatalogoFormModal({
  open,
  titulo,
  valoresIniciales,
  onClose,
  onGuardar,
}: CatalogoFormModalProps) {
  const [valores, setValores] = useState<ValoresFormularioCatalogo>(valoresIniciales ?? valoresVacios);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    setValores(valoresIniciales ?? valoresVacios);
  }, [valoresIniciales, open]);

  const esEdicion = Boolean(valoresIniciales);

  const manejarEnvio = async (evento: FormEvent) => {
    evento.preventDefault();
    setGuardando(true);
    try {
      await onGuardar(valores);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={esEdicion ? `Editar ${titulo.toLowerCase()}` : `Nuevo/a ${titulo.toLowerCase()}`}
      size="sm"
    >
      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        <Input
          label="Código"
          required
          minLength={3}
          maxLength={LIMITES.codigo}
          value={valores.codigo}
          onChange={(e) => setValores((v) => ({ ...v, codigo: e.target.value }))}
          placeholder={`Ej: ${titulo.slice(0, 3).toUpperCase()}-001`}
          hint="Entre 3 y 20 caracteres"
        />
        <Input
          label="Nombre"
          required
          minLength={3}
          maxLength={LIMITES.nombre}
          value={valores.nombre}
          onChange={(e) => setValores((v) => ({ ...v, nombre: e.target.value }))}
          hint="Entre 3 y 100 caracteres"
        />
        <Textarea
          label="Descripción"
          rows={3}
          maxLength={LIMITES.descripcion}
          value={valores.descripcion}
          onChange={(e) => setValores((v) => ({ ...v, descripcion: e.target.value }))}
          hint={`Máximo ${LIMITES.descripcion} caracteres`}
        />

        <div className="flex justify-end gap-2 mt-1">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" loading={guardando}>
            {esEdicion ? 'Guardar cambios' : 'Crear'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
