import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ArrowRight, X, Clock, User, MessageSquare } from "lucide-react";

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  const blogPosts = [
    {
      id: "desafios-5g",
      title: "Desafíos del despliegue 5G en zonas rurales",
      description: "Analizamos las implicaciones técnicas y logísticas de llevar conectividad de alta velocidad a regiones remotas del país.",
      image: "/blog_5g_rural.png",
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
      image: "/blog_iot_agua.png",
      tag: "Telemetría",
      tagColor: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
      date: "12 Jun, 2026",
      author: "Ing. Milagros Cáceres",
      content: `La gestión y preservación del recurso hídrico en la gran minería es una prioridad corporativa e institucional de primer orden. Los sistemas modernos de telemetría IoT industrial permiten la recopilación de datos de caudal, presión, turbidez y pH en tiempo real en cuencas de captación a altitudes extremas.

A través de la integración de gateways de comunicación LoRaWAN de largo alcance de ultra-bajo consumo con terminales de transmisión por satélite de órbita baja (LEO), Comfutura ha implementado sistemas automatizados capaces de transmitir telemetría sin interrupción directo a consolas centralizadas SCADA de control operacional.

Esto permite a las compañías mineras predecir anomalías hídricas de inmediato, optimizar el reciclaje de agua industrial y auditar el estricto cumplimiento ambiental de manera transparente y eficiente bajo estándares de calidad gubernamentales.`
    },
    {
      id: "renovacion-iso",
      title: "Nuestra renovación de certificación ISO 9001",
      description: "Comfutura reafirma su compromiso con la excelencia operativa tras completar con éxito la auditoría anual de calidad.",
      image: "/blog_iso_9001.png",
      tag: "Institucional",
      tagColor: "bg-zinc-800 text-gray-600 border-white/15",
      date: "05 Jun, 2026",
      author: "Dra. Sofía Valdivia",
      content: `Nos enorgullece anunciar que Comunicación Futura S.A.C. ha renovado satisfactoriamente su certificación de Calidad ISO 9001:2015 para todas nuestras divisiones operativas de Ingeniería de Detalle, Tendido de Fibra Óptica, Construcción de Estaciones Base de Telecomunicaciones y Mantenimiento de Campo.

La auditoría, ejecutada por un organismo de certificación internacional independiente, validó la robustez de nuestros protocolos de control de calidad operacional, la capacitación técnica permanente de nuestras cuadrillas y la alta satisfacción de nuestro portafolio de clientes del sector minero e industrial.

Esta renovación no es solo un sello formal, sino el reflejo diario de nuestro compromiso inquebrantable de entregar infraestructura de alto rendimiento libre de fallas, donde la precisión matemática rige cada uno de nuestros procesos.`
    }
  ];

  return (
    <section id="blog" className="w-full bg-white py-24 border-t border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Header section with link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-brand-blue-light"></span>
              <span className="font-mono text-xs text-gray-500 uppercase tracking-widest font-bold">Novedades</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Actualidad y Conocimiento</h2>
          </div>
          
          <button 
            onClick={() => setSelectedPost(blogPosts[0])}
            className="text-xs font-mono font-bold text-gray-500 hover:text-brand-red transition-colors flex items-center gap-1 uppercase tracking-wider"
          >
            Ver todo el blog
            <ExternalLink size={14} className="text-brand-red-light" />
          </button>
        </div>

        {/* Blog Post cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div 
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="liquid-glass rounded-2xl overflow-hidden border border-gray-200 flex flex-col justify-between group cursor-pointer hover:border-brand-red-light/25 transition-all duration-300 shadow-xl"
            >
              <div className="relative h-52 overflow-hidden">
                <img 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src={post.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className={`text-[9px] font-mono uppercase font-bold tracking-widest px-2.5 py-1 rounded border ${post.tagColor}`}>
                    {post.tag}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-brand-red-light transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-6 line-clamp-3 font-sans">
                    {post.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <span className="text-[10px] font-mono text-gray-500 uppercase">{post.date}</span>
                  <button className="inline-flex items-center gap-1 text-xs font-mono font-bold text-gray-900 group-hover:gap-2 transition-all">
                    Leer más
                    <ArrowRight size={13} className="text-brand-red-light" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Blog Article details Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-white/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-30 bg-black/60 hover:bg-black/80 text-gray-900 p-2 rounded-full border border-gray-200 transition-colors"
              >
                <X size={16} />
              </button>

              <div className="relative h-64 w-full">
                <img 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover" 
                  src={selectedPost.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white-card to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <span className={`text-[10px] font-mono uppercase font-bold tracking-widest px-2.5 py-1 rounded border ${selectedPost.tagColor}`}>
                    {selectedPost.tag}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-4 items-center text-xs font-mono text-gray-500 mb-4 uppercase">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-brand-red-light" />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User size={13} className="text-brand-blue" />
                    Por {selectedPost.author}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">{selectedPost.title}</h3>

                <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-sans whitespace-pre-line">
                  {selectedPost.content}
                </p>

                <div className="border-t border-gray-200 pt-6 mt-8 flex justify-between items-center text-xs text-gray-500">
                  <span>© Comfutura S.A.C. Centro de Publicaciones Científicas</span>
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="text-xs font-mono text-brand-red-light hover:text-brand-red uppercase font-bold transition-colors"
                  >
                    Cerrar Lectura
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
