import { useState, type FormEvent } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/FormControls';
import { Alert } from '../components/ui/Feedback';
import { useAuth } from '../context/AuthContext';
import { cambiarMiContrasena } from '../services/usuarios';
import { ApiRequestError } from '../types/api';

export default function ConfiguracionPage() {
  const { usuario } = useAuth();

  const [contrasenaActual, setContrasenaActual] = useState('');
  const [contrasenaNueva, setContrasenaNueva] = useState('');
  const [confirmarNueva, setConfirmarNueva] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState(false);

  const errorConfirmacion =
    confirmarNueva && confirmarNueva !== contrasenaNueva ? 'Las contraseñas nuevas no coinciden.' : undefined;

  const alEnviar = async (evento: FormEvent) => {
    evento.preventDefault();
    setError(null);
    setExito(false);

    if (contrasenaNueva !== confirmarNueva) {
      return;
    }

    setGuardando(true);
    try {
      await cambiarMiContrasena({ contrasenaActual, contrasenaNueva });
      setExito(true);
      setContrasenaActual('');
      setContrasenaNueva('');
      setConfirmarNueva('');
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo cambiar la contraseña.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <div>
        <h1 className="type-h1 text-[var(--text-primary)]">Configuración</h1>
        <p className="type-body text-[var(--text-secondary)] mt-1">Tu perfil y preferencias de cuenta.</p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-3">
          <h3 className="type-h4 text-[var(--text-primary)]">Mi perfil</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <span className="type-caption text-[var(--text-tertiary)]">Nombre</span>
              <span className="type-body-sm text-[var(--text-secondary)]">
                {usuario?.nombres} {usuario?.apellidos}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="type-caption text-[var(--text-tertiary)]">Correo</span>
              <span className="type-body-sm text-[var(--text-secondary)]">{usuario?.correoElectronico}</span>
            </div>
            <div className="flex flex-col">
              <span className="type-caption text-[var(--text-tertiary)]">Rol</span>
              <span className="type-body-sm text-[var(--text-secondary)]">{usuario?.rol.nombreRol}</span>
            </div>
            <div className="flex flex-col">
              <span className="type-caption text-[var(--text-tertiary)]">Código</span>
              <span className="type-body-sm text-[var(--text-secondary)]">{usuario?.codigoUsuario}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-4">
          <h3 className="type-h4 text-[var(--text-primary)]">Cambiar contraseña</h3>

          {error && <Alert variant="error" title="No se pudo cambiar la contraseña">{error}</Alert>}
          {exito && <Alert variant="success" title="Listo">Tu contraseña se actualizó correctamente.</Alert>}

          <form onSubmit={alEnviar} className="flex flex-col gap-3">
            <Input
              label="Contraseña actual"
              type="password"
              required
              value={contrasenaActual}
              onChange={(e) => setContrasenaActual(e.target.value)}
            />
            <Input
              label="Contraseña nueva"
              type="password"
              required
              minLength={8}
              hint="Mínimo 8 caracteres."
              value={contrasenaNueva}
              onChange={(e) => setContrasenaNueva(e.target.value)}
            />
            <Input
              label="Confirmar contraseña nueva"
              type="password"
              required
              value={confirmarNueva}
              onChange={(e) => setConfirmarNueva(e.target.value)}
              error={errorConfirmacion}
            />

            <div className="flex justify-end mt-1">
              <Button type="submit" loading={guardando} disabled={Boolean(errorConfirmacion)}>
                Actualizar contraseña
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
