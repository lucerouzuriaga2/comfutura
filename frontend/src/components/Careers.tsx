import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { JOBS } from "../data";
import { JobListing } from "../types";
import { 
  Briefcase, MapPin, Clock, ArrowRight, FileUp, CheckCircle2, 
  ChevronDown, ChevronUp, AlertCircle, Trash2, Send, Mail 
} from "lucide-react";

export default function Careers() {
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // Form State
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleExpand = (jobId: string) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const handleOpenApply = (job: JobListing) => {
    setSelectedJob(job);
    setUploadedFile(null);
    setUploadProgress(0);
  };

  // Drag and Drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const simulateProgress = (file: File) => {
    setIsUploading(true);
    setUploadedFile(file);
    setUploadProgress(10);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateProgress(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateProgress(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedJob(null);
      setName("");
      setEmail("");
      setPhone("");
      setUploadedFile(null);
      setUploadProgress(0);
      setShowSuccessModal(true);
    }, 1800);
  };

  return (
    <section id="careers" className="w-full bg-brand-dark py-24 border-t border-white/5 relative">
      {/* Glow */}
      <div className="absolute bottom-10 left-1/2 w-[350px] h-[350px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-brand-red-light"></span>
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest font-bold">Bolsa de Trabajo</span>
            <span className="w-8 h-[2px] bg-brand-red-light"></span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Desarrolla tu Talento con Nosotros</h2>
          <p className="text-gray-400 mt-3 max-w-2xl text-xs md:text-sm">
            Buscamos profesionales apasionados por la ingeniería, la conectividad y la excelencia operativa. Forma parte del equipo que lidera los despliegues críticos en Perú.
          </p>
        </div>

        {/* Job Listings Expansion List */}
        <div className="space-y-4">
          {JOBS.map((job) => {
            const isExpanded = expandedJobId === job.id;
            return (
              <div 
                key={job.id}
                className="bg-brand-dark-card border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10"
              >
                {/* Accordion Header */}
                <div 
                  onClick={() => toggleExpand(job.id)}
                  className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-brand-red-light">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">{job.title}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 font-mono text-[11px] text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-brand-blue-light" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {job.type}
                        </span>
                        {job.department && (
                          <span className="text-brand-red-light font-bold uppercase">{job.department}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    {job.salaryRange && (
                      <span className="hidden md:inline font-mono text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                        {job.salaryRange}
                      </span>
                    )}
                    <button className="p-1 rounded-full text-gray-400 hover:text-white transition-colors">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>

                {/* Accordion Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/5 overflow-hidden"
                    >
                      <div className="p-6 md:p-8 bg-black/20 flex flex-col gap-6">
                        <div>
                          <h4 className="text-xs font-mono font-bold uppercase text-brand-blue-light tracking-wider mb-2">Descripción del Puesto</h4>
                          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">{job.description}</p>
                        </div>

                        <div>
                          <h4 className="text-xs font-mono font-bold uppercase text-brand-blue-light tracking-wider mb-3">Requisitos del Candidato</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {job.requirements.map((req, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                                <CheckCircle2 size={14} className="text-brand-red-light mt-0.5 shrink-0" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/5 pt-6 gap-4">
                          <span className="text-[10px] text-gray-500 font-mono">*Bolsa de trabajo exclusiva para postulantes en Perú. Comfutura promueve la equidad laboral.</span>
                          <button
                            id={`btn-postular-${job.id}`}
                            onClick={() => handleOpenApply(job)}
                            className="w-full sm:w-auto px-6 py-2.5 bg-brand-red-light hover:bg-brand-red text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                          >
                            Postular Ahora
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Direct Send CV Notice / Info Card */}
        <div className="mt-12 p-6 bg-brand-dark-card border border-white/5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-brand-red-light/10 text-brand-red-light rounded-xl">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">¿No encuentras una posición vacante?</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Envíanos tu CV directamente para futuras vacantes y proyectos a nuestro departamento de selección.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0 font-mono text-right w-full md:w-auto">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Enviar CV a:</span>
            <a href="mailto:rrhh@comfutura.com" className="text-sm font-bold text-brand-red-light hover:text-white transition-colors">
              rrhh@comfutura.com
            </a>
          </div>
        </div>

        {/* Application Modal Form */}
        <AnimatePresence>
          {selectedJob && (
            <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-brand-dark/85 backdrop-blur-md">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-brand-dark-card border border-white/10 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative"
              >
                {/* Header background band */}
                <div className="bg-gradient-to-r from-brand-red-light via-brand-blue-light to-brand-blue p-6 flex flex-col gap-1 pr-12 text-white">
                  <span className="font-mono text-[10px] text-white/80 uppercase tracking-widest font-bold">FORMULARIO DE POSTULACIÓN</span>
                  <h3 className="text-base font-bold tracking-tight">{selectedJob.title}</h3>
                  
                  {/* Close trigger */}
                  <button 
                    onClick={() => setSelectedJob(null)}
                    className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white p-1.5 rounded-full border border-white/10 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <form onSubmit={handleSubmitApplication} className="p-6 md:p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-gray-400">Nombre Completo</label>
                      <input 
                        required 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Juan Pérez" 
                        className="bg-black/40 border border-white/10 p-2.5 rounded-lg text-xs text-white outline-none focus:border-brand-red-light" 
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-gray-400">Correo Electrónico</label>
                      <input 
                        required 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@correo.com" 
                        className="bg-black/40 border border-white/10 p-2.5 rounded-lg text-xs text-white outline-none focus:border-brand-red-light" 
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-gray-400">Teléfono / WhatsApp de Contacto</label>
                    <input 
                      required 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej. +51 987 654 321" 
                      className="bg-black/40 border border-white/10 p-2.5 rounded-lg text-xs text-white outline-none focus:border-brand-red-light w-full" 
                    />
                  </div>

                  {/* Drag and Drop CV File Area */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-gray-400">Adjuntar CV (PDF, DOCX)</label>
                    
                    <div 
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3 transition-all cursor-pointer ${
                        dragActive 
                          ? "border-brand-red-light bg-brand-red-light/5" 
                          : uploadedFile 
                          ? "border-brand-blue-light bg-brand-blue-light/5" 
                          : "border-white/10 bg-black/20 hover:border-white/20"
                      }`}
                      onClick={handleButtonClick}
                    >
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        className="hidden" 
                        onChange={handleFileInput}
                      />

                      {uploadedFile ? (
                        <div className="flex items-center gap-3 w-full text-left bg-black/40 p-3 rounded-lg border border-white/5">
                          <FileUp className="text-brand-blue-light shrink-0" size={24} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white truncate">{uploadedFile.name}</p>
                            <p className="text-[10px] text-gray-500 font-mono">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            {isUploading ? (
                              <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="bg-brand-blue-light h-full rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                              </div>
                            ) : (
                              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-1">
                                <CheckCircle2 size={12} /> Carga completa
                              </span>
                            )}
                          </div>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFile();
                            }}
                            className="p-1.5 rounded-md hover:bg-brand-red-light/10 text-gray-400 hover:text-brand-red-light transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="p-3 bg-white/5 rounded-full border border-white/10 text-gray-400">
                            <FileUp size={24} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">Arrastra tu CV aquí o <span className="text-brand-red-light underline">búscalo en tu equipo</span></p>
                            <p className="text-[10px] text-gray-500 mt-1">Soportado: PDF, DOC o DOCX de hasta 10MB</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Submit application */}
                  <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-5">
                    <button
                      type="button"
                      onClick={() => setSelectedJob(null)}
                      className="px-4 py-2 border border-white/10 rounded-lg text-xs font-mono font-bold uppercase hover:bg-white/5 text-gray-400 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !uploadedFile || isUploading}
                      className="px-6 py-2.5 bg-brand-red hover:bg-brand-red-light disabled:bg-zinc-800 disabled:text-zinc-600 disabled:border-transparent text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg shadow-md transition-colors flex items-center gap-2"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Postulación"}
                      <Send size={12} />
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Success Feedback Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/90 backdrop-blur-md">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-brand-dark-card border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl relative"
              >
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">¡Postulación Recibida!</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  Hemos registrado correctamente sus datos y archivo adjunto. Nuestro equipo de Recursos Humanos evaluará su perfil técnico según los estándares de Comfutura y le responderá vía correo en un plazo máximo de 72 horas hábiles.
                </p>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-2.5 bg-brand-blue hover:bg-brand-blue-light text-white rounded-lg text-xs font-mono font-bold uppercase transition-colors"
                >
                  Entendido
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
