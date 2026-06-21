import type { LucideIcon } from "lucide-react";

interface StatCardProps {
    titulo: string;
    valor: number;
    descripcion: string;
    icono: LucideIcon;
    color: string;
    fondo: string;
}

export default function StatCard({
    titulo,
    valor,
    descripcion,
    icono: Icon,
    color,
    fondo,
}: StatCardProps) {
    return (
        <div
            className="dashboard-stat-card"
        >
            <div
                style={{
                    display: "flex",
                    gap: "18px",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        width: "72px",
                        height: "72px",
                        borderRadius: "16px",
                        background: fondo,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Icon
                        size={34}
                        color={color}
                    />
                </div>

                <div>
                    <div
                        style={{
                            fontWeight: 600,
                            fontSize: "14px",
                        }}
                    >
                        {titulo}
                    </div>

                    <div
                        style={{
                            fontSize: "42px",
                            fontWeight: "bold",
                            lineHeight: 1,
                            marginTop: "8px",
                        }}
                    >
                        {valor}
                    </div>

                    <div
                        style={{
                            color: "#64748b",
                            marginTop: "8px",
                        }}
                    >
                        {descripcion}
                    </div>
                </div>
            </div>
        </div>
    );
}