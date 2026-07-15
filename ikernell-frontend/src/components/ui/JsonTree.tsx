import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

// Traducciones de los "trozos" más comunes que aparecen en las claves
// camelCase del backend (nombreEspecialidad, fechaCreacion...). No es
// exhaustivo -- lo que no está aquí simplemente se capitaliza tal cual.
const TRADUCCIONES: Record<string, string> = {
  codigo: 'Código', nombre: 'Nombre', nombres: 'Nombres', apellidos: 'Apellidos',
  descripcion: 'Descripción', activo: 'Activo', estado: 'Estado', fecha: 'Fecha',
  creacion: 'Creación', registro: 'Registro', lectura: 'Lectura', destino: 'Destino',
  usuario: 'Usuario', rol: 'Rol', profesion: 'Profesión', especialidad: 'Especialidad',
  proyecto: 'Proyecto', etapa: 'Etapa', actividad: 'Actividad', tipo: 'Tipo', error: 'Error',
  interrupcion: 'Interrupción', severidad: 'Severidad', titulo: 'Título', motivo: 'Motivo',
  duracion: 'Duración', minutos: 'Minutos', inicio: 'Inicio', fin: 'Fin', orden: 'Orden',
  prioridad: 'Prioridad', desarrollador: 'Desarrollador', lider: 'Líder', actual: 'Actual',
  nota: 'Nota', finalizacion: 'Finalización', resolucion: 'Resolución', responsable: 'Responsable',
  respuesta: 'Respuesta', asunto: 'Asunto', remitente: 'Remitente', electronico: 'Electrónico',
  correo: 'Correo', ciudad: 'Ciudad', identificacion: 'Identificación', numero: 'Número',
  nacimiento: 'Nacimiento', contrasena: 'Contraseña', asignacion: 'Asignación',
  desvinculacion: 'Desvinculación', vigente: 'Vigente', creador: 'Creador', hash: 'Hash',
};

export function humanizarClave(clave: string): string {
  const palabras = clave.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase().split(' ');
  return palabras.map((p) => TRADUCCIONES[p] ?? (p.charAt(0).toUpperCase() + p.slice(1))).join(' ');
}

// Los "id<Entidad>" numéricos (idProyecto, idUsuario...) son ruido de base
// de datos: el código o nombre que viaja junto ya identifica el recurso
// para un lector humano, así que se ocultan tanto en la vista normal como
// en el diff.
export function esIdTecnico(clave: string, valor: JsonValue): boolean {
  return /^id[A-Z]/.test(clave) && (typeof valor === 'number' || valor === null);
}

// PII sensible (documento de identidad, fecha de nacimiento, correo) --
// nunca se muestra en el rastro de auditoría, ni siquiera para
// Coordinador: si una cuenta de Coordinador se ve comprometida, el
// atacante no debería poder recolectar estos datos navegando el
// historial de cambios de cada usuario.
const CAMPOS_SENSIBLES = new Set(['numeroIdentificacion', 'fechaNacimiento', 'correoElectronico']);

export function esCampoSensible(clave: string): boolean {
  return CAMPOS_SENSIBLES.has(clave);
}

/**
 * Los objetos anidados (rol, profesion, especialidad, proyecto, etapa,
 * actividad, usuario...) son snapshots completos de OTRA entidad -- para
 * el evento que se está auditando, lo único relevante es "a cuál" (su
 * nombre), no volver a listar los 5-6 campos propios de esa entidad.
 * Si se encuentra una etiqueta representativa, el objeto se muestra como
 * texto plano en vez de un árbol expandible.
 */
export function etiquetaRepresentativa(valor: Record<string, JsonValue>): string | null {
  // Nombre + apellidos primero (caso Usuario) -- si no, "nombreX" con
  // continuación en mayúscula (nombreRol, nombreEtapa...). Ojo: la propia
  // clave "nombres" (plural) también matchea /^nombre/i, por eso ese
  // patrón exige que siga una mayúscula, para no quedarse solo con el
  // primer nombre y perder el apellido.
  if (typeof valor.nombres === 'string' && typeof valor.apellidos === 'string') {
    return `${valor.nombres} ${valor.apellidos}`;
  }
  const claveNombre = Object.keys(valor).find((k) => /^nombre[A-Z]/.test(k) && typeof valor[k] === 'string');
  if (claveNombre) {
    return valor[claveNombre] as string;
  }
  if (typeof valor.titulo === 'string') {
    return valor.titulo;
  }
  if (typeof valor.asunto === 'string') {
    return valor.asunto;
  }
  return null;
}

