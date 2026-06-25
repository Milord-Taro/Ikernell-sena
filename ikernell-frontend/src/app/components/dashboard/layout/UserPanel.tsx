import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { obtenerUsuarioLogueado, cerrarSesion } from "../../../../utils/auth";

import { User, Settings, LogOut } from "lucide-react";

export default function UserPanel({ collapsed }: { collapsed: boolean }) {
  const navigate = useNavigate();

  const usuario = obtenerUsuarioLogueado();

  const iniciales = usuario
    ? `${usuario.nombre?.[0] ?? ""}${usuario.apellido?.[0] ?? ""}`
    : "??";

  return (
    <div
      style={{
        borderTop: "1px solid #e2e8f0",
        paddingTop: "16px",
      }}
    >
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "999px",
          background: "linear-gradient(135deg, #4338ca, #0ea5e9)",

          color: "white",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          fontWeight: "bold",
        }}
      >
        {iniciales}
      </div>
      {!collapsed && (
        <div
          style={{
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              fontWeight: "600",
              color: "#0f172a",
            }}
          >
            {usuario ? `${usuario.nombre} ${usuario.apellido}` : "Usuario"}
          </div>

          <div
            style={{
              fontSize: "13px",
              color: "#64748b",
            }}
          >
            {usuario?.rol?.nombreRol ?? "Usuario"}
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <Link to="/dashboard/perfil" className="sidebar-user-button">
          <User size={18} />
          {!collapsed && <span>Perfil</span>}
        </Link>

        <button className="sidebar-user-button">
          <Settings size={18} />
          {!collapsed && <span>Configuración</span>}
        </button>

        <button
          className="sidebar-user-button"
          onClick={() => {
            cerrarSesion();
            navigate("/");
          }}
        >
          <LogOut size={18} />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </div>
  );
}
