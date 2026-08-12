import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="w-full px-8 py-5 flex justify-between items-center relative z-10">
      <div className="flex items-center gap-3">
        {/* Washi tape decoration on logo */}
        <div className="relative">
          <div className="absolute -top-2 -left-3 w-16 h-5 bg-[#FFD580]/70 -rotate-6 rounded-sm"></div>
          <div className="flex items-center gap-2 relative">
            <span className="text-3xl">🌴</span>
            <span className="font-black text-3xl text-[#1a1a1a] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              HH Goa
            </span>
            <span 
              className="bg-[#F97316] text-white font-black text-sm px-3 py-1 rounded-full transform rotate-3 shadow-md"
            >
              '26
            </span>
          </div>
        </div>
      </div>
      {/* Polaroid-style tagline sticker */}
      <div 
        className="bg-white border-2 border-[#e0d5c5] px-5 py-2 shadow-md transform -rotate-1"
        style={{ fontFamily: "'Patrick Hand', cursive" }}
      >
        <span className="text-[#555] text-sm font-bold tracking-widest uppercase">Build · Ship · Vibe</span>
      </div>
    </nav>
  );
};
