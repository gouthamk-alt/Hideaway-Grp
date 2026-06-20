import React, { useState } from "react";
import { CMSContent, Property, Service, JournalPost } from "../types.ts";
import { X, Sparkles, Plus, Trash2, Save, FileText, Settings, Image as ImageIcon, CheckCircle, Check, Loader2, RefreshCw } from "lucide-react";

interface CmsConsoleProps {
  content: CMSContent;
  onClose: () => void;
  onSave: (updatedContent: CMSContent) => Promise<void>;
}

// Beautiful preset authentic image selections to make it easy for administrators to choose genuine options
const IMAGE_PRESETS = [
  {
    name: "Architectural Forest Glass Cabin",
    url: "https://images.unsplash.com/photo-1508333706533-1ec43ecb1606?auto=format&fit=crop&q=80&w=1200",
    tags: ["Architectural", "Off-Grid"]
  },
  {
    name: "Repurposed Container Lodge",
    url: "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&q=80&w=1200",
    tags: ["Architectural", "Zinc Lodge"]
  },
  {
    name: "Boutique Coastal Magnesium Pool",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
    tags: ["Coastal", "Boutique"]
  },
  {
    name: "Mid-Century Palms Retreat",
    url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200",
    tags: ["Mid-Century", "Coastal"]
  },
  {
    name: "Sub-Tropical Glamping Tent",
    url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1200",
    tags: ["Glamping", "Canopy View"]
  },
  {
    name: "Forest Night Glamping Canopy",
    url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200",
    tags: ["Glamping", "Sub-tropical"]
  },
  {
    name: "Timber Mountain Off-Grid Cabin",
    url: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=1200",
    tags: ["Eco-Luxury", "Ridge Cabin"]
  },
  {
    name: "Eucalyptus Snow Gum Cabin",
    url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1200",
    tags: ["Woodsy", "Off-Grid"]
  }
];

