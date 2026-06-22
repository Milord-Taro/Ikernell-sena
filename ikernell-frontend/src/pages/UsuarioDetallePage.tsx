import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../app/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../app/components/ui/alert-dialog";

import {
  obtenerUsuarioPorId,
  inhabilitarUsuario,
} from "../services/usuarioService";

import type { Usuario } from "../types/Usuario";

export default function UsuarioDetallePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    async function cargar() {
      if (!id) return;

      const data = await obtenerUsuarioPorId(Number(id));

      setUsuario(data);
    }

    cargar();
  }, [id]);

  if (!usuario) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                fontSize: "36px",
                borderRadius: "999px",
                background: "linear-gradient(135deg,#4338ca,#0ea5e9)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              {usuario.nombre[0]}
              {usuario.apellido[0]}
            </div>

            <div>
              <h1
                style={{
                  margin: 0,
                }}
              >
                {usuario.nombre} {usuario.apellido}
              </h1>

              <p
                style={{
                  marginTop: "6px",
                  color: "#64748b",
                }}
              >
                {usuario.correoElectronico}
              </p>

              <span
                style={{
                  background: usuario.estado ? "#dcfce7" : "#fee2e2",

                  color: usuario.estado ? "#166534" : "#991b1b",

                  padding: "4px 10px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 600,

                  marginBottom: "20px",
                  display: "inline-block",
                }}
              >
                {usuario.estado ? "Activo" : "Inactivo"}
              </span>

              <div style={{ height: "25px" }} />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "10px",
            }}
          >
            <Button
              onClick={() =>
                navigate(`/dashboard/usuarios/${usuario.idUsuario}/editar`)
              }
            >
              Editar
            </Button>

            {usuario.estado && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Inhabilitar</Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Inhabilitar usuario</AlertDialogTitle>

                    <AlertDialogDescription>
                      ¿Deseas inhabilitar a {usuario.nombre}?
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>

                    <AlertDialogAction
                      onClick={async () => {
                        const actualizado = await inhabilitarUsuario(
                          usuario.idUsuario,
                        );

                        setUsuario(actualizado);

                        toast.success("Usuario inhabilitado correctamente");
                      }}
                    >
                      Inhabilitar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "24px",
          marginTop: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h2>Información Profesional</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div>
            <strong>Código</strong>
            <p>{usuario.codUsuario}</p>
          </div>

          <div>
            <strong>Rol</strong>
            <p>{usuario.rol.nombreRol}</p>
          </div>

          <div>
            <strong>Profesión</strong>
            <p>{usuario.profesion.nombreProfesion}</p>
          </div>

          <div>
            <strong>Especialidad</strong>
            <p>
              {usuario.especialidad?.nombreEspecialidad ?? "Sin especialidad"}
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "24px",
          marginTop: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h2>Información Personal</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div>
            <strong>Tipo Identificación</strong>

            <p>{usuario.tipoIdentificacion}</p>
          </div>

          <div>
            <strong>Número Identificación</strong>

            <p>{usuario.numeroIdentificacion}</p>
          </div>

          <div>
            <strong>Fecha Nacimiento</strong>

            <p>
              {new Date(usuario.fechaNacimiento).toLocaleDateString("es-CO")}
            </p>
          </div>

          <div>
            <strong>Dirección</strong>

            <p>{usuario.direccion}</p>
          </div>
        </div>
      </div>
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "24px",
          marginTop: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h2>Contacto</h2>

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <strong>Correo Electrónico</strong>

          <p>{usuario.correoElectronico}</p>
        </div>
      </div>
    </div>
  );
}
