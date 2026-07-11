import { useEffect, useState, type FormEvent } from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input, Select } from '../../components/ui/FormControls';
import { Alert } from '../../components/ui/Feedback';
import { ApiRequestError } from '../../types/api';
import { CIUDADES_COLOMBIA } from '../../constants/ciudadesColombia';
import type {
  UsuarioResponse,
  UsuarioRequest,
  UsuarioUpdateRequest,
  RolResponse,
  ProfesionResponse,
  EspecialidadResponse,
  TipoIdentificacion,
} from '../../types/usuario';

interface ValoresFormulario {
  codigoUsuario: string;
  nombres: string;
  apellidos: string;
  tipoIdentificacion: TipoIdentificacion;
  numeroIdentificacion: string;
  fechaNacimiento: string;
  correoElectronico: string;
  confirmarCorreo: string;
  contrasena: string;
  confirmarContrasena: string;
  ciudad: string;
  idRol: string;
  idProfesion: string;
  idEspecialidad: string;
}

const valoresVacios: ValoresFormulario = {
  codigoUsuario: '',
  nombres: '',
  apellidos: '',
  tipoIdentificacion: 'CC',
  numeroIdentificacion: '',
  fechaNacimiento: '',
  correoElectronico: '',
  confirmarCorreo: '',
  contrasena: '',
  confirmarContrasena: '',
  ciudad: '',
  idRol: '',
  idProfesion: '',
  idEspecialidad: '',
};

function usuarioAValores(usuario: UsuarioResponse): ValoresFormulario {
  return {
    codigoUsuario: usuario.codigoUsuario,
    nombres: usuario.nombres,
    apellidos: usuario.apellidos,
    tipoIdentificacion: usuario.tipoIdentificacion,
    numeroIdentificacion: usuario.numeroIdentificacion,
    fechaNacimiento: usuario.fechaNacimiento,
    correoElectronico: usuario.correoElectronico,
    confirmarCorreo: '',
    contrasena: '',
    confirmarContrasena: '',
    ciudad: usuario.ciudad,
    idRol: String(usuario.rol.idRol),
    idProfesion: String(usuario.profesion.idProfesion),
    idEspecialidad: String(usuario.especialidad.idEspecialidad),
  };
}

// Espejo EXACTO de los límites reales del backend (UsuarioRequest.java) --
// si el backend cambia estos números, hay que actualizarlos aquí también.
const LIMITES = {
  codigoUsuario: 20,
  nombres: 100,
  apellidos: 100,
  numeroIdentificacion: 10,
  correoElectronico: 150,
  ciudad: 100,
} as const;

function limitesFechaNacimiento() {
  const hoy = new Date();
  const maximo = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
  const minimo = new Date(hoy.getFullYear() - 100, hoy.getMonth(), hoy.getDate());
  const aISO = (d: Date) => d.toISOString().slice(0, 10);
  return { min: aISO(minimo), max: aISO(maximo) };
}

interface UsuarioFormModalProps {
  open: boolean;
  usuarioEditando: UsuarioResponse | null;
  roles: RolResponse[];
  profesiones: ProfesionResponse[];
  especialidades: EspecialidadResponse[];
  onClose: () => void;
  onCrear: (request: UsuarioRequest) => Promise<void>;
  onActualizar: (id: number, request: UsuarioUpdateRequest) => Promise<void>;
}

