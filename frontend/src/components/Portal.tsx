import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SupportTicket, TelemetryData } from "../types";
import { 
  Lock, LayoutDashboard, Radio, Activity, HelpCircle, 
  Download, Send, Plus, CheckCircle, Clock, AlertTriangle, 
  ChevronRight, RefreshCw, LogOut, ArrowRight, Server, ShieldCheck 
} from "lucide-react";

export default function Portal() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");

  // Ticket system state
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "TK-2026-441",
      subject: "Alineación de Antena Backhaul - Nodo Toromocho",
      priority: "Alta",
      category: "Equipamiento",
      status: "RESUELTO",
      date: "22 Jun, 2026",
      messages: [
        { sender: "Cliente", text: "Reportamos una leve fluctuación de señal en el enlace de microondas principal.", timestamp: "10:30 AM" },
        { sender: "Soporte Comfutura", text: "Entendido. Una cuadrilla técnica de campo realizó el reajuste físico del mástil. Señal estabilizada a -52dBm.", timestamp: "11:45 AM" }
      ]
    },
    {
      id: "TK-2026-445",
      subject: "Mantenimiento Preventivo Trimestral - Sala Servidores",
      priority: "Media",
      category: "Fibra Óptica",
      status: "EN PROCESO",
      date: "26 Jun, 2026",
      messages: [
        { sender: "Soporte Comfutura", text: "Programado para las 23:00 hrs de hoy. No habrá interrupción de tráfico por bypass redundante.", timestamp: "08:15 AM" }
      ]
    }
  ]);

  const [newTicketSubject, setNewTicketSubject] = useState<string>("");
  const [newTicketCategory, setNewTicketCategory] = useState<string>("Conectividad");
  const [newTicketPriority, setNewTicketPriority] = useState<string>("Media");
  const [newTicketDesc, setNewTicketDesc] = useState<string>("");
  const [showCreateTicket, setShowCreateTicket] = useState<boolean>(false);

  // Active tickets selector
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState<string>("");

  // Telemetry real-time loop state
  const [telemetry, setTelemetry] = useState<TelemetryData[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState<TelemetryData>({
    timestamp: "16:24:00",
    latencyMs: 4.2,
    bandwidthMbps: 1245.8,
    packetLossPercent: 0.00,
    activeNodes: 14
  });

  const [activeTab, setActiveTab] = useState<"dashboard" | "tickets" | "invoices">("dashboard");

  // Invoices list
  const invoices = [
    { id: "FAC-0982-26", period: "Junio 2026", amount: "$32,450.00 USD", status: "PAGADO", dueDate: "30 Jun, 2026" },
    { id: "FAC-0871-26", period: "Mayo 2026", amount: "$32,450.00 USD", status: "PAGADO", dueDate: "30 May, 2026" },
    { id: "FAC-0750-26", period: "Abril 2026", amount: "$15,800.00 USD", status: "PAGADO", dueDate: "30 Abr, 2026" }
  ];

  // Initialize Telemetry Data history (10 points)
  useEffect(() => {
    const initialData: TelemetryData[] = [];
    const now = new Date();
    for (let i = 9; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 15000);
      initialData.push({
        timestamp: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        latencyMs: Number((3.5 + Math.random() * 1.5).toFixed(1)),
        bandwidthMbps: Number((1200 + Math.random() * 80).toFixed(1)),
        packetLossPercent: Math.random() > 0.95 ? 0.01 : 0.00,
        activeNodes: 14
      });
    }
    setTelemetry(initialData);
  }, []);

  // Update telemetry in real-time every 3 seconds
  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      const newPoint: TelemetryData = {
        timestamp: timeStr,
        latencyMs: Number((3.5 + Math.random() * 1.5).toFixed(1)),
        bandwidthMbps: Number((1200 + Math.random() * 80).toFixed(1)),
        packetLossPercent: Math.random() > 0.95 ? 0.01 : 0.00,
        activeNodes: 14
      };

      setTelemetry(prev => {
        const sliced = prev.slice(1);
        return [...sliced, newPoint];
      });
      setCurrentMetrics(newPoint);
    }, 3000);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    // Simulate database credentials verify
    setTimeout(() => {
      if (username.trim().toLowerCase() === "demo" || username.trim().toLowerCase() === "chinalco") {
        setIsLoggedIn(true);
        setIsLoggingIn(false);
      } else {
        setLoginError("Credenciales no válidas. Use 'demo' como usuario para ingresar de manera directa.");
        setIsLoggingIn(false);
      }
    }, 1200);
  };

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim() || !newTicketDesc.trim()) return;

    const ticketId = `TK-2026-${Math.floor(450 + Math.random() * 100)}`;
    const now = new Date();
    const newTicket: SupportTicket = {
      id: ticketId,
      subject: newTicketSubject,
      category: newTicketCategory as any,
      priority: newTicketPriority as any,
      status: "ABIERTO",
      date: now.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' }),
      messages: [
        { sender: "Cliente", text: newTicketDesc, timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]
    };

    setTickets([newTicket, ...tickets]);
    setNewTicketSubject("");
    setNewTicketDesc("");
    setShowCreateTicket(false);

    // Auto support responder simulator after 4 seconds
    setTimeout(() => {
      setTickets(prev => 
        prev.map(t => {
          if (t.id === ticketId) {
            return {
              ...t,
              status: "EN PROCESO",
              messages: [
                ...t.messages,
                { 
                  sender: "Soporte Comfutura", 
                  text: `Hola, hemos recibido su incidencia de categoría ${newTicketCategory}. Un Ingeniero de Nivel 2 ha sido asignado para verificar la conexión de su nodo de inmediato. Le mantendremos informado por esta vía.`, 
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                }
              ]
            };
          }
          return t;
        })
      );
    }, 4000);
  };

  const handleTicketReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;

    const now = new Date();
    const userMsg = {
      sender: "Cliente" as const,
      text: replyText,
      timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedTicket = {
      ...selectedTicket,
      messages: [...selectedTicket.messages, userMsg]
    };

    setSelectedTicket(updatedTicket);
    setTickets(prev => prev.map(t => t.id === selectedTicket.id ? updatedTicket : t));
    setReplyText("");

    // Support automatic responder
    setTimeout(() => {
      const supportMsg = {
        sender: "Soporte Comfutura" as const,
        text: "Mensaje recibido por el NOC de Comfutura. Estamos procesando la información adjunta para brindarle una respuesta técnica definitiva.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setTickets(prev => 
        prev.map(t => {
          if (t.id === selectedTicket.id) {
            const nextTicket = {
              ...t,
              messages: [...t.messages, supportMsg]
            };
            if (selectedTicket.id === t.id) {
              setSelectedTicket(nextTicket);
            }
            return nextTicket;
          }
          return t;
        })
      );
    }, 3000);
  };

  return (
    <section className="w-full min-h-screen bg-white pt-32 pb-24 px-4 md:px-8 lg:px-16 flex flex-col items-center justify-center relative">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
      
      {/* Dynamic light */}
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        
        {/* LOGGED OUT: Access Screen */}
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Glowing header bar */}
              <div className="absolute top-0 left-0 w-full h-[4px] bg-brand-red-light"></div>
              
              <div className="flex flex-col items-center text-center mb-8">
                <img 
                  alt="Comfutura Logo" 
                  className="h-10 w-auto object-contain mb-4" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsV_vqm4n0GRIEvIuNifAjdWtYd9w4vgC-h7CLRzh1R8IDiEF01Dh6XEgSCX3p4ORcZMXV6ucRqb1w3OXPY5T3mjUQJsXerxabaV_sItY34D1oyBMiWFrBvkvAOI3jaFDFQog8HYXkdKt69KPKQZxBhvSY3j6nVpJXA0M_Z3Lz_-cClW0wyH_w-3Hs-2CsWaj4XRMpwD76Uwduv_6rfnEVL-qe8qunGjE1IBIhhbkGdwJdyL2RF5NwRW1fpp6DcFb7B5EERyBj_uM"
                  referrerPolicy="no-referrer"
                />
                <h2 className="text-xl font-bold text-gray-900">Portal de Autogestión Cliente</h2>
                <p className="text-xs text-gray-500 mt-1">Monitoreo de SLAs, telemetría y tickets de soporte NOC 24/7</p>
              </div>

              {loginError && (
                <div className="mb-5 p-3.5 bg-brand-red-light/10 border border-brand-red-light/30 rounded-lg flex items-start gap-2.5 text-xs text-red-300">
                  <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-gray-500">Usuario Corporativo</label>
                  <input 
                    required
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Escriba 'demo'" 
                    className="bg-black/40 border border-gray-200 p-3 rounded-lg text-xs text-gray-900 outline-none focus:border-brand-blue-light" 
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-gray-500">Contraseña de Acceso</label>
                  <input 
                    required
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Escriba lo que sea" 
                    className="bg-black/40 border border-gray-200 p-3 rounded-lg text-xs text-gray-900 outline-none focus:border-brand-blue-light" 
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-brand-red-light hover:bg-brand-red text-gray-900 py-3 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  <Lock size={14} />
                  {isLoggingIn ? "Autenticando..." : "Ingresar de forma segura"}
                </button>
              </form>

              {/* Demo Help */}
              <div className="mt-6 border-t border-gray-200 pt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setUsername("demo");
                    setPassword("comfutura2026");
                  }}
                  className="text-[11px] font-mono text-brand-blue hover:text-brand-red transition-colors uppercase font-bold"
                >
                  Autocompletar credenciales de demostración
                </button>
              </div>
            </motion.div>
          ) : (
            
            /* LOGGED IN: Dashboard View */
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]"
            >
              
              {/* Dashboard Sidebar Navigation */}
              <div className="md:w-64 bg-black/40 border-b md:border-b-0 md:border-r border-gray-200 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
                    <div className="w-8 h-8 rounded bg-brand-blue/15 flex items-center justify-center text-brand-blue">
                      <Server size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 truncate uppercase font-mono">Consola Cliente</h4>
                      <p className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        CONECTADO NOC
                      </p>
                    </div>
                  </div>

                  <nav className="flex flex-col gap-2">
                    {[
                      { id: "dashboard", label: "Estado y Telemetría", icon: <LayoutDashboard size={15} /> },
                      { id: "tickets", label: "Tickets de Soporte", icon: <HelpCircle size={15} /> },
                      { id: "invoices", label: "Facturas y Consumo", icon: <Download size={15} /> }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => {
                          setActiveTab(btn.id as any);
                          setSelectedTicket(null);
                        }}
                        className={`w-full py-2.5 px-3.5 rounded-lg text-xs font-medium flex items-center gap-3 transition-colors ${
                          activeTab === btn.id 
                            ? "bg-brand-red-light/10 text-brand-red-light border-l-2 border-brand-red-light font-semibold" 
                            : "text-gray-500 hover:bg-white hover:text-brand-red"
                        }`}
                      >
                        {btn.icon}
                        <span>{btn.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-4">
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="w-full py-2 px-3 rounded-lg text-xs font-mono font-bold text-gray-500 hover:text-brand-red-light hover:bg-brand-red-light/5 transition-all flex items-center gap-3"
                  >
                    <LogOut size={14} />
                    Cerrar Sesión
                  </button>
                </div>
              </div>

              {/* Dashboard Content Container */}
              <div className="flex-1 p-6 md:p-8 flex flex-col">
                
                {activeTab === "dashboard" && (
                  <div className="space-y-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">Monitoreo de Infraestructura</h3>
                          <p className="text-xs text-gray-500 mt-0.5">Muestra telemetría de red activa en tiempo real</p>
                        </div>
                        <div className="bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 rounded-lg px-3 py-1 text-xs font-mono flex items-center gap-1.5">
                          <ShieldCheck size={14} />
                          Disponibilidad SLA: 99.985%
                        </div>
                      </div>

                      {/* Dynamic Live telemetry metrics indicators */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                        {[
                          { label: "Latencia Red (Ping)", value: `${currentMetrics.latencyMs} ms`, status: "Excelente", color: "text-emerald-400" },
                          { label: "Ancho Banda", value: `${currentMetrics.bandwidthMbps.toFixed(1)} Mbps`, status: "Estable", color: "text-brand-blue" },
                          { label: "Pérdida Paquetes", value: `${currentMetrics.packetLossPercent}%`, status: "Óptimo", color: "text-emerald-400" },
                          { label: "Nodos Conectados", value: `${currentMetrics.activeNodes} / 14`, status: "Todo Online", color: "text-gray-900" }
                        ].map((m, i) => (
                          <div key={i} className="bg-black/35 border border-gray-200 p-4 rounded-xl flex flex-col justify-between h-24">
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">{m.label}</span>
                            <div className="mt-2">
                              <span className={`text-xl font-bold font-mono ${m.color}`}>{m.value}</span>
                              <span className="text-[9px] font-mono text-gray-500 block mt-1 uppercase">&bull; {m.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Live Updating SVG Line Chart */}
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-mono text-gray-600 flex items-center gap-2">
                            <Activity size={14} className="text-brand-red-light animate-pulse" />
                            Histograma de Ancho de Banda (Tiempo Real)
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono">Actualiza cada 3s</span>
                        </div>

                        {telemetry.length > 0 ? (
                          <div className="relative h-44 w-full">
                            {/* Simple inline SVG representation of line chart */}
                            <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                              {/* Grid lines */}
                              <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                              <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                              <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                              {/* Gradient Area below line */}
                              <path
                                d={`M 0 100 ${telemetry.map((t, idx) => {
                                  const x = (idx / 9) * 500;
                                  // Scale bandwidth 1200-1300 to y 80-20
                                  const y = 90 - ((t.bandwidthMbps - 1180) / 110) * 80;
                                  return `L ${x} ${y}`;
                                }).join(" ")} L 500 100 Z`}
                                fill="url(#blueGrad)"
                                opacity="0.1"
                              />

                              {/* The line path */}
                              <path
                                d={telemetry.map((t, idx) => {
                                  const x = (idx / 9) * 500;
                                  const y = 90 - ((t.bandwidthMbps - 1180) / 110) * 80;
                                  return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
                                }).join(" ")}
                                fill="none"
                                stroke="#2e8fce"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                              />

                              {/* Data circles */}
                              {telemetry.map((t, idx) => {
                                const x = (idx / 9) * 500;
                                const y = 90 - ((t.bandwidthMbps - 1180) / 110) * 80;
                                return (
                                  <circle
                                    key={idx}
                                    cx={x}
                                    cy={y}
                                    r="3"
                                    fill="#e41f1b"
                                    className="hover:scale-150 transition-all cursor-pointer"
                                    title={`${t.bandwidthMbps} Mbps a las ${t.timestamp}`}
                                  />
                                );
                              })}

                              {/* Gradients declarations */}
                              <defs>
                                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#2e8fce" />
                                  <stop offset="100%" stopColor="transparent" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <div className="absolute bottom-0 left-0 w-full flex justify-between text-[8px] font-mono text-gray-500 mt-2">
                              <span>Hace 2.5 min</span>
                              <span>Tiempo Real</span>
                            </div>
                          </div>
                        ) : (
                          <div className="h-44 w-full flex items-center justify-center text-xs text-gray-500 font-mono">
                            Cargando datos del NOC...
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Active SLA Summary info banner */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center gap-4 mt-auto">
                      <div className="flex gap-3">
                        <div className="p-2 rounded-lg bg-brand-blue/15 text-brand-blue">
                          <Radio size={16} />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-gray-900">Servicio Activo Contractual</h4>
                          <p className="text-[10px] text-gray-500 font-mono">Enlace Troncal de Fibra Dedicada - Sede Corporativa Sur (Junín)</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase font-bold">
                        ESTADO OPTIMO (No Alerts)
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === "tickets" && (
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Gestión de Incidencias NOC</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Abra y gestione solicitudes con el centro de soporte</p>
                      </div>
                      
                      {!showCreateTicket && !selectedTicket && (
                        <button
                          onClick={() => setShowCreateTicket(true)}
                          className="bg-brand-red-light hover:bg-brand-red text-gray-900 px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-colors flex items-center gap-1.5"
                        >
                          <Plus size={14} />
                          Nuevo Ticket
                        </button>
                      )}
                    </div>

                    {/* CREATE TICKET SCREEN */}
                    {showCreateTicket ? (
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-blue mb-4">Apertura de Incidencia Técnica</h4>
                        <form onSubmit={handleCreateTicketSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-mono text-gray-500">Categoría Técnica</label>
                              <select 
                                value={newTicketCategory}
                                onChange={(e) => setNewTicketCategory(e.target.value)}
                                className="bg-black/60 border border-gray-200 p-2.5 rounded-lg text-xs text-gray-900 outline-none"
                              >
                                <option value="Conectividad">Conectividad de Red</option>
                                <option value="Fibra Óptica">Rotura o Atenuación Fibra</option>
                                <option value="Equipamiento">Falla de Equipamiento (Switch/Router)</option>
                                <option value="Facturación">Discrepancia en Facturación</option>
                                <option value="Otros">Otras Consultas</option>
                              </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-mono text-gray-500">Prioridad Operativa</label>
                              <select 
                                value={newTicketPriority}
                                onChange={(e) => setNewTicketPriority(e.target.value)}
                                className="bg-black/60 border border-gray-200 p-2.5 rounded-lg text-xs text-gray-900 outline-none"
                              >
                                <option value="Baja">Baja - Consulta general</option>
                                <option value="Media">Media - Fluctuación sin caída</option>
                                <option value="Alta">Alta - Caída parcial del enlace</option>
                                <option value="Crítica">Crítica - Pérdida total de servicio</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-mono text-gray-500">Asunto Resumido</label>
                            <input 
                              required
                              type="text" 
                              value={newTicketSubject}
                              onChange={(e) => setNewTicketSubject(e.target.value)}
                              placeholder="Ej. Latencia inusual en enlace secundario" 
                              className="bg-black/60 border border-gray-200 p-2.5 rounded-lg text-xs text-gray-900 outline-none focus:border-brand-blue-light" 
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-mono text-gray-500">Descripción Detallada del Problema</label>
                            <textarea 
                              required
                              rows={4}
                              value={newTicketDesc}
                              onChange={(e) => setNewTicketDesc(e.target.value)}
                              placeholder="Describa el comportamiento técnico observado, equipos involucrados, etc." 
                              className="bg-black/60 border border-gray-200 p-2.5 rounded-lg text-xs text-gray-900 outline-none focus:border-brand-blue-light resize-none" 
                            />
                          </div>

                          <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-4">
                            <button
                              type="button"
                              onClick={() => setShowCreateTicket(false)}
                              className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-mono font-bold uppercase text-gray-500 hover:bg-white"
                            >
                              Cancelar
                            </button>
                            <button
                              type="submit"
                              className="px-5 py-2 bg-brand-red hover:bg-brand-red-light text-gray-900 rounded-lg text-xs font-mono font-bold uppercase tracking-wider shadow-md"
                            >
                              Abrir Incidencia
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : selectedTicket ? (
                      
                      /* CHAT CONVERSATION TICKET SCREEN */
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col flex-1 h-[450px] justify-between">
                        <div>
                          <div className="flex justify-between items-start border-b border-gray-200 pb-3 mb-4">
                            <div>
                              <span className="font-mono text-[10px] text-gray-500 uppercase">{selectedTicket.id} &bull; {selectedTicket.category}</span>
                              <h4 className="text-sm font-bold text-gray-900 mt-0.5">{selectedTicket.subject}</h4>
                            </div>
                            <button 
                              onClick={() => setSelectedTicket(null)}
                              className="text-xs font-mono text-brand-blue hover:text-brand-red uppercase font-bold"
                            >
                              Volver a la Lista
                            </button>
                          </div>

                          {/* Message thread */}
                          <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                            {selectedTicket.messages.map((m, i) => (
                              <div 
                                key={i} 
                                className={`flex flex-col max-w-[85%] ${m.sender === "Cliente" ? "ml-auto items-end" : "mr-auto items-start"}`}
                              >
                                <span className="text-[9px] text-gray-500 font-mono mb-1">{m.sender} &bull; {m.timestamp}</span>
                                <div className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                                  m.sender === "Cliente" 
                                    ? "bg-brand-blue/20 border border-brand-blue/30 text-gray-900 rounded-tr-none" 
                                    : "bg-zinc-800 border border-gray-200 text-gray-200 rounded-tl-none"
                                }`}>
                                  {m.text}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Message reply box */}
                        <form onSubmit={handleTicketReplySubmit} className="flex gap-2 border-t border-gray-200 pt-4 mt-4">
                          <input 
                            required
                            type="text" 
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Escriba su respuesta al NOC..." 
                            className="bg-black/60 border border-gray-200 px-4 py-2.5 rounded-lg text-xs text-gray-900 outline-none focus:border-brand-blue-light flex-1" 
                          />
                          <button
                            type="submit"
                            className="bg-brand-blue hover:bg-brand-blue-light text-gray-900 p-2.5 rounded-lg flex items-center justify-center transition-colors shadow-md"
                          >
                            <Send size={15} />
                          </button>
                        </form>
                      </div>
                    ) : (
                      
                      /* TICKETS LIST SCREEN */
                      <div className="space-y-3">
                        {tickets.map((t) => (
                          <div
                            key={t.id}
                            onClick={() => setSelectedTicket(t)}
                            className="bg-black/10 border border-gray-200 p-4 rounded-xl hover:bg-black/35 hover:border-gray-200 transition-all duration-300 flex items-center justify-between cursor-pointer group"
                          >
                            <div className="flex gap-4">
                              <div className={`p-2 rounded-lg border flex items-center justify-center ${
                                t.status === "RESUELTO"
                                  ? "bg-emerald-950/40 border-emerald-500/20 text-emerald-400"
                                  : "bg-amber-950/40 border-amber-500/20 text-amber-400"
                              }`}>
                                {t.status === "RESUELTO" ? <CheckCircle size={15} /> : <Clock size={15} />}
                              </div>
                              <div>
                                <span className="text-[10px] font-mono text-gray-500 uppercase">{t.id} &bull; {t.category}</span>
                                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-brand-red-light transition-colors mt-0.5">{t.subject}</h4>
                                <span className="font-mono text-[9px] text-gray-500 uppercase mt-1 block">Prioridad: {t.priority} &bull; Actualizado: {t.date}</span>
                              </div>
                            </div>
                            <ChevronRight size={16} className="text-gray-500 group-hover:text-brand-red transition-colors" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "invoices" && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Facturas y Consumo Mensual</h3>
                    <p className="text-xs text-gray-500 mb-6">Descargue y revise sus comprobantes de pago autorizados</p>

                    <div className="space-y-4">
                      {invoices.map((inv) => (
                        <div
                          key={inv.id}
                          className="bg-gray-50 border border-gray-200 p-5 rounded-xl hover:border-gray-200 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-brand-blue/15 text-brand-blue">
                              <Download size={18} />
                            </div>
                            <div>
                              <span className="font-mono text-[10px] text-gray-500 uppercase">{inv.id}</span>
                              <h4 className="text-sm font-bold text-gray-900 mt-0.5">Servicio Corporativo Comfutura - {inv.period}</h4>
                              <p className="text-[10px] text-gray-500 font-mono mt-1">Vence el: {inv.dueDate}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-6 self-end sm:self-auto">
                            <div className="text-right">
                              <span className="font-mono text-xs font-bold text-gray-900 block">{inv.amount}</span>
                              <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1 mt-0.5">
                                <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                                {inv.status}
                              </span>
                            </div>
                            
                            <button
                              onClick={() => alert(`Simulador de Descarga: Comprobante PDF ${inv.id} generado exitosamente en descargas.`)}
                              className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-mono font-bold uppercase text-gray-600 hover:bg-white transition-all"
                            >
                              PDF
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
