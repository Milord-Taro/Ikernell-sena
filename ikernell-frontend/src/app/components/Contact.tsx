import { useState } from "react";
import { crearMensaje } from "../../services/mensajeService";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";

const contactInfo = [
  {
    icon: Mail,
    label: "Correo electrónico",
    value: "contacto@ikernell.com",
    color: "#4338ca",
    bg: "#eef2ff",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+57 (601) 234-5678",
    color: "#0d9488",
    bg: "#f0fdfa",
  },
  {
    icon: MapPin,
    label: "Dirección",
    value: "Bogotá, Colombia · Medellín, Colombia",
    color: "#0ea5e9",
    bg: "#f0f9ff",
  },
  {
    icon: Clock,
    label: "Horario de atención",
    value: "Lun – Vie: 8 am – 6 pm (COT)",
    color: "#f97316",
    bg: "#fff7ed",
  },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", subject: "" });

  const handleSubmit = async (e: React.FormEvent) => {

  e.preventDefault();

  try {

    await crearMensaje({
      nombreRemitente: form.name,
      correoRemitente: form.email,
      mensaje: form.message,
    });

    setSent(true);

  } catch (error) {

    console.error(error);

    alert(
      "No fue posible conectar con el servidor"
    );
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contacto"
      className="py-24"
      style={{ background: "linear-gradient(180deg, #f8faff 0%, #eef2ff 100%)" }}
      aria-label="Información de contacto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium"
            style={{ background: "#e0f2fe", color: "#0369a1" }}
          >
            Contáctanos
          </span>
          <h2
            className="text-slate-900"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700 }}
          >
            Hablemos sobre tu{" "}
            <span style={{ color: "#4338ca" }}>próximo proyecto</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Nuestro equipo está listo para ayudarte a encontrar la solución ideal.
            Escríbenos y te respondemos en menos de 24 horas.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map(({ icon: Icon, label, value, color, bg }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: bg }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">{label}</p>
                  <p className="font-medium text-slate-800 text-sm">{value}</p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div
              className="rounded-2xl overflow-hidden h-40 flex items-center justify-center border border-slate-100"
              style={{ background: "linear-gradient(135deg, #eef2ff, #e0f2fe)" }}
              role="img"
              aria-label="Mapa de ubicación - Bogotá, Colombia"
            >
              <div className="text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2" style={{ color: "#4338ca" }} />
                <p className="text-sm font-medium text-slate-600">Bogotá, Colombia</p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
              {sent ? (
                <div className="text-center py-12 space-y-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                    style={{ background: "#f0fdfa" }}
                  >
                    <CheckCircle2 className="w-8 h-8" style={{ color: "#0d9488" }} />
                  </div>
                  <h3 className="font-semibold text-slate-900" style={{ fontSize: "1.25rem" }}>
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-sm mx-auto">
                    Gracias por contactarnos. Un asesor se pondrá en contacto contigo
                    en las próximas 24 horas hábiles.
                  </p>
                  <Button
                    variant="outline"
                    className="border-indigo-200 text-indigo-700"
                    onClick={() => setSent(false)}
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="flex items-center gap-2 mb-6">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: "#eef2ff" }}
                    >
                      <MessageSquare className="w-4 h-4" style={{ color: "#4338ca" }} />
                    </div>
                    <h3 className="font-semibold text-slate-900">Envíanos un mensaje</h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Nombre completo <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        className="w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all"
                        style={{
                          borderColor: "#e2e8f0",
                          background: "#f8faff",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#818cf8")}
                        onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                        aria-required="true"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                        Correo electrónico <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="tu@empresa.com"
                        className="w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all"
                        style={{ borderColor: "#e2e8f0", background: "#f8faff" }}
                        onFocus={(e) => (e.target.style.borderColor = "#818cf8")}
                        onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-company" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Empresa
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Nombre de tu empresa"
                      className="w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all"
                      style={{ borderColor: "#e2e8f0", background: "#f8faff" }}
                      onFocus={(e) => (e.target.style.borderColor = "#818cf8")}
                      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Asunto <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm text-slate-700 focus:outline-none transition-all"
                      style={{ borderColor: "#e2e8f0", background: "#f8faff" }}
                      onFocus={(e) => (e.target.style.borderColor = "#818cf8")}
                      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                      aria-required="true"
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="demo">Solicitar demo</option>
                      <option value="pricing">Consulta de precios</option>
                      <option value="support">Soporte técnico</option>
                      <option value="partnership">Alianzas comerciales</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-1.5">
                      Mensaje <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Cuéntanos sobre tu proyecto o necesidad..."
                      className="w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all resize-none"
                      style={{ borderColor: "#e2e8f0", background: "#f8faff" }}
                      onFocus={(e) => (e.target.style.borderColor = "#818cf8")}
                      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                      aria-required="true"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-white gap-2 py-3 shadow-lg hover:shadow-indigo-300/50 transition-all"
                    style={{ background: "linear-gradient(135deg, #4338ca, #0ea5e9)" }}
                  >
                    <Send className="w-4 h-4" />
                    Enviar Mensaje
                  </Button>

                  <p className="text-xs text-slate-400 text-center">
                    Al enviar este formulario, aceptas nuestra{" "}
                    <a href="#" className="underline" style={{ color: "#4338ca" }}>
                      Política de Privacidad
                    </a>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
