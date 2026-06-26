import { useState } from "react";

import { Button } from "../app/components/ui/button";
import { toast } from "sonner";

import { cambiarContrasena } from "../services/usuarioService";

import { obtenerUsuarioLogueado } from "../utils/auth";

export default function ConfiguracionPage() {
  const [contrasenaActual, setContrasenaActual] = useState("");

  const [contrasenaNueva, setContrasenaNueva] = useState("");

  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const usuario = obtenerUsuarioLogueado();

  async function guardar() {
    if (!contrasenaActual) {
      toast.error("Ingrese la contraseña actual");
      return;
    }

    if (!contrasenaNueva) {
      toast.error("Ingrese la nueva contraseña");
      return;
    }

    if (contrasenaNueva !== confirmarContrasena) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (contrasenaNueva.length < 8) {
      toast.error("La contraseña debe tener mínimo 8 caracteres");
      return;
    }

    if (contrasenaNueva.length > 255) {
      toast.error("La contraseña supera el máximo permitido de 255");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._\-#])[A-Za-z\d@$!%*?&._\-#]{8,255}$/;

    if (!passwordRegex.test(contrasenaNueva)) {
      toast.error(
        "La contraseña debe contener mayúsculas, minúsculas, números y un carácter especial",
      );
      return;
    }

    try {
      await cambiarContrasena(
        usuario.idUsuario,

        contrasenaActual,

        contrasenaNueva,
      );

      toast.success("Contraseña actualizada correctamente");

      setContrasenaActual("");
      setContrasenaNueva("");
      setConfirmarContrasena("");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div
      style={{
        maxWidth: "700px",
      }}
    >
      <h1>Configuración</h1>

      <div
        style={{
          background: "white",
          marginTop: "24px",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,.05)",
        }}
      >
        <h2>Seguridad</h2>

        <p
          style={{
            color: "#64748b",
            marginBottom: "24px",
          }}
        >
          Cambia la contraseña de tu cuenta.
        </p>

        <div style={{ marginBottom: "20px" }}>
          <label>Contraseña actual</label>

          <input
            type="password"
            value={contrasenaActual}
            onChange={(e) => setContrasenaActual(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              borderRadius: "8px",
              border: "1px solid #dbe2ea",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Nueva contraseña</label>

          <input
            type="password"
            value={contrasenaNueva}
            onChange={(e) => setContrasenaNueva(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              borderRadius: "8px",
              border: "1px solid #dbe2ea",
            }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Confirmar contraseña</label>

          <input
            type="password"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              borderRadius: "8px",
              border: "1px solid #dbe2ea",
            }}
          />
        </div>

        {confirmarContrasena && (
          <small
            style={{
              color:
                contrasenaNueva === confirmarContrasena ? "#16a34a" : "#dc2626",
            }}
          >
            {contrasenaNueva === confirmarContrasena
              ? "✓ Las contraseñas coinciden"
              : "✗ Las contraseñas no coinciden"}
          </small>
        )}

        <div
          style={{
            marginTop: "30px",
          }}
        >
          <Button onClick={guardar}>Guardar cambios</Button>
        </div>
      </div>
    </div>
  );
}
