import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Ancho estándar de las secciones "anchas" del home público (Hero, Stats,
 * Lineamientos, Servicios, Footer). Cambiar el ancho de la landing se hace
 * UNA sola vez aquí, no repitiendo max-w-* en cada sección.
 *
 * FAQ y ContactForm NO usan este componente a propósito: son bloques de
 * lectura/formulario de una sola columna, y ensancharlos haría las líneas
 * de texto incómodas de leer (regla de legibilidad, no un descuido).
 */
export function PageContainer({ children, className = '' }: PageContainerProps) {
  return <div className={`max-w-[1440px] mx-auto px-6 lg:px-10 ${className}`}>{children}</div>;
}
