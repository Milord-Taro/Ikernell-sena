export interface Proyecto {
  idProyecto: number;
  codProyecto: string;
  nombreProyecto: string;
  descripcionProyecto: string;
  fechaInicioProyecto: string;
  fechaFinProyecto: string;
  estadoProyecto: boolean;

  lider: {
    idUsuario: number;
    nombre: string;
    apellido: string;
  };
}