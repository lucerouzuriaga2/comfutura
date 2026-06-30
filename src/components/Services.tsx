import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES } from "../data";
import { Service } from "../types";
import { 
  Cable, Radio, Server, Cpu, Calculator, Info, CheckCircle2, 
  Sparkles, FileText, Download, Send, X, ArrowUpRight, Wrench 
} from "lucide-react";

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service>(SERVICES[0]);
  const [quantity, setQuantity] = useState<number>(10);
  const [slaTarget, setSlaTarget] = useState<string>("99.99%");
  const [supportLevel, setSupportLevel] = useState<string>("24x7");
  const [isUrgent, setIsUrgent] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmittingQuote, setIsSubmittingQuote] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  // Dynamic cost calculators
  const baseCost = selectedService.basePrice;
  const unitCost = selectedService.unitPrice * quantity;
  
  // SLA multiplier
  let slaMultiplier = 1.0;
  if (slaTarget === "99.99%") slaMultiplier = 1.25;
  if (slaTarget === "99.9%") slaMultiplier = 1.1;

  // Support level cost
  const supportAddon = supportLevel === "24x7" ? 1500 : 500;

  // Urgency multiplier
  const urgencyMultiplier = isUrgent ? 1.15 : 1.0;

  // Total estimate calculation
  const totalEstimate = Math.round((baseCost + unitCost + supportAddon) * slaMultiplier * urgencyMultiplier);

  const handleServiceSelect = (serviceId: string) => {
    const s = SERVICES.find(x => x.id === serviceId);
    if (s) {
      setSelectedService(s);
      if (s.id === "telecom-equip") setQuantity(15);
      else if (s.id === "mw-links") setQuantity(3);
      else if (s.id === "fiber-optic") setQuantity(5);
      else if (s.id === "structured-cabling") setQuantity(50);
      else if (s.id === "civil-works") setQuantity(100);
      else if (s.id === "electrical-works") setQuantity(20);
      else if (s.id === "general-services") setQuantity(6);
      else setQuantity(10);

      // Scroll to calculator
      setTimeout(() => {
        const el = document.getElementById("calculator-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  const handleGeneratePDFQuote = () => {
    setIsModalOpen(true);
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingQuote(true);
    setTimeout(() => {
      setIsSubmittingQuote(false);
      setIsModalOpen(false);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000);
    }, 1500);
  };

  // Icon switcher for list
  const getIcon = (iconName: string, css: string) => {
    switch (iconName) {
      case "Cable": return <Cable className={css} size={24} />;
      case "Radio": return <Radio className={css} size={24} />;
      case "Server": return <Server className={css} size={24} />;
      case "Cpu": return <Cpu className={css} size={24} />;
      case "Wrench": return <Wrench className={css} size={24} />;
      default: return <Cable className={css} size={24} />;
    }
  };

  return (
    <section id="servicios" className="w-full bg-white py-24 relative">
      {/* Dynamic background lights */}
      <div className="absolute top-1/4 left-10 w-[200px] h-[200px] bg-brand-blue/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-brand-red-light"></span>
            <span className="font-mono text-xs text-gray-500 uppercase tracking-widest font-bold">Nuestros Servicios</span>
            <span className="w-8 h-[2px] bg-brand-red-light"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Ingeniería de Telecomunicaciones Certificada
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl text-sm md:text-base">
            Diseñamos e implementamos soluciones corporativas robustas con cumplimiento estricto de estándares internacionales de calidad y seguridad.
          </p>
        </div>

        {/* Services Grid Catalog */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6 lg:p-8 flex flex-col justify-between hover:border-brand-red-light/25 transition-all duration-300 shadow-xl relative group overflow-hidden"
            >
              {/* Corner tech lines */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-all pointer-events-none"></div>
              
              {service.image && (
                <div className="w-full h-40 mb-5 overflow-hidden rounded-xl shrink-0">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                </div>
              )}

              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 rounded-xl bg-white border border-gray-200 text-brand-red-light group-hover:text-white group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300 shadow-sm group-hover:shadow-md">
                    {getIcon(service.iconName, "")}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight group-hover:text-brand-red-light transition-colors">
                    {service.title}
                  </h3>
                </div>

                <div className="animate-fade-in flex-1">
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="border-t border-gray-200 pt-5 mb-6">
                    <h4 className="text-xs font-mono font-bold text-gray-600 uppercase tracking-wider mb-3">Características Clave</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
                          <CheckCircle2 size={13} className="text-brand-blue" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 items-center justify-between border-t border-gray-200 pt-4">
                <Link
                  to={`/servicios/${service.id}`}
                  className="text-xs font-mono tracking-wider bg-brand-blue hover:bg-brand-blue-light text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-1 font-bold shadow-sm"
                >
                  VER DETALLES
                  <ArrowUpRight size={14} />
                </Link>
                <Link
                  to="/contacto"
                  className="text-xs font-mono tracking-wider text-brand-red-light hover:text-brand-red transition-colors flex items-center gap-1 font-bold"
                >
                  SOLICITAR INFO
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Calculator Section */}
        <div id="calculator-section" className="w-full bg-gray-50 border border-gray-200 rounded-2xl shadow-2xl p-8 lg:p-12 relative overflow-hidden">
          {/* Decorative outline glow */}
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-brand-red-light via-brand-blue-light to-brand-blue"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Parameter Panel */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white border border-gray-200 text-brand-red-light">
                  <Calculator size={18} />
                </div>
                <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">
                  Cotizador Digital de Infraestructura
                </h3>
              </div>

              <p className="text-xs text-gray-500">
                Configure los parámetros estimados de su proyecto para obtener un cálculo presupuestario preliminar. Nuestro algoritmo considera tarifas de ingeniería, materiales de despliegue y niveles de SLA.
              </p>

              {/* Service Select Row */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono font-bold text-gray-600 uppercase tracking-wider">
                  Seleccione Tipo de Servicio
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleServiceSelect(s.id)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between h-20 ${
                        selectedService.id === s.id 
                          ? "bg-brand-red-light/5 border-brand-red-light text-gray-900 font-semibold" 
                          : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300 hover:text-brand-red"
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        {getIcon(s.iconName, selectedService.id === s.id ? "text-brand-red-light" : "text-gray-500")}
                        {selectedService.id === s.id && <span className="w-1.5 h-1.5 rounded-full bg-brand-red-light"></span>}
                      </div>
                      <span className="truncate w-full mt-2 font-sans text-xs">{s.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for Quantity */}
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-gray-600 uppercase">
                  <span>{selectedService.unitLabel}</span>
                  <span className="text-brand-red-light bg-brand-red-light/10 px-2 py-0.5 rounded border border-brand-red-light/20">
                    {quantity}
                  </span>
                </div>
                <input 
                  type="range"
                  min={selectedService.id === "fiber-optic" ? 2 : selectedService.id === "mw-links" ? 1 : selectedService.id === "telecom-equip" ? 1 : 10}
                  max={selectedService.id === "fiber-optic" ? 200 : selectedService.id === "mw-links" ? 30 : selectedService.id === "telecom-equip" ? 50 : 1000}
                  step={selectedService.id === "structured-cabling" ? 5 : 1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-red-light"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>Mínimo</span>
                  <span>Máximo</span>
                </div>
              </div>

              {/* Radio Group and Checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {/* SLA Selection */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono font-bold text-gray-600 uppercase tracking-wider">
                    Garantía de SLA Mínimo
                  </label>
                  <div className="grid grid-cols-3 gap-2 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                    {["99.5%", "99.9%", "99.99%"].map((sla) => (
                      <button
                        key={sla}
                        onClick={() => setSlaTarget(sla)}
                        className={`py-1.5 px-2 rounded font-mono text-[11px] text-center transition-all ${
                          slaTarget === sla 
                            ? "bg-brand-blue text-gray-900 font-bold shadow-md" 
                            : "text-gray-500 hover:text-brand-red"
                        }`}
                      >
                        {sla}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Support Levels */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono font-bold text-gray-600 uppercase tracking-wider">
                    Esquema de Soporte Técnico
                  </label>
                  <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                    {[
                      { id: "8x5", label: "Estándar 8x5" },
                      { id: "24x7", label: "SLA Crítico 24x7" }
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        onClick={() => setSupportLevel(lvl.id)}
                        className={`py-1.5 px-1 rounded text-[11px] text-center transition-all ${
                          supportLevel === lvl.id 
                            ? "bg-brand-red-light text-gray-900 font-bold shadow-md" 
                            : "text-gray-500 hover:text-brand-red"
                        }`}
                      >
                        {lvl.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Urgency Rollout Switch */}
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 p-4 rounded-xl mt-2 hover:border-gray-300 transition-colors">
                <div className="flex gap-3">
                  <div className="p-2 rounded-lg bg-brand-red-light/10 text-brand-red-light">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900">Despliegue de Emergencia / Acelerado</h4>
                    <p className="text-[10px] text-gray-500">Reduce el tiempo de entrega en un 50% aplicando doble turno de cuadrilla técnica (+15%)</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsUrgent(!isUrgent)}
                  className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${
                    isUrgent ? "bg-brand-red-light" : "bg-gray-300"
                  }`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                    isUrgent ? "translate-x-5" : "translate-x-0"
                  }`} />
                </button>
              </div>

            </div>

            {/* Right Invoice Cost Overview Panel */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-gray-200 rounded-xl p-6 lg:p-8 relative shadow-lg">
              <div>
                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest block mb-4">CÁLCULO PRESUPUESTARIO PRELIMINAR</span>
                
                <h4 className="text-sm font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                  {selectedService.title}
                </h4>

                <div className="space-y-4 font-mono text-xs text-gray-500 mb-8">
                  <div className="flex justify-between">
                    <span>Base de Ingeniería</span>
                    <span className="text-gray-900">${selectedService.basePrice.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Costo Unitario ({quantity} unidades)</span>
                    <span className="text-gray-900">${(selectedService.unitPrice * quantity).toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Soporte ({supportLevel})</span>
                    <span className="text-gray-900">${supportAddon.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Factor SLA ({slaTarget})</span>
                    <span className="text-gray-900">{slaMultiplier > 1 ? `+${Math.round((slaMultiplier-1)*100)}%` : "Sin Costo Adic."}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Factor Urgencia</span>
                    <span className="text-gray-900">{isUrgent ? "+15%" : "Estándar"}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="border-t border-gray-200 pt-6 mb-8 flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Inversión Estimada</span>
                    <span className="text-3xl font-black text-gray-900 mt-1">${totalEstimate.toLocaleString()} <span className="text-xs font-mono font-normal text-gray-500">USD</span></span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono mb-1">Sin impuestos (IGV)</span>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleGeneratePDFQuote}
                    className="w-full bg-brand-red-light hover:bg-brand-red text-gray-900 py-3 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FileText size={14} />
                    Generar Cotización Formal
                  </button>
                  <p className="text-[10px] text-gray-500 font-sans text-center">
                    *Esta estimación no representa un contrato de servicios formal y requiere verificación de topografía y campo por un especialista de Comfutura.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* PDF Simulation Overlay Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-white/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-zinc-900 rounded-xl p-8 max-w-2xl w-full shadow-2xl relative border-t-8 border-brand-red-light font-sans"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Quote Header */}
              <div className="flex justify-between items-start border-b border-zinc-200 pb-6 mb-6">
                <div>
                  <img 
                    alt="Comfutura Logo Dark" 
                    className="h-10 w-auto object-contain mb-3" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsV_vqm4n0GRIEvIuNifAjdWtYd9w4vgC-h7CLRzh1R8IDiEF01Dh6XEgSCX3p4ORcZMXV6ucRqb1w3OXPY5T3mjUQJsXerxabaV_sItY34D1oyBMiWFrBvkvAOI3jaFDFQog8HYXkdKt69KPKQZxBhvSY3j6nVpJXA0M_Z3Lz_-cClW0wyH_w-3Hs-2CsWaj4XRMpwD76Uwduv_6rfnEVL-qe8qunGjE1IBIhhbkGdwJdyL2RF5NwRW1fpp6DcFb7B5EERyBj_uM"
                    referrerPolicy="no-referrer"
                  />
                  <p className="text-xs text-zinc-500 font-mono">COMUNICACIÓN FUTURA S.A.C.<br/>R.U.C. 20546879135</p>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-brand-red-light/10 text-brand-red font-mono font-bold px-2.5 py-1 rounded">PRESUPUESTO #CF-2026-0982</span>
                  <p className="text-xs text-zinc-500 mt-2 font-mono">Fecha: 27 Jun, 2026<br/>Validez: 30 Días</p>
                </div>
              </div>

              {/* Client submission form directly inside invoice simulation */}
              <form onSubmit={handleSendQuote} className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-blue mb-3">DATOS DE CONTACTO PARA REVISIÓN</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-500 font-semibold font-mono uppercase">Razón Social o Nombre</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="Ej. Corporación Minera S.A." 
                        className="p-2 border border-zinc-200 rounded text-xs bg-zinc-50 focus:bg-white text-zinc-800 outline-none focus:ring-1 focus:ring-brand-blue" 
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-zinc-500 font-semibold font-mono uppercase">Correo de Negocio</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="ejemplo@empresa.com" 
                        className="p-2 border border-zinc-200 rounded text-xs bg-zinc-50 focus:bg-white text-zinc-800 outline-none focus:ring-1 focus:ring-brand-blue" 
                      />
                    </div>
                  </div>
                </div>

                {/* Items Summary list */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-blue mb-3">DESCRIPCIÓN DEL PROYECTO ESTIMADO</h4>
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="bg-zinc-100 font-mono text-zinc-500 uppercase text-left border-b border-zinc-200">
                        <th className="py-2 px-3">Servicio</th>
                        <th className="py-2 px-3 text-right">Cantidad</th>
                        <th className="py-2 px-3 text-right">Base</th>
                        <th className="py-2 px-3 text-right">Estimado Total</th>
                      </tr>
                    </thead>
                    <tbody className="text-zinc-700 font-mono">
                      <tr className="border-b border-zinc-100">
                        <td className="py-3 px-3 font-sans font-bold text-zinc-900">{selectedService.title}</td>
                        <td className="py-3 px-3 text-right">{quantity} {selectedService.unitLabel.toLowerCase()}</td>
                        <td className="py-3 px-3 text-right">${selectedService.basePrice.toLocaleString()}</td>
                        <td className="py-3 px-3 text-right font-bold text-zinc-900">${totalEstimate.toLocaleString()} USD</td>
                      </tr>
                      <tr className="bg-zinc-50">
                        <td colSpan={3} className="py-3 px-3 text-right font-bold text-zinc-500">Parámetros adicionales:</td>
                        <td className="py-3 px-3 text-right text-[10px] text-zinc-600">SLA: {slaTarget} / Soporte: {supportLevel} {isUrgent ? "/ Urgente" : ""}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Submit actions */}
                <div className="flex items-center justify-between border-t border-zinc-200 pt-6">
                  <div className="text-xs text-zinc-500 max-w-sm">
                    Al enviar esta cotización, un Ingeniero de Proyectos de Comfutura se contactará en menos de 2 horas hábiles.
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        window.print();
                      }}
                      className="px-4 py-2 border border-zinc-300 rounded text-xs font-semibold hover:bg-zinc-100 text-zinc-700 transition-colors flex items-center gap-1"
                    >
                      <Download size={13} />
                      Imprimir/Guardar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmittingQuote}
                      className="px-6 py-2 bg-brand-red hover:bg-brand-red-light text-gray-900 rounded text-xs font-semibold shadow-md transition-colors flex items-center gap-2"
                    >
                      {isSubmittingQuote ? "Enviando..." : "Enviar a Comfutura"}
                      <Send size={13} />
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-50 border border-green-200 text-green-900 rounded-xl p-4 shadow-xl max-w-sm animate-fade-in flex gap-3 items-center">
          <div className="p-2 rounded bg-green-100 text-green-600">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <h4 className="text-xs font-semibold">¡Cotización Enviada con Éxito!</h4>
            <p className="text-[10px] text-green-700">Un Ingeniero de Ventas se contactará pronto.</p>
          </div>
        </div>
      )}

    </section>
  );
}
