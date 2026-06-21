interface DashboardSectionProps {
    title: string;
    subtitle?: string;
}

export default function DashboardSection({
    title,
    subtitle,
}: DashboardSectionProps) {
    return (
        <div
            style={{
                marginBottom: "24px",
            }}
        >
            <h2
                style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#1e293b",
                    marginBottom: "4px",
                }}
            >
                {title}
            </h2>

            {subtitle && (
                <p
                    style={{
                        color: "#64748b",
                        margin: 0,
                    }}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}