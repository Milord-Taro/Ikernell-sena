import { FAQ } from "./FAQ";
import { ContactForm } from "./ContactForm";
import { PageContainer } from "./PageContainer";

export function FAQContactSection() {
  return (
    <section
      id="contacto-seccion"
      className="relative py-24"
      style={{ backgroundColor: "var(--background)" }}
    >
      <PageContainer>
        <div className="max-w-3xl mb-14 flex flex-col gap-3">
          <span className="text-sm font-semibold tracking-wide uppercase text-[var(--info)]">
            Hablemos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
            ¿Tienes dudas o un proyecto en mente?
          </h2>
          <h3 className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Revisa las preguntas más comunes o escríbenos directamente —
            te respondemos en menos de 24 horas.
          </h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <FAQ />
          <ContactForm />
        </div>
      </PageContainer>
    </section>
  );
}
