import React, { useState } from "react";
import { Property } from "../types.ts";
import { X, Calendar, MessageSquare, Coffee, Check } from "lucide-react";

interface BookingModalProps {
  property: Property | null;
  onClose: () => void;
}

export default function BookingModal({ property, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: "2 Guests",
    notes: "",
    culinaryCrate: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!property) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate premium booking receipt
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-sm shadow-2xl text-stone-100 overflow-hidden">
        
        {/* Banner with absolute close */}
        <div className="relative h-48 bg-stone-950">
          <img
            src={property.featuredImage}
            alt={property.title}
            className="h-full w-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-stone-900 via-stone-900/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-stone-950/70 hover:bg-stone-800 text-stone-400 hover:text-white rounded-full transition-colors border border-stone-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-6 left-6 space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-[#d97706] uppercase font-semibold">
              BESPOKE ESCAPE REGISTRY
            </span>
            <h2 className="font-serif text-3xl font-light tracking-tight text-white">
              {property.title}
            </h2>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-6 md:p-8">
          {isSuccess ? (
            <div className="text-center py-12 space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-800 border border-amber-500 text-amber-400">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-light">Enquiry Received</h3>
                <p className="text-stone-400 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, {formData.name}. Our private concierge team will review availability for your requested escape dates and reaches back within 4 hours with a custom itinerary quote.
                </p>
              </div>
              <div className="p-4 bg-stone-950 rounded-xs border border-stone-800 max-w-sm mx-auto text-left space-y-2 font-mono text-xs text-stone-400">
                <div><span className="text-stone-500">Destination:</span> {property.title}</div>
                <div><span className="text-stone-500">Requested:</span> {formData.checkIn || "TBD"} to {formData.checkOut || "TBD"}</div>
                <div><span className="text-stone-500">Special Crate:</span> {formData.culinaryCrate ? "Yes (Bespoke Gastronomy Crate)" : "None"}</div>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-stone-100 hover:bg-white text-stone-950 font-mono text-xs tracking-widest uppercase transition-all duration-300 rounded-sm font-semibold cursor-pointer"
              >
                Close Portal
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Check In Date */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-400 font-medium">
                    Requested Arrival
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-stone-500" />
                    <input
                      type="date"
                      required
                      value={formData.checkIn}
                      onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xs py-3 pl-10 pr-4 text-sm text-stone-200 focus:outline-hidden focus:border-stone-500 font-mono"
                    />
                  </div>
                </div>

                {/* Check Out Date */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-400 font-medium">
                    Requested Departure
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-stone-500" />
                    <input
                      type="date"
                      required
                      value={formData.checkOut}
                      onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xs py-3 pl-10 pr-4 text-sm text-stone-200 focus:outline-hidden focus:border-stone-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Guest Count Selector */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-400 font-medium">
                    Guest Count
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xs py-3 px-4 text-sm text-stone-200 focus:outline-hidden focus:border-stone-500 font-mono"
                  >
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                  </select>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-400 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Charlotte Bronte"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xs py-3 px-4 text-sm text-stone-200 focus:outline-hidden focus:border-stone-500 font-sans"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-400 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="E.g., charlotte@design.com.au"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xs py-3 px-4 text-sm text-stone-200 focus:outline-hidden focus:border-stone-500 font-sans"
                />
              </div>

              {/* Culinary Upgrade Selection */}
              <div className="p-4 bg-stone-950 rounded-xs border border-stone-800 flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="culinaryCrate"
                  checked={formData.culinaryCrate}
                  onChange={(e) => setFormData({ ...formData, culinaryCrate: e.target.checked })}
                  className="mt-1 accent-stone-500 w-4 h-4 cursor-pointer"
                />
                <div className="space-y-1">
                  <label htmlFor="culinaryCrate" className="block text-xs font-mono tracking-wide text-amber-100 uppercase font-semibold cursor-pointer select-none">
                    Configure "Bespoke Gastronomy" Crate (+$75)
                  </label>
                  <p className="text-stone-400 text-xs font-sans font-light leading-relaxed">
                    Arrive with a stock of local biodynamic wines, artisan cheeses, freshly baked sour loaves, and seasonal farm eggs in your retreat fridge.
                  </p>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <label className="block text-[11px] font-mono uppercase tracking-widest text-stone-400 font-medium">
                  Dietary / Accessibility or Special Request
                </label>
                <textarea
                  placeholder="Inform us of any specific dietary tolerances, fireside dinners requests, or helicopter arrival configurations..."
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xs py-3 px-4 text-sm text-stone-200 focus:outline-hidden focus:border-stone-500 font-sans"
                />
              </div>

              {/* Submit panel */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-800/80">
                <div className="text-left">
                  <span className="block text-[10px] uppercase font-mono tracking-widest text-stone-500">Estimated stay rate:</span>
                  <span className="font-serif text-lg text-amber-100">
                    ${property.price} <span className="text-xs font-mono text-stone-400">/ night</span>
                  </span>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-stone-100 hover:bg-white text-stone-950 font-mono text-xs tracking-widest uppercase transition-all duration-300 rounded-sm font-semibold flex items-center space-x-2"
                >
                  {isSubmitting ? "Submitting Enquiries..." : "Request Secluded Stay"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
