import { UsuariosTable } from '../features/usuarios/UsuariosTable';

export default function UsuariosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="type-h1 text-[var(--text-primary)]">Usuarios</h1>
        <p className="type-body text-[var(--text-secondary)] mt-1">
          Personal registrado en IKernell Soluciones Software.
        </p>
      </div>

      <UsuariosTable />
    </div>
  );
}
