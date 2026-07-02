import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ArrowRight, X, Clock, User, Loader2 } from "lucide-react";

interface BlogPost {
  _id?: string;
  id?: string; // fallback matching
  title: string;
  description?: string;
  content: string;
  image: string;
  tags: string[];
  createdAt?: string;
  date?: string; // fallback matching
  author: string;
}

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fallback mockup posts to show if backend is unreachable or database is empty
  const fallbackPosts: BlogPost[] = [
    {
      id: "desafios-5g",
      title: "Desafíos del despliegue 5G en zonas rurales",
      description: "Analizamos las implicaciones técnicas y logísticas de llevar conectividad de alta velocidad a regiones remotas del país.",
      image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=800",
      tags: ["Infraestructura", "5G"],
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
      tags: ["Telemetría", "IoT"],
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
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800",
      tags: ["Institucional", "Calidad"],
      date: "05 Jun, 2026",
      author: "Dra. Sofía Valdivia",
      content: `Nos enorgullece anunciar que Comunicación Futura S.A.C. ha renovado satisfactoriamente su certificación de Calidad ISO 9001:2015 para todas nuestras divisiones operativas de Ingeniería de Detalle, Tendido de Fibra Óptica, Construcción de Estaciones Base de Telecomunicaciones y Mantenimiento de Campo.

La auditoría, ejecutada por un organismo de certificación internacional independiente, validó la robustez de nuestros protocolos de control de calidad operacional, la capacitación técnica permanente de nuestras cuadrillas y la alta satisfacción de nuestro portafolio de clientes del sector minero e industrial.

Esta renovación no es solo un sello formal, sino el reflejo diario de nuestro compromiso inquebrantable de entregar infraestructura de alto rendimiento libre de fallas, donde la precisión matemática rige cada uno de nuestros procesos.`
    }
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/blogs");
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        setPosts(data.data);
      } else {
        setPosts(fallbackPosts);
      }
    } catch (err) {
      console.warn("⚠️ No se pudo conectar al backend de ComFutura. Usando maqueta de respaldo.", err);
      setPosts(fallbackPosts);
    } finally {
      setIsLoading(false);
    }
  };

  const getTagColor = (tag: string) => {
    const t = tag?.toLowerCase() || "";
    if (t.includes("infraestructura") || t.includes("5g")) {
      return "bg-brand-red-light/10 text-brand-red-light border-brand-red-light/20";
    }
    if (t.includes("telemetría") || t.includes("iot") || t.includes("sensor")) {
      return "bg-brand-blue/10 text-brand-blue border-brand-blue/20";
    }
    return "bg-zinc-100 text-gray-500 border-gray-200";
  };

  const formatDate = (post: BlogPost) => {
    if (post.date) return post.date;
    if (post.createdAt) {
      try {
        const d = new Date(post.createdAt);
        return d.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
      } catch (e) {
        return "";
      }
    }
    return "Reciente";
  };

  const getPostId = (post: BlogPost) => {
    return post._id || post.id || post.title;
  };

  const getPostDescription = (post: BlogPost) => {
    if (post.description) return post.description;
    if (post.content) {
      const plain = post.content.replace(/[#*`_]/g, "");
      return plain.slice(0, 140) + (plain.length > 140 ? "..." : "");
    }
    return "";
  };

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
            onClick={() => posts.length > 0 && setSelectedPost(posts[0])}
            className="text-xs font-mono font-bold text-gray-500 hover:text-brand-red transition-colors flex items-center gap-1 uppercase tracking-wider cursor-pointer"
          >
            Ver artículo destacado
            <ExternalLink size={14} className="text-brand-red-light" />
          </button>
        </div>

        {/* Blog Post cards row */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-gray-400">
            <Loader2 className="animate-spin text-brand-red-light" size={32} />
            <span className="text-xs font-mono font-bold uppercase tracking-wider">Cargando publicaciones...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => {
              const mainTag = post.tags?.[0] || "General";
              return (
                <div 
                  key={getPostId(post)}
                  onClick={() => setSelectedPost(post)}
                  className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 flex flex-col justify-between group cursor-pointer hover:border-brand-red-light/30 hover:shadow-2xl transition-all duration-300 shadow-lg"
                >
                  <div className="relative h-52 overflow-hidden bg-zinc-100">
                    <img 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      src={post.image}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`text-[9px] font-mono uppercase font-bold tracking-widest px-2.5 py-1 rounded border ${getTagColor(mainTag)}`}>
                        {mainTag}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-brand-red-light transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed mb-6 line-clamp-3 font-sans">
                        {getPostDescription(post)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <span className="text-[10px] font-mono text-gray-500 uppercase">{formatDate(post)}</span>
                      <button className="inline-flex items-center gap-1 text-xs font-mono font-bold text-gray-900 group-hover:gap-2 transition-all cursor-pointer">
                        Leer más
                        <ArrowRight size={13} className="text-brand-red-light" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

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
                className="absolute top-4 right-4 z-30 bg-black/50 hover:bg-brand-red-light text-white p-2.5 rounded-full backdrop-blur-md transition-all shadow-lg hover:scale-110 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="relative h-64 w-full bg-zinc-100">
                <img 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover" 
                  src={selectedPost.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white-card to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <span className={`text-[10px] font-mono uppercase font-bold tracking-widest px-2.5 py-1 rounded border ${getTagColor(selectedPost.tags?.[0] || "General")}`}>
                    {selectedPost.tags?.[0] || "General"}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-4 items-center text-xs font-mono text-gray-500 mb-4 uppercase">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-brand-red-light" />
                    {formatDate(selectedPost)}
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
                    className="text-xs font-mono text-brand-red-light hover:text-brand-red uppercase font-bold transition-colors cursor-pointer"
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
