import { type ReactNode, useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import { Pagination } from './Pagination'

interface Column<T> {
  key: string
  header: string
  sortable?: boolean
  width?: string
  render?: (row: T) => ReactNode
  mono?: boolean
  align?: 'left' | 'right' | 'center'
}

interface TableProps<T extends Record<string, unknown>> {
  columns: Column<T>[]
  data: T[]
  keyField?: string
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
  const totalPaginas = pageSize > 0 ? Math.max(1, Math.ceil(data.length / pageSize)) : 1
  const paginaActual = Math.min(pagina, totalPaginas)
  const datosVisibles = pageSize > 0
    ? data.slice((paginaActual - 1) * pageSize, paginaActual * pageSize)
    : data

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
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`px-4 py-2.5 type-label text-[var(--text-tertiary)] ${alignClass[col.align ?? 'left']}`}
                  style={col.width ? { width: col.width } : {}}
                >
                  <span className={`flex items-center gap-1 ${col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : ''}`}>
                    {col.header}
                    {col.sortable && <ArrowUpDown size={11} className="shrink-0 opacity-50" />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datosVisibles.map((row, idx) => (
              <tr
                key={String(row[keyField] ?? idx)}
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