export interface CampoResumen {
  etiqueta: string;
  valor: JsonValue;
}

/**
 * Cuando no hay un "antes" con el que armar un diff (primer evento
 * conocido de un recurso), NO se debe caer de vuelta a volcar todo el
 * snapshot -- eso es exactamente la fuga de información de más que se
 * pidió evitar. En su lugar: identidad (nombre) + el único campo de
 * estado relevante si existe (activo o estado). Todo lo demás (rol,
 * profesión, ciudad, fechas, descripciones...) se omite a propósito.
 */
export function resumenMinimo(despues: JsonValue): CampoResumen[] {
  if (despues === null || typeof despues !== 'object' || Array.isArray(despues)) {
    return [];
  }
  const obj = despues as Record<string, JsonValue>;
  const filas: CampoResumen[] = [];

  const identidad = etiquetaRepresentativa(obj);
  if (identidad !== null) {
    filas.push({ etiqueta: 'Nombre', valor: identidad });
  }
  if (typeof obj.activo === 'boolean') {
    filas.push({ etiqueta: 'Activo', valor: obj.activo });
  } else if (typeof obj.estado === 'string') {
    filas.push({ etiqueta: 'Estado', valor: obj.estado });
  }
  return filas;
}

function JsonPrimitive({ value }: { value: string | number | boolean | null }) {
  if (value === null || value === '') {
    return <span className="text-[var(--text-tertiary)]">Sin dato</span>;
  }
  if (typeof value === 'boolean') {
    return <span className={value ? 'text-[var(--success-fg)]' : 'text-[var(--text-tertiary)]'}>{value ? 'Sí' : 'No'}</span>;
  }
  return <span className="text-[var(--text-primary)]">{value}</span>;
}

interface JsonNodeProps {
  value: JsonValue;
  depth: number;
}

export function JsonNode({ value, depth }: JsonNodeProps) {
  const [open, setOpen] = useState(depth < 1);

  if (value === null || typeof value !== 'object') {
    return <JsonPrimitive value={value} />;
  }

  const isArray = Array.isArray(value);

  // Solo se aplana cuando es un valor ANIDADO (depth > 0) -- el objeto
  // raíz del snapshot (depth 0) siempre debe listar sus propios campos,
  // aunque tenga un campo "nombreX" como cualquier otro.
  if (!isArray && depth > 0) {
    const etiqueta = etiquetaRepresentativa(value as Record<string, JsonValue>);
    if (etiqueta !== null) {
      return <span className="text-[var(--text-primary)]">{etiqueta}</span>;
    }
  }

  const entriesCrudas = isArray
    ? (value as JsonValue[]).map((v, i) => [String(i), v] as const)
    : Object.entries(value as Record<string, JsonValue>);
  const entries = isArray
    ? entriesCrudas
    : entriesCrudas.filter(([k, v]) => !esIdTecnico(k, v) && !esCampoSensible(k));

  if (entries.length === 0) {
    return <span className="text-[var(--text-tertiary)]">Sin datos</span>;
  }

  // Array de objetos con etiqueta propia (ej. varias asignaciones): se
  // listan por su nombre, separadas por comas, en vez de un árbol.
  if (isArray) {
    const etiquetas = (value as JsonValue[]).map((v) =>
      v !== null && typeof v === 'object' && !Array.isArray(v) ? etiquetaRepresentativa(v) : null,
    );
    if (etiquetas.every((e) => e !== null)) {
      return <span className="text-[var(--text-primary)]">{etiquetas.join(', ')}</span>;
    }
  }

  return (
    <span>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-0.5 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] align-middle"
      >
        <ChevronRight size={11} className={`transition-transform ${open ? 'rotate-90' : ''}`} />
        {!open && (
          <span className="type-body-sm">
            {isArray ? `${entries.length} elemento${entries.length === 1 ? '' : 's'}` : 'Ver detalle'}
          </span>
        )}
      </button>
      {open && (
        <div className="flex flex-col border-l border-[var(--border)] ml-[5px] pl-3 mt-0.5">
          {entries.map(([key, v]) => (
            <div key={key} className="flex flex-wrap items-start gap-1 py-0.5">
              {!isArray && <span className="text-[var(--text-tertiary)]">{humanizarClave(key)}:</span>}
              <JsonNode value={v} depth={depth + 1} />
            </div>
          ))}
        </div>
      )}
    </span>
  );
}

export function JsonTree({ value }: { value: JsonValue }) {
  return (
    <div className="type-body-sm">
      <JsonNode value={value} depth={0} />
    </div>
  );
}
