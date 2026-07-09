import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { UsuarioResponse } from '../types/usuario';
import { obtenerMiPerfil } from '../services/usuarios';
import { cerrarSesion as cerrarSesionServicio, haySesionActiva } from '../services/auth';

interface AuthContextValue {
  usuario: UsuarioResponse | null;
  cargando: boolean;
  estaAutenticado: boolean;
  refrescarUsuario: () => Promise<void>;
  cerrarSesion: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioResponse | null>(null);
  const [cargando, setCargando] = useState(true);

  const cargarUsuario = async () => {
    if (!haySesionActiva()) {
      setUsuario(null);
      setCargando(false);
      return;
    }

    // CORREGIDO: antes solo se apagaba `cargando` al terminar, nunca se
    // prendía al empezar un refresh posterior al primer montaje -- eso
    // permitía que LoginModal navegara a /dashboard mientras `usuario`
    // seguía en null de la sesión anterior. Ahora cualquier consumidor
    // (incluido LoginModal, que además espera la promesa completa) puede
    // confiar en `cargando` durante TODA la carga, no solo la inicial.
    setCargando(true);
    try {
      const perfil = await obtenerMiPerfil();
      setUsuario(perfil);
    } catch {
      setUsuario(null);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarUsuario();

    const alCambiar = () => cargarUsuario();
    window.addEventListener('ikernell-auth-change', alCambiar);
    window.addEventListener('ikernell-unauthorized', alCambiar);
    return () => {
      window.removeEventListener('ikernell-auth-change', alCambiar);
      window.removeEventListener('ikernell-unauthorized', alCambiar);
    };
  }, []);

  const cerrarSesion = () => {
    cerrarSesionServicio();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        estaAutenticado: Boolean(usuario),
        refrescarUsuario: cargarUsuario,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>.');
  }
  return context;
}
