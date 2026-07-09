import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input, Textarea } from '../ui/FormControls';
import { Alert } from '../ui/Feedback';
import { enviarMensajeContacto } from '../../services/mensajes';
import { ApiRequestError } from '../../types/api';
import type { MensajeContactoRequest } from '../../types/mensaje';

const valoresIniciales: MensajeContactoRequest = {
  nombreRemitente: '',
  correoElectronico: '',
  asunto: '',
  detalle: '',
};

export function ContactForm() {
  const [valores, setValores] = useState<MensajeContactoRequest>(valoresIniciales);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<'exito' | 'error' | null>(null);

  const actualizarCampo = (campo: keyof MensajeContactoRequest, valor: string) => {
    setValores((prev) => ({ ...prev, [campo]: valor }));
  };

  const manejarEnvio = async (evento: FormEvent) => {
    evento.preventDefault();
    setEnviando(true);
    setResultado(null);
    setErrores({});

    try {
      await enviarMensajeContacto(valores);
      setResultado('exito');
      setValores(valoresIniciales);
    } catch (error) {
      setResultado('error');
      if (error instanceof ApiRequestError && error.errores) {
        const mapaErrores: Record<string, string> = {};
        error.errores.forEach((e) => {
          mapaErrores[e.campo] = e.mensaje;
        });
        setErrores(mapaErrores);
      }
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div id="contacto" className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold tracking-wide uppercase text-[var(--info)]">Contacto</span>
        <h2 className="text-4xl font-bold text-[var(--text-primary)] leading-tight">Escríbenos</h2>
        <p className="text-lg text-[var(--text-secondary)]">
          Cuéntanos qué necesitas y te respondemos por correo.
        </p>
      </div>

      {resultado === 'exito' && (
        <Alert variant="success" title="Mensaje enviado correctamente">
          Te responderemos a la brevedad al correo que indicaste.
        </Alert>
      )}
      {resultado === 'error' && Object.keys(errores).length === 0 && (
        <Alert variant="error" title="No se pudo enviar el mensaje">
          Intenta de nuevo en unos minutos.
        </Alert>
      )}

      <form onSubmit={manejarEnvio} className="flex flex-col gap-4">
        <Input
          label="Nombre"
          required
          value={valores.nombreRemitente}
          onChange={(e) => actualizarCampo('nombreRemitente', e.target.value)}
          error={errores.nombreRemitente}
          placeholder="Tu nombre completo"
        />
        <Input
          label="Correo electrónico"
          type="email"
          required
          value={valores.correoElectronico}
          onChange={(e) => actualizarCampo('correoElectronico', e.target.value)}
          error={errores.correoElectronico}
          placeholder="tu@correo.com"
        />
        <Input
          label="Asunto"
          required
          value={valores.asunto}
          onChange={(e) => actualizarCampo('asunto', e.target.value)}
          error={errores.asunto}
          placeholder="¿En qué podemos ayudarte?"
        />
        <Textarea
          label="Mensaje"
          required
          rows={4}
          value={valores.detalle}
          onChange={(e) => actualizarCampo('detalle', e.target.value)}
          error={errores.detalle}
          placeholder="Cuéntanos los detalles..."
        />

        <Button type="submit" size="lg" loading={enviando} className="self-start">
          <Send size={14} />
          Enviar mensaje
        </Button>
      </form>
    </div>
  );
}
