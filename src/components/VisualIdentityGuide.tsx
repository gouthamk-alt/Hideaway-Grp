import React from "react";
import { X, Sparkles, CheckCircle, Eye, Sliders, Palette, Type, Image as ImageIcon, ShieldAlert } from "lucide-react";

interface VisualIdentityGuideProps {
  onClose: () => void;
}

export default function VisualIdentityGuide({ onClose }: VisualIdentityGuideProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
      <div className="relative w-full max-w-4xl bg-[#0F1110] border border-[#2D302E] rounded-none shadow-2xl text-[#E8E4DF] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header decoration */}
        <div className="p-6 md:p-8 border-b border-[#2D302E] bg-[#141615] flex justify-between items-center">
          <div>
            <span className="text-[10px] tracking-[0.3em] text-[#D4C2AD] uppercase font-mono block mb-1">
              ✦ BRAND POLICY & DOCUMENTATION
            </span>
            <h2 className="font-serif text-3xl font-light tracking-tight text-white italic">
              Visual Identity & Editorial Guide
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-[#2D302E] hover:border-[#D4C2AD] text-[#8D918E] hover:text-white rounded-none transition-colors cursor-pointer bg-transparent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-12 flex-1">
          
          {/* Intro Section */}
          <div className="space-y-4 max-w-2xl">
            <h3 className="text-sm font-semibold tracking-[0.2em] text-[#D4C2AD] uppercase">
              1. Modern Non-AI Aesthetic Philosophy
            </h3>
            <p className="text-xs leading-relaxed text-[#8D918E] font-light">
              In an era saturated with smoothed AI illustrations and hyper-idealized digital mockups, the <span className="text-[#E8E4DF] font-medium">Hideaway Group</span> stands for architectural honesty, materials integrity, and tactile reality. 
              Our identity rejects over-processed plastic gradients and digital telemetry logs (likes "Status: Active" or simulated CLI lines). 
              Instead, we pair Swiss-inspired minimal sans-serif letter-spacing with warm editorial serif typography.
            </p>
          </div>

          {/* Color Palettes */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold tracking-[0.2em] text-[#D4C2AD] uppercase flex items-center space-x-2">
              <Palette className="w-4 h-4 text-[#D4C2AD]" />
              <span>2. Architectural Palette Spectrum</span>
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {/* Obsidian */}
              <div className="space-y-2 border border-[#2D302E] p-3 bg-[#0F1110]">
                <div className="h-16 w-full bg-[#0F1110] border border-[#2D302E]" />
                <div>
                  <span className="block text-[10px] font-medium">Deep Black</span>
                  <span className="block text-[9px] text-[#8D918E] font-mono">#0F1110</span>
                  <span className="block text-[8px] text-[#D4C2AD] uppercase font-mono mt-1">Obsidian Base</span>
                </div>
              </div>

              {/* Slate */}
              <div className="space-y-2 border border-[#2D302E] p-3 bg-[#0F1110]">
                <div className="h-16 w-full bg-[#141615] border border-[#2D302E]" />
                <div>
                  <span className="block text-[10px] font-medium">Lodge Carbon</span>
                  <span className="block text-[9px] text-[#8D918E] font-mono">#141615</span>
                  <span className="block text-[8px] text-[#D4C2AD] uppercase font-mono mt-1">Accent Panel</span>
                </div>
              </div>

              {/* Earthy Gray */}
              <div className="space-y-2 border border-[#2D302E] p-3 bg-[#0F1110]">
                <div className="h-16 w-full bg-[#2D302E] border border-[#2D302E]" />
                <div>
                  <span className="block text-[10px] font-medium">Earthy Slate</span>
                  <span className="block text-[9px] text-[#8D918E] font-mono">#2D302E</span>
                  <span className="block text-[8px] text-[#D4C2AD] uppercase font-mono mt-1">Borders / Grid</span>
                </div>
              </div>

              {/* Champagne Gold */}
              <div className="space-y-2 border border-[#2D302E] p-3 bg-[#0F1110]">
                <div className="h-16 w-full bg-[#D4C2AD]" />
                <div>
                  <span className="block text-[10px] font-medium text-stone-900">Champagne</span>
                  <span className="block text-[9px] text-stone-900 font-mono">#D4C2AD</span>
                  <span className="block text-[8px] text-[#D4C2AD] uppercase font-mono mt-1">Brand Highlight</span>
                </div>
              </div>

              {/* Bone Off-White */}
              <div className="space-y-2 border border-[#2D302E] p-3 bg-[#0F1110]">
                <div className="h-16 w-full bg-[#E8E4DF]" />
                <div>
                  <span className="block text-[10px] text-stone-900 font-medium">Text Bone</span>
                  <span className="block text-[9px] text-stone-900 font-mono">#E8E4DF</span>
                  <span className="block text-[8px] text-[#D4C2AD] uppercase font-mono mt-1">Global Read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Typography Scale */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#2D302E] pt-8">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-[0.2em] text-[#D4C2AD] uppercase flex items-center space-x-2">
                <Type className="w-4 h-4 text-[#D4C2AD]" />
                <span>3. Typography Nesting</span>
              </h3>
              <p className="text-xs text-[#8D918E] font-light">
                We combine Montserrat's geometric clarity with Playfair Display's timeless organic curves.
              </p>
              
              <div className="space-y-4 p-4 border border-[#2D302E] bg-[#141615]">
                <div className="space-y-1">
                  <span className="text-[10px] tracking-[0.2em] text-[#D4C2AD] uppercase font-sans">Font: Montserrat Light</span>
                  <div className="text-2xl font-light uppercase tracking-[0.2em]">BYRON ENCLAVE</div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] tracking-[0.2em] text-[#D4C2AD] uppercase font-sans">Font: Playfair Display Italic</span>
                  <div className="font-serif text-3xl italic text-white font-light">"The purity of materials"</div>
                </div>
              </div>
            </div>

            {/* Imagery Specs */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-[0.2em] text-[#D4C2AD] uppercase flex items-center space-x-2">
                <ImageIcon className="w-4 h-4 text-[#D4C2AD]" />
                <span>4. Authentic Imagery Rules</span>
              </h3>
              <ul className="text-xs space-y-3 text-[#8D918E] font-light font-sans list-disc pl-4">
                <li><strong className="text-[#E8E4DF]">Genuine Textures:</strong> Raw masonry, weathered Tasmanian zinc cladding, biodynamic vineyard soil, coastal eucalyptus leaf and mist.</li>
                <li><strong className="text-[#E8E4DF]">High-contrast Nature:</strong> No perfect plastic renders. Photos must include deep dynamic shadow patterns, directional solar ray breaks, and natural organic visual grain.</li>
                <li><strong className="text-[#E8E4DF]">Immersive Human Scale:</strong> Images should prioritize natural spatial viewpoints over drone-assisted or artificial angles.</li>
                <li><strong className="text-[#E8E4DF]">Sustainable Presence:</strong> Visual highlights on passive solar panels, natural ventilation glass, and indigenous botany.</li>
              </ul>
            </div>
          </div>

          {/* Interactive Playground Style Generator */}
          <div className="border-t border-[#2D302E] pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-[0.2em] text-[#D4C2AD] uppercase flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-[#D4C2AD]" />
                <span>5. Brand Spec Validator</span>
              </h3>
              <span className="text-[9px] uppercase tracking-widest bg-emerald-950 text-emerald-400 border border-emerald-900 px-2 py-0.5 rounded font-mono">
                COMPLIANT
              </span>
            </div>

            <p className="text-xs text-[#8D918E] font-light leading-relaxed">
              Verify how copy statements render within our visual constraint. Paste a tagline below to preview it dynamically.
            </p>

            <BrandSpecValidator />
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 bg-[#141615] border-t border-[#2D302E] flex justify-between items-center text-[10px] uppercase tracking-[0.25em] text-[#8D918E]">
          <span>© HIDEAWAY REGISTRY DEPT.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#D4C2AD] text-[#D4C2AD] text-[9px] uppercase tracking-[0.2em] hover:bg-[#D4C2AD] hover:text-stone-950 transition-colors cursor-pointer bg-transparent"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
}

function BrandSpecValidator() {
  const [inputText, setInputText] = React.useState("Boutique Living. Refined.");
  
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="w-full bg-[#141615] border border-[#2D302E] px-4 py-3 text-xs text-[#E8E4DF] focus:outline-none focus:border-[#D4C2AD] font-mono"
        placeholder="Type a headline..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-[#2D302E] p-6 bg-[#0F1110] flex flex-col justify-between h-36">
          <span className="text-[8px] tracking-widest text-[#8D918E] block uppercase font-mono">
            Display Typography: Montserrat
          </span>
          <h4 className="text-2xl font-light uppercase tracking-[0.2em] text-white my-auto truncate">
            {inputText || "EMPTY STATEMENT"}
          </h4>
          <span className="text-[8px] text-[#D4C2AD] font-mono">TRACKING: 0.2em | WEIGHT: 200</span>
        </div>

        <div className="border border-[#2D302E] p-6 bg-[#141615] flex flex-col justify-between h-36">
          <span className="text-[8px] tracking-widest text-[#8D918E] block uppercase font-mono">
            Editorial Typography: Playfair Display Italic
          </span>
          <h4 className="font-serif text-3xl italic text-[#D4C2AD] my-auto truncate">
            {inputText || "EMPTY STATEMENT"}
          </h4>
          <span className="text-[8px] text-[#D4C2AD] font-mono">SERIF STYLE | GEORGIA FALLBACK</span>
        </div>
      </div>
    </div>
  );
}
