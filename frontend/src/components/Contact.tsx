import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2, Navigation } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  // Check for prefilled quote from the interactive homepage calculator
  useEffect(() => {
    const prefilled = sessionStorage.getItem("prefilled_quote");
    if (prefilled) {
      setMessage(prefilled);
      setSubject("Solicitud de Cotización de Pre-Ingeniería");
      // Remove it from storage so it does not persist incorrectly
      sessionStorage.removeItem("prefilled_quote");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delivery
    setTimeout(() => {
      setIsSubmitting(false);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }, 1500);
  };

  return (
    <section id="contacto" className="w-full bg-white py-24 border-t border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-brand-red-light"></span>
            <span className="font-mono text-xs text-gray-500 uppercase tracking-widest font-bold">Contacto</span>
            <span className="w-8 h-[2px] bg-brand-red-light"></span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Escríbenos al Centro Técnico</h2>
          <p className="text-gray-500 mt-3 max-w-2xl text-xs md:text-sm">
            ¿Tiene un requerimiento técnico o de cotización mayor de infraestructura? Complete nuestro formulario y nuestro departamento comercial le contactará de manera inmediata.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Technical Details */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Información de Enlace</h3>
            
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-sans">
              Para visitas comerciales corporativas e inspección de laboratorios técnicos, visítenos en nuestra oficina central en La Victoria, o contáctenos por nuestros canales autorizados.
            </p>

            <div className="space-y-6 font-mono text-xs">
              
              {/* Office Address */}
              <div className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="p-2 bg-brand-red-light/10 text-brand-red-light rounded-lg shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Oficina Central</h4>
                  <span className="text-gray-900 font-sans text-xs">Hector Arellano 125, La Victoria, Lima - Perú</span>
                </div>
              </div>

              {/* Email support */}
              <div className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="p-2 bg-brand-blue/15 text-brand-blue rounded-lg shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Mesa de Partes Virtual</h4>
                  <a href="mailto:omasias@comfutura.com" className="text-gray-900 hover:text-brand-red-light transition-colors font-sans text-xs">omasias@comfutura.com</a>
                </div>
              </div>

              {/* Phone center */}
              <div className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="p-2 bg-brand-red-light/10 text-brand-red-light rounded-lg shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Central Telefónica Comercial</h4>
                  <span className="text-gray-900 font-sans text-xs">+51 993 585 214 &bull; Contacto Comercial</span>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex gap-4 items-start bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="p-2 bg-brand-blue/15 text-brand-blue rounded-lg shrink-0">
                  <Clock size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Horario de Atención</h4>
                  <span className="text-gray-900 font-sans text-xs">Lunes a Viernes 08:30 - 18:30 hrs</span>
                </div>
              </div>

            </div>

            {/* Stylized custom mock light map layout */}
            <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
              {/* Light canvas with digital lines to simulate GIS mapping */}
              <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                <div className="absolute w-24 h-24 bg-brand-red-light/20 rounded-full blur-xl animate-pulse"></div>
                
                {/* Visual office pinpoint */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-red-light flex items-center justify-center text-white ring-4 ring-brand-red-light/30 relative animate-bounce">
                    <Navigation size={14} className="rotate-45" />
                  </div>
                  <span className="font-mono text-[9px] text-gray-800 uppercase tracking-widest font-bold bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md border border-gray-300 shadow-md">COMFUTURA CENTRAL (LA VICTORIA)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interaction Form */}
          <div className="lg:col-span-7 bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 shadow-2xl relative">
            <h3 className="text-base font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">Formulario de Contacto Comercial</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-gray-500">Razón Social / Nombre Completo</label>
                  <input 
                    required
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Juan Pérez / Corporación Alfa" 
                    className="bg-white border border-gray-200 p-3 rounded-lg text-xs text-gray-900 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-shadow" 
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-gray-500">Correo Electrónico Corporativo</label>
                  <input 
                    required
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@empresa.com" 
                    className="bg-white border border-gray-200 p-3 rounded-lg text-xs text-gray-900 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-shadow" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-gray-500">Asunto de Consulta</label>
                <input 
                  required
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ej. Requerimiento de tendido de fibra para mina" 
                  className="bg-white border border-gray-200 p-3 rounded-lg text-xs text-gray-900 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-shadow" 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono text-gray-500">Mensaje o Requerimiento Técnico</label>
                <textarea 
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describa brevemente las especificaciones, distancias estimadas, plazos, etc." 
                  className="bg-white border border-gray-200 p-3 rounded-lg text-xs text-gray-900 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 transition-shadow resize-none" 
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-red-light hover:bg-brand-red text-gray-900 py-3 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2"
              >
                <Send size={14} />
                {isSubmitting ? "Enviando..." : "Enviar Mensaje Directo"}
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* SUCCESS TOAST MESSAGE */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-50 border border-green-200 text-green-900 rounded-xl p-4 shadow-xl max-w-sm animate-fade-in flex gap-3 items-center">
          <div className="p-2 rounded bg-green-100 text-green-600">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <h4 className="text-xs font-semibold">¡Mensaje Recibido!</h4>
            <p className="text-[10px] text-green-700">Hemos enviado su requerimiento técnico al área comercial.</p>
          </div>
        </div>
      )}

    </section>
  );
}
