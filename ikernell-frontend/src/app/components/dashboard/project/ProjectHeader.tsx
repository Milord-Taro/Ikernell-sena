import type { Proyecto } from "../../../../types/Proyecto";

import {
    User,
    CalendarDays,
} from "lucide-react";

interface ProjectHeaderProps {
    proyecto: Proyecto;
    progreso: number;
}

export default function ProjectHeader({
    proyecto,
    progreso,
}: ProjectHeaderProps) {
    return (
        <div
            style={{
                background: "white",
                borderRadius: "16px",
                padding: "24px",
                marginBottom: "24px",
                boxShadow:
                    "0 2px 8px rgba(0,0,0,0.05)",
            }}
        >
            <h1
                style={{
                    fontSize: "32px",
                    marginBottom: "12px",
                    color: "#312e81",
                }}
            >
                {proyecto.nombreProyecto}
            </h1>

            <div
                style={{
                    marginBottom: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        marginBottom: "6px",
                    }}
                >
                    <span
                        style={{
                            fontSize: "14px",
                            color: "#64748b",
                        }}
                    >
                        Avance del proyecto
                    </span>

                    <span
                        style={{
                            fontWeight: "bold",
                            color: "#4f46e5",
                        }}
                    >
                        {progreso}%
                    </span>
                </div>

                <div
                    style={{
                        width: "100%",
                        height: "10px",
                        background: "#e2e8f0",
                        borderRadius: "999px",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            width: `${progreso}%`,
                            height: "100%",
                            background: "#4f46e5",
                        }}
                    />
                </div>
            </div>

            <p
                style={{
                    color: "#64748b",
                    marginBottom: "20px",
                }}
            >
                {proyecto.descripcionProyecto}
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                    marginTop: "25px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                    }}
                >
                    <div
                        style={{
                            width: "52px",
                            height: "52px",
                            borderRadius: "12px",
                            background: "#eef2ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <User size={22} color="#4f46e5" />
                    </div>

                    <div>
                        <strong>Líder</strong>

                        <div
                            style={{
                                color: "#475569",
                                marginTop: "4px",
                            }}
                        >
                            {proyecto.lider.nombre}
                            {" "}
                            {proyecto.lider.apellido}
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                    }}
                >
                    <div
                        style={{
                            width: "52px",
                            height: "52px",
                            borderRadius: "12px",
                            background: "#eef2ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CalendarDays
                            size={22}
                            color="#4f46e5"
                        />
                    </div>

                    <div>
                        <strong>Inicio</strong>

                        <div
                            style={{
                                color: "#475569",
                                marginTop: "4px",
                            }}
                        >
                            {proyecto.fechaInicioProyecto}
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                    }}
                >
                    <div
                        style={{
                            width: "52px",
                            height: "52px",
                            borderRadius: "12px",
                            background: "#eef2ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CalendarDays
                            size={22}
                            color="#4f46e5"
                        />
                    </div>

                    <div>
                        <strong>Fin</strong>

                        <div
                            style={{
                                color: "#475569",
                                marginTop: "4px",
                            }}
                        >
                            {proyecto.fechaFinProyecto}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}