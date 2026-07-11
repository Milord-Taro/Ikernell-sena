import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

/**
 * Niveles discretos en vez de un slider continuo a propósito -- más
 * predecible para navegación por teclado/lector de pantalla que
 * cualquier valor intermedio posible. html { font-size: 14px } es la
 * base real del proyecto (ver 03-diseno-y-design-system.md); como todas
 * las clases type-* están en rem, escalar la raíz escala TODA la
 * tipografía de la app sin tocar un solo componente.
 */
const NIVELES = [14, 16, 18, 20, 22] as const
type Nivel = 0 | 1 | 2 | 3 | 4

interface AccesibilidadContextValue {
  nivel: Nivel
  aumentar: () => void
  disminuir: () => void
  porcentaje: number
  altoContraste: boolean
  toggleAltoContraste: () => void
  reducirMovimiento: boolean
  toggleReducirMovimiento: () => void
}

const AccesibilidadContext = createContext<AccesibilidadContextValue>({
  nivel: 0,
  aumentar: () => {},
  disminuir: () => {},
  porcentaje: 100,
  altoContraste: false,
  toggleAltoContraste: () => {},
  reducirMovimiento: false,
  toggleReducirMovimiento: () => {},
})

function leerBooleano(clave: string): boolean {
  return localStorage.getItem(clave) === '1'
}

export function AccesibilidadProvider({ children }: { children: ReactNode }) {
  const [nivel, setNivel] = useState<Nivel>(() => {
    const guardado = localStorage.getItem('ikernell-escala-fuente')
    const parsed = guardado ? Number(guardado) : 0
    return (parsed >= 0 && parsed <= 4 ? parsed : 0) as Nivel
  })

  const [altoContraste, setAltoContraste] = useState(() => leerBooleano('ikernell-alto-contraste'))
  const [reducirMovimiento, setReducirMovimiento] = useState(() => leerBooleano('ikernell-reducir-movimiento'))

  useEffect(() => {
    document.documentElement.style.fontSize = `${NIVELES[nivel]}px`
    localStorage.setItem('ikernell-escala-fuente', String(nivel))
  }, [nivel])

  useEffect(() => {
    document.documentElement.classList.toggle('alto-contraste', altoContraste)
    localStorage.setItem('ikernell-alto-contraste', altoContraste ? '1' : '0')
  }, [altoContraste])

  useEffect(() => {
    document.documentElement.classList.toggle('reducir-movimiento', reducirMovimiento)
    localStorage.setItem('ikernell-reducir-movimiento', reducirMovimiento ? '1' : '0')
  }, [reducirMovimiento])

  const aumentar = () => setNivel((n) => (n < 4 ? ((n + 1) as Nivel) : n))
  const disminuir = () => setNivel((n) => (n > 0 ? ((n - 1) as Nivel) : n))

  return (
    <AccesibilidadContext.Provider
      value={{
        nivel,
        aumentar,
        disminuir,
        porcentaje: Math.round((NIVELES[nivel] / 14) * 100),
        altoContraste,
        toggleAltoContraste: () => setAltoContraste((v) => !v),
        reducirMovimiento,
        toggleReducirMovimiento: () => setReducirMovimiento((v) => !v),
      }}
    >
      {children}
    </AccesibilidadContext.Provider>
  )
}

export const useAccesibilidad = () => useContext(AccesibilidadContext)
