import { Terminal, Github, Linkedin, Twitter } from 'lucide-react';
import { PageContainer } from './PageContainer';

const columnas = {
  Empresa: [
    { label: 'Lineamientos', href: '#lineamientos' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Preguntas frecuentes', href: '#faq' },
  ],
  Servicios: [
    { label: 'Desarrollo a la medida', href: '#servicios' },
    { label: 'Consultoría tecnológica', href: '#servicios' },
    { label: 'Mantenimiento de software', href: '#servicios' },
  ],
  Legal: [
    { label: 'Términos de servicio', href: '#' },
    { label: 'Política de privacidad', href: '#' },
    { label: 'Política de cookies', href: '#' },
  ],
};

const redes = [
  { icon: Github, label: 'GitHub de IKernell', href: '#' },
  { icon: Linkedin, label: 'LinkedIn de IKernell', href: '#' },
  { icon: Twitter, label: 'Twitter / X de IKernell', href: '#' },
];

/**
 * className="dark" en el <footer>: fuerza la paleta oscura (definida en
 * .dark en index.css) SOLO dentro de este bloque, sin importar el tema
 * general del sitio. Así el footer siempre tiene contraste marcado --
 * en modo claro se ve como un "anclaje" oscuro (igual que V1); en modo
 * oscuro simplemente ya coincide, sin ningún color nuevo inventado.
 */
export function Footer() {
  return (
    <footer
    className="dark relative border-t border-[var(--border)]"
    style={{ backgroundColor: "var(--footer-background)" }}
>
      <div
        className="h-[3px] w-full"
        style={{ background: 'linear-gradient(90deg, var(--primary), var(--info), var(--success))' }}
        aria-hidden="true"
      />

      <PageContainer className="py-5">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center size-8 rounded-[var(--radius-md)] bg-[var(--primary)] text-[var(--primary-fg)]">
                <Terminal size={16} />
              </span>
              <span className="text-lg font-semibold text-[var(--text-primary)]">
                IKernell<span className="text-[var(--text-tertiary)] font-normal"> Soluciones</span>
              </span>
            </div>
            <p className="text-base leading-relaxed text-[var(--text-secondary)] max-w-xs">
              Empresa especializada en el desarrollo de soluciones de software a la medida,
              comprometida con la innovación, la calidad y la transformación digital.
            </p>
            <div className="flex items-center gap-2">
              {redes.map(({ icon: Icono, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center size-9 rounded-[var(--radius-md)] bg-[var(--muted)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--primary-subtle)] transition-colors"
                >
                  <Icono size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(columnas).map(([categoria, enlaces]) => (
            <div key={categoria} className="flex flex-col gap-3">
              <h4 className="type-label text-[var(--text-tertiary)]">{categoria}</h4>
              <ul className="flex flex-col gap-2.5">
                {enlaces.map((enlace) => (
                  <li key={enlace.label}>
                    <a
                      href={enlace.href}
                      className="text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      {enlace.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PageContainer>

      <div className="border-t border-[var(--border)]">
        <PageContainer className="py-5">
          <p className="type-caption text-[var(--text-tertiary)] text-center sm:text-left">
            © {new Date().getFullYear()} IKernell Soluciones Software S.A.S. · Bogotá, Colombia
          </p>
        </PageContainer>
      </div>
    </footer>
  );
}
