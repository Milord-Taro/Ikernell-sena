import { Link } from "react-router-dom";
import { FolderKanban, User, ArrowRight } from "lucide-react";

interface Props {
    id: number;
    codigo: string;
    nombre: string;
    lider: string;
    activo: boolean;
    descripcion: string;

    onEdit: () => void;
    onDelete: () => void;
}


export default function ProjectCard({
    id,
    codigo,
    nombre,
    lider,
    activo,
    descripcion,
    onEdit,
    onDelete,
}: Props) {
    return (
        <div className="dashboard-clickable-card">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                }}
            >
                <FolderKanban
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
                    {activo ? "Activo" : "Inactivo"}
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

            <h3
                style={{
                    marginTop: "8px",
                    color: "#0f172a",
                }}
            >
                {nombre}
            </h3>

            <p
                style={{
                    color: "#64748b",
                    fontSize: "14px",
                    marginTop: "10px",
                    minHeight: "42px",
                }}
            >
                {descripcion}
            </p>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "10px",
                    color: "#64748b",
                }}
            >
                Lider:
                <User size={16} />
                {lider}
            </div>
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "10px",
                }}
            >
                <button
                    onClick={onEdit}
                    style={{
                        flex: 1,
                        border: "none",
                        borderRadius: "10px",
                        padding: "10px",

                        background: "#eef2ff",
                        color: "#4338ca",

                        cursor: "pointer",
                        fontWeight: 600,
                    }}
                >
                    Editar
                </button>

                <button
                    onClick={onDelete}
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
                    Eliminar
                </button>
            </div>
            <Link
                to={`/dashboard/proyectos/${id}`}
                style={{
                    marginTop: "12px",

                    display: "flex",
                    justifyContent: "flex-end",

                    alignItems: "center",
                    gap: "6px",

                    color: "#4338ca",

                    textDecoration: "none",

                    fontWeight: "600",
                }}
            >
                Ver proyecto
                <ArrowRight size={16} />
            </Link>
        </div>
    );
}