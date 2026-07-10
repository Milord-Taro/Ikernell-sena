import { useEffect, useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Alert } from './ui/Feedback';
import { useAuth } from '../context/AuthContext';
import { obtenerExpiracionTimestamp } from '../services/api';
import { refrescarSesion } from '../services/auth';
import { ApiRequestError } from '../types/api';

const UMBRAL_AVISO_MS = 10 * 60 * 1000; // 10 minutos

function formatearMmSs(ms: number): string {
  const totalSegundos = Math.max(0, Math.floor(ms / 1000));
  const minutos = Math.floor(totalSegundos / 60);
  const segundos = totalSegundos % 60;
  return `${minutos}:${String(segundos).padStart(2, '0')}`;
}

/**
 * Montado una sola vez dentro de DashboardLayout (solo aplica con sesión
 * activa). Sondea cada segundo cuánto falta para que expire el token
 * (guardado como timestamp absoluto en api.ts al hacer login/refrescar).
 * A los 10 minutos exactos muestra el aviso; si llega a 0 sin que el
 * usuario reaccione, cierra la sesión de una vez -- no esperamos a que
 * el próximo request falle con 401 para que se entere.
 *
 * No es descartable haciendo click afuera / Escape / la X: todas esas
 * vías quedan mapeadas a "cerrar sesión ahora", igual que el botón --
 * no existe un "solo ignorar" razonable para un aviso de seguridad.
 */
export function SessionExpiryModal() {
  const { cerrarSesion } = useAuth();
  const [msRestantes, setMsRestantes] = useState<number | null>(null);
  const [renovando, setRenovando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const intervalo = setInterval(() => {
      const expiracion = obtenerExpiracionTimestamp();
      setMsRestantes(expiracion === null ? null : expiracion - Date.now());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    if (msRestantes !== null && msRestantes <= 0) {
      cerrarSesion();
    }
  }, [msRestantes, cerrarSesion]);

  const mostrarAviso = msRestantes !== null && msRestantes > 0 && msRestantes <= UMBRAL_AVISO_MS;

  const alSeguir = async () => {
    setError(null);
    setRenovando(true);
    try {
      await refrescarSesion();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo renovar la sesión.');
    } finally {
      setRenovando(false);
    }
  };

  return (
    <Modal
      open={mostrarAviso}
      onClose={cerrarSesion}
      title="Tu sesión está por expirar"
      size="sm"
    >
      <div className="flex flex-col gap-4">
        {error && <Alert variant="error" title="No se pudo renovar la sesión">{error}</Alert>}

        <p className="type-body text-[var(--text-secondary)]">
          Por seguridad, tu sesión se cerrará en <strong>{formatearMmSs(msRestantes ?? 0)}</strong>. Guarda lo que
          estés haciendo.
        </p>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={cerrarSesion}>
            Cerrar sesión ahora
          </Button>
          <Button onClick={alSeguir} loading={renovando}>
            Seguir usando la app
          </Button>
        </div>
      </div>
    </Modal>
  );
}
