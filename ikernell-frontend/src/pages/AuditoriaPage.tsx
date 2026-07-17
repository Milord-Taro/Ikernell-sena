import { useEffect, useState } from "react";
import { Table } from "../components/ui/Table";
import { Badge } from "../components/ui/Badge";
import { Alert } from "../components/ui/Feedback";
import { Select } from "../components/ui/FormControls";
import { Modal } from "../components/ui/Modal";
import { Pagination } from "../components/ui/Pagination";
import type { JsonValue } from "../components/ui/JsonTree";
import { JsonDiffTree } from "../components/ui/JsonDiffTree";
import { formatFechaHora } from "../utils/formatDate";
import { useCarga } from "../hooks/useCarga";
import { listarTrazabilidad } from "../services/trazabilidad";
import { ENTIDADES_TRAZABILIDAD } from "../types/trazabilidad";
import type {
  TrazabilidadResponse,
  OperacionTrazabilidad,
} from "../types/trazabilidad";

const TAMANO_PAGINA = 20;

const variantePorOperacion: Record<
  OperacionTrazabilidad,
  "default" | "success" | "info" | "warning" | "error"
> = {
  Crear: "success",
  Actualizar: "info",
  Inhabilitar: "warning",
  "Cambiar Estado": "info",
  Asignar: "info",
  Desasignar: "warning",
  Autenticar: "default",
  Eliminar: "error",
};

/** El detalle casi siempre es un snapshot JSON del recurso afectado; si no parsea, se muestra tal cual. */
function parsearDetalle(detalle: string | null): JsonValue | undefined {
  if (!detalle) return null;
  try {
    return JSON.parse(detalle) as JsonValue;
  } catch {
    return undefined;
  }
}

interface FilaTabla extends Record<string, unknown> {
  idTrazabilidad: number;
  fecha: string;
  usuario: string;
  operacion: OperacionTrazabilidad;
  entidad: string;
  codigo: string;
  original: TrazabilidadResponse;
}

/**
 * Solo Coordinador (RoleRoute + backend @PreAuthorize). Muestra TODO lo
 * que hoy registra trazabilidad -- que no es "todas las operaciones del
 * sistema", solo las que ya llaman a TrazabilidadService.registrar()
 * (ver ENTIDADES_TRAZABILIDAD).
 */
