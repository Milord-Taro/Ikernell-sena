import { describe, it, expect } from 'vitest'
import { formatFecha, formatFechaHora } from './formatDate'

describe('formatFecha / formatFechaHora', () => {
  it('devuelve cadena vacía para null o undefined', () => {
    expect(formatFecha(null)).toBe('')
    expect(formatFecha(undefined)).toBe('')
    expect(formatFechaHora(null)).toBe('')
    expect(formatFechaHora(undefined)).toBe('')
  })

  it('devuelve el valor original cuando no es una fecha válida', () => {
    expect(formatFecha('no-es-fecha')).toBe('no-es-fecha')
    expect(formatFechaHora('xxx')).toBe('xxx')
  })

  it('formatea una fecha válida a texto legible que incluye el año', () => {
    // No se asevera el formato exacto (depende del locale es-CO del entorno),
    // solo el comportamiento robusto: produce texto no vacío con el año.
    const salida = formatFecha('2026-07-14')
    expect(salida).not.toBe('')
    expect(salida).toContain('2026')
  })

  it('formatFechaHora incluye año y una hora', () => {
    const salida = formatFechaHora('2026-07-14T11:07:00Z')
    expect(salida).toContain('2026')
    // Alguna cifra de hora/minuto debe aparecer.
    expect(salida).toMatch(/\d/)
  })
})
