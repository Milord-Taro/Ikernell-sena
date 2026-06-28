export interface MensajeContacto {

  idMensaje: number;

  codMensaje: string;

  nombreRemitente: string;

  correoRemitente: string;

  mensaje: string;

  fechaEnvio: string;

  estadoMensaje: string;

  respuesta: string | null;

  fechaRespuesta: string | null;
}

export interface MensajeContactoRequest {
  nombreRemitente: string;
  correoRemitente: string;
  mensaje: string;
}
