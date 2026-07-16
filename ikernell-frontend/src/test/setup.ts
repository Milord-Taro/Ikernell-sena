// Registra los matchers de jest-dom (toBeInTheDocument, etc.) en expect de
// Vitest. Se carga una vez por proceso vía setupFiles en vitest.config.ts.
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Con globals:false, Testing Library NO registra su limpieza automática, así
// que sin esto los renders se acumulan en document.body entre tests y un
// getByText encuentra "múltiples elementos". Se desmonta tras cada test.
afterEach(() => {
  cleanup()
})