export default function CmsConsole({ content, onClose, onSave }: CmsConsoleProps) {
  const [activeTab, setActiveTab] = useState<"properties" | "general" | "services">("properties");
  const [localCMS, setLocalCMS] = useState<CMSContent>(JSON.parse(JSON.stringify(content)));
  
  // State for active property being edited
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    localCMS.properties.length > 0 ? localCMS.properties[0].id : null
  );

  // Gemini state triggers
  const [copyTone, setCopyTone] = useState("Moody, Raw, Woodsy & Tactile");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const activeProperty = localCMS.properties.find(p => p.id === selectedPropertyId);

  // Edit general fields helper
  const handleGeneralChange = (field: keyof typeof localCMS.company, value: string) => {
    setLocalCMS(prev => ({
      ...prev,
      company: {
        ...prev.company,
        [field]: value
      }
    }));
  };

  // Edit current selected property helper
  const handlePropertyChange = <K extends keyof Property>(field: K, value: Property[K]) => {
    if (!selectedPropertyId) return;
    setLocalCMS(prev => ({
      ...prev,
      properties: prev.properties.map(p => {
        if (p.id === selectedPropertyId) {
          return { ...p, [field]: value };
        }
        return p;
      })
    }));
  };

  // Generate copy via server-side Gemini endpoint
  const handleGenerateCopy = async () => {
    if (!activeProperty) return;
    
    setIsGenerating(true);
    setAiError(null);

    try {
      const response = await fetch("/api/generate-copy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: activeProperty.title,
          location: activeProperty.location,
          amenities: activeProperty.amenities,
          tone: copyTone
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate copy");
      }

      handlePropertyChange("description", data.text);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Something went wrong. Let's make sure GEMINI_API_KEY is configured.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Add new property template
  const handleAddNewProperty = () => {
    const newId = `esc-${Date.now()}`;
    const newProperty: Property = {
      id: newId,
      title: "New Hideaway Sanctuary",
      location: "Byron Coastline, New South Wales",
      description: "An architectural haven tucked away in nature...",
      price: 350,
      featuredImage: "https://images.unsplash.com/photo-1508333706533-1ec43ecb1606?auto=format&fit=crop&q=80&w=1200",
      images: [
        "https://images.unsplash.com/photo-1508333706533-1ec43ecb1606?auto=format&fit=crop&q=80&w=1200"
      ],
      tags: ["Boutique Escapes", "Architectural"],
      status: "draft",
      amenities: ["Outdoor Shower", "King Bed", "Rain Forest Canopy"],
      capacity: "2 Guests",
      bedType: "King Bed",
      size: "45 sqm"
    };

    setLocalCMS(prev => ({
      ...prev,
      properties: [...prev.properties, newProperty]
    }));
    setSelectedPropertyId(newId);
  };

  // Delete property helper
  const handleDeleteProperty = (id: string) => {
    const list = localCMS.properties.filter(p => p.id !== id);
    setLocalCMS(prev => ({
      ...prev,
      properties: list
    }));
    if (selectedPropertyId === id) {
      setSelectedPropertyId(list.length > 0 ? list[0].id : null);
    }
  };

  // Trigger content save onto server/persistence
  const handleSaveAll = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await onSave(localCMS);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save error", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-4xl bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col text-stone-100 font-sans">
      
      {/* CMS Header Section */}
      <div className="p-6 border-b border-stone-800 bg-stone-950 flex justify-between items-center">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1 px-2 border border-stone-800 bg-stone-900 text-[10px] text-stone-400 font-mono tracking-widest uppercase rounded">
              CMS DASHBOARD
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </div>
          <h2 className="font-serif text-2xl font-light tracking-tight text-white flex items-center-sky-400">
            <span>Boutique Content Console</span>
          </h2>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white hover:text-white transition-all duration-300 font-mono text-xs tracking-widest uppercase rounded-sm flex items-center space-x-2 font-semibold cursor-pointer border border-amber-500 shadow-md"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>SAVING...</span>
              </>
            ) : saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>SAVED DATA!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>PUBLISH CMS</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="p-2 border border-stone-800 hover:border-stone-600 text-stone-400 hover:text-white bg-stone-900/40 rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex bg-stone-950/40 border-b border-stone-800 p-2 space-x-1 font-mono text-xs text-stone-400">
        <button
          onClick={() => setActiveTab("properties")}
          className={`px-4 py-2 rounded-xs transition-colors flex items-center space-x-2 cursor-pointer ${activeTab === "properties" ? "bg-stone-800 text-white font-medium" : "hover:bg-stone-900"}`}
        >
          <FileText className="w-3.5 h-3.5 text-amber-500" />
          <span>Properties Collection</span>
        </button>
        <button
          onClick={() => setActiveTab("general")}
          className={`px-4 py-2 rounded-xs transition-colors flex items-center space-x-2 cursor-pointer ${activeTab === "general" ? "bg-stone-800 text-white font-medium" : "hover:bg-stone-900"}`}
        >
          <Settings className="w-3.5 h-3.5 text-[#0ea5e9]" />
          <span>Branding & Header</span>
        </button>
      </div>

      {/* Main CMS body scrollable */}
      <div className="flex-1 overflow-y-auto flex">
        {activeTab === "properties" && (
          <>
            {/* Left Col: Properties List */}
            <div className="w-64 border-r border-stone-800 bg-stone-950/30 flex flex-col justify-between">
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center text-xs font-mono text-stone-400 uppercase tracking-wider">
                  <span>Current Escapes ({localCMS.properties.length})</span>
                </div>
                
                <div className="space-y-1.5 max-h-120 overflow-y-auto pr-1">
                  {localCMS.properties.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPropertyId(p.id)}
                      className={`w-full text-left p-3 rounded-sm border transition-all duration-200 cursor-pointer ${selectedPropertyId === p.id ? "bg-stone-800 border-amber-600 text-white" : "bg-stone-900/60 border-stone-850 hover:bg-stone-805 text-stone-300"}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-serif text-sm truncate font-light font-medium">{p.title}</span>
                        {p.status === 'draft' && (
                          <span className="text-[8px] font-mono border border-stone-700 bg-stone-950 text-stone-400 px-1 py-0.5 uppercase tracking-normal">
                            Draft
                          </span>
                        )}
                      </div>
                      <span className="block text-[10px] text-stone-400 font-sans truncate mt-0.5">{p.location}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-stone-850">
                <button
                  onClick={handleAddNewProperty}
                  className="w-full py-3 border border-dashed border-stone-700 hover:border-stone-400 text-stone-300 hover:text-white font-mono text-xs tracking-widest uppercase transition-colors rounded-sm flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Insert Sanctuary</span>
                </button>
              </div>
            </div>

            {/* Right Col: Property Detailed Editor Form */}
            <div className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
              {activeProperty ? (
                <div className="space-y-6">
                  {/* Property main header / delete */}
                  <div className="flex justify-between items-start pb-4 border-b border-stone-800">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500">
                        Sanctuary ID: {activeProperty.id}
                      </span>
                      <h3 className="font-serif text-2xl text-white font-light">
                        {activeProperty.title || "Untitled Sanctuary"}
                      </h3>
                    </div>

                    <button
                      onClick={() => handleDeleteProperty(activeProperty.id)}
                      className="p-2 border border-red-950/40 hover:border-red-800/80 bg-red-950/25 hover:bg-red-900/20 text-red-400 hover:text-red-300 rounded cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Form fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                        Property Title
                      </label>
                      <input
                        type="text"
                        value={activeProperty.title}
                        onChange={(e) => handlePropertyChange("title", e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                        Location Description
                      </label>
                      <input
                        type="text"
                        value={activeProperty.location}
                        onChange={(e) => handlePropertyChange("location", e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                        Nightly rate (AUD)
                      </label>
                      <input
                        type="number"
                        value={activeProperty.price}
                        onChange={(e) => handlePropertyChange("price", Number(e.target.value))}
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500 font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                        Capacity Specs
                      </label>
                      <input
                        type="text"
                        value={activeProperty.capacity}
                        onChange={(e) => handlePropertyChange("capacity", e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                        Publish Status
                      </label>
                      <select
                        value={activeProperty.status}
                        onChange={(e) => handlePropertyChange("status", e.target.value as "published" | "draft")}
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500 font-mono"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft Preview</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                        Bed Configuration
                      </label>
                      <input
                        type="text"
                        value={activeProperty.bedType}
                        onChange={(e) => handlePropertyChange("bedType", e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                        Retreat Size
                      </label>
                      <input
                        type="text"
                        value={activeProperty.size}
                        onChange={(e) => handlePropertyChange("size", e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                        Tags (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={activeProperty.tags.join(", ")}
                        onChange={(e) => handlePropertyChange("tags", e.target.value.split(",").map(s => s.trim()))}
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500 font-mono"
                      />
                    </div>
                  </div>

                  {/* Core description & GEMINI AI Copy assistant */}
                  <div className="space-y-2 relative border border-stone-800 bg-stone-950/20 p-4 rounded">
                    <div className="flex justify-between items-center pb-2">
                      <label className="block text-[11px] font-mono text-amber-100 uppercase tracking-widest flex items-center space-x-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                        <span>Atmospheric Copywriter</span>
                      </label>
                      <span className="text-[10px] font-sans text-stone-500">Gemini-3.5 AI Enabled</span>
                    </div>

                    <div className="p-3 bg-stone-950 rounded border border-stone-850/80 mb-3 space-y-3">
                      <p className="text-stone-400 text-xs font-sans font-light leading-relaxed">
                        Don't waste time drafting clichéd real-estate descriptions. Describe some property attributes, choose an atmospheric tone, and let Gemini write a poetic, modern description.
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-mono text-stone-500 uppercase">AESTHETIC TONE:</span>
                        <select
                          value={copyTone}
                          onChange={(e) => setCopyTone(e.target.value)}
                          className="bg-stone-900 border border-stone-800 rounded text-xs text-stone-300 py-1 px-2.5 font-mono focus:outline-hidden focus:border-stone-600"
                        >
                          <option>Moody, Raw, Woodsy & Tactile</option>
                          <option>Coastal, Sundrenched, Airy & Retro</option>
                          <option>Opulent Eco-Luxury & Decadent Nest</option>
                          <option>Japanese Minimalist & Off-Grid Stillness</option>
                        </select>

                        <button
                          type="button"
                          onClick={handleGenerateCopy}
                          disabled={isGenerating}
                          className="px-4 py-1.5 bg-stone-850 hover:bg-stone-800 text-amber-400 border border-stone-700 hover:border-stone-500 rounded text-xs font-mono tracking-wide flex items-center space-x-1.5 cursor-pointer transition-all duration-300 active:translate-y-[1px]"
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>GENERATING...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                              <span>CRAFT DESCRIPTION</span>
                            </>
                          )}
                        </button>
                      </div>

                      {aiError && (
                        <div className="text-red-400 text-xs py-1.5 bg-red-950/20 border border-red-900/30 px-3 rounded font-mono">
                          {aiError}
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <span className="block text-[10px] uppercase tracking-wider text-stone-500 font-mono">Property Description</span>
                      <textarea
                        rows={5}
                        value={activeProperty.description}
                        onChange={(e) => handlePropertyChange("description", e.target.value)}
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500 leading-relaxed font-sans font-light text-stone-300"
                      />
                    </div>
                  </div>

                  {/* Highlights / Amenities list */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                      Sanctuary Amenities & Highlights (comma-separated list)
                    </label>
                    <input
                      type="text"
                      value={activeProperty.amenities.join(", ")}
                      onChange={(e) => handlePropertyChange("amenities", e.target.value.split(",").map(s => s.trim()))}
                      className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500 font-mono"
                    />
                  </div>

                  {/* Image presets selector */}
                  <div className="space-y-3">
                    <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest flex items-center space-x-1.5">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Select Authentic Architectural Imagery Preset</span>
                    </label>
                    
                    <div className="grid grid-cols-4 gap-3 bg-stone-950/40 p-3 rounded border border-stone-850">
                      {IMAGE_PRESETS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            handlePropertyChange("featuredImage", preset.url);
                            // Set secondary image too
                            handlePropertyChange("images", [preset.url, ...activeProperty.images.slice(1)]);
                          }}
                          className={`group ring-1 relative aspect-4/3 overflow-hidden rounded transition-all duration-300 cursor-pointer ${activeProperty.featuredImage === preset.url ? "ring-amber-500 ring-2 scale-98" : "ring-stone-800 hover:ring-stone-600"}`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.name}
                            className="w-full h-full object-cover brightness-[0.7] group-hover:brightness-[0.9] transition-all"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-200">
                            <span className="text-[10px] text-white font-mono uppercase bg-black/60 px-1 py-0.5 rounded border border-stone-700">Apply</span>
                          </div>
                          
                          {activeProperty.featuredImage === preset.url && (
                            <div className="absolute top-1.5 right-1.5 p-0.5 bg-amber-500 rounded-full border border-stone-900 shadow">
                              <Check className="w-2.5 h-2.5 text-stone-950" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-1">
                      <span className="block text-[10px] uppercase font-mono tracking-widest text-stone-500">Or Paste Custom Image URL</span>
                      <input
                        type="text"
                        value={activeProperty.featuredImage}
                        onChange={(e) => {
                          handlePropertyChange("featuredImage", e.target.value);
                          handlePropertyChange("images", [e.target.value, ...activeProperty.images.slice(1)]);
                        }}
                        className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-xs focus:outline-hidden focus:border-stone-500 font-mono text-stone-300"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 text-stone-500 space-y-4">
                  <FileText className="w-12 h-12 mx-auto stroke-1" />
                  <p className="font-serif">No properties listed. Click 'Insert Sanctuary' below to begin.</p>
                  <button
                    onClick={handleAddNewProperty}
                    className="px-4 py-2 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-mono tracking-widest uppercase rounded"
                  >
                    Insert Sanctuary
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "general" && (
          <div className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl text-white font-light pb-4 border-b border-stone-800">
              Company Identity & Hero Branding
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                  Company Name
                </label>
                <input
                  type="text"
                  value={localCMS.company.name}
                  onChange={(e) => handleGeneralChange("name", e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                  Tagline / Motto
                </label>
                <input
                  type="text"
                  value={localCMS.company.tagline}
                  onChange={(e) => handleGeneralChange("tagline", e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500 uppercase font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                Main Hero Title Text
              </label>
              <input
                type="text"
                value={localCMS.company.heroTitle}
                onChange={(e) => handleGeneralChange("heroTitle", e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                Hero Subdescription Paragraph
              </label>
              <textarea
                rows={3}
                value={localCMS.company.heroSubtitle}
                onChange={(e) => handleGeneralChange("heroSubtitle", e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500 font-light leading-relaxed"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                About Us — Brand Ethos Description
              </label>
              <textarea
                rows={4}
                value={localCMS.company.aboutText}
                onChange={(e) => handleGeneralChange("aboutText", e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500 font-light leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-800">
              <div className="space-y-2">
                <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                  Concierge Email Address
                </label>
                <input
                  type="email"
                  value={localCMS.company.contactEmail}
                  onChange={(e) => handleGeneralChange("contactEmail", e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                  Concierge Phone
                </label>
                <input
                  type="text"
                  value={localCMS.company.contactPhone}
                  onChange={(e) => handleGeneralChange("contactPhone", e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500 font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                Corporate Address
              </label>
              <input
                type="text"
                value={localCMS.company.contactAddress}
                onChange={(e) => handleGeneralChange("contactAddress", e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={localCMS.company.instagramHandle}
                  onChange={(e) => handleGeneralChange("instagramHandle", e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500 font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-widest">
                  Facebook Link
                </label>
                <input
                  type="text"
                  value={localCMS.company.facebookLink}
                  onChange={(e) => handleGeneralChange("facebookLink", e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded px-3 py-2 text-sm focus:outline-hidden focus:border-stone-500 font-mono"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer bar indicator */}
      <div className="p-4 bg-stone-950 border-t border-stone-800 text-center text-[10px] font-mono text-stone-500 flex justify-between px-6">
        <span>Hideaway Group Administration Console v1.4.2</span>
        <span>All data written persistently to workspace/src/data/cms-data.json</span>
      </div>
    </div>
  );
}
