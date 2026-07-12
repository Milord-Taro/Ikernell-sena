import { useState, type FormEvent } from 'react';
import { LogIn, KeyRound, ArrowLeft } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/FormControls';
import { Alert } from '../ui/Feedback';
import { iniciarSesion, solicitarRecuperacionContrasena, restablecerContrasena } from '../../services/auth';
import { ApiRequestError } from '../../types/api';
import { useAuth } from '../../context/AuthContext';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type Paso = 'login' | 'solicitar' | 'restablecer' | 'exito';

/**
 * Recuperación de contraseña SIMULADA (caso de estudio, sin proveedor de
 * correo real como Outlook/Gmail detrás): en vez de enviar un correo, el
 * backend devuelve el código directamente y aquí se muestra en pantalla
 * para copiar/pegar -- ver comentario en RecuperacionContrasenaService.java.
 */
export function LoginModal({ open, onClose, onSuccess }: LoginModalProps) {
  const { refrescarUsuario } = useAuth();
  const [paso, setPaso] = useState<Paso>('login');

  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');

  const [correoRecuperacion, setCorreoRecuperacion] = useState('');
  const [codigo, setCodigo] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reiniciarYCerrar = () => {
    setPaso('login');
    setCorreoElectronico('');
    setContrasena('');
    setCorreoRecuperacion('');
    setCodigo('');
    setNuevaContrasena('');
    setConfirmarContrasena('');
    setError(null);
    onClose();
  };

  const irARecuperar = () => {
    setError(null);
    setCorreoRecuperacion(correoElectronico);
    setPaso('solicitar');
  };

  const manejarLogin = async (evento: FormEvent) => {
    evento.preventDefault();
    setCargando(true);
    setError(null);

    try {
      await iniciarSesion({ correoElectronico, contrasena });

      // CORREGIDO: antes se llamaba a onSuccess() (que navega a
      // /dashboard) inmediatamente después del login, sin esperar a que
      // AuthContext terminara de cargar el perfil (GET /api/usuarios/me).
      // ProtectedRoute veía "usuario = null" todavía y rebotaba de vuelta
      // al home. Ahora se espera explícitamente esa carga antes de avisar
      // éxito, así ProtectedRoute ya ve la sesión lista cuando navega.
      await refrescarUsuario();

      reiniciarYCerrar();
      onSuccess();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo iniciar sesión.');
    } finally {
      setCargando(false);
    }
  };

  const manejarSolicitarCodigo = async (evento: FormEvent) => {
    evento.preventDefault();
    setCargando(true);
    setError(null);

    try {
      const token = await solicitarRecuperacionContrasena(correoRecuperacion);

      if (!token) {
        setError('No existe ningún usuario con ese correo.');
        return;
      }

      setCodigo(token);
      setPaso('restablecer');
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo generar el código.');
    } finally {
      setCargando(false);
    }
  };

  const manejarRestablecer = async (evento: FormEvent) => {
    evento.preventDefault();
    setError(null);

    if (nuevaContrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setCargando(true);
    try {
      await restablecerContrasena(codigo, nuevaContrasena);
      setPaso('exito');
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo restablecer la contraseña.');
    } finally {
      setCargando(false);
    }
  };

  const titulos: Record<Paso, string> = {
    login: 'Iniciar sesión',
    solicitar: 'Recuperar contraseña',
    restablecer: 'Restablecer contraseña',
    exito: 'Contraseña actualizada',
  };

  return (
    <Modal open={open} onClose={reiniciarYCerrar} title={titulos[paso]} size="sm">
      {paso === 'login' && (
        <form onSubmit={manejarLogin} className="flex flex-col gap-4">
          {error && <Alert variant="error" title="No se pudo iniciar sesión">{error}</Alert>}

          <Input
            label="Correo electrónico"
            type="email"
            required
            autoFocus
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            placeholder="tu@ikernell.com"
          />
          <Input
            label="Contraseña"
            type="password"
            required
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="••••••••"
          />

          <button
            type="button"
            onClick={irARecuperar}
            className="type-body-sm text-[var(--primary)] hover:underline self-start"
          >
            ¿Olvidaste tu contraseña?
          </button>

          <Button type="submit" size="lg" loading={cargando} className="mt-1">
            <LogIn size={14} />
            Ingresar
          </Button>
        </form>
      )}

      {paso === 'solicitar' && (
        <form onSubmit={manejarSolicitarCodigo} className="flex flex-col gap-4">
          <Alert variant="info" title="Esto es una simulación">
            No hay envío de correo real: el código aparece aquí mismo para que lo copies y pegues en el siguiente paso.
          </Alert>

          {error && <Alert variant="error" title="No se pudo generar el código">{error}</Alert>}

          <Input
            label="Correo electrónico"
            type="email"
            required
            autoFocus
            value={correoRecuperacion}
            onChange={(e) => setCorreoRecuperacion(e.target.value)}
            placeholder="tu@ikernell.com"
          />

          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" onClick={() => { setError(null); setPaso('login'); }}>
              <ArrowLeft size={14} />
              Volver
            </Button>
            <Button type="submit" loading={cargando} className="flex-1">
              <KeyRound size={14} />
              Generar código
            </Button>
          </div>
        </form>
      )}

      {paso === 'restablecer' && (
        <form onSubmit={manejarRestablecer} className="flex flex-col gap-4">
          <Alert variant="success" title="Código generado">
            Cópialo de aquí -- en un flujo real llegaría por correo.
          </Alert>

          {error && <Alert variant="error" title="No se pudo restablecer la contraseña">{error}</Alert>}

          <Input
            label="Código de recuperación"
            required
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="font-mono"
          />
          <Input
            label="Nueva contraseña"
            type="password"
            required
            minLength={8}
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
            placeholder="Mínimo 8 caracteres"
          />
          <Input
            label="Confirmar contraseña"
            type="password"
            required
            minLength={8}
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" onClick={() => { setError(null); setPaso('solicitar'); }}>
              <ArrowLeft size={14} />
              Volver
            </Button>
            <Button type="submit" loading={cargando} className="flex-1">
              Cambiar contraseña
            </Button>
          </div>
        </form>
      )}

      {paso === 'exito' && (
        <div className="flex flex-col gap-4">
          <Alert variant="success" title="Listo">
            Tu contraseña se actualizó correctamente. Ya puedes iniciar sesión con la nueva.
          </Alert>

          <Button
            onClick={() => {
              setContrasena('');
              setError(null);
              setPaso('login');
            }}
          >
            Volver a iniciar sesión
          </Button>
        </div>
      )}
    </Modal>
  );
}
