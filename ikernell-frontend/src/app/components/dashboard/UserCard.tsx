import { User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
    id: number;
    codigo: string;
    nombre: string;
    correo: string;
    rol: string;
    profesion: string;
    activo: boolean;

    onInhabilitar: () => void;
}

export default function UserCard({
    id,
    codigo,
    nombre,
    correo,
    rol,
    profesion,
    activo,
    onInhabilitar,
}: Props) {
    return (
        <div className="dashboard-card">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                }}
            >
                <User
                    size={28}
                    color="#4338ca"
                />

                <span
                    style={{
                        fontSize: "12px",
                        padding: "4px 8px",
                        borderRadius: "999px",
                        background: activo
                            ? "#dcfce7"
                            : "#fee2e2",
                        color: activo
                            ? "#166534"
                            : "#991b1b",
                    }}
                >
                    {activo
                        ? "Activo"
                        : "Inactivo"}
                </span>
            </div>

            <div
                style={{
                    fontSize: "12px",
                    color: "#64748b",
                }}
            >
                {codigo}
            </div>

            <h3>{nombre}</h3>

            <p
                style={{
                    color: "#64748b",
                    fontSize: "14px",
                }}
            >
                {correo}
            </p>

            <div
                style={{
                    marginTop: "10px",
                    color: "#64748b",
                }}
            >
                {rol}
            </div>

            <div
                style={{
                    marginTop: "4px",
                    color: "#94a3b8",
                    fontSize: "14px",
                }}
            >
                {profesion}
            </div>

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "16px",
                }}
            >
                <Link
                    to={`/dashboard/usuarios/${id}`}
                    style={{
                        flex: 1,
                        textDecoration: "none",
                    }}
                >
                    <button
                        className="project-action-button"
                        style={{
                            width: "100%",
                            border: "none",
                            borderRadius: "10px",
                            padding: "10px",
                            background: "#eef2ff",
                            color: "#4338ca",
                            cursor: "pointer",
                            fontWeight: 600,
                        }}
                    >
                        Ver Perfil
                    </button>
                </Link>

                <button
                    className="project-action-button"
                    onClick={onInhabilitar}
                    style={{
                        flex: 1,
                        border: "none",
                        borderRadius: "10px",
                        padding: "10px",
                        background: "#fee2e2",
                        color: "#dc2626",
                        cursor: "pointer",
                        fontWeight: 600,
                    }}
                >
                    Inhabilitar
                </button>
            </div>

        </div>
    );
}