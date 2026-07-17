import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Sidebar } from './Sidebar'
import { CODIGO_ROL } from '../../types/usuario'

/**
 * El Sidebar filtra los ítems de navegación por rol (rolUsuario) según
 * item.rolesPermitidos. Este test fija en el frontend la misma matriz de
 * roles que el backend refuerza con @PreAuthorize: un Desarrollador no debe
 * ver Usuarios/Catálogos/Auditoría; un Coordinador sí.
 */
describe('Sidebar — visibilidad por rol', () => {
  it('a un Desarrollador le oculta los ítems solo-Coordinador/Líder', () => {
    render(<Sidebar rolUsuario={CODIGO_ROL.DESARROLLADOR} />)

    // Ítems abiertos a cualquier autenticado.
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Proyectos')).toBeInTheDocument()

    // Ítems restringidos: no deben renderizarse.
    expect(screen.queryByText('Usuarios')).not.toBeInTheDocument()
    expect(screen.queryByText('Catálogos')).not.toBeInTheDocument()
    expect(screen.queryByText('Auditoría')).not.toBeInTheDocument()
    expect(screen.queryByText('Mensajes')).not.toBeInTheDocument()
  })

  it('a un Coordinador le muestra los ítems de administración', () => {
    render(<Sidebar rolUsuario={CODIGO_ROL.COORDINADOR} />)

    expect(screen.getByText('Usuarios')).toBeInTheDocument()
    expect(screen.getByText('Catálogos')).toBeInTheDocument()
    expect(screen.getByText('Auditoría')).toBeInTheDocument()
    expect(screen.getByText('Mensajes')).toBeInTheDocument()
  })

  it('a un Líder de Proyecto le muestra Errores/Interrupciones pero no Catálogos/Auditoría (solo-Coordinador)', () => {
    render(<Sidebar rolUsuario={CODIGO_ROL.LIDER_PROYECTO} />)

    expect(screen.getByText('Errores')).toBeInTheDocument()
    expect(screen.getByText('Interrupciones')).toBeInTheDocument()
    expect(screen.getByText('Usuarios')).toBeInTheDocument()
    expect(screen.queryByText('Catálogos')).not.toBeInTheDocument()
    expect(screen.queryByText('Auditoría')).not.toBeInTheDocument()
  })
})
