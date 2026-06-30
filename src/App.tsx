import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import HomeAbout from "./components/HomeAbout";
import HomeSolutions from "./components/HomeSolutions";
import HomeCalculator from "./components/HomeCalculator";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Careers from "./components/Careers";
import Blog from "./components/Blog";
import HomeBlogPreview from "./components/HomeBlogPreview";
import Contact from "./components/Contact";
import Portal from "./components/Portal";
import Footer from "./components/Footer";
import ComfuChat from "./components/ComfuChat";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const location = useLocation();

  return (
    <div className="bg-brand-dark min-h-screen text-white font-sans flex flex-col selection:bg-brand-red-light selection:text-white">
      <ScrollToTop />
      {/* Header Navbar Navigation */}
      <Navbar />

      {/* Main Dynamic View Area with transitions */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="flex-1 w-full flex flex-col"
          >
            <Routes location={location}>
              <Route path="/" element={
                <div className="w-full">
                  <Hero />
                  <Stats />
                  <HomeAbout />
                  <HomeSolutions />
                  <HomeCalculator />
                  <Contact />
                  <HomeBlogPreview />
                </div>
              } />
              <Route path="/nosotros" element={<div className="w-full pt-16 md:pt-20"><About /></div>} />
              <Route path="/servicios" element={<div className="w-full pt-16 md:pt-20"><Services /></div>} />
              <Route path="/proyectos" element={<div className="w-full pt-16 md:pt-20"><Projects /></div>} />
              <Route path="/careers" element={<div className="w-full pt-16 md:pt-20"><Careers /></div>} />
              <Route path="/blog" element={<div className="w-full pt-16 md:pt-20"><Blog /></div>} />
              <Route path="/contacto" element={<div className="w-full pt-16 md:pt-20"><Contact /></div>} />
              <Route path="/portal" element={<div className="w-full pt-16 md:pt-20"><Portal /></div>} />
              <Route path="*" element={
                <div className="w-full">
                  <Hero />
                  <Stats />
                </div>
              } />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Unified Corporate Footer */}
      <Footer />

      {/* Floating Chatbot Comfu */}
      <ComfuChat />
    </div>
  );
}
