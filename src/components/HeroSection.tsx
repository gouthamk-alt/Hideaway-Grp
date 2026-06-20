import { motion } from "motion/react";
import { CompanyInfo } from "../types.ts";

interface HeroSectionProps {
  company: CompanyInfo;
  onExploreClick: () => void;
  openCms: () => void;
  openBrandGuide: () => void;
}

export default function HeroSection({ company, onExploreClick, openCms, openBrandGuide }: HeroSectionProps) {
  return (
    <div id="hero-container" className="relative min-h-screen bg-stone-950 flex flex-col justify-between text-stone-100 overflow-hidden">
      {/* Background Graphic - Moody Forest Fog overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center brightness-[0.34] scale-105 transform transition-transform duration-10000 ease-out"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1920')` }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-stone-950/40 via-stone-950/10 to-stone-950/70 z-0" />

      {/* Discrete Brand Header */}
      <header id="brand-header" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center bg-transparent border-b border-stone-800/60">
        <div className="flex flex-col">
          <span id="logo-text" className="font-serif text-2xl tracking-[0.2em] text-white uppercase font-light">
            {company.name}
          </span>
          <span className="text-[10px] tracking-[0.4em] text-stone-400/80 font-mono uppercase mt-1">
            Group &bull; Australia
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-12 text-[10px] tracking-[0.25em] uppercase font-sans text-stone-300 font-medium">
          <a href="#retreats" className="hover:text-white transition-colors duration-200">Portfolio</a>
          <a href="#services" className="hover:text-white transition-colors duration-200">Our Ethos</a>
          <a href="#about" className="hover:text-white transition-colors duration-200">Development</a>
          <a href="#journal" className="hover:text-white transition-colors duration-200">Journal</a>
          <button 
            type="button"
            onClick={openBrandGuide}
            className="hover:text-amber-400 transition-colors duration-200 uppercase tracking-[0.25em] font-medium bg-transparent border-none cursor-pointer p-0 text-left text-[10px]"
          >
            Brand Guide
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          <button 
            id="cms-toggle-btn"
            onClick={openCms}
            className="px-4 py-2 border border-stone-800 hover:border-stone-600 text-[10px] tracking-[0.15em] uppercase font-sans text-stone-300 hover:text-white transition-all duration-300 rounded-xs bg-stone-900/60 backdrop-blur-xs cursor-pointer"
          >
            Admin CMS
          </button>
          
          <button 
            id="book-now-top"
            onClick={onExploreClick}
            className="px-6 py-3 border border-amber-400 text-amber-400 text-[10px] uppercase tracking-[0.2em] hover:bg-amber-400 hover:text-stone-950 transition-all duration-300 rounded-none cursor-pointer bg-transparent font-medium"
          >
            Inquire
          </button>
        </div>
      </header>

      {/* Main Core Tagline & Title */}
      <div id="hero-main" className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16 md:py-24 text-left flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-6 max-w-3xl"
        >
          <span className="inline-block text-[10px] font-sans tracking-[0.3em] text-amber-400 uppercase font-semibold">
            ✦ ACTIVE DEVELOPMENT
          </span>
          <h1 id="hero-title-text" className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white font-light leading-none mb-4">
            <span className="block italic text-amber-400 font-light mb-1">Boutique</span>
            <span className="block font-light">Living. Refined.</span>
          </h1>
          <p id="hero-subtitle-text" className="text-stone-300 text-sm md:text-base tracking-relaxed leading-relaxed font-light font-sans border-l border-amber-400 pl-6 max-w-2xl">
            {company.heroSubtitle}
          </p>
          
          <div className="pt-8 flex flex-wrap gap-4">
            <button
              onClick={onExploreClick}
              className="px-8 py-4 border border-amber-400 text-amber-400 text-xs tracking-[0.25em] font-sans uppercase hover:bg-amber-400 hover:text-stone-900 transition-all duration-300 rounded-none flex items-center space-x-2 font-medium shadow-md active:translate-y-[1px] cursor-pointer bg-transparent"
            >
              <span>Explore Portfolio</span>
            </button>
            <a
              href="#about"
              className="px-8 py-4 border border-stone-850 hover:border-stone-550 text-stone-300 font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 rounded-none flex items-center justify-center cursor-pointer bg-stone-900/30"
            >
              Our Ethos
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer Ribbon / Stats */}
      <div id="hero-ribbon" className="relative z-10 w-full bg-stone-950/80 backdrop-blur-md border-t border-stone-900/60 py-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div>
            <span className="block font-serif text-xl text-stone-100 font-light">4 Distinct Stays</span>
            <span className="block text-[10px] uppercase font-mono tracking-widest text-stone-400 mt-0.5">Litchfield • Busselton • Byron • Yarra</span>
          </div>
          <div className="border-l border-stone-900/80 pl-0 md:pl-6">
            <span className="block font-serif text-xl text-stone-100 font-light">100% Off-Grid Built</span>
            <span className="block text-[10px] uppercase font-mono tracking-widest text-stone-400 mt-0.5">Sustainable raw architecture</span>
          </div>
          <div className="border-l border-stone-900/80 pl-0 md:pl-6">
            <span className="block font-serif text-xl text-stone-100 font-light">Australian Owned</span>
            <span className="block text-[10px] uppercase font-mono tracking-widest text-stone-400 mt-0.5">Curating serenity locally</span>
          </div>
          <div className="border-l border-stone-900/80 pl-0 md:pl-6">
            <span className="block font-serif text-xl text-stone-100 font-light">Authentic Solitude</span>
            <span className="block text-[10px] uppercase font-mono tracking-widest text-stone-400 mt-0.5">Rejecting clichéd hotel boxes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
