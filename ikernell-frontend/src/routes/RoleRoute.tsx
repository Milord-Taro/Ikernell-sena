import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RoleRouteProps {
  children: ReactNode;
  rolesPermitidos: string[];
}

/**
 * Va DENTRO de ProtectedRoute (asume que ya hay sesión). Si el rol del
 * usuario no está en la lista permitida, redirige al dashboard general
 * en vez de cerrar la sesión -- es un problema de permiso, no de sesión.
 */
export function RoleRoute({ children, rolesPermitidos }: RoleRouteProps) {
  const { usuario } = useAuth();

  if (!usuario || !rolesPermitidos.includes(usuario.rol.codigoRol)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
