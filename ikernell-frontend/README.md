# IKernell Frontend

Interfaz web de IKernell Soluciones Software, construida con React + TypeScript + Vite.

Para una visión completa del proyecto (backend, base de datos, usuarios de prueba, documentación) revisa el [README de la raíz del repositorio](../README.md). Este archivo cubre solo lo específico de este paquete.

---

## Requisitos

- Node.js v22
- npm

---

## Configuración

1. Copia el archivo de variables de entorno de ejemplo:

   ```bash
   cp .env.example .env
   ```

2. Ajusta `VITE_API_URL` en `.env` si tu backend no corre en `http://localhost:8080`.

El archivo `.env` no se sube a Git (está en `.gitignore`); cada máquina mantiene su propia copia.

---

## Ejecutar en desarrollo

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`. Requiere que el backend (`ikernell-backend`) esté corriendo y accesible en la URL configurada en `VITE_API_URL`.

---

## Otros scripts disponibles

```bash
npm run build     # build de producción (tsc + vite build) en dist/
npm run preview   # sirve localmente el build de producción
npm run lint      # linting con Oxlint
```

---

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

---

## Estructura relevante

```
src/
├── pages/        # una página por ruta principal del dashboard
├── features/     # lógica y componentes específicos de cada módulo (proyectos, actividades, etc.)
├── components/    # componentes reutilizables (layout, ui, landing)
├── context/       # contextos de React (accesibilidad, autenticación, etc.)
├── services/      # llamadas a la API del backend
└── layouts/       # layouts compartidos (dashboard, landing)
```
