import { useState, useEffect } from 'react';
import { Menu, X, Terminal, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

interface LandingNavbarProps {
  onSignIn: () => void;
}

const enlaces = [
  { label: 'Lineamientos', href: '#lineamientos' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Links de Interés', href: '#links' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
];

export function LandingNavbar({ onSignIn }: LandingNavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [conScroll, setConScroll] = useState(false);

  useEffect(() => {
    const alHacerScroll = () => setConScroll(window.scrollY > 12);
    window.addEventListener('scroll', alHacerScroll);
    return () => window.removeEventListener('scroll', alHacerScroll);
  }, []);

  const irA = (href: string) => {
    setMenuAbierto(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 border-b transition-colors duration-150 ${
        conScroll
          ? 'bg-[var(--surface)] border-[var(--border)]'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              irA('#inicio');
            }}
            className="flex items-center gap-2"
          >
            <span className="flex items-center justify-center size-8 rounded-[var(--radius-md)] bg-[var(--primary)] text-[var(--primary-fg)]">
              <Terminal size={16} />
            </span>
            <span className="text-lg font-semibold text-[var(--text-primary)]">
              IKernell<span className="text-[var(--text-tertiary)] font-normal"> Soluciones</span>
            </span>
          </a>

          {/* Breakpoint subido de md a lg: con 6 enlaces (se agregaron
              Noticias y Links de Interés) no caben cómodos antes de lg. */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {enlaces.map((enlace) => (
              <a
                key={enlace.href}
                href={enlace.href}
                onClick={(e) => {
                  e.preventDefault();
                  irA(enlace.href);
                }}
                className="px-3 py-2 rounded-[var(--radius-sm)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--muted)] transition-colors whitespace-nowrap"
              >
                {enlace.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Cambiar tema"
              className="flex items-center justify-center size-9 rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--muted)] transition-colors"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Button variant="outline" size="md" onClick={onSignIn}>
              Iniciar sesión
            </Button>
          </div>

          <button
            className="lg:hidden flex items-center justify-center size-9 text-[var(--text-secondary)]"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuAbierto ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuAbierto && (
        <div className="lg:hidden bg-[var(--surface)] border-t border-[var(--border)]">
          <div className="px-6 py-3 flex flex-col gap-1">
            {enlaces.map((enlace) => (
              <a
                key={enlace.href}
                href={enlace.href}
                onClick={(e) => {
                  e.preventDefault();
                  irA(enlace.href);
                }}
                className="px-3 py-2.5 rounded-[var(--radius-sm)] text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--muted)]"
              >
                {enlace.label}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-2 mt-1 border-t border-[var(--border)]">
              <Button variant="outline" size="md" onClick={onSignIn} className="flex-1">
                Iniciar sesión
              </Button>
              <button
                onClick={toggleTheme}
                aria-label="Cambiar tema"
                className="flex items-center justify-center size-9 rounded-[var(--radius-md)] border border-[var(--border)] text-[var(--text-secondary)]"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
