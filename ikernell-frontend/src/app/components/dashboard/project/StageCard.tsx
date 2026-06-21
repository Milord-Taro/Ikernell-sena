import { Link } from "react-router-dom";

import type { Etapa } from "../../../../types/Etapa";

interface StageCardProps {
    etapa: Etapa;
    progreso: number;
}

export default function StageCard({
    etapa,
    progreso,
}: StageCardProps) {
    return (
        <Link
            to={`/dashboard/etapas/${etapa.idEtapa}`}
            style={{
                textDecoration: "none",
                color: "inherit",
            }}
        >
            <div
                className="dashboard-clickable-card"
                style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "16px",
                    padding: "20px",
                    background: "white",
                    boxShadow:
                        "0 2px 8px rgba(0,0,0,0.05)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px",
                    }}
                >
                    <h3
                        style={{
                            color: "#4338ca",
                            margin: 0,
                        }}
                    >
                        {etapa.nombreEtapa}
                    </h3>

                    <span
                        style={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#4f46e5",
                        }}
                    >
                        {progreso}%
                    </span>
                </div>

                <p
                    style={{
                        color: "#64748b",
                        fontSize: "14px",
                    }}
                >
                    {etapa.descripcionEtapa}
                </p>

                <div
                    style={{
                        marginTop: "12px",
                        marginBottom: "12px",
                    }}
                >
                    <div
                        style={{
                            height: "8px",
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

                <div
                    style={{
                        marginTop: "15px",
                        fontSize: "13px",
                        color: "#94a3b8",
                    }}
                >
                    Fecha: {etapa.fechaEtapa}
                </div>
            </div>
        </Link>
    );
}