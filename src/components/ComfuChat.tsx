import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Check, Building2, Phone, Briefcase, Network, Landmark } from "lucide-react";

interface ChatOption {
  label: string;
  url?: string;
}

interface Message {
  id: string;
  sender: "user" | "comfu";
  text: string;
  time: string;
  options?: (string | ChatOption)[];
}

export default function ComfuChat() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "comfu",
      text: "¡Hola! Soy **Comfu**, el asistente inteligente de Comfutura S.A.C. 🤖\n\nEstoy aquí para guiarte en tus requerimientos de telecomunicaciones, soporte o bolsa de trabajo. ¿Cómo te puedo ayudar hoy?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      options: [
        "Sede / Ubicación 📍",
        "Teléfonos de contacto 📞",
        "Enviar CV / Trabajar 💼",
        "Servicios Técnicos 📡",
        "Soporte NOC 24/7 🔒"
      ]
    }
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [hasNewBadge, setHasNewBadge] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages list updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Turn off badge notification once chatbot has been opened
  useEffect(() => {
    if (isOpen) {
      setHasNewBadge(false);
    }
  }, [isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Process Bot Response after artificial delay
    setTimeout(() => {
      const response = getBotResponse(text);
      const comfuMsg: Message = {
        id: `comfu-${Date.now()}`,
        sender: "comfu",
        text: response.text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        options: response.options
      };
      setMessages((prev) => [...prev, comfuMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleOptionClick = (option: string) => {
    // Remove emojis for processing if necessary, but pass full label to user bubble
    handleSendMessage(option);
  };

  // Bot Smart Knowledge-Base responder
  const getBotResponse = (userInput: string): { text: string; options?: (string | ChatOption)[] } => {
    const text = userInput.toLowerCase();

    // 1. Location / Sede
    if (text.includes("sede") || text.includes("ubicacion") || text.includes("ubicación") || text.includes("direccion") || text.includes("dirección") || text.includes("donde") || text.includes("dónde") || text.includes("oficina") || text.includes("lima") || text.includes("la victoria")) {
      return {
        text: "📍 **Nuestra Sede Central se encuentra en:**\n\nHector Arellano 125\nLa Victoria, Lima - Perú\n\nTe invitamos a visitarnos de lunes a viernes de 08:30 a 18:30 hrs. Para coordinar una reunión comercial previa, puedes escribirnos a **omasias@comfutura.com**.",
        options: [
          { label: "Enviar Correo 📧", url: "mailto:omasias@comfutura.com?subject=Contacto%20Comercial%20-%20Comfutura" },
          "Enviar CV 💼",
          "Menu Principal 📋"
        ]
      };
    }

    // 2. Phones / Contacts
    if (text.includes("contacto") || text.includes("correo") || text.includes("comunicar") || text.includes("email")) {
      return {
        text: "📞 **Contacto Comercial Directo:**\n\n📧 **Correo de Ventas y Proyectos:**\n👉 **omasias@comfutura.com**\n\n¿Deseas iniciar una conversación rápida?",
        options: [
          { label: "Enviar Correo 📧", url: "mailto:omasias@comfutura.com?subject=Contacto%20Comercial%20-%20Comfutura" },
          "Sede Central 📍",
          "Enviar CV 💼",
          "Menu Principal 📋"
        ]
      };
    }

    // 3. Trabaja con nosotros / CV / Empleo
    if (text.includes("trabaj") || text.includes("cv") || text.includes("curriculum") || text.includes("empleo") || text.includes("vacante") || text.includes("postular") || text.includes("recursos") || text.includes("bolsa") || text.includes("seleccion")) {
      return {
        text: "💼 **¡Únete al Equipo Comfutura!**\n\nBuscamos ingenieros de telecomunicaciones, técnicos de fibra óptica, operarios y supervisores de seguridad.\n\n📧 **Envíanos tu CV directamente al departamento de Selección:**\n👉 **rrhh@comfutura.com**\n\n_Indica en el asunto tu especialidad técnica y disponibilidad._",
        options: [
          { label: "Enviar CV por Correo 📧", url: "mailto:rrhh@comfutura.com?subject=Postulacion%20-%20Equipo%20Comfutura" },
          "Sede Central 📍",
          "Menu Principal 📋"
        ]
      };
    }

    // 4. Services
    if (text.includes("servicio") || text.includes("fibra") || text.includes("óptica") || text.includes("optica") || text.includes("celda") || text.includes("5g") || text.includes("infraestructura") || text.includes("data") || text.includes("center") || text.includes("telemetria") || text.includes("iot")) {
      return {
        text: "📡 **Nuestras Especialidades de Ingeniería Crítica:**\n\n1. **Redes de Fibra Óptica:** Tendido aéreo/subterráneo y empalmes.\n2. **Estaciones Celdas 5G:** Torres metálicas y equipamiento RF.\n3. **Data Centers:** Racks, UPS y climatización de precisión.\n4. **Telemetría e IoT:** Monitoreo industrial remoto.\n\nPara solicitar cotizaciones comerciales de ingeniería, contáctanos a **omasias@comfutura.com**.",
        options: [
          { label: "Enviar Correo 📧", url: "mailto:omasias@comfutura.com?subject=Cotizacion%20de%20Proyecto%20-%20Comfutura" },
          "Sede Central 📍",
          "Menu Principal 📋"
        ]
      };
    }

    // 5. Soporte / NOC / SLA
    if (text.includes("soporte") || text.includes("noc") || text.includes("falla") || text.includes("ticket") || text.includes("portal") || text.includes("cliente")) {
      return {
        text: "🔒 **Mesa de Ayuda y Soporte NOC 24/7:**\n\nSi eres cliente corporativo de Comfutura, puedes ingresar a nuestro **Portal de Autogestión** directo en el menú superior para monitorear latencia en tiempo real, descargar facturas o abrir un ticket de soporte técnico inmediato.",
        options: [
          "Ir al Portal 🔓",
          "Menu Principal 📋"
        ]
      };
    }

    // 6. Greetings / General
    if (text.includes("hola") || text.includes("buenos") || text.includes("buenas") || text.includes("saludos") || text.includes("que tal") || text.includes("asistente")) {
      return {
        text: "¡Hola de nuevo! Soy Comfu, tu asistente de Comfutura. 😊\n\nCuéntame, ¿estás interesado en contratar nuestros servicios, unirte a la bolsa de trabajo o consultar nuestra dirección en Lima?",
        options: [
          "Sede Central 📍",
          "Enviar CV 💼",
          "Menu Principal 📋"
        ]
      };
    }

    // 7. Gracias
    if (text.includes("gracias") || text.includes("agradecido") || text.includes("excelente") || text.includes("perfecto") || text.includes("entendido")) {
      return {
        text: "¡Es un placer ayudarte! En Comfutura priorizamos la precisión y la excelencia operacional. Si tienes otra duda, dímelo. 🚀",
        options: ["Menu Principal 📋"]
      };
    }

    // Default fallback
    return {
      text: "Entendido. He registrado tu consulta sobre esa área de interés. \n\nPara brindarte una respuesta de ingeniería exacta, te sugiero comunicarte de forma directa con nuestro centro de operaciones o revisar nuestras opciones principales:",
      options: [
        { label: "Enviar Correo 📧", url: "mailto:omasias@comfutura.com?subject=Contacto%20Comercial%20-%20Comfutura" },
        "Sede / Ubicación 📍",
        "Enviar CV / Trabajar 💼",
        "Servicios Técnicos 📡",
        "Soporte NOC 24/7 🔒"
      ]
    };
  };

  return (
    <>
      {/* Floating Circular Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {hasNewBadge && !isOpen && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="mb-3.5 bg-brand-red-light border border-brand-red-light/30 text-white text-[10px] font-mono font-bold tracking-wider px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              ¿Tienes dudas? ¡Habla con Comfu!
            </motion.div>
          )}
        </AnimatePresence>

        <button
          id="btn-comfu-bot"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ring-4 cursor-pointer ${
            isOpen 
              ? "bg-zinc-800 text-white border border-white/10 ring-black/40 rotate-90" 
              : "bg-brand-red-light text-white ring-brand-red-light/10 hover:bg-brand-red hover:scale-105"
          }`}
          title="Hablar con Comfu"
        >
          {isOpen ? <X size={22} /> : <MessageSquare size={22} className="animate-pulse" />}
        </button>
      </div>

      {/* Main Chat Panel Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[380px] h-[520px] bg-brand-dark-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between"
          >
            {/* Chat header area with red banner */}
            <div className="bg-gradient-to-r from-brand-red-light to-zinc-900 p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white relative">
                  <Bot size={18} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-brand-dark-card animate-pulse"></span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white tracking-tight flex items-center gap-1">
                    Comfu
                    <span className="text-[8px] font-mono uppercase bg-brand-blue/30 text-brand-blue-light px-1 py-0.2 rounded font-bold">Bot</span>
                  </h3>
                  <p className="text-[9px] text-gray-400 font-mono">Asistente Operacional Comfutura</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages Flow Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-black/15">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col gap-1.5 ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  
                  {/* Sender identity label */}
                  <span className="text-[8px] font-mono text-gray-500 flex items-center gap-1 px-1">
                    {msg.sender === "user" ? <User size={8} /> : <Bot size={8} />}
                    {msg.sender === "user" ? "Tú" : "Comfu"} &bull; {msg.time}
                  </span>

                  {/* Message bubble content text */}
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-brand-red-light/10 border border-brand-red-light/30 text-white rounded-tr-none"
                      : "bg-zinc-800 border border-white/5 text-gray-200 rounded-tl-none font-sans"
                  }`}>
                    {msg.text}
                  </div>

                  {/* Sub-options chips list rendering inside response */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.options.map((opt, i) => {
                        const isLink = typeof opt !== "string";
                        const label = isLink ? opt.label : opt;
                        const url = isLink ? opt.url : undefined;

                        if (url) {
                          return (
                            <a
                              key={i}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1.5 bg-brand-red-light/10 hover:bg-brand-red-light/25 border border-brand-red-light/30 text-[10px] text-white rounded-lg transition-colors font-mono flex items-center gap-1 cursor-pointer"
                            >
                              {label}
                            </a>
                          );
                        }

                        return (
                          <button
                            key={i}
                            onClick={() => handleOptionClick(label)}
                            className="px-2.5 py-1.5 bg-black/30 hover:bg-brand-red-light/15 border border-white/5 hover:border-brand-red-light/30 text-[10px] text-gray-300 hover:text-white rounded-lg transition-colors font-mono cursor-pointer"
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                </div>
              ))}

              {/* Loader typing animation */}
              {isTyping && (
                <div className="flex flex-col gap-1 items-start">
                  <span className="text-[8px] font-mono text-gray-500">Comfu está escribiendo...</span>
                  <div className="p-3 bg-zinc-800 border border-white/5 text-gray-400 rounded-2xl rounded-tl-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input conversational panel */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="p-3 border-t border-white/5 bg-zinc-900/90 flex gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Escribe tu consulta a Comfu..."
                className="bg-black/40 border border-white/10 px-3 py-2 rounded-xl text-xs text-white outline-none focus:border-brand-red-light flex-1 font-sans"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="bg-brand-red-light hover:bg-brand-red text-white p-2.5 rounded-xl flex items-center justify-center transition-colors shadow-md disabled:opacity-40 disabled:hover:bg-brand-red-light cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
