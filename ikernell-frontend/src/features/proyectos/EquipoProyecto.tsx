import { useEffect, useState } from 'react';
import { UserPlus, UserMinus } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/FormControls';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/DataDisplay';
import { Alert } from '../../components/ui/Feedback';
import { Modal } from '../../components/ui/Modal';
import { ApiRequestError } from '../../types/api';
import { CODIGO_ROL } from '../../types/usuario';
import {
  listarAsignacionesPorProyecto,
  crearAsignacion,
  desvincularAsignacion,
} from '../../services/asignaciones';
import { listarUsuarios } from '../../services/usuarios';
import type { AsignacionProyectoResponse, RolProyecto } from '../../types/asignacionProyecto';
import type { UsuarioResponse } from '../../types/usuario';

interface EquipoProyectoProps {
  idProyecto: number;
}

export function EquipoProyecto({ idProyecto }: EquipoProyectoProps) {
  const [asignaciones, setAsignaciones] = useState<AsignacionProyectoResponse[]>([]);
  const [usuarios, setUsuarios] = useState<UsuarioResponse[]>([]);
  const [cargando, setCargando] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [idUsuarioNuevo, setIdUsuarioNuevo] = useState('');
  const [rolNuevo, setRolNuevo] = useState<RolProyecto>('Desarrollador');
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    setCargando(true);
    try {
      const [asignacionesResp, usuariosResp] = await Promise.all([
        listarAsignacionesPorProyecto(idProyecto),
        listarUsuarios(),
      ]);
      setAsignaciones(asignacionesResp);
      setUsuarios(usuariosResp);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idProyecto]);

  const vigentes = asignaciones.filter((a) => !a.fechaDesvinculacion);
  const idsYaAsignados = new Set(vigentes.map((a) => a.usuario.idUsuario));
  const liderVigente = vigentes.find((a) => a.rolProyecto === 'Líder');

  // CORREGIDO: el Coordinador gestiona todo por su rol organizacional,
  // no participa como miembro de equipo de un proyecto puntual -- no
  // debe aparecer como opción seleccionable aquí. CERRADO: además, si el
  // rol elegido en el proyecto es "Líder", solo se puede elegir entre
  // usuarios cuyo ROL ORGANIZACIONAL ya es "Líder de Proyecto" -- un
  // Desarrollador puede terminar siendo Desarrollador en varios
  // proyectos, pero no Líder de ninguno.
  const usuariosDisponibles = usuarios.filter((u) => {
    if (idsYaAsignados.has(u.idUsuario)) return false;
    if (u.rol.codigoRol === CODIGO_ROL.COORDINADOR) return false;
    if (rolNuevo === 'Líder') return u.rol.codigoRol === CODIGO_ROL.LIDER_PROYECTO;
    return true;
  });

  const yaHayLiderYSeEligeLider = rolNuevo === 'Líder' && Boolean(liderVigente);

  const alAgregar = async () => {
    if (!idUsuarioNuevo) return;
    setError(null);
    setGuardando(true);
    try {
      await crearAsignacion({ idUsuario: Number(idUsuarioNuevo), idProyecto, rolProyecto: rolNuevo });
      setModalAbierto(false);
      setIdUsuarioNuevo('');
      setRolNuevo('Desarrollador');
      await cargar();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo agregar al equipo.');
    } finally {
      setGuardando(false);
    }
  };

  const alDesvincular = async (asignacion: AsignacionProyectoResponse) => {
    setError(null);
    try {
      await desvincularAsignacion(asignacion.idAsignacionProyecto);
      await cargar();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo desvincular.');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {error && <Alert variant="error" title="No se pudo completar la acción">{error}</Alert>}

      <div className="flex items-center justify-between">
        <h3 className="type-h4 text-[var(--text-primary)]">Equipo del proyecto</h3>
        <Button size="sm" onClick={() => setModalAbierto(true)}>
          <UserPlus size={14} />
          Agregar
        </Button>
      </div>

      {cargando ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">Cargando equipo...</p>
      ) : vigentes.length === 0 ? (
        <p className="type-body-sm text-[var(--text-tertiary)]">Todavía no hay nadie asignado a este proyecto.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {vigentes.map((a) => (
            <Card key={a.idAsignacionProyecto}>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Avatar name={`${a.usuario.nombres} ${a.usuario.apellidos}`} size="sm" />
                  <div className="flex flex-col">
                    <span className="type-body text-[var(--text-primary)]">
                      {a.usuario.nombres} {a.usuario.apellidos}
                    </span>
                    <span className="type-caption text-[var(--text-tertiary)]">{a.usuario.correoElectronico}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={a.rolProyecto === 'Líder' ? 'info' : 'default'}>{a.rolProyecto}</Badge>
                  <Button variant="ghost" size="sm" onClick={() => alDesvincular(a)}>
                    <UserMinus size={14} />
                    Desvincular
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Modal open={modalAbierto} onClose={() => setModalAbierto(false)} title="Agregar al equipo" size="sm">
        <div className="flex flex-col gap-4">
          <Select
            label="Usuario"
            required
            value={idUsuarioNuevo}
            onChange={(e) => setIdUsuarioNuevo(e.target.value)}
          >
            <option value="">Seleccionar...</option>
            {usuariosDisponibles.map((u) => (
              <option key={u.idUsuario} value={u.idUsuario}>
                {u.nombres} {u.apellidos} — {u.rol.nombreRol}
              </option>
            ))}
          </Select>
          <Select
            label="Rol en el proyecto"
            required
            value={rolNuevo}
            onChange={(e) => {
              // Al cambiar de rol, el usuario elegido puede dejar de ser
              // válido para la nueva opción (ej. un Desarrollador elegido
              // bajo "Desarrollador" ya no aplica si se cambia a "Líder").
              setRolNuevo(e.target.value as RolProyecto);
              setIdUsuarioNuevo('');
            }}
          >
            <option value="Desarrollador">Desarrollador</option>
            <option value="Líder">Líder</option>
          </Select>

          {/* CERRADO: el backend ya reemplaza automáticamente al líder
              anterior (desvinculación automática) -- esto es solo un
              aviso informativo de lo que va a pasar, no una advertencia
              de bug pendiente. */}
          {yaHayLiderYSeEligeLider && liderVigente && (
            <Alert variant="info" title="Esto reemplazará al líder actual">
              {liderVigente.usuario.nombres} {liderVigente.usuario.apellidos} dejará de ser líder de este proyecto.
            </Alert>
          )}

          <div className="flex justify-end gap-2 mt-1">
            <Button variant="ghost" onClick={() => setModalAbierto(false)}>Cancelar</Button>
            <Button onClick={alAgregar} loading={guardando} disabled={!idUsuarioNuevo}>
              Agregar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
