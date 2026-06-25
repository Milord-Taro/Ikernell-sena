import { Navigate } from "react-router-dom";

import { obtenerUsuarioLogueado } from "../../utils/auth";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const usuario = obtenerUsuarioLogueado();

    if (!usuario) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}