import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "../data";
import { Project } from "../types";
import { MapPin, Calendar, CheckSquare, Layers, Eye, X, Landmark } from "lucide-react";

export default function Projects() {
  const [filter, setFilter] = useState<string>("Todos");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter project lists
  const filteredProjects = filter === "Todos"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  const categories = ["Todos", "Minería", "Urbano", "Rural"];

  // Partner logo lists
  const partners = [
    { name: "Satel Perú", logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuArI_I9qXyM4D0s1f5T9u7P6nK_7L0b_Z_Yv_R5E-M1-w_Q-K_L_Z-p-k_N-w_Q=w120" },
    { name: "Satel Chile", logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuArI_I9qXyM4D0s1f5T9u7P6nK_7L0b_Z_Yv_R5E-M1-w_Q-K_L_Z-p-k_N-w_Q=w120" },
    { name: "Andes Telecom", logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuArI_I9qXyM4D0s1f5T9u7P6nK_7L0b_Z_Yv_R5E-M1-w_Q-K_L_Z-p-k_N-w_Q=w120" },
    { name: "Inca Grid", logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuArI_I9qXyM4D0s1f5T9u7P6nK_7L0b_Z_Yv_R5E-M1-w_Q-K_L_Z-p-k_N-w_Q=w120" },
    { name: "Southern Infra", logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuArI_I9qXyM4D0s1f5T9u7P6nK_7L0b_Z_Yv_R5E-M1-w_Q-K_L_Z-p-k_N-w_Q=w120" },
    { name: "Pacific Fiber", logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuArI_I9qXyM4D0s1f5T9u7P6nK_7L0b_Z_Yv_R5E-M1-w_Q-K_L_Z-p-k_N-w_Q=w120" }
  ];

  return (
    <section id="proyectos" className="w-full bg-white py-24 border-t border-gray-200 relative">
      {/* Partner/Trust Banner Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Confían en nosotros</h2>
          <p className="text-xs md:text-sm text-gray-500 mt-2 font-sans">
            Alianzas estratégicas con líderes del sector industrial, telecomunicaciones y minería a nivel continental
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-center opacity-60 hover:opacity-100 transition-all duration-500">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="flex justify-center p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-200 transition-colors cursor-pointer group"
              title={partner.name}
            >
              <img
                alt={partner.name}
                className="h-7 w-auto object-contain filter brightness-90 contrast-125 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all"
                src={partner.logo}
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Projects Grid Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-brand-red-light"></span>
              <span className="font-mono text-xs text-gray-500 uppercase tracking-widest font-bold">Portafolio</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Gran Envergadura</h2>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 bg-gray-50 p-1 rounded-xl border border-gray-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`py-1.5 px-4 rounded-lg font-mono text-xs transition-all ${filter === cat
                    ? "bg-brand-red-light text-gray-900 font-bold shadow-md"
                    : "text-gray-500 hover:text-brand-red hover:bg-white"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden shadow-xl hover:border-brand-red-light/20 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
            >
              <div className="relative h-60 w-full overflow-hidden">
                {/* Status chip top left */}
                <span className={`absolute top-4 left-4 z-20 text-[9px] font-mono uppercase font-bold tracking-widest px-2.5 py-1 rounded border ${project.status === "COMPLETADO"
                    ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-300"
                    : project.status === "EN PROGRESO"
                      ? "bg-brand-blue/30 border-brand-blue-light/30 text-brand-blue"
                      : "bg-amber-950/80 border-amber-500/30 text-amber-300"
                  }`}>
                  {project.status}
                </span>

                <span className="absolute top-4 right-4 z-20 text-[9px] font-mono uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-black/70 border border-gray-200 text-gray-600">
                  {project.category}
                </span>

                <img
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={project.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white-card via-brand-dark-card/20 to-transparent"></div>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-red-light transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                    <MapPin size={12} className="text-brand-red-light" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
                    <Calendar size={12} className="text-brand-blue" />
                    <span>Año {project.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-white/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-30 bg-black/60 hover:bg-black/80 text-gray-900 p-2 rounded-full border border-gray-200 transition-colors"
              >
                <X size={16} />
              </button>

              {/* Big Image banner */}
              <div className="relative h-64 w-full">
                <img
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  src={selectedProject.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white-card via-transparent to-black/35"></div>
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <span className={`text-[10px] font-mono uppercase font-bold tracking-widest px-2.5 py-1 rounded border ${selectedProject.status === "COMPLETADO"
                      ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-300"
                      : "bg-brand-blue/30 border-brand-blue-light/30 text-brand-blue"
                    }`}>
                    {selectedProject.status}
                  </span>
                  <span className="text-[10px] font-mono uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-brand-red-light/10 border border-brand-red-light/20 text-brand-red-light">
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="p-8">
                <h3 className="text-xl font-extrabold text-gray-900 mb-2 tracking-tight">{selectedProject.title}</h3>
                <p className="text-xs text-gray-500 flex items-center gap-2 mb-6 font-mono uppercase">
                  <MapPin size={12} className="text-brand-red-light" />
                  {selectedProject.location} &bull; Año {selectedProject.year}
                </p>

                <p className="text-sm text-gray-600 leading-relaxed mb-8">
                  {selectedProject.description}
                </p>

                {/* Scope list checklist */}
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-xs font-mono font-bold uppercase text-brand-blue tracking-wider mb-4 flex items-center gap-2">
                    <Layers size={14} />
                    Alcance de los Trabajos (Scope of Work)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.scopeOfWork.map((scope, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <CheckSquare size={14} className="text-brand-red-light shrink-0 mt-0.5" />
                        <span>{scope}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
