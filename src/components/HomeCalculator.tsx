import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES } from "../data";
import { Calculator, HelpCircle, ArrowRight, CheckCircle, ShieldCheck, Zap, Activity } from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function HomeCalculator() {
  const navigate = useNavigate();
  // Select which service to simulate
  const [activeServiceId, setActiveServiceId] = useState<string>("fibra-dedicada");
  const [sliderValue, setSliderValue] = useState<number>(20); // Default input parameter
  const [redundancyLevel, setRedundancyLevel] = useState<"standard" | "high" | "critical">("high");

  // Get current active service configuration
  const activeService = SERVICES.find(s => s.id === activeServiceId) || SERVICES[0];

  // Dynamically update default slider range and value based on service selection
  useEffect(() => {
    if (activeServiceId === "fibra-dedicada") {
      setSliderValue(15);
    } else if (activeServiceId === "celdas-5g") {
      setSliderValue(3);
    } else if (activeServiceId === "datacenter") {
      setSliderValue(4);
    } else {
      setSliderValue(10);
    }
  }, [activeServiceId]);

  // Max value of slider based on type
  const getSliderMax = () => {
    switch (activeServiceId) {
      case "fibra-dedicada": return 150; // km
      case "celdas-5g": return 12; // stations
      case "datacenter": return 20; // racks
      default: return 100;
    }
  };

  // Min value of slider
  const getSliderMin = () => {
    return 1;
  };

  // Helper unit label
  const getUnitSymbol = () => {
    switch (activeServiceId) {
      case "fibra-dedicada": return "Km";
      case "celdas-5g": return "Estaciones";
      case "datacenter": return "Racks";
      default: return "U";
    }
  };

  // Calculate parameters
  const baseCost = activeService.basePrice || 5000;
  const unitCost = activeService.unitPrice || 200;
  const rawSubtotal = baseCost + (unitCost * sliderValue);
  
  // Redundancy multiplier
  const getRedundancyMultiplier = () => {
    switch (redundancyLevel) {
      case "standard": return 1.0;
      case "high": return 1.25;
      case "critical": return 1.5;
    }
  };

  const totalCostEstimate = Math.round(rawSubtotal * getRedundancyMultiplier());

  // Duration in weeks calculation
  const getEstimatedDurationWeeks = () => {
    switch (activeServiceId) {
      case "fibra-dedicada":
        return Math.ceil(4 + (sliderValue * 0.4));
      case "celdas-5g":
        return Math.ceil(6 + (sliderValue * 1.5));
      case "datacenter":
        return Math.ceil(8 + (sliderValue * 2));
      default:
        return Math.ceil(3 + (sliderValue * 0.5));
    }
  };

  // SLA level
  const getSLALevel = () => {
    switch (redundancyLevel) {
      case "standard": return "99.9% SLA";
      case "high": return "99.99% SLA (Redundante N+1)";
      case "critical": return "99.999% SLA (Anillo Activo-Activo)";
    }
  };

  // Complexity estimation
  const getComplexityLevel = () => {
    const total = totalCostEstimate;
    if (total < 15000) return { label: "BAJA", color: "text-emerald-400 border-emerald-500/20 bg-emerald-950/20" };
    if (total < 40000) return { label: "MODERADA", color: "text-blue-400 border-blue-500/20 bg-blue-950/20" };
    if (total < 80000) return { label: "COMPLEJA", color: "text-amber-400 border-amber-500/20 bg-amber-950/20" };
    return { label: "CRÍTICA", color: "text-brand-red-light border-brand-red-light/20 bg-brand-red-light/10" };
  };

  const complexity = getComplexityLevel();

  // Redirect client to contact page with details prefilled
  const handleRequestQuote = () => {
    // Generate a message string to save locally or pass as query
    const message = `Deseo cotizar un proyecto de ${activeService.title} con un alcance de ${sliderValue} ${getUnitSymbol()} y nivel de redundancia ${redundancyLevel === "critical" ? "Crítico (99.999%)" : redundancyLevel === "high" ? "Alto (99.99%)" : "Estándar (99.9%)"}.`;
    sessionStorage.setItem("prefilled_quote", message);
    navigate("/contacto");
  };

  return (
    <section className="w-full bg-brand-dark py-24 border-t border-white/5 relative">
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-brand-red-light/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Calculator className="text-brand-red-light" size={18} />
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest font-bold">Simulador comfutura</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Estimador de Presupuesto e Ingeniería</h2>
          <p className="text-gray-400 mt-3 text-xs md:text-sm">
            Diseñe los parámetros iniciales de su red para obtener una estimación presupuestaria y operacional de ingeniería en tiempo real.
          </p>
        </div>

        {/* Dynamic Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls - Left */}
          <div className="lg:col-span-7 bg-brand-dark-card border border-white/5 rounded-2xl p-6 md:p-8 space-y-8 shadow-xl">
            
            {/* Service selector */}
            <div>
              <label className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-4 font-bold">
                1. Seleccione la Solución de Telecomunicaciones
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {SERVICES.filter(s => s.id !== "iot-telemetria").map(service => (
                  <button
                    key={service.id}
                    onClick={() => setActiveServiceId(service.id)}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                      activeServiceId === service.id
                        ? "bg-white/5 border-brand-red-light text-white shadow-md shadow-brand-red-light/5"
                        : "bg-black/20 border-white/5 text-gray-400 hover:text-white hover:bg-black/40 hover:border-white/10"
                    }`}
                  >
                    <span className="block font-sans text-xs font-bold leading-tight mb-1">
                      {service.title.split(" - ")[0].split(" de ")[0]}
                    </span>
                    <span className="block font-mono text-[10px] text-gray-500 truncate">
                      {service.unitLabel}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider input parameter */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block font-mono text-xs text-gray-400 uppercase tracking-wider font-bold">
                  2. Defina el Alcance del Proyecto
                </label>
                <div className="flex items-baseline gap-1 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                  <span className="font-sans text-base font-black text-brand-red-light">{sliderValue}</span>
                  <span className="font-mono text-[10px] text-gray-400">{getUnitSymbol()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <input
                  type="range"
                  min={getSliderMin()}
                  max={getSliderMax()}
                  value={sliderValue}
                  onChange={(e) => setSliderValue(parseInt(e.target.value) || 1)}
                  className="w-full h-1.5 bg-black/60 rounded-lg appearance-none cursor-pointer accent-brand-red-light"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-500">
                  <span>Mínimo: {getSliderMin()} {getUnitSymbol()}</span>
                  <span>Máximo Sugerido: {getSliderMax()} {getUnitSymbol()}</span>
                </div>
              </div>
            </div>

            {/* Redundancy / Availability SLA level selection */}
            <div>
              <label className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-4 font-bold">
                3. Nivel de Continuidad Operativa (Resiliencia)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                <button
                  onClick={() => setRedundancyLevel("standard")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    redundancyLevel === "standard"
                      ? "bg-white/5 border-white/20 text-white"
                      : "bg-black/20 border-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="block font-sans text-xs font-bold mb-1">Estándar</span>
                  <span className="block font-mono text-[9px] text-gray-500">99.9% de Disponibilidad</span>
                </button>

                <button
                  onClick={() => setRedundancyLevel("high")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    redundancyLevel === "high"
                      ? "bg-brand-blue-light/5 border-brand-blue-light/50 text-white"
                      : "bg-black/20 border-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="block font-sans text-xs font-bold text-brand-blue-light mb-1">Alta Resiliencia</span>
                  <span className="block font-mono text-[9px] text-gray-400">99.99% Redundancia N+1</span>
                </button>

                <button
                  onClick={() => setRedundancyLevel("critical")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    redundancyLevel === "critical"
                      ? "bg-brand-red-light/5 border-brand-red-light/50 text-white"
                      : "bg-black/20 border-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="block font-sans text-xs font-bold text-brand-red-light mb-1">Cero Tolerancia</span>
                  <span className="block font-mono text-[9px] text-gray-400">99.999% Doble Anillo</span>
                </button>

              </div>
            </div>

          </div>

          {/* Estimates Output Panel - Right */}
          <div className="lg:col-span-5 bg-brand-dark-card border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden h-full">
            
            {/* Cyber matrix background lines */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-brand-red-light to-brand-blue-light"></div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-white/5">
                <Activity size={16} className="text-brand-blue-light" />
                <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">Reporte de Pre-Ingeniería</h3>
              </div>

              {/* Dynamic cost display */}
              <div>
                <span className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1">Inversión Estimada Referencial</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-xl text-gray-400 font-semibold">USD</span>
                  <span className="font-sans text-3xl md:text-4xl font-black text-white tracking-tight">
                    ${totalCostEstimate.toLocaleString("en-US")}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400 ml-2">&bull; CAPEX + OPEX</span>
                </div>
                <span className="block text-[10px] text-gray-500 font-sans mt-1">
                  *Costo estimado no vinculante. Incluye ingeniería preliminar y materiales estándar.
                </span>
              </div>

              {/* Technical indicators */}
              <div className="space-y-3.5 pt-4 border-t border-white/5">
                
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-gray-400">Complejidad Técnica</span>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${complexity.color}`}>
                    {complexity.label}
                  </span>
                </div>

                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-gray-400">Plazo de Despliegue</span>
                  <span className="text-white font-bold">{getEstimatedDurationWeeks()} semanas</span>
                </div>

                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-gray-400">Compromiso SLA Min.</span>
                  <span className="text-brand-blue-light font-bold">{getSLALevel()}</span>
                </div>

                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-gray-400">Certificación ISO9001</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle size={12} /> Incluida
                  </span>
                </div>

              </div>
            </div>

            {/* Quick specifications preview block */}
            <div className="mt-8 bg-black/40 border border-white/5 rounded-xl p-4 space-y-2">
              <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Alcance Configurado</h4>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                Despliegue de <span className="font-bold text-white">{sliderValue} {getUnitSymbol()}</span> de {activeService.title} con estándares de nivel {redundancyLevel.toUpperCase()}.
              </p>
            </div>

            {/* CTA action button */}
            <button
              onClick={handleRequestQuote}
              className="mt-8 w-full bg-brand-red-light hover:bg-brand-red text-white font-medium py-3 rounded-xl text-sm transition-all duration-300 shadow-md shadow-brand-red-light/10 hover:shadow-brand-red-light/25 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Solicitar Cotización de Ingeniería
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
