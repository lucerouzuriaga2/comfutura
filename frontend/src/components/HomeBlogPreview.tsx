import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Clock, User, X } from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function HomeBlogPreview() {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const previewPosts = [
    {
      id: "desafios-5g",
      title: "Desafíos del despliegue 5G en zonas rurales",
      description: "Analizamos las implicaciones técnicas y logísticas de llevar conectividad de alta velocidad a regiones remotas del país.",
      image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=800",
      tag: "Infraestructura",
      tagColor: "bg-brand-red-light/10 text-brand-red-light border-brand-red-light/20",
      date: "18 Jun, 2026",
      author: "Ing. Carlos Mendoza",
      content: `El despliegue de redes móviles de quinta generación (5G) en entornos rurales de la accidentada geografía peruana plantea retos significativos que van más allá del suministro de espectro radioeléctrico. 

La topografía andina exige el despliegue de radioenlaces microondas IP de alta capacidad combinados con topologías de red en anillo redundantes para mitigar el impacto de posibles averías físicas en el cableado de fibra de transporte. 

Adicionalmente, el suministro de energía representa un obstáculo primordial en zonas aisladas sin conexión a la red de distribución comercial. Comfutura responde a este desafío mediante el diseño e instalación de estaciones base híbridas autosuficientes, alimentadas mediante paneles solares de alta eficiencia de última generación combinados con bancos de almacenamiento con baterías de Litio de larga duración. Esta metodología no solo reduce la huella de carbono, sino que garantiza un SLA operativo ininterrumpido del 99.9% incluso en condiciones invernales severas.`
    },
    {
      id: "iot-telemetria",
      title: "IoT y Telemetría en la gestión hídrica",
      description: "Cómo los sensores inteligentes están revolucionando el monitoreo de recursos hídricos en la industria minera peruana.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800",
      tag: "Telemetría",
      tagColor: "bg-brand-blue/10 text-brand-blue-light border-brand-blue/20",
      date: "12 Jun, 2026",
      author: "Ing. Milagros Cáceres",
      content: `La gestión y preservación del recurso hídrico en la gran minería es una prioridad corporativa e institucional de primer orden. Los sistemas modernos de telemetría IoT industrial permiten la recopilación de datos de caudal, presión, turbidez y pH en tiempo real en cuencas de captación a altitudes extremas.

A través de la integración de gateways de comunicación LoRaWAN de largo alcance de ultra-bajo consumo con terminales de transmisión por satélite de órbita baja (LEO), Comfutura ha implementado sistemas automatizados capaces de transmitir telemetría sin interrupción directo a consolas centralizadas SCADA de control operacional.

Esto permite a las compañías mineras predecir anomalías hídricas de inmediato, optimizar el reciclaje de agua industrial y auditar el estricto cumplimiento ambiental de manera transparente y eficiente bajo estándares de calidad gubernamentales.`
    }
  ];

  return (
    <section className="w-full bg-brand-dark py-20 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Header section with link to full Blog tab */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-brand-red-light"></span>
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest font-bold">Novedades y Actualidad</span>
              <span className="w-8 h-[2px] bg-brand-red-light"></span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Publicaciones de Ingeniería</h2>
            <p className="text-gray-400 mt-2 max-w-xl text-xs md:text-sm">
              Explore los últimos artículos de análisis, certificaciones y desarrollo tecnológico de nuestro equipo.
            </p>
          </div>
          
          <button 
            onClick={() => navigate("/blog")}
            className="text-xs font-mono font-bold text-brand-red-light hover:text-white transition-colors flex items-center gap-1.5 uppercase tracking-wider shrink-0"
          >
            Ir al Blog Completo
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Preview grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {previewPosts.map((post) => (
            <div 
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-brand-dark-card rounded-2xl overflow-hidden border border-white/10 hover:border-brand-red-light/30 transition-all duration-300 flex flex-col sm:flex-row group cursor-pointer shadow-xl h-auto sm:h-56"
            >
              {/* Image Column */}
              <div className="w-full sm:w-2/5 h-48 sm:h-full relative overflow-hidden shrink-0">
                <img 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src={post.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3">
                  <span className={`text-[8px] font-mono uppercase font-bold tracking-widest px-2 py-0.5 rounded border ${post.tagColor}`}>
                    {post.tag}
                  </span>
                </div>
              </div>

              {/* Text Content Column */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white mb-2 group-hover:text-brand-red-light transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-3 font-sans">
                    {post.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3">
                  <span className="text-[9px] font-mono text-gray-500 uppercase">{post.date}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-white group-hover:text-brand-red-light transition-colors">
                    Leer artículo
                    <ArrowRight size={12} className="text-brand-red-light" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal reader for home preview */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-brand-dark/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-brand-dark-card border border-white/10 text-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-30 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full border border-white/10 transition-colors"
              >
                <X size={16} />
              </button>

              <div className="relative h-56 sm:h-64 w-full">
                <img 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover" 
                  src={selectedPost.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-card to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <span className={`text-[10px] font-mono uppercase font-bold tracking-widest px-2.5 py-1 rounded border ${selectedPost.tagColor}`}>
                    {selectedPost.tag}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap gap-4 items-center text-xs font-mono text-gray-400 mb-4 uppercase">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-brand-red-light" />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User size={13} className="text-brand-blue-light" />
                    Por {selectedPost.author}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-extrabold text-white mb-4 leading-tight tracking-tight">{selectedPost.title}</h3>

                <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans whitespace-pre-line max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {selectedPost.content}
                </p>

                <div className="border-t border-white/10 pt-5 mt-6 flex justify-between items-center text-xs text-gray-500">
                  <span>© Comfutura S.A.C.</span>
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="text-xs font-mono text-brand-red-light hover:text-white uppercase font-bold transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
