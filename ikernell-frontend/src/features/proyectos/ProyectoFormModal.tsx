import { useEffect, useState, type FormEvent } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input, Textarea, Select } from '../../components/ui/FormControls';
import { Alert } from '../../components/ui/Feedback';
import { ApiRequestError } from '../../types/api';
import { useAuth } from '../../context/AuthContext';
import { listarUsuarios } from '../../services/usuarios';
import { CODIGO_ROL } from '../../types/usuario';
import type { ProyectoResponse, ProyectoRequest } from '../../types/proyecto';
import type { UsuarioResponse } from '../../types/usuario';

interface ValoresFormulario {
  nombreProyecto: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  idLiderInicial: string;
}

const valoresVacios: ValoresFormulario = {
  nombreProyecto: '',
  descripcion: '',
  fechaInicio: '',
  fechaFin: '',
  idLiderInicial: '',
};

function proyectoAValores(proyecto: ProyectoResponse): ValoresFormulario {
  return {
    nombreProyecto: proyecto.nombreProyecto,
    descripcion: proyecto.descripcion ?? '',
    fechaInicio: proyecto.fechaInicio,
    fechaFin: proyecto.fechaFin,
    idLiderInicial: '',
  };
}

const LIMITES = { nombre: 150 } as const;

interface ProyectoFormModalProps {
  open: boolean;
  proyectoEditando: ProyectoResponse | null;
  onClose: () => void;
  onGuardar: (request: ProyectoRequest) => Promise<void>;
}

export function ProyectoFormModal({ open, proyectoEditando, onClose, onGuardar }: ProyectoFormModalProps) {
  const { usuario } = useAuth();
  const esCoordinador = usuario?.rol.codigoRol === CODIGO_ROL.COORDINADOR;
  const esEdicion = Boolean(proyectoEditando);

  const [valores, setValores] = useState<ValoresFormulario>(valoresVacios);
  const [lideres, setLideres] = useState<UsuarioResponse[]>([]);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [erroresCampo, setErroresCampo] = useState<Record<string, string>>({});

  useEffect(() => {
    setValores(proyectoEditando ? proyectoAValores(proyectoEditando) : valoresVacios);
    setError(null);
    setErroresCampo({});
  }, [proyectoEditando, open]);

  // El selector de líder inicial solo tiene sentido al CREAR (no al
  // editar -- cambiar de líder ya se hace desde la pestaña "Equipo") y
  // solo para Coordinador (un Líder que crea ya se autovincula solo).
  useEffect(() => {
    if (open && !esEdicion && esCoordinador) {
      listarUsuarios().then((todos) => {
        setLideres(todos.filter((u) => u.rol.codigoRol === CODIGO_ROL.LIDER_PROYECTO));
      });
    }
  }, [open, esEdicion, esCoordinador]);

  const actualizarCampo = (campo: keyof ValoresFormulario, valor: string) => {
    setValores((v) => ({ ...v, [campo]: valor }));
  };

  const errorFechas =
    valores.fechaInicio && valores.fechaFin && valores.fechaFin < valores.fechaInicio
      ? 'La fecha de fin no puede ser anterior a la fecha de inicio.'
      : erroresCampo.fechaFin;

  const manejarEnvio = async (evento: FormEvent) => {
    evento.preventDefault();
    setError(null);

    if (valores.fechaFin < valores.fechaInicio) {
      setErroresCampo((e) => ({ ...e, fechaFin: 'La fecha de fin no puede ser anterior a la fecha de inicio.' }));
      return;
    }

    setGuardando(true);
    setErroresCampo({});

    try {
      await onGuardar({
        nombreProyecto: valores.nombreProyecto,
        descripcion: valores.descripcion || undefined,
        fechaInicio: valores.fechaInicio,
        fechaFin: valores.fechaFin,
        idLiderInicial:
          !esEdicion && esCoordinador && valores.idLiderInicial ? Number(valores.idLiderInicial) : undefined,
      });
    } catch (err) {
      if (err instanceof ApiRequestError) {
        if (err.errores) {
          const mapa: Record<string, string> = {};
          err.errores.forEach((e) => {
            mapa[e.campo] = e.mensaje;
          });
          setErroresCampo(mapa);
        } else {
          setError(err.message);
        }
      } else {
        setError('Ocurrió un error inesperado.');
      }
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={esEdicion ? 'Editar proyecto' : 'Nuevo proyecto'} size="md">
      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        {error && <Alert variant="error" title="No se pudo guardar">{error}</Alert>}

        <Input
          label="Nombre del proyecto"
          required
          minLength={3}
          maxLength={LIMITES.nombre}
          value={valores.nombreProyecto}
          onChange={(e) => actualizarCampo('nombreProyecto', e.target.value)}
          error={erroresCampo.nombreProyecto}
        />
        <Textarea
          label="Descripción"
          rows={3}
          value={valores.descripcion}
          onChange={(e) => actualizarCampo('descripcion', e.target.value)}
          error={erroresCampo.descripcion}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Fecha de inicio"
            type="date"
            required
            value={valores.fechaInicio}
            onChange={(e) => actualizarCampo('fechaInicio', e.target.value)}
            error={erroresCampo.fechaInicio}
          />
          <Input
            label="Fecha de fin"
            type="date"
            required
            min={valores.fechaInicio || undefined}
            value={valores.fechaFin}
            onChange={(e) => actualizarCampo('fechaFin', e.target.value)}
            error={errorFechas}
          />
        </div>

        {esEdicion && (
          <Alert variant="info">
            El líder del proyecto se asigna o cambia desde la pestaña "Equipo", en el detalle del proyecto.
          </Alert>
        )}

        {/* Solo Coordinador, y solo al crear -- un Líder que crea ya
            queda autovinculado, no necesita elegir nada aquí. */}
        {!esEdicion && esCoordinador && (
          <Select
            label="Líder del proyecto (opcional)"
            value={valores.idLiderInicial}
            onChange={(e) => actualizarCampo('idLiderInicial', e.target.value)}
            hint="Si no eliges uno, el proyecto queda sin líder hasta que asignes uno desde 'Equipo'."
          >
            <option value="">Sin asignar por ahora</option>
            {lideres.map((l) => (
              <option key={l.idUsuario} value={l.idUsuario}>{l.nombres} {l.apellidos}</option>
            ))}
          </Select>
        )}

        <div className="flex justify-end gap-2 mt-1">
          <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button type="submit" loading={guardando}>
            {esEdicion ? 'Guardar cambios' : 'Crear proyecto'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
