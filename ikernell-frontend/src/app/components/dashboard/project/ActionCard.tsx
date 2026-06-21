import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ActionCardProps {
    titulo: string;
    descripcion: string;
    to: string;
    icono: LucideIcon;
}

export default function ActionCard({
    titulo,
    descripcion,
    to,
    icono: Icon,
}: ActionCardProps) {
    return (
        <Link
            to={to}
            style={{
                textDecoration: "none",
                color: "inherit",
            }}
        >
            <div className="dashboard-clickable-card">
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                        }}
                    >
                        <div
                            style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "12px",
                                background: "#4f46e5",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Icon
                                size={22}
                                color="white"
                            />
                        </div>

                        <div>
                            <div
                                style={{
                                    fontWeight: 600,
                                    color: "#4338ca",
                                    fontSize: "18px",
                                }}
                            >
                                {titulo}
                            </div>

                            <div
                                style={{
                                    color: "#64748b",
                                    marginTop: "4px",
                                }}
                            >
                                {descripcion}
                            </div>
                        </div>
                    </div>

                    <ChevronRight
                        size={24}
                        color="#4f46e5"
                    />
                </div>
            </div>
        </Link>
    );
}