import React from "react";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Cpu, HardHat } from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const titleLine1 = "Líderes en Ingeniería";
  const titleLine2 = "y Telecomunicaciones";

  return (
    <section id="inicio" className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between pt-24 md:pt-32">
      {/* Video Background with dark overlay for maximum contrast */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-brand-dark">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Abstract Digital Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-brand-red-light/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-blue/15 rounded-full blur-[150px]"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 md:px-8 lg:px-16 max-w-7xl mx-auto w-full py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text block */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Tagline */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-black/50 border border-white/10 text-xs font-mono tracking-widest text-white uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-brand-red-light animate-pulse"></span>
              Infraestructura de alto rendimiento
            </motion.div>

            {/* Character-by-character type title simulation with motion */}
            <h1 className="font-sans font-extrabold tracking-tight text-white text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6 select-none">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="block"
              >
                {titleLine1.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.3 }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400"
              >
                {titleLine2.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.03, duration: 0.3 }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>
            </h1>

            {/* Paragraph Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-base md:text-lg text-gray-300 max-w-lg mb-8 leading-relaxed font-sans"
            >
              Diseñamos, implementamos y mantenemos la infraestructura crítica que conecta al país. Brindamos precisión técnica y fiabilidad institucional en cada proyecto de ingeniería de telecomunicaciones.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-wrap gap-4 w-full sm:w-auto"
            >
              <button 
                onClick={() => navigate("/servicios")}
                className="w-full sm:w-auto bg-brand-red-light hover:bg-brand-red text-white font-medium px-8 py-3 rounded-lg text-sm tracking-wide transition-all duration-300 shadow-lg shadow-brand-red-light/15 hover:shadow-brand-red-light/25 flex items-center justify-center gap-2 group"
              >
                Ver Servicios
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              
              <button 
                onClick={() => navigate("/contacto")}
                className="w-full sm:w-auto liquid-glass hover:bg-white/10 text-white font-medium px-8 py-3 rounded-lg text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 hover:border-white/20"
              >
                Contacto Comercial
              </button>
            </motion.div>
          </div>

          {/* Right Floating Card Panel */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.7, duration: 0.8 }}
              className="liquid-glass rounded-2xl p-8 lg:p-10 border border-white/10 max-w-sm w-full shadow-2xl relative group overflow-hidden"
            >
              {/* Decorative cyber line at top */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-red-light via-brand-blue-light to-brand-blue"></div>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-brand-red-light">
                    <Cpu size={20} />
                  </div>
                  <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">Servicios Comfutura</span>
                </div>
                
                <p className="text-xl md:text-2xl font-light text-white leading-relaxed font-sans">
                  Ingeniería.
                  <br />
                  <span className="text-brand-blue-light font-medium">Construcción.</span>
                  <br />
                  Telecomunicaciones.
                </p>

                <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-gray-400 font-mono">
                  <span>DISPONIBILIDAD DE RED</span>
                  <span className="text-brand-red-light font-bold">99.99% SLA</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Subtle indicator of sections below */}
      <div className="w-full text-center pb-6 z-10">
        <button 
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          className="text-gray-400 hover:text-white transition-colors duration-300 animate-bounce cursor-pointer text-xs font-mono tracking-widest uppercase flex flex-col items-center gap-1 mx-auto"
        >
          <span>Explorar</span>
          <span className="material-symbols-outlined text-xs">keyboard_arrow_down</span>
        </button>
      </div>
    </section>
  );
}
