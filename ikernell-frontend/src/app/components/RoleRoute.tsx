import { Navigate } from "react-router-dom";

import {
    obtenerUsuarioLogueado,
} from "../../utils/auth";

interface Props {
    children: React.ReactNode;
    roles: string[];
}

export default function RoleRoute({
    children,
    roles,
}: Props) {

    const usuario = obtenerUsuarioLogueado();

    if (!usuario) {
        return <Navigate to="/" replace />;
    }

    if (!roles.includes(usuario.rol.nombreRol)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}