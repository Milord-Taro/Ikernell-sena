import { defineConfig } from 'vitest/config'

// Config separada de vite.config.ts a propósito: el build de producción
// (vite build) no necesita saber nada de los tests, y los tests no necesitan
// el plugin de Tailwind. Vitest transpila con esbuild, así que los .test.tsx
// se ejecutan sin pasar por tsc -- por eso además están excluidos del
// tsconfig.app.json (el `npm run typecheck`/`build` los ignora). Se usa el
// runtime JSX automático de esbuild (jsx: 'automatic'), igual que la app
// (tsconfig "jsx": "react-jsx"), así los componentes no necesitan importar
// React explícitamente.
export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
