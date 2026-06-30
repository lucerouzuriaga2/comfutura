import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Landmark } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isPortalActive = location.pathname === "/portal";

  const navItems = [
    { id: "inicio", label: "Inicio", path: "/" },
    { id: "nosotros", label: "Nosotros", path: "/nosotros" },
    { id: "servicios", label: "Servicios", path: "/servicios" },
    { id: "proyectos", label: "Proyectos", path: "/proyectos" },
    { id: "blog", label: "Blog", path: "/blog" },
    { id: "contacto", label: "Contacto", path: "/contacto" }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 lg:px-16 pt-6">
      <div className="liquid-glass rounded-xl px-6 py-3 flex items-center justify-between max-w-7xl mx-auto transition-all duration-300 shadow-lg">
        {/* Logo */}
        <Link 
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center cursor-pointer transition-transform hover:scale-[1.02]"
        >
          <img 
            alt="Comfutura Logo" 
            className="h-10 md:h-12 w-auto object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsV_vqm4n0GRIEvIuNifAjdWtYd9w4vgC-h7CLRzh1R8IDiEF01Dh6XEgSCX3p4ORcZMXV6ucRqb1w3OXPY5T3mjUQJsXerxabaV_sItY34D1oyBMiWFrBvkvAOI3jaFDFQog8HYXkdKt69KPKQZxBhvSY3j6nVpJXA0M_Z3Lz_-cClW0wyH_w-3Hs-2CsWaj4XRMpwD76Uwduv_6rfnEVL-qe8qunGjE1IBIhhbkGdwJdyL2RF5NwRW1fpp6DcFb7B5EERyBj_uM"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path && !isPortalActive;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                  isActive 
                    ? "text-brand-red-light font-semibold" 
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-red-light rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Portal Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <Link 
            to={isPortalActive ? "/" : "/portal"}
            className={`px-5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 ${
              isPortalActive 
                ? "bg-brand-blue hover:bg-brand-blue-light text-white ring-2 ring-brand-blue/30"
                : "bg-brand-red-light hover:bg-brand-red text-white shadow-md hover:shadow-brand-red-light/20"
            }`}
          >
            <Landmark size={15} />
            {isPortalActive ? "Volver a la Web" : "Portal Cliente"}
          </Link>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 max-w-7xl mx-auto bg-brand-dark/95 border border-white/10 rounded-xl p-4 shadow-xl backdrop-blur-md animate-fade-in">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path && !isPortalActive;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-left text-base py-2 px-3 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-brand-red-light/10 text-brand-red-light font-semibold border-l-4 border-brand-red-light" 
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
