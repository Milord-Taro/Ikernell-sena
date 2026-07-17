  import { useCallback, useEffect, useState } from 'react';
  import { Plus, Search } from 'lucide-react';
  import { Table } from '../../components/ui/Table';
  import { Button } from '../../components/ui/Button';
  import { Switch, Select } from '../../components/ui/FormControls';
  import { Badge } from '../../components/ui/Badge';
  import { Avatar } from '../../components/ui/DataDisplay';
  import { Alert } from '../../components/ui/Feedback';
  import { UsuarioFormModal } from './UsuarioFormModal';
  import { useAuth } from '../../context/AuthContext';
  import { useCarga } from '../../hooks/useCarga';
  import { ApiRequestError } from '../../types/api';
  import {
    listarUsuarios,
    crearUsuario,
    actualizarUsuario,
    cambiarEstadoUsuario,
  } from '../../services/usuarios';
  import { rolesService, profesionesService, especialidadesService } from '../../services/catalogos';
  import { CODIGO_ROL } from '../../types/usuario';
  import type { UsuarioResponse, RolResponse, ProfesionResponse, EspecialidadResponse } from '../../types/usuario';

  // Tabla base (Record<string, unknown>) para satisfacer el constraint
  // genérico de <Table>, sin tocar el UsuarioResponse real del backend.
  interface FilaUsuario extends Record<string, unknown> {
    usuario: UsuarioResponse;
  }

  export function UsuariosTable() {
    const { usuario: usuarioActual } = useAuth();
    const esCoordinador = usuarioActual?.rol.codigoRol === CODIGO_ROL.COORDINADOR;

    const [usuarios, setUsuarios] = useState<UsuarioResponse[]>([]);
    const [roles, setRoles] = useState<RolResponse[]>([]);
    const [profesiones, setProfesiones] = useState<ProfesionResponse[]>([]);
    const [especialidades, setEspecialidades] = useState<EspecialidadResponse[]>([]);
    const { cargando, error: errorCarga, ejecutar } = useCarga();
    const [busqueda, setBusqueda] = useState('');
    const [filtroRol, setFiltroRol] = useState('');
    const [filtroEstado, setFiltroEstado] = useState<'activos' | 'inhabilitados' | 'todos'>('activos');
    const [modalAbierto, setModalAbierto] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState<UsuarioResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    // CORREGIDO: profesiones/especialidades son catálogos exclusivos de
    // Coordinador (UsuarioFormModal, que tampoco se muestra para otros
    // roles) -- pedirlos aquí para un Líder provoca un 403 que, al estar
    // en el mismo Promise.all, tumbaba TODA la carga (incluida la lista
    // de usuarios, que el Líder sí puede ver) y dejaba la tabla vacía.
    const cargarTodo = useCallback(() => {
      return ejecutar(async () => {
        const [usuariosResp, rolesResp] = await Promise.all([
          listarUsuarios(),
          rolesService.listar(),
        ]);
        setUsuarios(usuariosResp);
        setRoles(rolesResp.filter((r) => r.activo));

        if (esCoordinador) {
          const [profesionesResp, especialidadesResp] = await Promise.all([
            profesionesService.listar(),
            especialidadesService.listar(),
          ]);
          setProfesiones(profesionesResp.filter((p) => p.activo));
          setEspecialidades(especialidadesResp.filter((e) => e.activo));
        }
      });
    }, [esCoordinador, ejecutar]);

    // CORREGIDO: dependencia explícita en cargarTodo (memoizado con
    // useCallback) en vez de `[]` -- `usuarioActual` se resuelve async
    // (empieza null), así que `esCoordinador` puede pasar de false a true
    // DESPUÉS del montaje inicial. Con `[]`, el closure original (con
    // esCoordinador=false) quedaba fijo para siempre y un Coordinador
    // recién resuelto nunca cargaba profesiones/especialidades.
    useEffect(() => {
      cargarTodo();
    }, [cargarTodo]);

    const filas: FilaUsuario[] = usuarios
      .filter((u) => {
        const texto = `${u.codigoUsuario} ${u.nombres} ${u.apellidos} ${u.correoElectronico}`.toLowerCase();
        return texto.includes(busqueda.toLowerCase());
      })
      .filter((u) => !filtroRol || u.rol.codigoRol === filtroRol)
      .filter((u) => {
        if (filtroEstado === 'todos') return true;
        return filtroEstado === 'activos' ? u.activo : !u.activo;
      })
      .map((usuario) => ({ usuario }));

    const alGuardarCreacion: Parameters<typeof UsuarioFormModal>[0]['onCrear'] = async (request) => {
      await crearUsuario(request);
      setModalAbierto(false);
      await cargarTodo();
    };

    const alGuardarEdicion: Parameters<typeof UsuarioFormModal>[0]['onActualizar'] = async (id, request) => {
      await actualizarUsuario(id, request);
      setModalAbierto(false);
      setUsuarioEditando(null);
      await cargarTodo();
    };

    const alCambiarEstado = async (usuario: UsuarioResponse, activo: boolean) => {
      setError(null);
      try {
        await cambiarEstadoUsuario(usuario.idUsuario, activo);
        await cargarTodo();
      } catch (err) {
        setError(err instanceof ApiRequestError ? err.message : 'No se pudo cambiar el estado del usuario.');
      }
    };

    // Un Coordinador no puede cambiar su propio estado, ni inhabilitar a
    // otro Coordinador -- coincide con la regla del backend
    // (UsuarioService.cambiarEstado), esto solo evita el intento en la UI.
    const noPuedeCambiarEstado = (usuario: UsuarioResponse) =>
      usuario.idUsuario === usuarioActual?.idUsuario ||
      (usuario.activo && usuario.rol.codigoRol === CODIGO_ROL.COORDINADOR);

    return (
      <div className="flex flex-col gap-4">
        {errorCarga && <Alert variant="error" title="No se pudieron cargar los usuarios">{errorCarga}</Alert>}
        {error && <Alert variant="error" title="No se pudo completar la acción">{error}</Alert>}

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="relative w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" />
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre, código o correo..."
                className="w-full h-8 pl-8 pr-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] type-body-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
              />
            </div>

            <Select value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)} className="w-44">
              <option value="">Todos los roles</option>
              {roles.map((r) => (
                <option key={r.idRol} value={r.codigoRol}>{r.nombreRol}</option>
              ))}
            </Select>

            <Select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value as 'activos' | 'inhabilitados' | 'todos')}
              className="w-40"
            >
              <option value="activos">Activos</option>
              <option value="inhabilitados">Inhabilitados</option>
              <option value="todos">Todos</option>
            </Select>
          </div>

          {/* Crear usuario: solo Coordinador (coincide con el backend) */}
          {esCoordinador && (
            <Button
              size="md"
              onClick={() => {
                setUsuarioEditando(null);
                setModalAbierto(true);
              }}
            >
              <Plus size={15} />
              Nuevo usuario
            </Button>
          )}
        </div>

        <Table<FilaUsuario>
          keyField="usuario"
          rowKey={(fila) => fila.usuario.idUsuario}
          loading={cargando}
          data={filas}
          emptyMessage="No hay usuarios registrados"
          emptyDescription="Crea el primer usuario para empezar a asignar proyectos y actividades."
          columns={[
            {
              key: 'nombre',
              header: 'Usuario',
              sortable: true,
              sortValue: (fila) => `${fila.usuario.nombres} ${fila.usuario.apellidos}`,
              render: (fila) => (
                <div className="flex items-center gap-2.5">
                  <Avatar name={`${fila.usuario.nombres} ${fila.usuario.apellidos}`} size="sm" />
                  <div className="flex flex-col">
                    <span className="type-body text-[var(--text-primary)]">
                      {fila.usuario.nombres} {fila.usuario.apellidos}
                    </span>
                    <span className="type-caption text-[var(--text-tertiary)]">{fila.usuario.correoElectronico}</span>
                  </div>
                </div>
              ),
            },
            {
              key: 'codigo',
              header: 'Código',
              mono: true,
              width: '200px',
              sortable: true,
              sortValue: (f) => f.usuario.codigoUsuario,
              render: (f) => f.usuario.codigoUsuario,
            },
            {
              key: 'rol',
              header: 'Rol',
              width: '300px',
              sortable: true,
              sortValue: (fila) => fila.usuario.rol.nombreRol,
              render: (fila) => <Badge variant="info">{fila.usuario.rol.nombreRol}</Badge>,
            },
            {
              key: 'estado',
              header: 'Estado',
              width: '100px',
              sortable: true,
              sortValue: (fila) => fila.usuario.activo,
              render: (fila) => (
                <Switch
                  checked={fila.usuario.activo}
                  disabled={!esCoordinador || noPuedeCambiarEstado(fila.usuario)}
                  onChange={(checked) => alCambiarEstado(fila.usuario, checked)}
                />
              ),
            },
            {
              key: 'acciones',
              header: '',
              width: '90px',
              align: 'right',
              render: (fila) =>
                esCoordinador ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setUsuarioEditando(fila.usuario);
                      setModalAbierto(true);
                    }}
                  >
                    Editar
                  </Button>
                ) : null,
            },
          ]}
        />

        {esCoordinador && (
          <UsuarioFormModal
            open={modalAbierto}
            usuarioEditando={usuarioEditando}
            roles={roles}
            profesiones={profesiones}
            especialidades={especialidades}
            onClose={() => {
              setModalAbierto(false);
              setUsuarioEditando(null);
            }}
            onCrear={alGuardarCreacion}
            onActualizar={alGuardarEdicion}
          />
        )}
      </div>
    );
  }
