import {
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
  type ReactNode,
  forwardRef,
  useState,
} from "react";
import { ChevronDown, AlertCircle, Eye, EyeOff } from "lucide-react";

/* ── shared ─────────────────────────────────────────────────────────── */
const baseField =
  "w-full font-sans text-[0.9643rem] bg-[var(--surface)] text-[var(--text-primary)] " +
  "border border-[var(--border)] rounded-[var(--radius-md)] " +
  "placeholder:text-[var(--text-tertiary)] " +
  "transition-colors duration-100 focus:outline-none " +
  "focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] " +
  "disabled:bg-[var(--muted)] disabled:text-[var(--text-tertiary)] disabled:cursor-not-allowed";

const errorField =
  "border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]";

/* ── FieldWrapper ────────────────────────────────────────────────────── */
interface FieldWrapperProps {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export function FieldWrapper({
  label,
  hint,
  error,
  required,
  children,
}: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="type-label text-[var(--text-secondary)]">
          {label}
          {required && (
            <span
              className="ml-1 font-semibold text-[var(--error)]"
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}
      {children}
      {error ? (
        <span className="flex items-center gap-1 type-body-sm text-[var(--error)]">
          <AlertCircle size={11} />
          {error}
        </span>
      ) : hint ? (
        <span className="type-body-sm text-[var(--text-tertiary)]">{hint}</span>
      ) : null}
    </div>
  );
}

/* ── Input ───────────────────────────────────────────────────────────── */
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string;
  hint?: string;
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, prefix, suffix, className = "", type, ...props }, ref) => {
    const [mostrarClave, setMostrarClave] = useState(false);
    const esPassword = type === "password";

    // CORREGIDO: el ojo de contraseña ya NO usa el patrón de prefix/suffix
    // (esa caja con fondo gris y borde separado es para unidades tipo
    // "$"/"kg", se veía "metida" para un ícono). Ahora flota encima del
    // input, con el input mismo dándole espacio a la derecha (pr-9).
    if (esPassword) {
      const contenido = (
        <div className="relative">
          <input
            ref={ref}
            type={mostrarClave ? "text" : "password"}
            className={`${baseField} ${error ? errorField : ""} h-8 pl-3 pr-9 ${className}`}
            {...props}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setMostrarClave((v) => !v)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
            aria-label={mostrarClave ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {mostrarClave ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      );

      return label || hint || error ? (
        <FieldWrapper label={label} hint={hint} error={error} required={props.required}>
          {contenido}
        </FieldWrapper>
      ) : (
        contenido
      );
    }

    // Resto de tipos de Input: comportamiento original sin cambios.
    const hasWrap = prefix || suffix;
    const inputEl = (
      <input
        ref={ref}
        type={type}
        className={`${baseField} ${error ? errorField : ""} ${hasWrap ? "rounded-none" : ""} h-8 px-3 ${className}`}
        {...props}
      />
    );
    const wrapped = hasWrap ? (
      <div
        className={`flex border border-[var(--border)] rounded-[var(--radius-md)] overflow-hidden ${error ? "border-[var(--error)]" : ""} focus-within:border-[var(--primary)] focus-within:ring-1 focus-within:ring-[var(--primary)]`}
      >
        {prefix && (
          <span className="flex items-center px-2.5 bg-[var(--muted)] border-r border-[var(--border)] text-[var(--text-tertiary)] text-[0.8571rem] font-sans shrink-0">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          type={type}
          className={`flex-1 h-8 px-3 bg-[var(--surface)] text-[var(--text-primary)] text-[0.9643rem] font-sans placeholder:text-[var(--text-tertiary)] border-0 focus:outline-none disabled:bg-[var(--muted)] disabled:cursor-not-allowed ${className}`}
          {...props}
        />
        {suffix && (
          <span className="flex items-center px-2.5 bg-[var(--muted)] border-l border-[var(--border)] text-[var(--text-tertiary)] text-[0.8571rem] font-sans shrink-0">
            {suffix}
          </span>
        )}
      </div>
    ) : (
      inputEl
    );

    return label || hint || error ? (
      <FieldWrapper
        label={label}
        hint={hint}
        error={error}
        required={props.required}
      >
        {wrapped}
      </FieldWrapper>
    ) : (
      wrapped
    );
  },
);
Input.displayName = "Input";

/* ── Textarea ────────────────────────────────────────────────────────── */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, className = "", ...props }, ref) => {
    const el = (
      <textarea
        ref={ref}
        className={`${baseField} ${error ? errorField : ""} py-2 px-3 min-h-[88px] resize-y ${className}`}
        {...props}
      />
    );
    return label || hint || error ? (
      <FieldWrapper
        label={label}
        hint={hint}
        error={error}
        required={props.required}
      >
        {el}
      </FieldWrapper>
    ) : (
      el
    );
  },
);
Textarea.displayName = "Textarea";

