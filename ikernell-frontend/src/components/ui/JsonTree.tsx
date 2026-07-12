import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function JsonPrimitive({ value }: { value: string | number | boolean | null }) {
  if (value === null) {
    return <span className="text-[var(--text-tertiary)] italic">null</span>;
  }
  if (typeof value === 'string') {
    return <span className="text-[var(--success-fg)]">"{value}"</span>;
  }
  if (typeof value === 'boolean') {
    return <span className="text-[var(--warning-fg)]">{String(value)}</span>;
  }
  return <span className="text-[var(--info-fg)]">{value}</span>;
}

interface JsonNodeProps {
  value: JsonValue;
  depth: number;
}

function JsonNode({ value, depth }: JsonNodeProps) {
  const [open, setOpen] = useState(depth < 1);

  if (value === null || typeof value !== 'object') {
    return <JsonPrimitive value={value} />;
  }

  const isArray = Array.isArray(value);
  const entries = isArray
    ? (value as JsonValue[]).map((v, i) => [String(i), v] as const)
    : Object.entries(value as Record<string, JsonValue>);

  if (entries.length === 0) {
    return <span className="text-[var(--text-tertiary)]">{isArray ? '[]' : '{}'}</span>;
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
          <span className="type-code">
            {isArray ? `Array(${entries.length})` : `Object · ${entries.length} campo${entries.length === 1 ? '' : 's'}`}
          </span>
        )}
      </button>
      {open && (
        <div className="flex flex-col border-l border-[var(--border)] ml-[5px] pl-3 mt-0.5">
          {entries.map(([key, v]) => (
            <div key={key} className="flex flex-wrap items-start gap-1 py-0.5">
              {!isArray && <span className="text-[var(--text-tertiary)]">{key}:</span>}
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
    <div className="type-code">
      <JsonNode value={value} depth={0} />
    </div>
  );
}
