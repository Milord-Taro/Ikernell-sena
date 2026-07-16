import { describe, it, expect } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useCarga } from './useCarga'
import { ApiRequestError } from '../types/api'

describe('useCarga', () => {
  it('empieza en estado cargando y sin error', () => {
    const { result } = renderHook(() => useCarga())
    expect(result.current.cargando).toBe(true)
    expect(result.current.error).toBeNull()
  })

  it('al terminar una acción exitosa deja de cargar y no marca error', async () => {
    const { result } = renderHook(() => useCarga())

    await act(async () => {
      await result.current.ejecutar(async () => {
        // acción que resuelve sin lanzar
      })
    })

    expect(result.current.cargando).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('usa el mensaje del ApiRequestError cuando la acción falla', async () => {
    const { result } = renderHook(() => useCarga())

    await act(async () => {
      await result.current.ejecutar(async () => {
        throw new ApiRequestError({
          timestamp: '2026-07-16T00:00:00Z',
          status: 400,
          error: 'Bad Request',
          message: 'El servidor rechazó la petición.',
          path: '/api/x',
        })
      })
    })

    await waitFor(() => expect(result.current.cargando).toBe(false))
    expect(result.current.error).toBe('El servidor rechazó la petición.')
  })

  it('cae a un mensaje genérico cuando el error no es un ApiRequestError', async () => {
    const { result } = renderHook(() => useCarga())

    await act(async () => {
      await result.current.ejecutar(async () => {
        throw new Error('boom interno')
      })
    })

    expect(result.current.error).toBe('No se pudo cargar la información.')
  })
})
