import { useState } from 'react';
import { Tabs } from '../components/layout/Navigation';
import { CatalogoTable } from '../features/catalogos/CatalogoTable';
import { configRoles, configProfesiones, configEspecialidades } from '../features/catalogos/config';

const tabs = [
  { id: 'roles', label: 'Roles' },
  { id: 'profesiones', label: 'Profesiones' },
  { id: 'especialidades', label: 'Especialidades' },
];

export default function CatalogosPage() {
  const [tabActiva, setTabActiva] = useState('roles');

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="type-h1 text-[var(--text-primary)]">Catálogos</h1>
        <p className="type-body text-[var(--text-secondary)] mt-1">
          Roles, profesiones y especialidades disponibles para el registro de usuarios.
        </p>
      </div>

      <Tabs tabs={tabs} active={tabActiva} onChange={setTabActiva} variant="pill" />

      {tabActiva === 'roles' && <CatalogoTable config={configRoles} />}
      {tabActiva === 'profesiones' && <CatalogoTable config={configProfesiones} />}
      {tabActiva === 'especialidades' && <CatalogoTable config={configEspecialidades} />}
    </div>
  );
}
