import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Select } from '../../components/ui/FormControls';
import { ProyectoFormModal } from './ProyectoFormModal';
import { MenuDescarga } from './ReportesProyecto';
import { useAuth } from '../../context/AuthContext';
import { listarProyectos, crearProyecto } from '../../services/proyectos';
import { descargarReporteGeneral } from '../../services/reportes';
import type { FormatoReporte } from '../../services/reportes';
import { CODIGO_ROL } from '../../types/usuario';
import { ESTADOS_PROYECTO } from '../../types/proyecto';
import type { ProyectoResponse, EstadoProyecto } from '../../types/proyecto';

interface FilaProyecto extends Record<string, unknown> {
  proyecto: ProyectoResponse;
}

const variantePorEstado: Record<EstadoProyecto, 'info' | 'success' | 'default' | 'warning' | 'error'> = {
  'Planeación': 'info',
  'En ejecución': 'success',
  'Finalizado': 'default',
  'Suspendido': 'warning',
  'Cancelado': 'error',
};

export function ProyectosTable() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const esCoordinador = usuario?.rol.codigoRol === CODIGO_ROL.COORDINADOR;
  const puedeCrear = esCoordinador || usuario?.rol.codigoRol === CODIGO_ROL.LIDER_PROYECTO;

  const [proyectos, setProyectos] = useState<ProyectoResponse[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);

  const cargar = async () => {
    setCargando(true);
    try {
      setProyectos(await listarProyectos());
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const filas: FilaProyecto[] = proyectos
    .filter((p) => !filtroEstado || p.estado === filtroEstado)
    .filter((p) => `${p.codigoProyecto} ${p.nombreProyecto}`.toLowerCase().includes(busqueda.toLowerCase()))
    .map((proyecto) => ({ proyecto }));

  const alCrear = async (request: Parameters<typeof crearProyecto>[0]) => {
    const creado = await crearProyecto(request);
    setModalAbierto(false);
    await cargar();
    navigate(`/dashboard/proyectos/${creado.idProyecto}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" />
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar proyecto..."
              className="w-full h-8 pl-8 pr-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] type-body-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
            />
          </div>
          <div className="w-48">
            <Select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
              <option value="">Todos los estados</option>
              {ESTADOS_PROYECTO.map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {esCoordinador && (
            <MenuDescarga
              titulo="Reporte general"
              onDescargar={(formato: FormatoReporte) => descargarReporteGeneral(formato)}
            />
          )}
          {puedeCrear && (
            <Button size="md" onClick={() => setModalAbierto(true)}>
              <Plus size={15} />
              Nuevo proyecto
            </Button>
          )}
        </div>
      </div>

      <Table<FilaProyecto>
        keyField="proyecto"
        loading={cargando}
        data={filas}
        onRowClick={(fila) => navigate(`/dashboard/proyectos/${fila.proyecto.idProyecto}`)}
        emptyMessage="No hay proyectos registrados"
        emptyDescription="Crea el primer proyecto para empezar a organizar etapas y actividades."
        columns={[
          { key: 'codigo', header: 'Código', mono: true, width: '140px', render: (f) => f.proyecto.codigoProyecto },
          { key: 'nombre', header: 'Nombre', render: (f) => f.proyecto.nombreProyecto },
          {
            key: 'lider',
            header: 'Líder',
            width: '180px',
            render: (f) =>
              f.proyecto.liderActual ? (
                <span className="text-[var(--text-secondary)]">
                  {f.proyecto.liderActual.nombres} {f.proyecto.liderActual.apellidos}
                </span>
              ) : (
                <span className="type-body-sm text-[var(--text-tertiary)] italic">Sin asignar</span>
              ),
          },
          {
            key: 'estado',
            header: 'Estado',
            width: '150px',
            render: (f) => <Badge variant={variantePorEstado[f.proyecto.estado]}>{f.proyecto.estado}</Badge>,
          },
          { key: 'fechaInicio', header: 'Inicio', width: '120px', mono: true, render: (f) => f.proyecto.fechaInicio },
          { key: 'fechaFin', header: 'Fin', width: '120px', mono: true, render: (f) => f.proyecto.fechaFin },
        ]}
      />

      {puedeCrear && (
        <ProyectoFormModal
          open={modalAbierto}
          proyectoEditando={null}
          onClose={() => setModalAbierto(false)}
          onGuardar={alCrear}
        />
      )}
    </div>
  );
}
