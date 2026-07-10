  import { useEffect, useState } from 'react';
  import { Plus, Search } from 'lucide-react';
  import { Table } from '../../components/ui/Table';
  import { Button } from '../../components/ui/Button';
  import { Switch } from '../../components/ui/FormControls';
  import { Badge } from '../../components/ui/Badge';
  import { Avatar } from '../../components/ui/DataDisplay';
  import { UsuarioFormModal } from './UsuarioFormModal';
  import { useAuth } from '../../context/AuthContext';
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
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [modalAbierto, setModalAbierto] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState<UsuarioResponse | null>(null);

    const cargarTodo = async () => {
      setCargando(true);
      try {
        const [usuariosResp, rolesResp, profesionesResp, especialidadesResp] = await Promise.all([
          listarUsuarios(),
          rolesService.listar(),
          profesionesService.listar(),
          especialidadesService.listar(),
        ]);
        setUsuarios(usuariosResp);
        setRoles(rolesResp.filter((r) => r.activo));
        setProfesiones(profesionesResp.filter((p) => p.activo));
        setEspecialidades(especialidadesResp.filter((e) => e.activo));
      } finally {
        setCargando(false);
      }
    };

    useEffect(() => {
      cargarTodo();
    }, []);

    const filas: FilaUsuario[] = usuarios
      .filter((u) => {
        const texto = `${u.codigoUsuario} ${u.nombres} ${u.apellidos} ${u.correoElectronico}`.toLowerCase();
        return texto.includes(busqueda.toLowerCase());
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
      await cambiarEstadoUsuario(usuario.idUsuario, activo);
      await cargarTodo();
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div className="relative w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" />
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre, código o correo..."
              className="w-full h-8 pl-8 pr-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] type-body-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
            />
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
          loading={cargando}
          data={filas}
          emptyMessage="No hay usuarios registrados"
          emptyDescription="Crea el primer usuario para empezar a asignar proyectos y actividades."
          columns={[
            {
              key: 'nombre',
              header: 'Usuario',
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
            { key: 'codigo', header: 'Código', mono: true, width: '200px', render: (f) => f.usuario.codigoUsuario },
            {
              key: 'rol',
              header: 'Rol',
              width: '300px',
              render: (fila) => <Badge variant="info">{fila.usuario.rol.nombreRol}</Badge>,
            },
            {
              key: 'estado',
              header: 'Estado',
              width: '100px',
              render: (fila) => (
                <Switch
                  checked={fila.usuario.activo}
                  disabled={!esCoordinador}
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
