import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, HardHat, Award, Calendar, ArrowRight, Eye, Milestone } from "lucide-react";

export default function About() {
  const [showTimeline, setShowTimeline] = useState(false);

  const historyEvents = [
    {
      year: "2007",
      title: "Fundación de la Compañía",
      desc: "Constitución de Comunicación Futura S.A.C. iniciando con servicios de cableado estructurado metropolitano."
    },
    {
      year: "2015",
      title: "Certificación ISO 9001",
      desc: "Implementación y certificación de nuestros procesos bajo los más altos estándares internacionales de calidad."
    },
    {
      year: "2019",
      title: "Lanzamiento División Minera",
      desc: "Expansión hacia frentes mineros de gran altitud en el sur del país, desplegando radioenlaces de misión crítica."
    },
    {
      year: "2023",
      title: "Liderazgo en Fibra Óptica",
      desc: "Alcanzamos el hito de más de 1,500 km de fibra óptica fusionada y certificada a nivel nacional."
    },
    {
      year: "2026",
      title: "Consolidación 5G e IoT",
      desc: "Pioneros en el despliegue de redes privadas LTE/5G y telemetría hídrica automatizada para la gran industria."
    }
  ];

  return (
    <section id="nosotros" className="w-full bg-white py-24 relative overflow-hidden">
      {/* Light glow accents */}
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-brand-red-light/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2">
              <span className="w-8 h-[2px] bg-brand-red-light"></span>
              <span className="font-mono text-xs text-gray-500 uppercase tracking-widest font-bold">Sobre Nosotros</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Comunicación Futura S.A.C.
            </h2>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed font-sans">
              Somos una corporación de ingeniería especializada en el desarrollo, despliegue y mantenimiento de infraestructura de telecomunicaciones de misión crítica. Nuestro enfoque se basa en la precisión técnica, la innovación constante y el compromiso inquebrantable con la calidad institucional.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {/* ISO Quality Card */}
              <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-brand-red-light/20 transition-all duration-300 shadow-lg group">
                <div className="p-2.5 rounded-lg bg-brand-blue/10 border border-brand-blue/20 text-brand-blue transition-colors group-hover:bg-brand-blue/20">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">Calidad ISO 9001</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Procesos estandarizados y auditados internacionalmente para garantizar fiabilidad.</p>
                </div>
              </div>

              {/* Expert Talent Card */}
              <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-brand-red-light/20 transition-all duration-300 shadow-lg group">
                <div className="p-2.5 rounded-lg bg-brand-red-light/10 border border-brand-red-light/20 text-brand-red-light transition-colors group-hover:bg-brand-red-light/20">
                  <HardHat size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">Talento Experto</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">Ingenieros altamente capacitados, certificados por marcas líderes globales.</p>
                </div>
              </div>
            </div>

            {/* Timeline Trigger */}
            <div className="mt-4">
              <button
                id="btn-ver-historia"
                onClick={() => setShowTimeline(!showTimeline)}
                className="inline-flex items-center gap-2 text-sm font-mono tracking-wider text-gray-600 hover:text-brand-red transition-colors py-1 relative group uppercase font-semibold"
              >
                {showTimeline ? "Ocultar nuestra historia" : "CONOCE MÁS SOBRE NUESTRA HISTORIA"}
                <ArrowRight size={14} className={`transition-transform duration-300 ${showTimeline ? 'rotate-90 text-brand-red-light' : 'group-hover:translate-x-1'}`} />
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-red-light transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="relative h-[320px] sm:h-[420px] w-full rounded-2xl overflow-hidden border border-gray-200 shadow-2xl group cursor-pointer"
            >
              {/* Overlay with subtle grid scanlines */}
              <div className="absolute inset-0 bg-black/10 z-10 transition-colors group-hover:bg-transparent duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>

              {/* Image with direct link */}
              <img
                alt="Racks de servidores en centro de datos de Comfutura"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2ODODQ7fEhf8RjPoB9AyUfxrV-HjC-qPCWT4tXvJ9GrLrNK6Pr0p64Uzz6i9e7Mdnn_0_982RVQbHT0PBeZ0Y33aJJTzxsM-CYEx7bdnvowAAIScIx6G7584P-OYS1lD0r5OqYbFwc1uIIBsqajhjRhTnKovfruceVXEm15_ZTHpmN__Pg4Z-ohsX3POE-MJx5LheGtg6h2uEDBgZ2oldOCxtExzbnw8NYBCAiDn9dj8TIh32KubbqKsYREYVixEMB4gTaB83fmM"
                referrerPolicy="no-referrer"
              />

              {/* Float label */}
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 bg-white/90 px-4 py-2 rounded-lg border border-gray-200 backdrop-blur-sm">
                <Award size={16} className="text-brand-red-light" />
                <span className="font-mono text-xs text-gray-900 uppercase tracking-wider font-semibold">Tecnología de Vanguardia</span>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Timeline Expansion Block */}
        <AnimatePresence>
          {showTimeline && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden mt-12 pt-8 border-t border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-2">
                <Milestone size={20} className="text-brand-red-light" />
                Nuestra Trayectoria Histórica
              </h3>

              <div className="relative border-l-2 border-gray-200 ml-4 md:ml-32 md:mr-32 pl-6 md:pl-8 space-y-8 py-4">
                {historyEvents.map((event, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="relative group"
                  >
                    {/* Circle marker */}
                    <div className="absolute -left-[31px] md:-left-[39px] top-1 w-4 h-4 rounded-full bg-white border-2 border-brand-red-light flex items-center justify-center transition-all group-hover:scale-125 group-hover:bg-brand-red-light"></div>

                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-md flex flex-col md:flex-row md:items-start gap-4">
                      <span className="font-mono text-lg font-bold text-brand-red-light bg-brand-red-light/5 px-3 py-1 rounded border border-brand-red-light/20 self-start md:self-auto">
                        {event.year}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">{event.title}</h4>
                        <p className="text-xs text-gray-500 font-sans leading-relaxed">{event.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
