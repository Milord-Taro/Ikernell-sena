import { useEffect, useState } from "react";
import type { TipoError } from "../types/TipoError";
import { Button } from "../app/components/ui/button";
import { toast } from "sonner";

import {
  obtenerTiposError,
  eliminarTipoError,
  crearTipoError,
  actualizarTipoError,
} from "../services/tipoErrorService";

import TipoErrorModal from "../app/components/dashboard/TipoErrorModal";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../app/components/ui/table";

export default function TipoErrorPage() {
  const [tiposError, setTiposError] = useState<TipoError[]>([]);

  const [loading, setLoading] = useState(true);

  const [busqueda, setBusqueda] = useState("");

  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [tipoEditando, setTipoEditando] = useState<TipoError | null>(null);

  const [nuevoTipo, setNuevoTipo] = useState({
    codTipoError: "",
    nombreTipo: "",
  });

  async function cargarTiposError() {
    try {
      const data = await obtenerTiposError();

      setTiposError(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarTiposError();
  }, []);

  const [errorFormulario, setErrorFormulario] = useState("");

  const tiposFiltrados = tiposError.filter(
    (t) =>
      t.nombreTipo.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.codTipoError.toLowerCase().includes(busqueda.toLowerCase()),
  );

  async function guardarTipoError() {
    try {
      if (!nuevoTipo.codTipoError.trim()) {
        setErrorFormulario("Debe ingresar un código");
        return;
      }

      if (nuevoTipo.codTipoError.trim().length < 3) {
        setErrorFormulario("El código debe tener al menos 3 caracteres");
        return;
      }

      if (!nuevoTipo.nombreTipo.trim()) {
        setErrorFormulario("Debe ingresar un nombre");
        return;
      }

      if (nuevoTipo.nombreTipo.trim().length < 3) {
        setErrorFormulario("El nombre debe tener al menos 3 caracteres");
        return;
      }

      const existe = tiposError.some(
        (t) =>
          t.codTipoError.toLowerCase().trim() ===
          nuevoTipo.codTipoError.toLowerCase().trim(),
      );

      if (existe) {
        setErrorFormulario("Ya existe un tipo con ese código");
        return;
      }

      const creado = await crearTipoError(nuevoTipo);

      setTiposError([...tiposError, creado]);

      setMostrarFormulario(false);

      setNuevoTipo({
        codTipoError: "",
        nombreTipo: "",
      });

      toast.success("Tipo de error creado correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al guardar");
    }
  }

  async function guardarCambios() {
    if (!tipoEditando) {
      return;
    }

    if (!nuevoTipo.codTipoError.trim()) {
      setErrorFormulario("Debe ingresar un código");
      return;
    }

    const existe = tiposError.some(
      (t) =>
        t.idTipoError !== tipoEditando.idTipoError &&
        t.codTipoError.toLowerCase().trim() ===
          nuevoTipo.codTipoError.toLowerCase().trim(),
    );

    if (existe) {
      setErrorFormulario("Ya existe un tipo con ese código");
      return;
    }

    if (nuevoTipo.codTipoError.trim().length < 3) {
      setErrorFormulario("El código debe tener al menos 3 caracteres");
      return;
    }

    if (!nuevoTipo.nombreTipo.trim()) {
      setErrorFormulario("Debe ingresar un nombre");
      return;
    }

    if (nuevoTipo.nombreTipo.trim().length < 3) {
      setErrorFormulario("El nombre debe tener al menos 3 caracteres");
      return;
    }

    try {
      const actualizado = await actualizarTipoError(
        tipoEditando.idTipoError,
        nuevoTipo,
      );

      setTiposError(
        tiposError.map((t) =>
          t.idTipoError === tipoEditando.idTipoError ? actualizado : t,
        ),
      );

      setTipoEditando(null);

      setMostrarFormulario(false);

      toast.success("Tipo de error actualizado correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al guardar");
    }
  }

  if (loading) {
    return <h2>Cargando tipos de error...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tipos de Error</h1>

      <Button
        onClick={() => {
          setTipoEditando(null);

          setNuevoTipo({
            codTipoError: "",
            nombreTipo: "",
          });
          setErrorFormulario("");
          setMostrarFormulario(true);
        }}
      >
        Nuevo Tipo Error
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
      <div className="bg-white rounded-xl shadow p-5 w-full">
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
              <TableRow key={tipo.idTipoError}>
                <TableCell>{tipo.codTipoError}</TableCell>

                <TableCell>{tipo.nombreTipo}</TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setErrorFormulario("");
                        setTipoEditando(tipo);

                        setNuevoTipo({
                          codTipoError: tipo.codTipoError,

                          nombreTipo: tipo.nombreTipo,
                        });
                        setErrorFormulario("");
                        setMostrarFormulario(true);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={async () => {
                        const confirmar = confirm(
                          `¿Eliminar ${tipo.nombreTipo}?`,
                        );

                        if (!confirmar) {
                          return;
                        }

                        await eliminarTipoError(tipo.idTipoError);

                        setTiposError(
                          tiposError.filter(
                            (t) => t.idTipoError !== tipo.idTipoError,
                          ),
                        );
                        toast.success("Tipo de error eliminado correctamente");
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
      <TipoErrorModal
        open={mostrarFormulario}
        onClose={() => {
          setErrorFormulario("");
          setMostrarFormulario(false);
          setTipoEditando(null);
        }}
        tipoError={nuevoTipo}
        setTipoError={setNuevoTipo}
        onGuardar={tipoEditando ? guardarCambios : guardarTipoError}
        editando={tipoEditando !== null}
        error={errorFormulario}
      />
    </div>
  );
}