/* ── Select ──────────────────────────────────────────────────────────── */
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, error, children, className = "", ...props }, ref) => {
    const el = (
      <div className="relative">
        <select
          ref={ref}
          className={`${baseField} ${error ? errorField : ""} h-8 pl-3 pr-8 appearance-none ${className}`}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          size={13}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none"
        />
      </div>
    );
    return label || hint || error ? (
      <FieldWrapper
        label={label}
        hint={hint}
        error={error}
        required={props.required}
      >
        {el}
      </FieldWrapper>
    ) : (
      el
    );
  },
);
Select.displayName = "Select";

/* ── Checkbox ────────────────────────────────────────────────────────── */
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export function Checkbox({
  label,
  description,
  className = "",
  ...props
}: CheckboxProps) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer group select-none">
      <input
        type="checkbox"
        className={`mt-0.5 size-4 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] checked:bg-[var(--primary)] checked:border-[var(--primary)] accent-[var(--primary)] transition-colors duration-100 cursor-pointer ${className}`}
        {...props}
      />
      {(label || description) && (
        <span className="flex flex-col gap-0.5">
          {label && (
            <span className="type-body text-[var(--text-primary)]">
              {label}
            </span>
          )}
          {description && (
            <span className="type-body-sm text-[var(--text-tertiary)]">
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
}

/* ── Radio ───────────────────────────────────────────────────────────── */
interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export function Radio({
  label,
  description,
  className = "",
  ...props
}: RadioProps) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer select-none">
      <input
        type="radio"
        className={`mt-0.5 size-4 border border-[var(--border)] accent-[var(--primary)] cursor-pointer ${className}`}
        {...props}
      />
      {(label || description) && (
        <span className="flex flex-col gap-0.5">
          {label && (
            <span className="type-body text-[var(--text-primary)]">
              {label}
            </span>
          )}
          {description && (
            <span className="type-body-sm text-[var(--text-tertiary)]">
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
}

/* ── Switch ──────────────────────────────────────────────────────────── */
interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
}

export function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  description,
}: SwitchProps) {
  return (
    <label
      className={`flex items-start gap-2.5 select-none ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`
          relative inline-flex items-center shrink-0 mt-0.5 w-9 h-5 rounded-full border transition-colors duration-150 focus-ring
          ${
            checked
              ? "bg-[var(--primary)] border-[var(--primary)]"
              : "bg-[var(--muted)] border-[var(--border)]"
          }
          ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span
          className={`absolute left-0.5 size-4 rounded-full bg-white shadow-sm transition-transform duration-150 ${checked ? "translate-x-4" : "translate-x-0"}`}
        />
      </button>
      {(label || description) && (
        <span className="flex flex-col gap-0.5">
          {label && (
            <span className="type-body text-[var(--text-primary)]">
              {label}
            </span>
          )}
          {description && (
            <span className="type-body-sm text-[var(--text-tertiary)]">
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
}
