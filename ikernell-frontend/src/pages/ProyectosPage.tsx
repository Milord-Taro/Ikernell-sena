import { ProyectosTable } from '../features/proyectos/ProyectosTable';

export default function ProyectosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="type-h1 text-[var(--text-primary)]">Proyectos</h1>
        <p className="type-body text-[var(--text-secondary)] mt-1">
          Proyectos de desarrollo de software de IKernell Soluciones.
        </p>
      </div>

      <ProyectosTable />
    </div>
  );
}
