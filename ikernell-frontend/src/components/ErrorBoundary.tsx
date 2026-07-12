import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  tieneError: boolean;
}

/**
 * Los errores de render no los captura el try/catch de servicios/api.ts
 * (eso es solo para errores HTTP) -- sin este boundary, un error inesperado
 * en cualquier componente deja la pantalla en blanco sin ningún mensaje,
 * el equivalente de un 500 pero del lado del cliente.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { tieneError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { tieneError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('Error no controlado en la interfaz:', error, info.componentStack);
  }

  render() {
    if (this.state.tieneError) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 text-center py-24 px-6">
          <AlertTriangle size={40} className="text-[var(--error)]" />
          <div className="flex flex-col gap-1">
            <h1 className="type-h2 text-[var(--text-primary)]">Algo salió mal</h1>
            <p className="type-body text-[var(--text-secondary)]">
              Ocurrió un error inesperado en la interfaz. Intenta recargar la página.
            </p>
          </div>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Recargar
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
