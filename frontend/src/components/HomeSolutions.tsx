import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SERVICES, PROJECTS } from "../data";
import { ArrowRight, ShieldCheck, MapPin, Radio, Cpu, Network, Server, ArrowUpRight, Wrench } from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function HomeSolutions() {
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState<string>("Lima");

  const coverageNodes = [
    {
      name: "Lima",
      region: "Costa Central",
      altitude: "154 msnm",
      type: "Anillo Troncal DWDM",
      latency: "1.8 ms",
      status: "OPERATIVO",
      load: "74%",
      details: "Nodo concentrador de fibra óptica metropolitana. Conexión redundante directa con cables submarinos del Pacífico."
    },
    {
      name: "Arequipa",
      region: "Sierra Sur",
      altitude: "2,325 msnm",
      type: "Estación Microondas",
      latency: "4.2 ms",
      status: "OPERATIVO",
      load: "45%",
      details: "Enlace troncal de alta montaña. Provee conectividad de ultra-baja latencia a importantes operaciones mineras en el corredor del sur."
    },
    {
      name: "Junín",
      region: "Sierra Central",
      altitude: "4,800 msnm",
      type: "Celda Privada LTE",
      latency: "5.5 ms",
      status: "OPERATIVO",
      load: "61%",
      details: "Estación base robustecida a condiciones climáticas extremas. Soporta el sistema de acarreo autónomo minero."
    },
    {
      name: "Loreto",
      region: "Selva Norte",
      altitude: "106 msnm",
      type: "Satélite LEO / RF",
      latency: "28.4 ms",
      status: "MANTENIMIENTO",
      load: "30%",
      details: "Estación híbrida satelital. Mantenimiento preventivo programado de enlaces de microondas de respaldo."
    }
  ];

  const activeNode = coverageNodes.find(n => n.name === selectedNode) || coverageNodes[0];

  return (
    <section className="w-full bg-white py-24 border-t border-gray-200 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Solutions Grid Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-brand-red-light"></span>
              <span className="font-mono text-xs text-gray-500 uppercase tracking-widest font-bold">Líneas de Negocio</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Especialización de Misión Crítica</h2>
            <p className="text-gray-600 mt-2 max-w-xl text-xs md:text-sm">
              Conectamos los frentes más complejos de la industria nacional a través de soluciones robustas.
            </p>
          </div>

          <button
            onClick={() => navigate("/servicios")}
            className="group inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-red-light hover:text-brand-red transition-colors"
          >
            Ver todos los servicios
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Featured Service Categories Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {SERVICES.map((service, idx) => {
            const iconsMap: Record<string, React.ReactNode> = {
              Cable: <Network className="text-brand-red-light" size={20} />,
              Radio: <Radio className="text-brand-blue-light" size={20} />,
              Server: <Server className="text-brand-red-light" size={20} />,
              Cpu: <Cpu className="text-brand-blue-light" size={20} />,
              Wrench: <Wrench className="text-amber-500" size={20} />
            };

            return (
              <div
                key={service.id}
                onClick={() => navigate("/servicios")}
                className="bg-gray-50 border border-gray-200 hover:border-brand-red-light/40 p-6 rounded-2xl flex flex-col justify-between h-72 cursor-pointer transition-all duration-300 group shadow-md hover:shadow-lg"
              >
                <div>
                  <div className="p-3 bg-white border border-gray-200 rounded-xl w-fit mb-6 shadow-sm">
                    {iconsMap[service.iconName] || <Network size={20} />}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug group-hover:text-brand-red-light transition-colors line-clamp-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-brand-blue font-mono group-hover:translate-x-1 transition-transform mt-4 font-semibold">
                  <span>Explorar detalles</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Coverage map and Interactive status section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pt-8 border-t border-gray-200">
          
          {/* Node Selector and map mock */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 shadow-md">
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-600 font-mono text-[10px] tracking-wider uppercase font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                NOC Principal: En Línea
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Red Nacional de Telecomunicaciones</h3>
              <p className="text-xs text-gray-600 mb-8 max-w-md">
                Supervisamos constantemente el rendimiento y latencia de nuestros anillos de fibra y nodos satelitales en todo el territorio.
              </p>
            </div>

            {/* Simulated Interactive GIS map representation */}
            <div className="relative h-60 bg-gray-100 rounded-xl border border-gray-200 overflow-hidden p-4 mb-6 flex flex-col justify-between">
              {/* GIS Grid pattern overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

              {/* Central Andes Line connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Connecting lines from Lima to other points */}
                <path d="M 80 80 Q 150 70 230 110" fill="none" stroke="rgba(46, 143, 206, 0.3)" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M 80 80 Q 180 130 310 150" fill="none" stroke="rgba(228, 31, 27, 0.3)" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M 80 80 Q 110 120 180 160" fill="none" stroke="rgba(46, 143, 206, 0.3)" strokeWidth="1.5" strokeDasharray="4 2" />
              </svg>

              {/* Geographic custom nodes pins */}
              <div className="relative z-10 flex-1 flex justify-around items-center">
                
                {/* Lima Node */}
                <button
                  onClick={() => setSelectedNode("Lima")}
                  className={`absolute left-[20%] top-[40%] flex flex-col items-center gap-1.5 group transition-all ${
                    selectedNode === "Lima" ? "scale-110" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <span className="w-3 h-3 bg-brand-red-light rounded-full ring-4 ring-brand-red-light/30 flex items-center justify-center relative">
                    <span className="absolute inset-0 bg-brand-red-light rounded-full animate-ping opacity-75"></span>
                  </span>
                  <span className="font-mono text-[9px] text-white bg-black/80 px-1.5 py-0.5 rounded border border-white/10 uppercase tracking-wider font-bold">
                    LIMA
                  </span>
                </button>

                {/* Loreto Node */}
                <button
                  onClick={() => setSelectedNode("Loreto")}
                  className={`absolute left-[55%] top-[25%] flex flex-col items-center gap-1.5 group transition-all ${
                    selectedNode === "Loreto" ? "scale-110" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <span className="w-3 h-3 bg-amber-500 rounded-full ring-4 ring-amber-500/30 flex items-center justify-center relative">
                    <span className="absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-75"></span>
                  </span>
                  <span className="font-mono text-[9px] text-white bg-black/80 px-1.5 py-0.5 rounded border border-white/10 uppercase tracking-wider font-bold">
                    LORETO
                  </span>
                </button>

                {/* Junín Node */}
                <button
                  onClick={() => setSelectedNode("Junín")}
                  className={`absolute left-[40%] top-[65%] flex flex-col items-center gap-1.5 group transition-all ${
                    selectedNode === "Junín" ? "scale-110" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <span className="w-3 h-3 bg-brand-red-light rounded-full ring-4 ring-brand-red-light/30 flex items-center justify-center relative">
                    <span className="absolute inset-0 bg-brand-red-light rounded-full animate-ping opacity-75"></span>
                  </span>
                  <span className="font-mono text-[9px] text-white bg-black/80 px-1.5 py-0.5 rounded border border-white/10 uppercase tracking-wider font-bold">
                    JUNÍN
                  </span>
                </button>

                {/* Arequipa Node */}
                <button
                  onClick={() => setSelectedNode("Arequipa")}
                  className={`absolute left-[75%] top-[75%] flex flex-col items-center gap-1.5 group transition-all ${
                    selectedNode === "Arequipa" ? "scale-110" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <span className="w-3 h-3 bg-brand-red-light rounded-full ring-4 ring-brand-red-light/30 flex items-center justify-center relative">
                    <span className="absolute inset-0 bg-brand-red-light rounded-full animate-ping opacity-75"></span>
                  </span>
                  <span className="font-mono text-[9px] text-white bg-black/80 px-1.5 py-0.5 rounded border border-white/10 uppercase tracking-wider font-bold">
                    AREQUIPA
                  </span>
                </button>

              </div>

              <div className="flex justify-between items-end relative z-10 text-[8px] font-mono text-gray-500">
                <span>COORD: GIS WGS84 &bull; PERÚ REGIONAL</span>
                <span>Haga clic en un nodo para auditar</span>
              </div>
            </div>

            {/* Quick selectors row */}
            <div className="flex flex-wrap gap-2">
              {coverageNodes.map(node => (
                <button
                  key={node.name}
                  onClick={() => setSelectedNode(node.name)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors ${
                    selectedNode === node.name
                      ? "bg-brand-red-light text-white font-bold"
                      : "bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {node.name}
                </button>
              ))}
            </div>
          </div>

          {/* Node Selected details card */}
          <div className="lg:col-span-5 bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">{activeNode.region}</span>
                  <h4 className="text-base font-bold text-gray-900 tracking-tight">Nodo {activeNode.name}</h4>
                </div>
                <span className={`px-2.5 py-1 text-[9px] font-mono font-bold tracking-widest rounded border ${
                  activeNode.status === "OPERATIVO"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                    : "bg-amber-50 border-amber-200 text-amber-600"
                }`}>
                  {activeNode.status}
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-500">Altitud de Instalación</span>
                  <span className="text-gray-900 font-semibold">{activeNode.altitude}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tecnología de Enlace</span>
                  <span className="text-gray-900 font-semibold">{activeNode.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Latencia de Red (NOC)</span>
                  <span className="text-brand-blue font-bold">{activeNode.latency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Carga Operacional</span>
                  <span className="text-gray-900 font-semibold">{activeNode.load}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                  {activeNode.details}
                </p>
              </div>
            </div>

            {/* SLA badge bottom */}
            <div className="border-t border-gray-200 pt-6 mt-8 flex items-center gap-3">
              <div className="p-2.5 bg-brand-red-light/10 text-brand-red-light rounded-xl">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h5 className="text-xs font-bold text-gray-900">SLA Contractual Comprometido</h5>
                <p className="text-[10px] text-gray-500 font-mono">Disponibilidad del 99.99% del servicio</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
