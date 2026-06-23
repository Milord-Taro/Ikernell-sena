import { useEffect, useState } from "react";
import type { TipoInterrupcion } from "../types/TipoInterrupcion";
import { toast } from "sonner";
import TipoInterrupcionModal from "../app/components/dashboard/TipoInterrupcionModal";

import {
  obtenerTiposInterrupcion,
  eliminarTipoInterrupcion,
  crearTipoInterrupcion,
  actualizarTipoInterrupcion,
} from "../services/tipoInterrupcionService";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../app/components/ui/table";

import { Button } from "../app/components/ui/button";

export default function TipoInterrupcionPage() {
  const [tipos, setTipos] = useState<TipoInterrupcion[]>([]);

  const [loading, setLoading] = useState(true);

  const [busqueda, setBusqueda] = useState("");

  async function cargarTiposInterrupcion() {
    try {
      const data = await obtenerTiposInterrupcion();

      setTipos(data);
    } catch (error) {
      console.error(error);

      toast.error("Error al cargar tipos de interrupción");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarTiposInterrupcion();
  }, []);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [tipoEditando, setTipoEditando] = useState<TipoInterrupcion | null>(
    null,
  );

  const [errorFormulario, setErrorFormulario] = useState("");

  const [nuevoTipo, setNuevoTipo] = useState({
    codTipoInterrupcion: "",
    nombreTipoInterrupcion: "",
  });

  const tiposFiltrados = tipos.filter(
    (t) =>
      t.nombreTipoInterrupcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.codTipoInterrupcion.toLowerCase().includes(busqueda.toLowerCase()),
  );

  if (loading) {
    return <h2>Cargando tipos de interrupción...</h2>;
  }

  function validarFormulario(): boolean {
    if (!nuevoTipo.codTipoInterrupcion.trim()) {
      setErrorFormulario("Debe ingresar un código");
      return false;
    }

    if (nuevoTipo.codTipoInterrupcion.trim().length < 3) {
      setErrorFormulario("El código debe tener mínimo 3 caracteres");
      return false;
    }

    if (nuevoTipo.codTipoInterrupcion.trim().length > 10) {
      setErrorFormulario("El código no puede superar 10 caracteres");
      return false;
    }

    if (!nuevoTipo.nombreTipoInterrupcion.trim()) {
      setErrorFormulario("Debe ingresar un nombre");
      return false;
    }

    if (nuevoTipo.nombreTipoInterrupcion.trim().length < 3) {
      setErrorFormulario("El nombre debe tener mínimo 3 caracteres");
      return false;
    }

    if (nuevoTipo.nombreTipoInterrupcion.trim().length > 100) {
      setErrorFormulario("El nombre no puede superar 100 caracteres");
      return false;
    }

    setErrorFormulario("");

    return true;
  }

  async function guardarTipoInterrupcion() {
    try {
      if (!validarFormulario()) {
        return;
      }

      const existe = tipos.some(
        (t) =>
          t.codTipoInterrupcion.toLowerCase().trim() ===
          nuevoTipo.codTipoInterrupcion.toLowerCase().trim(),
      );

      if (existe) {
        setErrorFormulario("Ya existe un tipo con ese código");
        return;
      }

      const creado = await crearTipoInterrupcion(nuevoTipo);

      setTipos([...tipos, creado]);

      setErrorFormulario("");

      setMostrarFormulario(false);

      setNuevoTipo({
        codTipoInterrupcion: "",
        nombreTipoInterrupcion: "",
      });

      toast.success("Tipo de interrupción creado correctamente");
    } catch (error) {
      console.error(error);

      toast.error("No se pudo crear el tipo de interrupción");
    }
  }

  async function guardarCambios() {
    if (!tipoEditando) {
      return;
    }

    if (!validarFormulario()) {
      return;
    }

    const existe = tipos.some(
      (t) =>
        t.idTipoInterrupcion !== tipoEditando.idTipoInterrupcion &&
        t.codTipoInterrupcion.toLowerCase().trim() ===
          nuevoTipo.codTipoInterrupcion.toLowerCase().trim(),
    );

    if (existe) {
      setErrorFormulario("Ya existe un tipo con ese código");
      return;
    }

    try {
      const actualizado = await actualizarTipoInterrupcion(
        tipoEditando.idTipoInterrupcion,
        nuevoTipo,
      );

      setTipos(
        tipos.map((t) =>
          t.idTipoInterrupcion === tipoEditando.idTipoInterrupcion
            ? actualizado
            : t,
        ),
      );

      setErrorFormulario("");

      setTipoEditando(null);

      setMostrarFormulario(false);

      toast.success("Tipo de interrupción actualizado correctamente");
    } catch (error) {
      console.error(error);

      toast.error("No se pudo actualizar el tipo de interrupción");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tipos de Interrupción</h1>

      <Button
        onClick={() => {
          setTipoEditando(null);

          setNuevoTipo({
            codTipoInterrupcion: "",
            nombreTipoInterrupcion: "",
          });

          setErrorFormulario("");

          setMostrarFormulario(true);
        }}
      >
        Nuevo Tipo Interrupción
      </Button>

      <input
        type="text"
        placeholder="Buscar tipo..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
          marginBottom: "20px",
          border: "1px solid #dbe2ea",
          borderRadius: "8px",
        }}
      />
      <div className="bg-white rounded-xl shadow p-6 w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>

              <TableHead>Nombre</TableHead>

              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tiposFiltrados.map((tipo) => (
              <TableRow key={tipo.idTipoInterrupcion}>
                <TableCell>{tipo.codTipoInterrupcion}</TableCell>

                <TableCell className="max-w-[300px] whitespace-normal break-words">
                  {tipo.nombreTipoInterrupcion}
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setErrorFormulario("");

                        setTipoEditando(tipo);

                        setNuevoTipo({
                          codTipoInterrupcion: tipo.codTipoInterrupcion,

                          nombreTipoInterrupcion: tipo.nombreTipoInterrupcion,
                        });

                        setMostrarFormulario(true);
                      }}
                    >
                      Editar
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={async () => {
                        const confirmar = confirm(
                          `¿Eliminar ${tipo.nombreTipoInterrupcion}?`,
                        );

                        if (!confirmar) {
                          return;
                        }

                        try {
                          await eliminarTipoInterrupcion(
                            tipo.idTipoInterrupcion,
                          );

                          setTipos(
                            tipos.filter(
                              (t) =>
                                t.idTipoInterrupcion !==
                                tipo.idTipoInterrupcion,
                            ),
                          );

                          toast.success(
                            "Tipo de interrupción eliminado correctamente",
                          );
                        } catch (error) {
                          console.error(error);

                          toast.error(
                            "No se pudo eliminar el tipo de interrupción",
                          );
                        }
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <TipoInterrupcionModal
        open={mostrarFormulario}
        onClose={() => {
          setErrorFormulario("");
          setMostrarFormulario(false);
          setTipoEditando(null);
        }}
        tipoInterrupcion={nuevoTipo}
        setTipoInterrupcion={setNuevoTipo}
        onGuardar={tipoEditando ? guardarCambios : guardarTipoInterrupcion}
        editando={tipoEditando !== null}
        error={errorFormulario}
      />
    </div>
  );
}
