import { useState } from 'react';
import { Tabs } from '../components/layout/Navigation';
import { CatalogoTable } from '../features/catalogos/CatalogoTable';
import {
  configRoles, configProfesiones, configEspecialidades,
  configTiposError, configTiposInterrupcion,
} from '../features/catalogos/config';

const tabs = [
  { id: 'roles', label: 'Roles' },
  { id: 'profesiones', label: 'Profesiones' },
  { id: 'especialidades', label: 'Especialidades' },
  { id: 'tipos-error', label: 'Tipos de error' },
  { id: 'tipos-interrupcion', label: 'Tipos de interrupción' },
];

export default function CatalogosPage() {
  const [tabActiva, setTabActiva] = useState('roles');

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="type-h1 text-[var(--text-primary)]">Catálogos</h1>
        <p className="type-body text-[var(--text-secondary)] mt-1">
          Roles, profesiones, especialidades y tipos de error/interrupción disponibles en el sistema.
        </p>
      </div>

      <Tabs tabs={tabs} active={tabActiva} onChange={setTabActiva} variant="pill" />

      {tabActiva === 'roles' && <CatalogoTable config={configRoles} />}
      {tabActiva === 'profesiones' && <CatalogoTable config={configProfesiones} />}
      {tabActiva === 'especialidades' && <CatalogoTable config={configEspecialidades} />}
      {tabActiva === 'tipos-error' && <CatalogoTable config={configTiposError} />}
      {tabActiva === 'tipos-interrupcion' && <CatalogoTable config={configTiposInterrupcion} />}
    </div>
  );
}
