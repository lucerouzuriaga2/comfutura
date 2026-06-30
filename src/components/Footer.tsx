import React from "react";
import { Mail, MapPin, Phone, Award } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="bg-zinc-950 text-white border-t border-white/5 font-sans">
      
      {/* Upper Footer Links */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-gutter">
        
        {/* Brand column */}
        <div className="flex flex-col gap-4">
          <Link 
            to="/"
            className="self-start hover:scale-[1.01] transition-transform cursor-pointer" 
          >
            <img 
              alt="Comfutura Logo" 
              className="h-10 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsV_vqm4n0GRIEvIuNifAjdWtYd9w4vgC-h7CLRzh1R8IDiEF01Dh6XEgSCX3p4ORcZMXV6ucRqb1w3OXPY5T3mjUQJsXerxabaV_sItY34D1oyBMiWFrBvkvAOI3jaFDFQog8HYXkdKt69KPKQZxBhvSY3j6nVpJXA0M_Z3Lz_-cClW0wyH_w-3Hs-2CsWaj4XRMpwD76Uwduv_6rfnEVL-qe8qunGjE1IBIhhbkGdwJdyL2RF5NwRW1fpp6DcFb7B5EERyBj_uM"
              referrerPolicy="no-referrer"
            />
          </Link>
          <p className="text-xs text-gray-400 leading-relaxed font-sans mt-2">
            Soluciones integrales de infraestructura crítica de telecomunicaciones con estándares de ingeniería y calidad internacional ISO 9001.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-[9px] text-gray-500 tracking-widest uppercase">NOC ONLINE 24/7/365</span>
          </div>
        </div>

        {/* Company Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-brand-blue-light mb-1">Empresa</h4>
          <Link to="/nosotros" className="text-xs text-gray-400 hover:text-white transition-colors">Misión y Visión</Link>
          <Link to="/nosotros" className="text-xs text-gray-400 hover:text-white transition-colors">Política ISO 9001</Link>
          <Link to="/blog" className="text-xs text-gray-400 hover:text-white transition-colors">Blog y Novedades</Link>
          <Link to="/careers" className="text-xs text-gray-400 hover:text-brand-red-light font-semibold transition-colors flex items-center gap-1">
            Bolsa de Trabajo
            <span className="text-[9px] bg-brand-red-light/10 text-brand-red-light px-1.5 py-0.5 rounded uppercase font-bold tracking-tight">Hiring</span>
          </Link>
        </div>

        {/* Services Column */}
        <div className="flex flex-col gap-3">
          <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-brand-blue-light mb-1">Servicios</h4>
          <Link to="/servicios" className="text-xs text-gray-400 hover:text-white transition-colors">Redes de Fibra Óptica</Link>
          <Link to="/servicios" className="text-xs text-gray-400 hover:text-white transition-colors">Estaciones Celdas 5G</Link>
          <Link to="/servicios" className="text-xs text-gray-400 hover:text-white transition-colors">Centros de Datos</Link>
          <Link to="/servicios" className="text-xs text-gray-400 hover:text-white transition-colors">Sistemas de Telemetría</Link>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-brand-blue-light mb-1">Contacto Directo</h4>
          <div className="flex items-start gap-2 text-xs text-gray-400">
            <MapPin size={14} className="text-brand-red-light shrink-0 mt-0.5" />
            <span>Hector Arellano 125, La Victoria, Lima - Perú</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-gray-400">
            <Mail size={14} className="text-brand-blue-light shrink-0 mt-0.5" />
            <span>omasias@comfutura.com</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-gray-400">
            <Phone size={14} className="text-brand-red-light shrink-0 mt-0.5" />
            <span>+51 993 585 214</span>
          </div>
          <button 
            onClick={() => navigate("/portal")}
            className="self-start text-[10px] font-mono uppercase font-bold text-brand-red-light hover:text-white flex items-center gap-1.5 bg-brand-red-light/10 px-3 py-1.5 rounded-lg border border-brand-red-light/20 transition-all hover:bg-brand-red-light hover:border-transparent mt-1"
          >
            <Award size={13} />
            Mesa de Ayuda NOC
          </button>
        </div>

      </div>

      {/* Lower Copyright Row */}
      <div className="border-t border-white/5 py-8 px-4 md:px-8 lg:px-16 text-center bg-black/50">
        <span className="font-mono text-[10px] text-gray-500">
          © {currentYear} Comunicación Futura S.A.C. Todos los derechos reservados. R.U.C. 20546879135.
        </span>
      </div>

    </footer>
  );
}