export default function AuditoriaPage() {
  const [eventos, setEventos] = useState<TrazabilidadResponse[]>([]);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const { cargando, error, ejecutar } = useCarga();
  const [entidadFiltro, setEntidadFiltro] = useState("");
  // CORREGIDO (B4): paginación real del servidor -- antes se traía TODO
  // el historial de auditoría en cada carga (la única tabla que crece
  // sin límite en el sistema) y se paginaba solo en el cliente.
  const [pagina, setPagina] = useState(1);
  const [eventoAbierto, setEventoAbierto] =
    useState<TrazabilidadResponse | null>(null);

  const cargar = () =>
    ejecutar(async () => {
      // "pagina" acá es 1-based (mismo criterio que <Pagination>); el
      // backend espera 0-based, de ahí el "- 1".
      const resp = await listarTrazabilidad(entidadFiltro || undefined, pagina - 1, TAMANO_PAGINA);
      setEventos(resp.contenido);
      setTotalPaginas(resp.totalPaginas);
    });

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entidadFiltro, pagina]);

  // Cambiar de filtro vuelve a la primera página -- de lo contrario,
  // filtrar mientras se está en la página 5 podría pedir una página que
  // ya no existe para el nuevo filtro.
  const alCambiarFiltro = (valor: string) => {
    setEntidadFiltro(valor);
    setPagina(1);
  };

  const filas: FilaTabla[] = eventos.map((e) => ({
    idTrazabilidad: e.idTrazabilidad,
    fecha: e.fechaEvento,
    usuario: e.usuario
      ? `${e.usuario.nombres} ${e.usuario.apellidos}`
      : "Sistema",
    operacion: e.operacion,
    entidad: e.entidad,
    codigo: e.codigoRegistro,
    original: e,
  }));

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="type-h1 text-[var(--text-primary)]">Auditoría global</h1>
        <p className="type-body text-[var(--text-secondary)] mt-1">
          Todo lo que se ha creado, modificado o eliminado en el sistema.
        </p>
      </div>

      {error && (
        <Alert variant="error" title="No se pudo cargar la auditoría">
          {error}
        </Alert>
      )}

      <div className="w-56">
        <Select
          label="Entidad"
          value={entidadFiltro}
          onChange={(e) => alCambiarFiltro(e.target.value)}
        >
          <option value="">Todas</option>
          {ENTIDADES_TRAZABILIDAD.map((ent) => (
            <option key={ent} value={ent}>
              {ent}
            </option>
          ))}
        </Select>
      </div>

      <Table<FilaTabla>
        keyField="idTrazabilidad"
        loading={cargando}
        data={filas}
        pageSize={0}
        emptyMessage="Sin eventos registrados"
        emptyDescription="No hay eventos de auditoría para este filtro."
        onRowClick={(fila) => setEventoAbierto(fila.original)}
        columns={[
          {
            key: "fecha",
            header: "Fecha",
            width: "320px",
            sortable: true,
            render: (row) => formatFechaHora(row.fecha),
          },
          { key: "usuario", header: "Usuario", sortable: true },
          {
            key: "operacion",
            header: "Operación",
            width: "250px",
            sortable: true,
            render: (row) => (
              <Badge variant={variantePorOperacion[row.operacion]} size="sm">
                {row.operacion}
              </Badge>
            ),
          },
          { key: "entidad", header: "Entidad", width: "200px", sortable: true },
          { key: "codigo", header: "Código", mono: true, width: "220px", sortable: true },
        ]}
      />

      <Pagination pagina={pagina} totalPaginas={totalPaginas} onCambiar={setPagina} />

      {eventoAbierto && (
        <Modal
          open={Boolean(eventoAbierto)}
          onClose={() => setEventoAbierto(null)}
          title={`${eventoAbierto.entidad} · ${eventoAbierto.codigoRegistro}`}
          description={`Evento #${eventoAbierto.idTrazabilidad}`}
          size="md"
        >
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <span className="type-caption text-[var(--text-tertiary)]">
                  Usuario
                </span>
                <span className="type-body-sm text-[var(--text-secondary)]">
                  {eventoAbierto.usuario
                    ? `${eventoAbierto.usuario.nombres} ${eventoAbierto.usuario.apellidos} (${eventoAbierto.usuario.codigoUsuario})`
                    : "Sistema"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="type-caption text-[var(--text-tertiary)]">
                  Rol
                </span>
                <span className="type-body-sm text-[var(--text-secondary)]">
                  {eventoAbierto.usuario?.rol?.nombreRol ?? "—"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="type-caption text-[var(--text-tertiary)]">
                  Operación
                </span>
                <Badge
                  variant={variantePorOperacion[eventoAbierto.operacion]}
                  size="sm"
                  className="w-fit"
                >
                  {eventoAbierto.operacion}
                </Badge>
              </div>
              <div className="flex flex-col">
                <span className="type-caption text-[var(--text-tertiary)]">
                  Fecha
                </span>
                <span className="type-code text-[var(--text-secondary)]">
                  {formatFechaHora(eventoAbierto.fechaEvento)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="type-caption text-[var(--text-tertiary)]">
                  Dirección IP
                </span>
                <span className="type-code text-[var(--text-secondary)]">
                  {eventoAbierto.direccionIp ?? "—"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="type-caption text-[var(--text-tertiary)]">
                Detalle
              </span>
              <div className="bg-[var(--muted)] rounded-[var(--radius-md)] p-3 overflow-x-auto">
                {(() => {
                  const detalle = parsearDetalle(eventoAbierto.detalle);
                  if (detalle === null) {
                    return (
                      <span className="type-code text-[var(--text-secondary)]">
                        —
                      </span>
                    );
                  }
                  if (detalle === undefined) {
                    return (
                      <pre className="type-code text-[var(--text-secondary)] whitespace-pre-wrap break-words">
                        {eventoAbierto.detalle}
                      </pre>
                    );
                  }
                  const detalleAnterior = parsearDetalle(
                    eventoAbierto.detalleAnterior,
                  );
                  return (
                    <JsonDiffTree antes={detalleAnterior} despues={detalle} />
                  );
                })()}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
