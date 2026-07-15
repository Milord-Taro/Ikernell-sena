import { useEffect, useState } from 'react';
import { Plus, Search, Trash2 } from 'lucide-react';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Switch } from '../../components/ui/FormControls';
import { Alert, ConfirmDialog } from '../../components/ui/Feedback';
import { CatalogoFormModal } from './CatalogoFormModal';
import { ApiRequestError } from '../../types/api';
import type { CatalogoConfig, CatalogoItem } from './config';

interface CatalogoTableProps<TResponse, TRequest> {
  config: CatalogoConfig<TResponse, TRequest>;
}

export function CatalogoTable<TResponse, TRequest>({ config }: CatalogoTableProps<TResponse, TRequest>) {
  const [items, setItems] = useState<CatalogoItem[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemEditando, setItemEditando] = useState<CatalogoItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [itemAEliminar, setItemAEliminar] = useState<CatalogoItem | null>(null);

  const cargar = async () => {
    setCargando(true);
    try {
      const respuesta = await config.servicio.listar();
      setItems(respuesta.map(config.aItem));
    } finally {
      setCargando(false);
    }
  };

  // Se vuelve a cargar cada vez que cambia de catálogo (al cambiar de tab).
  useEffect(() => {
    setBusqueda('');
    setError(null);
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.tituloPlural]);

  const itemsFiltrados = items.filter((item) =>
    `${item.codigo} ${item.nombre}`.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const alGuardar = async (valores: { nombre: string; descripcion: string }) => {
    const request = config.aRequest(valores);
    if (itemEditando) {
      await config.servicio.actualizar(itemEditando.id, request);
    } else {
      await config.servicio.crear(request);
    }
    setModalAbierto(false);
    setItemEditando(null);
    await cargar();
  };

  const alCambiarEstado = async (item: CatalogoItem, activo: boolean) => {
    await config.servicio.cambiarEstado(item.id, activo);
    await cargar();
  };

  const alEliminar = (item: CatalogoItem) => {
    setError(null);
    setItemAEliminar(item);
  };

  const confirmarEliminar = async () => {
    if (!itemAEliminar) return;
    try {
      await config.servicio.eliminar(itemAEliminar.id);
      setItemAEliminar(null);
      await cargar();
    } catch (err) {
      // El backend rechaza con 409 si el registro está en uso (protegido
      // por ON DELETE RESTRICT) -- ese mensaje ya viene listo para mostrar.
      setError(err instanceof ApiRequestError ? err.message : `No se pudo eliminar "${itemAEliminar.nombre}".`);
      setItemAEliminar(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {error && <Alert variant="error" title="No se pudo eliminar">{error}</Alert>}

      <div className="flex items-center justify-between gap-3">
        <div className="relative w-64">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none"
          />
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder={`Buscar ${config.tituloPlural.toLowerCase()}...`}
            className="w-full h-8 pl-8 pr-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] type-body-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
          />
        </div>
        <Button
          size="md"
          onClick={() => {
            setItemEditando(null);
            setModalAbierto(true);
          }}
        >
          <Plus size={15} />
          Nuevo/a {config.tituloSingular.toLowerCase()}
        </Button>
      </div>

      <Table<CatalogoItem>
        keyField="id"
        loading={cargando}
        data={itemsFiltrados}
        emptyMessage={`No hay ${config.tituloPlural.toLowerCase()} registrados`}
        emptyDescription={`Crea el primer registro de ${config.tituloPlural.toLowerCase()} para empezar.`}
        columns={[
          { key: 'codigo', header: 'Código', mono: true, width: '160px' },
          { key: 'nombre', header: 'Nombre' },
          {
            key: 'descripcion',
            header: 'Descripción',
            render: (row) => (
              <span className="text-[var(--text-secondary)]">{row.descripcion || '—'}</span>
            ),
          },
          {
            key: 'activo',
            header: 'Estado',
            width: '110px',
            render: (row) => (
              <Switch checked={row.activo} onChange={(checked) => alCambiarEstado(row, checked)} />
            ),
          },
          {
            key: 'acciones',
            header: '',
            width: '130px',
            align: 'right',
            render: (row) => (
              <div className="flex items-center justify-end gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setItemEditando(row);
                    setModalAbierto(true);
                  }}
                >
                  Editar
                </Button>
                <Button variant="ghost" size="sm" onClick={() => alEliminar(row)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            ),
          },
        ]}
      />

      <CatalogoFormModal
        open={modalAbierto}
        titulo={config.tituloSingular}
        valoresIniciales={
          itemEditando
            ? { nombre: itemEditando.nombre, descripcion: itemEditando.descripcion ?? '' }
            : undefined
        }
        onClose={() => {
          setModalAbierto(false);
          setItemEditando(null);
        }}
        onGuardar={alGuardar}
      />

      <ConfirmDialog
        open={Boolean(itemAEliminar)}
        title={`¿Eliminar "${itemAEliminar?.nombre}"?`}
        description="Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        variant="destructive"
        onConfirm={confirmarEliminar}
        onCancel={() => setItemAEliminar(null)}
      />
    </div>
  );
}
