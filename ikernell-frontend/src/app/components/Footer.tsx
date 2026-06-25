import {
  Code2,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Instagram,
  ArrowUp,
} from "lucide-react";

const footerLinks = {
  Plataforma: [
    { label: "Funcionalidades", href: "#servicios" },
    { label: "Precios", href: "#" },
    { label: "Integraciones", href: "#" },
    { label: "API & Developers", href: "#" },
    { label: "Actualizaciones", href: "#" },
  ],
  Empresa: [
    { label: "Sobre IKernell", href: "#lineamientos" },
    { label: "Equipo", href: "#" },
    { label: "Blog & Noticias", href: "#noticias" },
    { label: "Misión y Visión", href: "#" },
    { label: "Trabaja con nosotros", href: "#" },
  ],
  Recursos: [
    { label: "Documentación", href: "#" },
    { label: "Tutoriales en video", href: "#" },
    { label: "Webinars", href: "#" },
    { label: "Comunidad", href: "#" },
    { label: "Links de interés", href: "#links" },
  ],
  Legal: [
    { label: "Términos de servicio", href: "#" },
    { label: "Política de privacidad", href: "#" },
    { label: "Política de cookies", href: "#" },
    { label: "Seguridad", href: "#" },
    { label: "Cumplimiento", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, label: "Twitter / X de IKernell", href: "#" },
  { icon: Linkedin, label: "LinkedIn de IKernell", href: "#" },
  { icon: Github, label: "GitHub de IKernell", href: "#" },
  { icon: Youtube, label: "YouTube de IKernell", href: "#" },
  { icon: Instagram, label: "Instagram de IKernell", href: "#" },
];

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className="relative text-slate-300"
      style={{ background: "#0f172a" }}
      role="contentinfo"
      aria-label="Pie de página"
    >
      {/* Top gradient line */}
      <div
        className="h-1 w-full"
        style={{
          background: "linear-gradient(90deg, #4338ca, #0ea5e9, #0d9488)",
        }}
        aria-hidden="true"
      />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #4338ca, #0ea5e9)",
                }}
              >
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-white text-lg">
                IKernell
                <span className="text-slate-400 font-normal text-sm ml-1">
                  Soluciones
                </span>
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              IKernell Soluciones Software es una empresa especializada en el
              desarrollo de soluciones de software a la medida, comprometida con
              la innovación, la calidad y la transformación digital de las
              organizaciones.
            </p>

            {/* Social links */}
            <div
              className="flex items-center gap-2"
              role="list"
              aria-label="Redes sociales"
            >
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  role="listitem"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#4338ca")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.07)")
                  }
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} IKernell Soluciones Software S.A.S.
            Todos los derechos reservados.
            <span className="mx-2">·</span>
            Bogotá, Colombia
          </p>

          <div className="flex items-center gap-4">
            <span className="text-slate-500 text-xs">
              Hecho con ❤️ en Colombia
            </span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "#1e293b" }}
              aria-label="Volver al inicio de la página"
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#4338ca")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#1e293b")
              }
            >
              <ArrowUp className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