export function UsuarioFormModal({
  open,
  usuarioEditando,
  roles,
  profesiones,
  especialidades,
  onClose,
  onCrear,
  onActualizar,
}: UsuarioFormModalProps) {
  const [valores, setValores] = useState<ValoresFormulario>(valoresVacios);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [erroresServidor, setErroresServidor] = useState<Record<string, string>>({});

  const esEdicion = Boolean(usuarioEditando);
  const { min: fechaMin, max: fechaMax } = limitesFechaNacimiento();

  useEffect(() => {
    setValores(usuarioEditando ? usuarioAValores(usuarioEditando) : valoresVacios);
    setError(null);
    setErroresServidor({});
  }, [usuarioEditando, open]);

  const actualizarCampo = (campo: keyof ValoresFormulario, valor: string) => {
    setValores((v) => ({ ...v, [campo]: valor }));
  };

  // Solo dígitos, coincide con el @Pattern del backend.
  const actualizarNumeroIdentificacion = (valor: string) => {
    actualizarCampo('numeroIdentificacion', valor.replace(/[^0-9]/g, '').slice(0, LIMITES.numeroIdentificacion));
  };

  // Solo letras (con acentos/ñ) y espacios -- coincide con el @Pattern
  // del backend para nombres/apellidos. Se filtra mientras se escribe,
  // no solo al enviar.
  const actualizarSoloLetras = (campo: 'nombres' | 'apellidos', valor: string) => {
    actualizarCampo(campo, valor.replace(/[^\p{L} ]/gu, ''));
  };

  // Validaciones "en vivo": se recalculan en cada render a partir de los
  // valores actuales, así que aparecen mientras se escribe -- no hace
  // falta esperar al clic de "Guardar" para verlas.
  const errorConfirmarCorreo =
    !esEdicion && valores.confirmarCorreo && valores.confirmarCorreo !== valores.correoElectronico
      ? 'Los correos no coinciden.'
      : erroresServidor.confirmarCorreo;

  const errorConfirmarContrasena =
    !esEdicion && valores.confirmarContrasena && valores.confirmarContrasena !== valores.contrasena
      ? 'Las contraseñas no coinciden.'
      : erroresServidor.confirmarContrasena;

  const hayErroresVivos = Boolean(
    (!esEdicion && valores.confirmarCorreo && valores.confirmarCorreo !== valores.correoElectronico) ||
      (!esEdicion && valores.confirmarContrasena && valores.confirmarContrasena !== valores.contrasena),
  );

  const manejarEnvio = async (evento: FormEvent) => {
    evento.preventDefault();
    setError(null);

    if (hayErroresVivos) {
      return; // los errores ya están visibles en pantalla, no hace falta más.
    }

    if (valores.fechaNacimiento < fechaMin || valores.fechaNacimiento > fechaMax) {
      setErroresServidor((e) => ({ ...e, fechaNacimiento: 'La fecha de nacimiento no es válida (18 a 100 años).' }));
      return;
    }

    setGuardando(true);
    setErroresServidor({});

    const base = {
      codigoUsuario: valores.codigoUsuario,
      nombres: valores.nombres,
      apellidos: valores.apellidos,
      tipoIdentificacion: valores.tipoIdentificacion,
      numeroIdentificacion: valores.numeroIdentificacion,
      fechaNacimiento: valores.fechaNacimiento,
      ciudad: valores.ciudad,
      idRol: Number(valores.idRol),
      idProfesion: Number(valores.idProfesion),
      idEspecialidad: Number(valores.idEspecialidad),
    };

    try {
      if (esEdicion && usuarioEditando) {
        await onActualizar(usuarioEditando.idUsuario, base);
      } else {
        await onCrear({
          ...base,
          correoElectronico: valores.correoElectronico,
          contrasena: valores.contrasena,
        });
      }
    } catch (err) {
      if (err instanceof ApiRequestError) {
        if (err.errores) {
          const mapa: Record<string, string> = {};
          err.errores.forEach((e) => {
            mapa[e.campo] = e.mensaje;
          });
          setErroresServidor(mapa);
        } else {
          setError(err.message);
        }
      } else {
        setError('Ocurrió un error inesperado.');
      }
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={esEdicion ? 'Editar usuario' : 'Nuevo usuario'}
      size="md"
    >
      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        {error && <Alert variant="error" title="No se pudo guardar">{error}</Alert>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Código de usuario"
            required
            maxLength={LIMITES.codigoUsuario}
            value={valores.codigoUsuario}
            onChange={(e) => actualizarCampo('codigoUsuario', e.target.value)}
            error={erroresServidor.codigoUsuario}
            placeholder="USR-001"
          />
          <Select
            label="Tipo de identificación"
            required
            value={valores.tipoIdentificacion}
            onChange={(e) => actualizarCampo('tipoIdentificacion', e.target.value)}
          >
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="CE">Cédula de Extranjería</option>
            <option value="TI">Tarjeta de Identidad</option>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Nombres"
            required
            maxLength={LIMITES.nombres}
            value={valores.nombres}
            onChange={(e) => actualizarSoloLetras('nombres', e.target.value)}
            error={erroresServidor.nombres}
            hint="Solo letras"
          />
          <Input
            label="Apellidos"
            required
            maxLength={LIMITES.apellidos}
            value={valores.apellidos}
            onChange={(e) => actualizarSoloLetras('apellidos', e.target.value)}
            error={erroresServidor.apellidos}
            hint="Solo letras"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Número de identificación"
            required
            inputMode="numeric"
            value={valores.numeroIdentificacion}
            onChange={(e) => actualizarNumeroIdentificacion(e.target.value)}
            error={erroresServidor.numeroIdentificacion}
            hint="Solo dígitos, entre 6 y 10"
          />
          <Input
            label="Fecha de nacimiento"
            type="date"
            required
            min={fechaMin}
            max={fechaMax}
            value={valores.fechaNacimiento}
            onChange={(e) => actualizarCampo('fechaNacimiento', e.target.value)}
            error={erroresServidor.fechaNacimiento}
            hint="Entre 18 y 100 años de edad"
          />
        </div>

        <Select
          label="Ciudad de residencia"
          required
          value={valores.ciudad}
          onChange={(e) => actualizarCampo('ciudad', e.target.value)}
        >
          <option value="">Seleccionar...</option>
          {CIUDADES_COLOMBIA.map((ciudad) => (
            <option key={ciudad} value={ciudad}>{ciudad}</option>
          ))}
        </Select>

        {!esEdicion && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Correo electrónico"
                type="email"
                required
                maxLength={LIMITES.correoElectronico}
                value={valores.correoElectronico}
                onChange={(e) => actualizarCampo('correoElectronico', e.target.value)}
                error={erroresServidor.correoElectronico}
              />
              <Input
                label="Confirmar correo"
                type="email"
                required
                maxLength={LIMITES.correoElectronico}
                value={valores.confirmarCorreo}
                onChange={(e) => actualizarCampo('confirmarCorreo', e.target.value)}
                error={errorConfirmarCorreo}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Contraseña"
                type="password"
                required
                value={valores.contrasena}
                onChange={(e) => actualizarCampo('contrasena', e.target.value)}
                error={erroresServidor.contrasena}
                hint="Mín. 8 caracteres, con letras y números"
              />
              <Input
                label="Confirmar contraseña"
                type="password"
                required
                value={valores.confirmarContrasena}
                onChange={(e) => actualizarCampo('confirmarContrasena', e.target.value)}
                error={errorConfirmarContrasena}
              />
            </div>
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Select
            label="Rol"
            required
            value={valores.idRol}
            onChange={(e) => actualizarCampo('idRol', e.target.value)}
          >
            <option value="">Seleccionar...</option>
            {roles.map((r) => (
              <option key={r.idRol} value={r.idRol}>{r.nombreRol}</option>
            ))}
          </Select>
          <Select
            label="Profesión"
            required
            value={valores.idProfesion}
            onChange={(e) => actualizarCampo('idProfesion', e.target.value)}
          >
            <option value="">Seleccionar...</option>
            {profesiones.map((p) => (
              <option key={p.idProfesion} value={p.idProfesion}>{p.nombreProfesion}</option>
            ))}
          </Select>
          <Select
            label="Especialidad"
            required
            value={valores.idEspecialidad}
            onChange={(e) => actualizarCampo('idEspecialidad', e.target.value)}
          >
            <option value="">Seleccionar...</option>
            {especialidades.map((esp) => (
              <option key={esp.idEspecialidad} value={esp.idEspecialidad}>{esp.nombreEspecialidad}</option>
            ))}
          </Select>
        </div>

        <div className="flex justify-end gap-2 mt-1">
          <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button type="submit" loading={guardando} disabled={hayErroresVivos}>
            {esEdicion ? 'Guardar cambios' : 'Crear usuario'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
