import { JsonNode, humanizarClave, esIdTecnico, esCampoSensible, resumenMinimo, type JsonValue } from './JsonTree';

function sonIguales(a: JsonValue | undefined, b: JsonValue | undefined): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

interface JsonDiffTreeProps {
  /** Snapshot inmediatamente anterior del mismo recurso, o null/undefined si no hay uno (primer evento conocido). */
  antes: JsonValue | null | undefined;
  despues: JsonValue;
}

/** Identidad + estado nada más -- ver resumenMinimo() para el porqué. */
function ResumenMinimo({ despues }: { despues: JsonValue }) {
  const filas = resumenMinimo(despues);
  if (filas.length === 0) {
    return <span className="type-body-sm text-[var(--text-tertiary)]">Sin datos</span>;
  }
  return (
    <div className="type-body-sm flex flex-col gap-0.5">
      {filas.map((fila) => (
        <div key={fila.etiqueta} className="flex flex-wrap items-start gap-1">
          <span className="text-[var(--text-tertiary)]">{fila.etiqueta}:</span>
          <JsonNode value={fila.valor} depth={1} />
        </div>
      ))}
    </div>
  );
}

/**
 * Diff superficial (solo campos de primer nivel) estilo GitHub: SOLO
 * muestra los campos que cambiaron (valor viejo en rojo, nuevo en verde)
 * -- a propósito no repite los campos que quedaron igual, para no
 * exponer de nuevo toda la ficha del recurso en cada evento. Si no hay
 * "antes" comparable (o no hubo cambios reales), en vez de volcar el
 * snapshot completo se muestra un resumen mínimo (identidad + estado).
 */
export function JsonDiffTree({ antes, despues }: JsonDiffTreeProps) {
  const antesEsObjeto = antes !== null && antes !== undefined && typeof antes === 'object' && !Array.isArray(antes);
  const despuesEsObjeto = despues !== null && typeof despues === 'object' && !Array.isArray(despues);

  if (!antesEsObjeto || !despuesEsObjeto) {
    return <ResumenMinimo despues={despues} />;
  }

  const antesObj = antes as Record<string, JsonValue>;
  const despuesObj = despues as Record<string, JsonValue>;
  const todasLasClaves = Array.from(new Set([...Object.keys(antesObj), ...Object.keys(despuesObj)])).filter(
    (k) => !esIdTecnico(k, despuesObj[k] ?? antesObj[k]),
  );

  const clavesCambiadas = todasLasClaves.filter((k) => !sonIguales(antesObj[k], despuesObj[k]));
  if (clavesCambiadas.length === 0) {
    return (
      <div className="flex flex-col gap-1.5">
        <p className="type-caption text-[var(--text-tertiary)] italic">No hubo cambios en los campos.</p>
        <ResumenMinimo despues={despues} />
      </div>
    );
  }

  const clavesVisibles = clavesCambiadas.filter((k) => !esCampoSensible(k));
  if (clavesVisibles.length === 0) {
    return (
      <p className="type-body-sm text-[var(--text-tertiary)] italic">
        Se actualizó información sensible del usuario (no se muestra aquí).
      </p>
    );
  }

  return (
    <div className="type-body-sm flex flex-col gap-1">
      {clavesVisibles.map((clave) => {
        const valorAntes = antesObj[clave];
        const valorDespues = despuesObj[clave];
        const soloEnAntes = !(clave in despuesObj);
        const soloEnDespues = !(clave in antesObj);

        return (
          <div key={clave} className="flex flex-col gap-0.5 py-0.5">
            <span className="text-[var(--text-tertiary)]">{humanizarClave(clave)}:</span>
            {!soloEnDespues && (
              <div className="flex items-start gap-1.5 border-l-2 border-[var(--error-border)] bg-[var(--error-bg)] rounded-r px-2 py-0.5">
                <span className="text-[var(--error-fg)] select-none shrink-0">−</span>
                <JsonNode value={valorAntes} depth={1} />
              </div>
            )}
            {!soloEnAntes && (
              <div className="flex items-start gap-1.5 border-l-2 border-[var(--success-border)] bg-[var(--success-bg)] rounded-r px-2 py-0.5">
                <span className="text-[var(--success-fg)] select-none shrink-0">+</span>
                <JsonNode value={valorDespues} depth={1} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
