import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CMSContent, Property, JournalPost } from "./types.ts";
import { defaultCMSContent } from "./defaultData.ts";
import HeroSection from "./components/HeroSection.tsx";
import PropertyCard from "./components/PropertyCard.tsx";
import BookingModal from "./components/BookingModal.tsx";
import CmsConsole from "./components/CmsConsole.tsx";
import VisualIdentityGuide from "./components/VisualIdentityGuide.tsx";
import { 
  Waves, Compass, Sun, Utensils, Mail, Phone, MapPin, 
  BookOpen, Sparkles, Send, ShieldAlert, ArrowUpRight, 
  CheckCircle, Loader2, HelpCircle, X
} from "lucide-react";

export default function App() {
  const [content, setContent] = useState<CMSContent>(defaultCMSContent);
  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const [isIdentityOpen, setIsIdentityOpen] = useState(false);
  const [selectedPropertyForBooking, setSelectedPropertyForBooking] = useState<Property | null>(null);
  const [selectedJournal, setSelectedJournal] = useState<JournalPost | null>(null);
  
  // Tag filter state
  const [activeFilter, setActiveFilter] = useState<string>("All");
  
  // Loading & error handling
  const [isLoading, setIsLoading] = useState(true);
  const [saveBanner, setSaveBanner] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Load content from full-stack API on startup
  useEffect(() => {
    async function loadCMSContent() {
      try {
        const res = await fetch("/api/content");
        if (res.ok) {
          const data = await res.json();
          setContent(data);
        } else {
          console.warn("Could not fetch CMS content, using default data template.", res.statusText);
        }
      } catch (err) {
        console.error("Failed loading backend content from /api/content", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCMSContent();
  }, []);

  // Save/Upload CMS updates back to the persistent API
  const handleSaveCMS = async (newContent: CMSContent) => {
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContent)
      });
      
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }
      
      const savedData = await res.json();
      setContent(savedData);
      
      setSaveBanner({
        type: "success",
        message: "Your website content has been written variables inside 'cms-data.json' successfully!"
      });
      setTimeout(() => setSaveBanner(null), 4000);
    } catch (err: any) {
      console.error("Error saving CMS data", err);
      setSaveBanner({
        type: "error",
        message: `Fail publish update on backend: ${err.message}`
      });
      setTimeout(() => setSaveBanner(null), 5000);
      throw err;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-stone-300 space-y-4">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        <span className="font-mono text-xs tracking-widest uppercase">Opening Hideaway Group Portal...</span>
      </div>
    );
  }

  // Gather unique tags for filtering properties
  const availableTags = ["All", ...Array.from(new Set(content.properties.flatMap(p => p.tags || [])))];

  // Filter properties (hide draft properties unless CMS Console is open)
  const displayedProperties = content.properties.filter(p => {
    if (p.status === 'draft' && !isCmsOpen) return false;
    if (activeFilter === "All") return true;
    return p.tags?.includes(activeFilter);
  });

  // Map icon name string to Lucide React component
  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Utensils": return <Utensils className="w-5 h-5 text-amber-500" />;
      case "Compass": return <Compass className="w-5 h-5 text-amber-500" />;
      case "Sun": return <Sun className="w-5 h-5 text-amber-500" />;
      default: return <Waves className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-stone-900 text-stone-100 flex flex-col font-sans selection:bg-amber-800 selection:text-white">
      
      {/* Dynamic Success/Error banners from CMS actions */}
      <AnimatePresence>
        {saveBanner && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xs border shadow-2xl flex items-center space-x-3 backdrop-blur-md max-w-lg ${
              saveBanner.type === "success" 
                ? "bg-stone-950/95 border-emerald-500/80 text-emerald-400" 
                : "bg-stone-950/95 border-red-500/80 text-red-400"
            }`}
          >
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-xs font-mono tracking-wide">{saveBanner.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating CMS Portal shortcut */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsCmsOpen(true)}
          className="flex items-center space-x-2 px-5 py-3.5 bg-stone-950 hover:bg-stone-900 text-amber-400 border border-stone-850 hover:border-stone-700 font-mono text-xs tracking-widest uppercase transition-all duration-300 rounded-full shadow-2xl hover:shadow-amber-500/10 cursor-pointer group"
        >
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse group-hover:rotate-12 duration-300" />
          <span>Console CMS</span>
        </button>
      </div>

      {/* Hero Section Header Wrapper */}
      <HeroSection 
        company={content.company} 
        onExploreClick={() => {
          document.getElementById("retreats")?.scrollIntoView({ behavior: "smooth" });
        }}
        openCms={() => setIsCmsOpen(true)}
        openBrandGuide={() => setIsIdentityOpen(true)}
      />

      {/* Main Page Layout Wrapper */}
      <main className="flex-1 space-y-24 md:space-y-36 py-16 md:py-24">

        {/* Section 1: Retreats Grid Collection */}
        <section id="retreats" className="max-w-7xl mx-auto px-6 space-y-12 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-mono tracking-[0.4em] text-stone-400 uppercase">
                ✦ NATURAL SANCTUARIES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
                The Retreats Portfolio
              </h2>
              <p className="text-stone-400 text-sm max-w-lg font-light leading-relaxed">
                Choose from our handpicked properties, designed around light patterns, pristine local topography, and acoustic solace.
              </p>
            </div>

            {/* Tags / Categories Navigation Filter */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-stone-950/60 rounded border border-stone-850 self-start md:self-end">
              {availableTags.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFilter(tag)}
                  className={`px-4 py-2 text-[10px] tracking-widest font-mono uppercase transition-all duration-300 rounded-sm cursor-pointer ${activeFilter === tag ? "bg-stone-800 text-white font-medium" : "text-stone-400 hover:text-white"}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Properties cards container */}
          {displayedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {displayedProperties.map(p => (
                <PropertyCard 
                  key={p.id} 
                  property={p} 
                  onBookClick={(prop) => setSelectedPropertyForBooking(prop)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-stone-850 bg-stone-950/20 p-8 rounded">
              <p className="font-serif text-lg text-stone-400">No properties found matching "{activeFilter}".</p>
              <button
                onClick={() => setActiveFilter("All")}
                className="mt-4 px-4 py-2 bg-stone-800 text-stone-300 font-mono text-xs tracking-widest uppercase rounded"
              >
                Reset Filter
              </button>
            </div>
          )}
        </section>

        {/* Section 2: Services / Curated Experiences in raw woods */}
        <section id="services" className="bg-stone-950/40 border-y border-stone-950 py-24 md:py-32 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 items-center">
            
            <div className="space-y-6 lg:col-span-1">
              <span className="text-xs font-mono tracking-[0.4em] text-stone-400 uppercase block">
                ✦ EXTRAORDINARY DETAILS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
                Our Bespoke Amenities
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed font-light">
                We design your stay to be completely immersive, providing luxurious options that connect you directly to the soils, cycles, and local craft of each unique destination.
              </p>
              
              <div className="pt-4">
                <a 
                  href="#contact" 
                  className="inline-flex items-center space-x-2 text-xs font-mono text-amber-400 hover:text-amber-300 tracking-widest uppercase transition-colors"
                >
                  <span>Talk with Concierge</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* List Services block */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:col-span-2">
              {content.services.map((ser, sIdx) => (
                <div 
                  key={ser.id} 
                  id={`service-${ser.id}`}
                  className="bg-stone-900 border border-stone-855 p-6 md:p-8 rounded-sm space-y-4 hover:border-stone-700 transition-colors"
                >
                  <div className="p-3 bg-stone-950/80 border border-stone-800 inline-flex rounded-sm">
                    {renderServiceIcon(ser.iconName)}
                  </div>
                  <h3 className="font-serif text-xl text-white font-light">{ser.title}</h3>
                  <p className="text-stone-400 text-xs tracking-relaxed leading-relaxed font-light font-sans">
                    {ser.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Section 3: Detailed Brand Ethos Split Screen */}
        <section id="about" className="max-w-7xl mx-auto px-6 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Split Screen Image column */}
            <div className="lg:col-span-6 relative aspect-3/2 lg:aspect-square w-full bg-stone-950 rounded-sm overflow-hidden border border-stone-800 shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&q=80&w=1200"
                alt="Architect cabin"
                className="w-full h-full object-cover brightness-[0.7] group-hover:scale-105 duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/20 to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 p-4 bg-stone-950/80 backdrop-blur-md border border-stone-850 rounded font-mono text-[9px] text-stone-400 uppercase tracking-widest">
                OFF-GRID ARCHITECTURAL RECOVERY
              </div>
            </div>

            {/* Text description column */}
            <div className="lg:col-span-6 space-y-6 lg:pl-8">
              <span className="text-xs font-mono tracking-[0.4em] text-stone-400 uppercase">
                ✦ THE ETHOS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white leading-tight">
                Rejecting clichéd luxury, embracing stillness.
              </h2>
              <div className="space-y-4 text-stone-300 text-sm md:text-base font-light leading-relaxed">
                <p>{content.company.aboutText}</p>
                <blockquote className="border-l-2 border-amber-500 pl-4 py-1 italic font-serif text-stone-400 text-sm my-6">
                  "Stillness is not the absence of sound, but the presence of raw, organic clarity." — Hideaway Design Directive
                </blockquote>
                <p>
                  Every property we select and build is subject to rigorous environmental tests, solar integrity checks, and isolation parameters to ensure you genuinely find silence.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Section 4: Experience Journal & Travel articles */}
        {content.journal && content.journal.length > 0 && (
          <section id="journal" className="max-w-7xl mx-auto px-6 space-y-12 scroll-mt-24">
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <span className="text-xs font-mono tracking-[0.4em] text-stone-400 uppercase">
                ✦ ESSAYS & INSIGHTS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
                The Hideaway Journal
              </h2>
              <p className="text-stone-400 text-sm font-light">
                Deep dives into territorial design, structural philosophies, and biological recovery guides curated by architects and food critics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {content.journal.map(post => (
                <div 
                  key={post.id}
                  onClick={() => setSelectedJournal(post)}
                  className="group bg-stone-950/20 border border-stone-850 p-6 md:p-8 rounded-sm hover:border-stone-700 transition-all duration-300 flex flex-col justify-between space-y-6 cursor-pointer hover:shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="relative aspect-16/9 overflow-hidden bg-stone-955 rounded-sm">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover brightness-[0.7] group-hover:scale-[1.03] duration-700 ease-out"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-3 text-[10px] font-mono tracking-widest text-stone-400 uppercase">
                      <span>{post.date}</span>
                      <span className="text-stone-605">•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-serif text-2xl text-white font-light group-hover:text-amber-100 transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-stone-400 text-sm font-light leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-stone-850/60 text-xs font-mono">
                    <span className="text-stone-400">By {post.author}</span>
                    <span className="text-amber-400 group-hover:translate-x-1 duration-300 transform inline-flex items-center space-x-1 uppercase tracking-widest text-[10px]">
                      <span>Read Essay</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Concierge Contact & Registry */}
        <section id="contact" className="max-w-4xl mx-auto px-6 scroll-mt-24">
          <div className="bg-stone-950 border border-stone-850 p-8 md:p-12 rounded-sm space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-stone-900 select-none pointer-events-none font-serif text-8xl font-black">
              ✦
            </div>

            <div className="space-y-3 relative z-10">
              <span className="text-xs font-mono tracking-[0.4em] text-stone-400 uppercase">
                ✦ CONTACT PRIVATE CONCIERGE
              </span>
              <h2 className="font-serif text-3xl font-light tracking-tight text-white">
                Initiate Your Journey
              </h2>
              <p className="text-stone-400 text-sm max-w-xl font-light leading-relaxed">
                Whether seeking custom charter arrivals, wedding buyout schedules, or tailored catering configurations, our private concierge handles every logistical breath.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-stone-900 relative z-10 text-stone-300 font-sans text-sm">
              <div className="space-y-4">
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 bg-stone-900 border border-stone-800 rounded">
                    <Mail className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono tracking-widest text-stone-500 uppercase">Inquiries Email</span>
                    <a href={`mailto:${content.company.contactEmail}`} className="font-mono text-stone-300 hover:text-white transition-colors">{content.company.contactEmail}</a>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 bg-stone-900 border border-stone-800 rounded">
                    <Phone className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono tracking-widest text-stone-500 uppercase">Call Concierge</span>
                    <a href={`tel:${content.company.contactPhone}`} className="font-mono text-stone-300 hover:text-white transition-colors">{content.company.contactPhone}</a>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 bg-stone-900 border border-stone-800 rounded">
                    <MapPin className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-mono tracking-widest text-stone-500 uppercase">HQ Address</span>
                    <span className="font-mono text-xs text-stone-400">{content.company.contactAddress}</span>
                  </div>
                </div>
              </div>

              {/* Direct quick message list */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(`Thank you for your message. Concierge team will respond to you shortly!`);
                }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest">General Enquiry</span>
                  <textarea
                    rows={3}
                    required
                    placeholder="Write your requested logistics or queries..."
                    className="w-full bg-stone-900 border border-stone-800 rounded px-3.5 py-2.5 text-xs text-stone-200 focus:outline-hidden focus:border-stone-500 font-sans"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-stone-100 hover:bg-white text-stone-950 font-mono text-xs tracking-widest uppercase transition-colors rounded-sm font-semibold flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Coded Request</span>
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* Impeccable Footer segment */}
      <footer className="bg-stone-950/80 border-t border-stone-950 py-16 text-stone-400 text-xs">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 font-sans font-light">
          
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-widest text-white uppercase font-light">
                {content.company.name}
              </span>
              <span className="text-[9px] tracking-[0.3em] text-stone-500 font-mono uppercase mt-0.5">
                {content.company.tagline}
              </span>
            </div>
            
            <p className="text-stone-500 text-xs leading-relaxed max-w-xs pt-1">
              Curating architectural stillness, sustainable luxury, and remote escape grids across key Australian coastlines and national bushlands.
            </p>
          </div>

          <div className="space-y-3">
            <span className="block text-[10px] font-mono tracking-widest uppercase text-white font-semibold">The Collection</span>
            <ul className="space-y-2 text-stone-500 font-mono text-[11px]">
              {content.properties.map(p => (
                <li key={p.id}>
                  <a href={`#property-card-${p.id}`} className="hover:text-stone-300 transition-colors">{p.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <span className="block text-[10px] font-mono tracking-widest uppercase text-white font-semibold">Concierge Connections</span>
            <ul className="space-y-2 text-stone-500 text-[11px] font-mono">
              <li><span className="text-stone-600">Hours:</span> 24/7 Mon-Sun</li>
              <li><span className="text-stone-600">SMS:</span> +61 488 842 121</li>
              <li><span className="text-stone-600">Instagram:</span> <a href="#" className="hover:text-stone-300">{content.company.instagramHandle}</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <span className="block text-[10px] font-mono tracking-widest uppercase text-white font-semibold">Platform & Settings</span>
            <div className="p-3.5 bg-stone-900/50 border border-stone-850 rounded text-stone-500 space-y-2">
              <p className="text-[10px] leading-relaxed">
                This website is powered by a server-side **CMS panel with Gemini-3.5 AI support** to edit layouts dynamically.
              </p>
              
              <button
                onClick={() => setIsCmsOpen(true)}
                className="w-full py-2 bg-stone-950 hover:bg-stone-850 text-amber-400 font-mono text-[9px] tracking-widest uppercase border border-stone-800 rounded transition-colors cursor-pointer"
              >
                Configure Content (CMS)
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-stone-900 text-center text-[10px] font-mono text-stone-600 flex flex-col sm:flex-row justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} {content.company.name}. All retreats registered.</span>
          <div className="space-x-4">
            <a href="#" className="hover:text-stone-400">Privacy Charter</a>
            <span>•</span>
            <a href="#" className="hover:text-stone-400">Terms of Solitude</a>
          </div>
        </div>
      </footer>

      {/* Booking Dialog Modal overlay */}
      {selectedPropertyForBooking && (
        <BookingModal 
          property={selectedPropertyForBooking} 
          onClose={() => setSelectedPropertyForBooking(null)}
        />
      )}

      {/* Custom Journal article popup */}
      <AnimatePresence>
        {selectedJournal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl bg-stone-905 border border-stone-800 rounded-sm shadow-2xl text-stone-100 overflow-hidden bg-stone-900"
            >
              <div className="relative h-64 bg-stone-950">
                <img
                  src={selectedJournal.image}
                  alt={selectedJournal.title}
                  className="h-full w-full object-cover brightness-[0.4]"
                />
                <button
                  onClick={() => setSelectedJournal(null)}
                  className="absolute top-4 right-4 p-2 bg-stone-950/70 hover:bg-stone-800 text-stone-300 rounded-full transition-colors border border-stone-850 cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
                <div className="absolute bottom-6 left-6 pr-6">
                  <span className="text-[10px] font-mono tracking-widest text-amber-550 uppercase bg-stone-950 px-2 py-1 rounded border border-stone-800">
                    ESSAY JOURNAL
                  </span>
                  <h2 className="font-serif text-3xl font-light tracking-tight text-white mt-3 leading-tight">{selectedJournal.title}</h2>
                </div>
              </div>
              
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between text-xs font-mono text-stone-400 pb-4 border-b border-stone-850">
                  <span>Author: {selectedJournal.author}</span>
                  <span>Published: {selectedJournal.date} • {selectedJournal.readTime}</span>
                </div>
                <div className="text-stone-300 text-sm md:text-base font-light space-y-4 leading-relaxed font-sans max-h-96 overflow-y-auto pr-1">
                  <p>{selectedJournal.content}</p>
                  <p>In designing these structures, we deliberately minimized interior noise by placing sleeping beds directly facing massive floor-to-ceiling double triple-glazed panoramic sheets. The absolute absence of metal bolts, heavy steel frames, or exposed wiring gives guests a completely continuous flow of sensory landscape experience. By placing wood-fired heating devices and locally made ceramics in the central room areas, the tactile coldness of the zinc cladding is perfectly balanced with biological warmth.</p>
                </div>
                <div className="flex justify-end pt-4 border-t border-stone-850">
                  <button
                    onClick={() => setSelectedJournal(null)}
                    className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 font-mono text-xs tracking-widest uppercase transition-colors rounded-xs border border-stone-700 text-stone-300 cursor-pointer"
                  >
                    Close Essay
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Integrated CMS Console dashboard panel overlay */}
      {isCmsOpen && (
        <CmsConsole 
          content={content} 
          onClose={() => setIsCmsOpen(false)}
          onSave={handleSaveCMS}
        />
      )}

      {/* Brand Visual Identity Guide Modal */}
      {isIdentityOpen && (
        <VisualIdentityGuide 
          onClose={() => setIsIdentityOpen(false)}
        />
      )}

    </div>
  );
}
