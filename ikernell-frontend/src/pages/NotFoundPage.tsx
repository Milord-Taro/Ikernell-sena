import { Button } from "../app/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "60px",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,.08)",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: "80px",
            fontWeight: "700",
            color: "#4338ca",
          }}
        >
          404
        </div>

        <h1
          style={{
            marginTop: "10px",
          }}
        >
          Página no encontrada
        </h1>

        <p
          style={{
            color: "#64748b",
            marginTop: "15px",
            lineHeight: 1.7,
          }}
        >
          La página que intentas visitar no existe o fue movida.
        </p>

        <Button
          style={{
            marginTop: "30px",
          }}
          onClick={() => navigate("/dashboard")}
        >
          Volver al Dashboard
        </Button>
      </div>
    </div>
  );
}
