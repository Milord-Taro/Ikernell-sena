export function obtenerEstiloEstadoError(estado: string) {
  switch (estado) {
    case "Corregido":
      return {
        background: "#dcfce7",
        color: "#166534",
      };
    case "En Revision":
      return {
        background: "#fef3c7",
        color: "#92400e",
      };
    case "No Reproducible":
      return {
        background: "#dbeafe",
        color: "#1d4ed8",
      };
    case "Descartado":
      return {
        background: "#e5e7eb",
        color: "#374151",
      };
    case "Abierto":
    default:
      return {
        background: "#fee2e2",
        color: "#991b1b",
      };
  }
}
