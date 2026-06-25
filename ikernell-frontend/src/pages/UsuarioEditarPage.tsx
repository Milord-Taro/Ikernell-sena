import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../app/components/ui/button";
import type { Rol } from "../types/Rol";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import type { Profesion } from "../types/Profesion";
import type { Especialidad } from "../types/Especialidad";
import { obtenerRoles } from "../services/rolService";
import { obtenerProfesiones } from "../services/profesionService";
import { obtenerEspecialidades } from "../services/especialidadService";

import {
  obtenerUsuarioPorId,
  actualizarUsuario,
} from "../services/usuarioService";

import type { Usuario } from "../types/Usuario";

export default function UsuarioEditarPage() {
  const { id } = useParams();

  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const [roles, setRoles] = useState<Rol[]>([]);

  const [profesiones, setProfesiones] = useState<Profesion[]>([]);

  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);

  const [confirmarCorreo, setConfirmarCorreo] = useState("");

  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function cargar() {
      if (!id) return;

      const data = await obtenerUsuarioPorId(Number(id));

      setUsuario(data);

      const rolesData = await obtenerRoles();

      setRoles(rolesData);

      const profesionesData = await obtenerProfesiones();

      setProfesiones(profesionesData);

      const especialidadesData = await obtenerEspecialidades();

      setEspecialidades(especialidadesData);
    }

    cargar();
  }, [id]);

  if (!usuario) {
    return <p>Cargando...</p>;
  }

  return (
    <div
      style={{
        background: "white",
        padding: "24px",
        borderRadius: "16px",
      }}
    >
      <h1
        style={{
          marginBottom: "24px",
        }}
      >
        Editar Usuario
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div>
          <label>Nombre</label>

          <input
            value={usuario.nombre}
            onChange={(e) =>
              setUsuario({
                ...usuario,
                nombre: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #dbe2ea",
              borderRadius: "8px",
              marginTop: "6px",
            }}
          />
        </div>

        <div>
          <label>Apellido</label>

          <input
            value={usuario.apellido}
            onChange={(e) =>
              setUsuario({
                ...usuario,
                apellido: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #dbe2ea",
              borderRadius: "8px",
              marginTop: "6px",
            }}
          />
        </div>

        <div>
          <label>Correo Electrónico</label>

          <input
            value={usuario.correoElectronico}
            onChange={(e) =>
              setUsuario({
                ...usuario,
                correoElectronico: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #dbe2ea",
              borderRadius: "8px",
              marginTop: "6px",
            }}
          />
        </div>

        <div>
          <label>Confirmar Correo Electrónico</label>

          <input
            value={confirmarCorreo}
            onChange={(e) => setConfirmarCorreo(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #dbe2ea",
              borderRadius: "8px",
              marginTop: "6px",
            }}
          />

          {confirmarCorreo && (
            <small
              style={{
                color:
                  usuario.correoElectronico === confirmarCorreo
                    ? "#16a34a"
                    : "#dc2626",
              }}
            >
              {usuario.correoElectronico === confirmarCorreo
                ? "✓ Los correos coinciden"
                : "✗ Los correos no coinciden"}
            </small>
          )}
        </div>

        <div>
          <label>Contraseña</label>

          <input
            type="password"
            value={usuario.contrasena}
            onChange={(e) =>
              setUsuario({
                ...usuario,
                contrasena: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #dbe2ea",
              borderRadius: "8px",
              marginTop: "6px",
            }}
          />
        </div>

        <div>
          <label>Confirmar Contraseña</label>

          <input
            type="password"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #dbe2ea",
              borderRadius: "8px",
              marginTop: "6px",
            }}
          />

          {confirmarContrasena && (
            <small
              style={{
                color:
                  usuario.contrasena === confirmarContrasena
                    ? "#16a34a"
                    : "#dc2626",
              }}
            >
              {usuario.contrasena === confirmarContrasena
                ? "✓ Las contraseñas coinciden"
                : "✗ Las contraseñas no coinciden"}
            </small>
          )}
        </div>

        <div>
          <label>Dirección</label>

          <input
            value={usuario.direccion}
            onChange={(e) =>
              setUsuario({
                ...usuario,
                direccion: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #dbe2ea",
              borderRadius: "8px",
              marginTop: "6px",
            }}
          />
        </div>

        <div>
          <label>Tipo Identificación</label>

          <select
            value={usuario.tipoIdentificacion}
            onChange={(e) =>
              setUsuario({
                ...usuario,
                tipoIdentificacion: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #dbe2ea",
              borderRadius: "8px",
              marginTop: "6px",
            }}
          >
            <option value="CC">Cédula de Ciudadanía</option>

            <option value="CE">Cédula de Extranjería</option>

            <option value="TI">Tarjeta de Identidad</option>
          </select>
        </div>

        <div>
          <label>Número de Identificación</label>

          <input
            maxLength={15}
            value={usuario.numeroIdentificacion}
            onChange={(e) =>
              setUsuario({
                ...usuario,
                numeroIdentificacion: e.target.value.replace(/\D/g, ""),
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #dbe2ea",
              borderRadius: "8px",
              marginTop: "6px",
            }}
          />
        </div>

        <div>
          <label>Fecha de Nacimiento</label>

          <input
            type="date"
            value={usuario.fechaNacimiento}
            onChange={(e) =>
              setUsuario({
                ...usuario,
                fechaNacimiento: e.target.value,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #dbe2ea",
              borderRadius: "8px",
              marginTop: "6px",
            }}
          />
        </div>

        <div>
          <label>Rol</label>

          <select
            value={usuario.rol.idRol}
            onChange={(e) =>
              setUsuario({
                ...usuario,
                rol: roles.find((r) => r.idRol === Number(e.target.value))!,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #dbe2ea",
              borderRadius: "8px",
              marginTop: "6px",
            }}
          >
            {roles.map((rol) => (
              <option key={rol.idRol} value={rol.idRol}>
                {rol.nombreRol}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Profesión</label>

          <select
            value={usuario.profesion.idProfesion}
            onChange={(e) =>
              setUsuario({
                ...usuario,
                profesion: profesiones.find(
                  (p) => p.idProfesion === Number(e.target.value),
                )!,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #dbe2ea",
              borderRadius: "8px",
              marginTop: "6px",
            }}
          >
            {profesiones.map((profesion) => (
              <option key={profesion.idProfesion} value={profesion.idProfesion}>
                {profesion.nombreProfesion}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Especialidad</label>

          <select
            value={usuario.especialidad?.idEspecialidad ?? ""}
            onChange={(e) =>
              setUsuario({
                ...usuario,
                especialidad:
                  especialidades.find(
                    (esp) => esp.idEspecialidad === Number(e.target.value),
                  ) ?? null,
              })
            }
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #dbe2ea",
              borderRadius: "8px",
              marginTop: "6px",
            }}
          >
            <option value="">Sin especialidad</option>

            {especialidades.map((esp) => (
              <option key={esp.idEspecialidad} value={esp.idEspecialidad}>
                {esp.nombreEspecialidad}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "24px",
        }}
      >
        <Button
          onClick={async () => {
            if (!usuario) return;

            // validacion nombre
            if (usuario.nombre.trim().length < 3) {
              toast.error("El nombre debe tener mínimo 3 caracteres");
              return;
            }

            if (usuario.nombre.trim().length > 50) {
              toast.error("El nombre debe tener maximo 50 caracteres");
              return;
            }

            const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

            if (!nombreRegex.test(usuario.nombre)) {
              toast.error("El nombre solo puede contener letras");
              return;
            }
            // validacion apellido
            if (usuario.apellido.trim().length < 3) {
              toast.error("El apellido debe tener mínimo 3 caracteres");
              return;
            }

            if (usuario.apellido.trim().length > 50) {
              toast.error("El apellido debe tener maximo 50 caracteres");
              return;
            }

            if (!nombreRegex.test(usuario.apellido)) {
              toast.error("El apellido solo puede contener letras");
              return;
            }

            // validacion correo electronico
            if (!usuario.correoElectronico.trim()) {
              toast.error("El correo es obligatorio");
              return;
            }

            if (usuario.correoElectronico.trim().length > 130) {
              toast.error("El correo debe tener maximo 130 caracteres");
              return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(usuario.correoElectronico)) {
              toast.error("Correo inválido");
              return;
            }

            if (usuario.correoElectronico !== confirmarCorreo) {
              toast.error("Los correos no coinciden");
              return;
            }

            // validacion direccion
            if (usuario.direccion.trim().length < 5) {
              toast.error("La dirección debe tener mínimo 5 caracteres");
              return;
            }

            if (usuario.direccion.trim().length > 100) {
              toast.error("La dirección debe tener maximo 100 caracteres");
              return;
            }
            // validacion numero identificacion
            if (
              usuario.numeroIdentificacion.length < 6 ||
              usuario.numeroIdentificacion.length > 15
            ) {
              toast.error(
                "La identificación debe tener entre 6 y 15 caracteres",
              );
              return;
            }

            // validacion fecha nacimiento
            if (!usuario.fechaNacimiento) {
              toast.error("La fecha de nacimiento es obligatoria");
              return;
            }

            const hoy = new Date();

            const fechaNacimiento = new Date(usuario.fechaNacimiento);

            if (fechaNacimiento > hoy) {
              toast.error("La fecha de nacimiento no puede ser futura");
              return;
            }

            // validacion contrasena
            if (usuario.contrasena !== confirmarContrasena) {
              toast.error("Las contraseñas no coinciden");
              return;
            }

            if (
              usuario.contrasena.length < 8 ||
              usuario.contrasena.length > 255
            ) {
              toast.error("La contraseña debe tener entre 8 y 255 caracteres");
              return;
            }

            const passwordRegex =
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._\-#])[A-Za-z\d@$!%*?&._\-#]{8,255}$/;

            if (!passwordRegex.test(usuario.contrasena)) {
              toast.error(
                "La contraseña debe contener mayúsculas, minúsculas, números y un carácter especial",
              );
              return;
            }

            const actualizado = await actualizarUsuario(usuario);
            toast.success("Usuario actualizado correctamente");

            setUsuario(actualizado);
            navigate(`/dashboard/usuarios/${actualizado.idUsuario}`);
          }}
        >
          Guardar cambios
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate(`/dashboard/usuarios/${id}`)}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
