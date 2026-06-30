import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, UserCog, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomeAbout() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-brand-dark py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Text Content */}
          <div className="flex flex-col items-start z-10">
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="w-10 h-[2px] bg-brand-red-light"></span>
              <span className="font-mono text-xs text-gray-300 uppercase tracking-widest font-bold">Sobre Nosotros</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-8">
              Comunicación Futura S.A.C.
            </h2>
            
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-10 max-w-lg">
              Somos una corporación de ingeniería especializada en el desarrollo, despliegue y mantenimiento de infraestructura de telecomunicaciones de misión crítica. Nuestro enfoque se basa en la precisión técnica, la innovación constante y el compromiso inquebrantable con la calidad institucional.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg mb-12">
              {/* Feature 1 */}
              <div className="bg-[#151515] border border-white/5 rounded-lg p-5 shadow-lg flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-[#2175c0]" size={20} />
                  <h4 className="text-white font-semibold text-sm">Calidad ISO</h4>
                </div>
                <p className="text-gray-400 text-[13px] leading-relaxed">
                  Procesos estandarizados y auditados internacionalmente.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#151515] border border-white/5 rounded-lg p-5 shadow-lg flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <UserCog className="text-[#e22e23]" size={20} />
                  <h4 className="text-white font-semibold text-sm">Talento Experto</h4>
                </div>
                <p className="text-gray-400 text-[13px] leading-relaxed">
                  Ingenieros altamente capacitados y certificados.
                </p>
              </div>
            </div>

            <button 
              onClick={() => navigate("/nosotros")}
              className="group inline-flex items-center gap-2 text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors"
            >
              Conoce más sobre nuestra historia
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Image */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl w-full"
            >
              <img 
                src="/server-cables.png" 
                alt="Infraestructura de Servidores y Redes" 
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
