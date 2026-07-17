import { useCallback, useState } from 'react';
import { ApiRequestError } from '../types/api';

/**
 * Envuelve el patrón "cargando + error" repetido en cada página/tabla que
 * trae datos al montar: antes cada una hacía try/finally sin catch, así que
 * un fetch fallido dejaba `cargando` en false pero nunca avisaba al
 * usuario -- la pantalla quedaba indistinguible de "no hay datos" cuando en
 * realidad la petición había fallado.
 */
export function useCarga() {
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ejecutar = useCallback(async (accion: () => Promise<void>) => {
    setCargando(true);
    setError(null);
    try {
      await accion();
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : 'No se pudo cargar la información.');
    } finally {
      setCargando(false);
    }
  }, []);

  return { cargando, error, ejecutar };
}
