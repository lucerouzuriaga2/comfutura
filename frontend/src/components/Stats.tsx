import React from "react";
import { motion } from "motion/react";
import { Clock, CheckCircle2, Globe } from "lucide-react";

export default function Stats() {
  const statsList = [
    {
      icon: <Clock className="text-brand-red-light" size={32} />,
      value: "15+",
      label: "Años de experiencia",
      desc: "Liderando despliegues críticos"
    },
    {
      icon: <CheckCircle2 className="text-brand-blue-light" size={32} />,
      value: "500+",
      label: "Proyectos completados",
      desc: "Minería, energía y banca"
    },
    {
      icon: <Globe className="text-brand-red-light" size={32} />,
      value: "Alcance",
      label: "Nacional e Internacional",
      desc: "Infraestructura sin fronteras"
    }
  ];

  return (
    <section id="stats" className="w-full bg-white border-y border-gray-200 relative z-20 py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-50 border border-gray-200 rounded-2xl shadow-lg p-8 md:p-10 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {statsList.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="flex flex-col items-center md:items-start text-center md:text-left py-6 md:py-0 md:px-8 first:pt-0 first:pl-0 last:pb-0 last:pr-0"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2.5 rounded-xl bg-white border border-gray-200 shadow-sm">
                  {stat.icon}
                </div>
                <span className="font-sans text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                  {stat.value}
                </span>
              </div>
              <span className="font-mono text-sm font-semibold text-brand-blue uppercase tracking-wider mb-1">
                {stat.label}
              </span>
              <span className="text-xs text-gray-600 font-sans">
                {stat.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
