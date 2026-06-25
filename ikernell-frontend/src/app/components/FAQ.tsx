import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "¿Qué hace IKernell Soluciones Software?",
    answer:
      "Somos una empresa dedicada al análisis, diseño, desarrollo e implementación de soluciones de software para organizaciones que desean optimizar sus procesos mediante tecnología.",
  },
  {
    question: "¿Qué tipo de proyectos desarrollan?",
    answer:
      "Aplicaciones web: * Sistemas empresariales * Automatización * Software personalizado * Integraciones",
  },
  {
    question: "¿Trabajan con empresas de cualquier tamaño?",
    answer:
      "Sí. Desde pequeñas empresas hasta organizaciones que requieren soluciones a gran escala.",
  },
  {
    question: "¿Qué tecnologías utilizan?",
    answer:
      "* Java * Spring Boot * React * PostgreSQL * APIs REST * Git * Docker",
  },
  {
    question: "¿Cómo puedo solicitar una cotización?",
    answer: "Mediante el formulario de contacto del sitio.",
  },
  {
    question: "¿El acceso al sistema es público?",
    answer:
      "No. El acceso al sistema interno está restringido únicamente para los trabajadores autorizados de IKernell mediante autenticación. Esto está alineado con el caso de estudio, donde los interesados solo visualizan la información pública de la empresa y los trabajadores acceden a funcionalidades internas.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #f8faff 0%, #eef2ff 100%)",
      }}
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
            Resolvemos tus <span style={{ color: "#4338ca" }}>dudas</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Encuentra respuestas a las preguntas más comunes sobre nuestra
            plataforma, planes y soporte.
          </p>
        </div>

        {/* FAQ list */}
        <div
          className="space-y-3"
          role="list"
          aria-label="Lista de preguntas frecuentes"
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border overflow-hidden transition-all duration-200"
                style={{
                  borderColor: isOpen ? "#a5b4fc" : "#e2e8f0",
                  boxShadow: isOpen
                    ? "0 4px 24px rgba(67,56,202,0.08)"
                    : "none",
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
                document
                  .querySelector("#contacto")
                  ?.scrollIntoView({ behavior: "smooth" });
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
