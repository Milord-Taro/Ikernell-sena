import { useState, type FormEvent } from 'react';
import { Minus, Plus, Type } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Switch } from '../components/ui/FormControls';
import { Alert } from '../components/ui/Feedback';
import { useAuth } from '../context/AuthContext';
import { useAccesibilidad } from '../context/AccesibilidadContext';
import { cambiarMiContrasena } from '../services/usuarios';
import { ApiRequestError } from '../types/api';

export default function ConfiguracionPage() {
  const { usuario } = useAuth();
  const { nivel, aumentar, disminuir, porcentaje, altoContraste, toggleAltoContraste, reducirMovimiento, toggleReducirMovimiento } = useAccesibilidad();

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
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="type-h1 text-[var(--text-primary)]">Configuración</h1>
        <p className="type-body text-[var(--text-secondary)] mt-1">Tu perfil y preferencias de cuenta.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
        <Card className="h-full">
          <CardContent className="flex flex-col gap-3">
            <h3 className="type-h4 text-[var(--text-primary)]">Mi perfil</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col min-w-0">
                <span className="type-caption text-[var(--text-tertiary)]">Nombre</span>
                <span className="type-body-sm text-[var(--text-secondary)] break-words">
                  {usuario?.nombres} {usuario?.apellidos}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="type-caption text-[var(--text-tertiary)]">Correo</span>
                <span className="type-body-sm text-[var(--text-secondary)] break-words">{usuario?.correoElectronico}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="type-caption text-[var(--text-tertiary)]">Rol</span>
                <span className="type-body-sm text-[var(--text-secondary)] break-words">{usuario?.rol.nombreRol}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="type-caption text-[var(--text-tertiary)]">Código</span>
                <span className="type-body-sm text-[var(--text-secondary)] break-words">{usuario?.codigoUsuario}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
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
                hint="Mín. 8 caracteres, con letras y números"
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

        <Card className="h-full lg:col-span-2 xl:col-span-1">
          <CardContent className="flex flex-col gap-5">
            <h3 className="type-h4 text-[var(--text-primary)]">Accesibilidad</h3>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Type size={16} className="text-[var(--text-tertiary)]" />
                <div className="flex flex-col">
                  <span className="type-body text-[var(--text-primary)]">Tamaño de fuente</span>
                  <span className="type-body-sm text-[var(--text-tertiary)]">
                    Se aplica a toda la aplicación.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={disminuir}
                  disabled={nivel === 0}
                  aria-label="Reducir tamaño de fuente"
                >
                  <Minus size={14} />
                </Button>
                <span className="type-body text-[var(--text-primary)] w-12 text-center tabular-nums">
                  {porcentaje}%
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={aumentar}
                  disabled={nivel === 4}
                  aria-label="Aumentar tamaño de fuente"
                >
                  <Plus size={14} />
                </Button>
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-4">
              <Switch
                checked={altoContraste}
                onChange={toggleAltoContraste}
                label="Alto contraste"
                description="Bordes y texto secundario más marcados."
              />
            </div>

            <div className="border-t border-[var(--border)] pt-4">
              <Switch
                checked={reducirMovimiento}
                onChange={toggleReducirMovimiento}
                label="Reducir movimiento"
                description="Apaga animaciones y transiciones en toda la app."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
