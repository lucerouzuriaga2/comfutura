import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { SERVICES } from "../data";
import { 
  Cable, Radio, Server, Cpu, CheckCircle2, 
  ArrowLeft, ArrowUpRight, Wrench 
} from "lucide-react";
import ScrollToTop from "./ScrollToTop";

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find(s => s.id === id);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Servicio no encontrado</h2>
        <p className="text-gray-500 mb-8">El servicio que estás buscando no existe o fue movido.</p>
        <Link to="/servicios" className="bg-brand-red text-white px-6 py-3 rounded font-bold transition-colors hover:bg-brand-red-light">
          Volver a Servicios
        </Link>
      </div>
    );
  }

  // Icon switcher for list
  const getIcon = (iconName: string, css: string) => {
    switch (iconName) {
      case "Cable": return <Cable className={css} size={32} />;
      case "Radio": return <Radio className={css} size={32} />;
      case "Server": return <Server className={css} size={32} />;
      case "Cpu": return <Cpu className={css} size={32} />;
      case "Wrench": return <Wrench className={css} size={32} />;
      default: return <Cable className={css} size={32} />;
    }
  };

  return (
    <div className="w-full bg-white relative pb-24">
      {/* Dynamic background lights */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Hero Section for Service */}
      <section className="w-full bg-gray-50 border-b border-gray-200 pt-16 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-100 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          
          <Link to="/servicios" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-500 hover:text-brand-red transition-colors mb-8">
            <ArrowLeft size={14} />
            VOLVER A SERVICIOS
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="p-4 inline-block rounded-2xl bg-white border border-gray-200 text-brand-red-light shadow-sm mb-6">
                {getIcon(service.iconName, "")}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
                {service.title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </div>

            {service.image && (
              <div className="w-full lg:w-5/12 shrink-0">
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                  <img src={service.image} alt={service.title} className="w-full h-[300px] object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main detailed list */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-8 h-[2px] bg-brand-red-light"></span>
              <h2 className="font-mono text-sm text-gray-500 uppercase tracking-widest font-bold">Servicios Especializados</h2>
            </div>
            
            {service.subServices && service.subServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {service.subServices.map((sub, i) => (
                  <div key={i} className="flex flex-col items-center text-center group">
                    {sub.image && (
                      <div className="w-full aspect-[4/3] shrink-0 overflow-hidden mb-5 border-2 border-brand-red-light/10 group-hover:border-brand-red-light/40 transition-colors shadow-sm">
                        <img src={sub.image} alt={sub.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <h3 className="text-base font-bold text-gray-900 mb-2 leading-tight">{sub.title}</h3>
                    {sub.features.length > 0 && (
                      <div className="flex flex-col gap-1">
                        {sub.features.map((f, j) => (
                          <p key={j} className="text-sm text-gray-500 leading-snug">
                            {f}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No hay sub-servicios detallados para esta categoría.</p>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 sticky top-32">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Características Principales</h3>
              <ul className="space-y-4 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="border-t border-gray-200 pt-8">
                <p className="text-xs text-gray-500 mb-4 uppercase tracking-wider font-bold">
                  ¿Necesitas este servicio?
                </p>
                <Link
                  to="/contacto"
                  className="w-full bg-brand-red hover:bg-brand-red-light text-white font-bold py-4 px-6 rounded-xl transition-colors flex justify-center items-center gap-2"
                >
                  Contactar Asesor
                  <ArrowUpRight size={18} />
                </Link>
                <Link
                  to="/servicios#calculator-section"
                  className="w-full mt-3 bg-white hover:bg-gray-100 border border-gray-200 text-gray-900 font-bold py-4 px-6 rounded-xl transition-colors flex justify-center items-center gap-2"
                >
                  Ir al Cotizador
                </Link>
              </div>
            </div>
          </div>
          
        </div>

      </section>
    </div>
  );
}
