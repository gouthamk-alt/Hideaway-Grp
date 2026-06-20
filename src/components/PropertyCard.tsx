import React from "react";
import { motion } from "motion/react";
import { Property } from "../types.ts";
import { MapPin, Users, Maximize, Key } from "lucide-react";

interface PropertyCardProps {
  key?: string;
  property: Property;
  onBookClick: (property: Property) => void;
}

export default function PropertyCard({ property, onBookClick }: PropertyCardProps) {
  return (
    <motion.div
      id={`property-card-${property.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group relative flex flex-col bg-stone-900 border border-stone-800 rounded-sm overflow-hidden hover:border-stone-700 transition-all duration-500 shadow-md hover:shadow-2xl"
    >
      {/* Dynamic ribbon for draft state */}
      {property.status === 'draft' && (
        <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-stone-800 text-stone-300 font-mono text-[9px] uppercase tracking-widest border border-stone-700 rounded-xs">
          Draft / Preview Only
        </span>
      )}

      {/* Featured Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-950">
        <img
          id={`property-img-${property.id}`}
          src={property.featuredImage || "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&q=80&w=1200"}
          alt={property.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-transparent to-transparent opacity-60" />
        
        {/* Absolute price display */}
        <div className="absolute bottom-4 right-4 bg-stone-950/85 backdrop-blur-md px-4 py-2 border border-stone-800 rounded-xs">
          <span className="font-serif text-lg text-amber-100 font-light">${property.price}</span>
          <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase mt-0.5 ml-1">AUD / Night</span>
        </div>

        {/* Short Tags overlay */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
          {property.tags && property.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="bg-stone-950/60 backdrop-blur-xs text-white px-2 py-0.5 text-[10px] tracking-wide font-mono rounded-xs border border-stone-800/80">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Text Details Section */}
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          <div className="flex items-center text-amber-500/90 text-[10px] tracking-widest uppercase font-mono font-medium">
            <MapPin className="w-3.5 h-3.5 mr-1" />
            <span>{property.location}</span>
          </div>

          <h3 className="font-serif text-2xl tracking-tight text-white font-light group-hover:text-amber-100 transition-colors duration-300">
            {property.title}
          </h3>
          
          <p className="text-stone-400 text-sm tracking-relaxed leading-relaxed font-light line-clamp-3">
            {property.description}
          </p>
        </div>

        {/* Specs and Amenities block */}
        <div className="space-y-4 pt-4 border-t border-stone-800/80">
          <div className="grid grid-cols-3 gap-2 text-stone-400 text-xs font-mono">
            <div className="flex items-center space-x-1.5">
              <Users className="w-4 h-4 text-stone-500" />
              <span>{property.capacity}</span>
            </div>
            <div className="flex items-center space-x-1.5 border-l border-stone-800/80 pl-2">
              <Key className="w-4 h-4 text-stone-500" />
              <span className="truncate">{property.bedType}</span>
            </div>
            <div className="flex items-center space-x-1.5 border-l border-stone-800/80 pl-2">
              <Maximize className="w-4 h-4 text-stone-500" />
              <span>{property.size}</span>
            </div>
          </div>

          {/* Amenities highlights */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {property.amenities.slice(0, 4).map((amenity, idx) => (
                <span key={idx} className="bg-stone-900 text-stone-400 border border-stone-800 px-2 py-1 text-[10px] rounded-xs font-sans">
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 4 && (
                <span className="text-stone-500 text-[10px] px-1 py-1 font-mono font-light">
                  +{property.amenities.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Book Escape CTA */}
        <button
          onClick={() => onBookClick(property)}
          className="w-full mt-2 py-3 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-stone-950 font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 rounded-none bg-transparent cursor-pointer font-medium"
        >
          Check Availability
        </button>
      </div>
    </motion.div>
  );
}
