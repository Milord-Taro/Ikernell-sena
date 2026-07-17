import { type ReactNode, useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { Pagination } from './Pagination'

interface Column<T> {
  key: string
  header: string
  sortable?: boolean
  /**
   * Valor a comparar al ordenar por esta columna. Necesario cuando `key`
   * no es directamente `row[key]` -- ej. datos anidados (`row.proyecto.nombre`)
   * o cuando `render` devuelve JSX en vez del valor crudo. Si se omite,
   * se usa `row[key]`.
   */
  sortValue?: (row: T) => string | number | boolean | null | undefined
  width?: string
  render?: (row: T) => ReactNode
  mono?: boolean
  align?: 'left' | 'right' | 'center'
}

type Direccion = 'asc' | 'desc'

/** Compara valores heterogéneos: numérico si ambos son número, texto con
 * reglas de español (acentos, mayúsculas) en cualquier otro caso. Un valor
 * nulo/indefinido siempre queda al final, sin importar la dirección. */
function compararValores(a: unknown, b: unknown): number {
  const aVacio = a === null || a === undefined || a === ''
  const bVacio = b === null || b === undefined || b === ''
  if (aVacio && bVacio) return 0
  if (aVacio) return 1
  if (bVacio) return -1

  if (typeof a === 'number' && typeof b === 'number') return a - b
  if (typeof a === 'boolean' && typeof b === 'boolean') return Number(a) - Number(b)

  return String(a).localeCompare(String(b), 'es', { numeric: true, sensitivity: 'base' })
}

interface TableProps<T extends Record<string, unknown>> {
  columns: Column<T>[]
  data: T[]
  /** Nombre del campo con la key única de cada fila. Debe ser un valor
   * primitivo (string/number) -- si `row[keyField]` es un objeto anidado,
   * usar `rowKey` en su lugar. */
  keyField?: string
  /** Alternativa a `keyField` para filas envueltas en un objeto (ej.
   * `{ proyecto: ProyectoResponse }`), donde `row[keyField]` sería el
   * objeto anidado completo en vez de un id primitivo. */
  rowKey?: (row: T) => string | number
  loading?: boolean
  emptyMessage?: string
  emptyDescription?: string
  onRowClick?: (row: T) => void
  className?: string
  /** Filas por página. 0 desactiva la paginación (se listan todas). */
  pageSize?: number
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  keyField = 'id',
  rowKey,
  loading = false,
  emptyMessage = 'No hay registros',
  emptyDescription = 'No se encontraron registros para los filtros actuales.',
  onRowClick,
  className = '',
  pageSize = 15,
}: TableProps<T>) {
  const alignClass: Record<string, string> = {
    left: 'text-left',
    right: 'text-right',
    center: 'text-center',
  }

  // Igual criterio que ErroresPage/InterrupcionesPage/MisActividadesPage:
  // la página se deriva con un clamp (Math.min) en vez de resetear con un
  // efecto -- `data` es un array nuevo en cada render del padre (ej. un
  // .map()), así que un efecto atado a su identidad resetearía a la
  // página 1 en cada re-render ajeno (como abrir un modal), no solo
  // cuando cambian los filtros.
  const [pagina, setPagina] = useState(1)
  const [orden, setOrden] = useState<{ key: string; direccion: Direccion } | null>(null)

  const alClicEncabezado = (col: Column<T>) => {
    if (!col.sortable) return
    setPagina(1)
    setOrden((actual) => {
      if (actual?.key !== col.key) return { key: col.key, direccion: 'asc' }
      if (actual.direccion === 'asc') return { key: col.key, direccion: 'desc' }
      return null
    })
  }

  const columnaOrdenada = orden ? columns.find((c) => c.key === orden.key) : undefined
  const datosOrdenados = orden && columnaOrdenada
    ? [...data].sort((a, b) => {
        const obtenerValor = columnaOrdenada.sortValue ?? ((row: T) => row[columnaOrdenada.key] as string | number | boolean | null | undefined)
        const factor = orden.direccion === 'asc' ? 1 : -1
        return factor * compararValores(obtenerValor(a), obtenerValor(b))
      })
    : data

  const totalPaginas = pageSize > 0 ? Math.max(1, Math.ceil(datosOrdenados.length / pageSize)) : 1
  const paginaActual = Math.min(pagina, totalPaginas)
  const datosVisibles = pageSize > 0
    ? datosOrdenados.slice((paginaActual - 1) * pageSize, paginaActual * pageSize)
    : datosOrdenados

  if (loading) {
    return (
      <div className={`overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] ${className}`}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
              {columns.map(col => (
                <th key={col.key} className="px-4 py-2.5 text-left">
                  <div className="h-3 w-20 rounded bg-[var(--border)] animate-pulse" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 4 }).map((_, i) => (
              <tr key={i} className="border-b border-[var(--divider)]">
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3">
                    <div className="h-3 rounded bg-[var(--muted)] animate-pulse" style={{ width: `${60 + Math.random() * 30}%` }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className={`overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] ${className}`}>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`px-4 py-2.5 type-label text-[var(--text-tertiary)] ${alignClass[col.align ?? 'left']}`}
                  style={col.width ? { width: col.width } : {}}
                >
                  <span className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && <ArrowUpDown size={11} className="shrink-0" />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <div className="flex flex-col items-center justify-center py-16 gap-2">
          <p className="type-body font-medium text-[var(--text-secondary)]">{emptyMessage}</p>
          <p className="type-body-sm text-[var(--text-tertiary)]">{emptyDescription}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--muted)]">
              {columns.map(col => {
                const activa = orden?.key === col.key
                const ariaSort = !col.sortable ? undefined : activa ? (orden!.direccion === 'asc' ? 'ascending' : 'descending') : 'none'
                const Icono = activa ? (orden!.direccion === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown

                return (
                  <th
                    key={col.key}
                    className={`px-4 py-2.5 type-label text-[var(--text-tertiary)] ${alignClass[col.align ?? 'left']}`}
                    style={col.width ? { width: col.width } : {}}
                    aria-sort={ariaSort}
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => alClicEncabezado(col)}
                        className={`flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors ${col.align === 'right' ? 'justify-end w-full' : col.align === 'center' ? 'justify-center w-full' : ''}`}
                      >
                        {col.header}
                        <Icono size={11} className={`shrink-0 ${activa ? '' : 'opacity-50'}`} />
                      </button>
                    ) : (
                      <span className={`flex items-center gap-1 ${col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : ''}`}>
                        {col.header}
                      </span>
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {datosVisibles.map((row, idx) => (
              <tr
                key={String(rowKey ? rowKey(row) : (row[keyField] ?? idx))}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-[var(--divider)] last:border-0 transition-colors duration-75 ${onRowClick ? 'cursor-pointer hover:bg-[var(--muted)]' : ''}`}
              >
                {columns.map(col => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 ${col.mono ? 'type-id text-[var(--text-secondary)]' : 'type-body text-[var(--text-primary)]'} ${alignClass[col.align ?? 'left']}`}
                  >
                    {col.render ? col.render(row) : String(row[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPaginas > 1 && (
        <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] bg-[var(--muted)] px-4 pb-2.5">
          <p className="type-caption text-[var(--text-tertiary)] shrink-0">
            {(paginaActual - 1) * pageSize + 1}–{Math.min(paginaActual * pageSize, data.length)} de {data.length}
          </p>
          <Pagination pagina={paginaActual} totalPaginas={totalPaginas} onCambiar={setPagina} />
        </div>
      )}
    </div>
  )
}
