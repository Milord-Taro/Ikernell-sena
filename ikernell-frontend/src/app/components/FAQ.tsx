import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "¿Qué es IKernell Soluciones Software?",
    answer:
      "IKernell es una plataforma integral de gestión de proyectos de software diseñada para equipos ágiles y organizaciones que buscan mejorar su capacidad de entrega, visibilidad y control sobre sus proyectos tecnológicos. Ofrecemos herramientas de planificación, seguimiento, colaboración y analítica en una sola solución.",
  },
  {
    question: "¿Cuántos usuarios pueden usar la plataforma simultáneamente?",
    answer:
      "Nuestra arquitectura cloud está diseñada para soportar desde equipos de 3 personas hasta organizaciones con miles de usuarios concurrentes. Los planes se adaptan al tamaño de tu equipo: Starter (hasta 10 usuarios), Business (hasta 100 usuarios) y Enterprise (usuarios ilimitados con SLA garantizado).",
  },
  {
    question: "¿Ofrecen integración con herramientas que ya usamos?",
    answer:
      "Sí. IKernell se integra nativamente con más de 50 herramientas: GitHub, GitLab, Bitbucket, Slack, Microsoft Teams, Google Workspace, Jira, Confluence, Figma, Salesforce y muchas más. También disponemos de una API REST y webhooks para integraciones personalizadas.",
  },
  {
    question: "¿Mis datos están seguros en la plataforma?",
    answer:
      "La seguridad es nuestra prioridad. Implementamos cifrado AES-256 en reposo y TLS 1.3 en tránsito. Cumplimos con ISO/IEC 27001, SOC 2 Tipo II, GDPR y la Ley 1581 de 2012 de protección de datos de Colombia. Realizamos auditorías de seguridad trimestrales y tenemos un programa de bug bounty activo.",
  },
  {
    question: "¿Existe un período de prueba gratuito?",
    answer:
      "Sí, ofrecemos 30 días de prueba gratuita con acceso completo a todas las funcionalidades del plan Business, sin necesidad de tarjeta de crédito. Al finalizar el período puedes elegir el plan que mejor se adapte a tu equipo o continuar con el plan gratuito con funcionalidades básicas.",
  },
  {
    question: "¿Qué tipo de soporte ofrecen?",
    answer:
      "Todos los planes incluyen soporte por chat y correo electrónico. El plan Business agrega soporte prioritario con tiempo de respuesta de 4 horas y sesiones de onboarding. El plan Enterprise incluye un gerente de éxito del cliente dedicado, soporte 24/7, SLA de 99.99% y capacitaciones in-house a solicitud.",
  },
  {
    question: "¿Puedo migrar mis proyectos desde otra herramienta?",
    answer:
      "Absolutamente. Contamos con importadores nativos para Jira, Trello, Asana, Monday.com y ClickUp. Nuestro equipo de onboarding te acompañará en todo el proceso de migración sin costo adicional para los planes Business y Enterprise, garantizando la integridad de todos tus datos.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-24"
      style={{ background: "linear-gradient(180deg, #f8faff 0%, #eef2ff 100%)" }}
      aria-label="Preguntas frecuentes"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium"
            style={{ background: "#e0f2fe", color: "#0369a1" }}
          >
            Preguntas Frecuentes
          </span>
          <h2
            className="text-slate-900"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700 }}
          >
            Resolvemos tus{" "}
            <span style={{ color: "#4338ca" }}>dudas</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Encuentra respuestas a las preguntas más comunes sobre nuestra plataforma,
            planes y soporte.
          </p>
        </div>

        {/* FAQ list */}
        <div className="space-y-3" role="list" aria-label="Lista de preguntas frecuentes">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border overflow-hidden transition-all duration-200"
                style={{
                  borderColor: isOpen ? "#a5b4fc" : "#e2e8f0",
                  boxShadow: isOpen ? "0 4px 24px rgba(67,56,202,0.08)" : "none",
                }}
                role="listitem"
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-indigo-50/50 transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                      style={{ color: isOpen ? "#4338ca" : "#94a3b8" }}
                    />
                    <span
                      className="font-medium text-sm sm:text-base"
                      style={{ color: isOpen ? "#4338ca" : "#0f172a" }}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
                    style={{
                      color: isOpen ? "#4338ca" : "#94a3b8",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? "400px" : "0px" }}
                >
                  <div className="px-6 pb-5 pl-14 text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact prompt */}
        <div className="text-center mt-10 p-6 bg-white rounded-2xl border border-indigo-100">
          <p className="text-slate-600 text-sm">
            ¿No encontraste lo que buscabas?{" "}
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-medium underline underline-offset-2"
              style={{ color: "#4338ca" }}
            >
              Escríbenos directamente
            </a>{" "}
            y te respondemos en menos de 24 horas.
          </p>
        </div>
      </div>
    </section>
  );
}
