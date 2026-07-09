import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card } from '../ui/Card';

const preguntas = [
  {
    pregunta: '¿Qué hace IKernell Soluciones Software?',
    respuesta:
      'Somos una empresa dedicada al análisis, diseño, desarrollo e implementación de soluciones de software para organizaciones que desean optimizar sus procesos mediante tecnología.',
  },
  {
    pregunta: '¿Qué tecnologías utilizan?',
    respuesta: 'Java, Spring Boot, React, PostgreSQL, APIs REST, Git.',
  },
  {
    pregunta: '¿Trabajan con empresas de cualquier tamaño?',
    respuesta: 'Sí, desde pequeñas empresas hasta organizaciones que requieren soluciones a gran escala.',
  },
  {
    pregunta: '¿Cómo puedo solicitar una cotización?',
    respuesta: 'Mediante el formulario de contacto de esta página.',
  },
  {
    pregunta: '¿El acceso al sistema es público?',
    respuesta:
      'No. El acceso al sistema interno está restringido a los trabajadores autorizados de IKernell mediante autenticación. Los visitantes anónimos solo visualizan la información pública de esta página.',
  },
];

export function FAQ() {
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <div id="faq" className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold tracking-wide uppercase text-[var(--info)]">
          Preguntas frecuentes
        </span>
        <h2 className="text-4xl font-bold text-[var(--text-primary)] leading-tight">Resolvemos tus dudas</h2>
      </div>

      <div className="flex flex-col gap-2">
        {preguntas.map((item, indice) => {
          const estaAbierta = abierta === indice;
          return (
            <Card key={item.pregunta}>
              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setAbierta(estaAbierta ? null : indice)}
                aria-expanded={estaAbierta}
              >
                <span className="text-lg font-semibold text-[var(--text-primary)]">{item.pregunta}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-[var(--text-tertiary)] transition-transform duration-150 ${
                    estaAbierta ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {estaAbierta && (
                <div className="px-5 pb-4">
                  <p className="text-lg leading-relaxed text-[var(--text-secondary)]">{item.respuesta}</p>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
