import { useState, type FormEvent } from 'react';
import { LogIn } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/FormControls';
import { Alert } from '../ui/Feedback';
import { iniciarSesion } from '../../services/auth';
import { ApiRequestError } from '../../types/api';
import { useAuth } from '../../context/AuthContext';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function LoginModal({ open, onClose, onSuccess }: LoginModalProps) {
  const { refrescarUsuario } = useAuth();
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const manejarEnvio = async (evento: FormEvent) => {
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

      setCorreoElectronico('');
      setContrasena('');
      onSuccess();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo iniciar sesión.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Iniciar sesión" size="sm">
      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
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

        <Button type="submit" size="lg" loading={cargando} className="mt-1">
          <LogIn size={14} />
          Ingresar
        </Button>
      </form>
    </Modal>
  );
}
