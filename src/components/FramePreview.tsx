import React, { useRef, useEffect, useState } from 'react';
import type { TeamMember } from '../lib/types';

interface FramePreviewProps {
  members: TeamMember[];
}

const CARD_W = 1100;
const CARD_H = 560;

export const FramePreview: React.FC<FramePreviewProps> = ({ members }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  // Compute scale properly based on container width
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const compute = () => {
      const cw = el.clientWidth;
      if (cw > 0) setScale(cw / CARD_W);
    };
    compute();
    const obs = new ResizeObserver(compute);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isTeam = members.length > 1;

  const renderMember = (m: TeamMember) => (
    <div className="w-full h-full flex relative overflow-hidden">
      {/* === LEFT SIDE: Ticket front === */}
      <div className="w-[57%] h-full relative flex flex-col overflow-hidden bg-[#FFFDF5]"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper.png')" }}
      >
        {/* Pink top band */}
        <div className="w-full h-[88px] bg-[#F43F5E] flex flex-col items-center justify-center relative flex-shrink-0">
          <p className="text-white font-black text-sm tracking-[0.35em] uppercase opacity-90">Hacker House</p>
          <div className="flex items-center gap-3 mt-0.5">
            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f334.svg" alt="" className="w-7 h-7" />
            <h1 className="font-black text-white text-[44px] italic" style={{ fontFamily: "'Playfair Display', serif", textShadow: '2px 2px 0 rgba(0,0,0,0.15)' }}>Goa 2026</h1>
            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f334.svg" alt="" className="w-7 h-7 scale-x-[-1]" />
          </div>
          <div className="absolute bottom-0 left-0 w-full overflow-hidden h-4">
            <svg viewBox="0 0 1200 30" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,30 C200,0 400,30 600,15 C800,0 1000,30 1200,15 L1200,30 Z" fill="#FFFDF5"/>
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex gap-5 px-7 pt-3 pb-4">
          {/* Photo section */}
          <div className="flex-shrink-0 flex flex-col items-center gap-2 mt-2">
            <div className="relative w-[148px] h-[148px] bg-white border-4 border-white shadow-[5px_7px_0_rgba(0,0,0,0.15)] transform -rotate-3 overflow-hidden">
              {m.photo 
                ? <img src={m.photo} className="w-full h-full object-cover scale-110" alt="Profile" />
                : <div className="w-full h-full bg-[#FFE4CC] flex items-center justify-center">
                    <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f47d.svg" alt="" className="w-16 h-16 opacity-70" />
                  </div>
              }
              <div className="absolute bottom-1 right-1 bg-[#FFD700] border-2 border-white text-[#1a1a1a] font-black text-xs px-2 py-0.5 shadow-sm transform rotate-6">HH</div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-[#FFD580]/90 rounded-sm"></div>
            </div>
            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f33b.svg" alt="" className="w-7 h-7" />
          </div>

          {/* Text */}
          <div className="flex-1 flex flex-col justify-center gap-2.5 min-w-0">
            <h2 className="font-black text-[#1a1a1a] text-[34px] leading-none uppercase truncate" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em' }}>
              {m.name || 'ANONYMOUS'}
            </h2>
            <div className="self-start bg-[#F43F5E] text-white font-black px-4 py-1.5 text-xs uppercase tracking-widest shadow-[3px_3px_0_rgba(0,0,0,0.15)] transform rotate-1 border-2 border-white whitespace-nowrap">
              {m.builderClass}
            </div>
            <div>
              <p className="text-[#8B4513] font-black text-[10px] uppercase tracking-[0.3em] mb-1">Stack</p>
              <div className="bg-[#FFF3E0] border border-[#D2B48C] px-3 py-1.5 inline-block">
                <p className="font-bold text-sm text-[#0c4a6e]">{m.stack.length > 0 ? m.stack.join(' · ') : 'No Stack Selected'}</p>
              </div>
            </div>
            <div>
              <p className="text-[#8B4513] font-black text-[10px] uppercase tracking-[0.3em] mb-1">Builder Class</p>
              <p className="font-black text-lg text-[#1a1a1a] tracking-widest uppercase" style={{ letterSpacing: '0.1em' }}>{m.builderClass}</p>
            </div>
            {(m.handle || m.igHandle) && (
              <div className="flex gap-4">
                {m.handle && <span className="font-mono text-sm text-[#0369A1] font-bold">𝕏 @{m.handle}</span>}
                {m.igHandle && <span className="font-mono text-sm text-[#BE185D] font-bold">IG @{m.igHandle}</span>}
              </div>
            )}
          </div>
        </div>

        {/* Bottom decorations */}
        <div className="flex justify-between items-center px-7 pb-3">
          <div className="flex items-center gap-2">
            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f30a.svg" alt="" className="w-6 h-6" />
            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3c4.svg" alt="" className="w-6 h-6" />
            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f366.svg" alt="" className="w-6 h-6" />
          </div>
          <div className="bg-[#0369A1] text-white font-black text-xs px-3 py-1.5 transform -rotate-2 shadow-[3px_3px_0_rgba(0,0,0,0.2)] border-2 border-white">#FrameInGoa</div>
        </div>

        {/* Dashed tear line */}
        <div className="absolute right-0 top-0 bottom-0 border-r-2 border-dashed border-[#D2B48C]"></div>
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#E0F2FE] border-2 border-[#D2B48C] z-20"></div>
      </div>

      {/* === RIGHT SIDE: Ticket back === */}
      <div className="w-[43%] h-full flex flex-col relative overflow-hidden bg-[#FDE8F0]"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper.png')" }}
      >
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#E0F2FE] border-2 border-[#D2B48C] z-20"></div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-4">
          <div className="text-center">
            <p className="font-black text-[#0369A1] text-[38px] leading-none tracking-tight uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>HACKER</p>
            <p className="font-black text-[#F97316] text-[42px] leading-none tracking-tight uppercase mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>HOUSE</p>
            <div className="mt-2 bg-white border-2 border-[#0369A1] text-[#0369A1] font-black text-sm px-5 py-1 inline-block shadow-[3px_3px_0_#0369A1] transform -rotate-1 tracking-[0.25em] uppercase">GOA 2026</div>
          </div>

          <div className="flex gap-2 items-center">
            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2b50.svg" alt="" className="w-6 h-6" />
            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2b50.svg" alt="" className="w-4 h-4" />
            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2b50.svg" alt="" className="w-6 h-6" />
          </div>

          <div className="w-full bg-white border-2 border-[#0369A1] p-4 shadow-[5px_5px_0_#0369A1] transform rotate-1 relative">
            <p className="text-[#F43F5E] font-black text-xs uppercase tracking-[0.3em] mb-2.5 text-center">Let's Connect!</p>
            <div className="flex flex-col gap-1.5 font-mono text-sm font-bold text-[#0369A1]">
              {m.handle && <div className="flex items-center gap-2"><span>𝕏</span><span>@{m.handle}</span></div>}
              {m.igHandle && <div className="flex items-center gap-2"><span>IG</span><span>@{m.igHandle}</span></div>}
              {!m.handle && !m.igHandle && <p className="text-[#aaa] text-center text-xs italic">find me at HH Goa!</p>}
            </div>
            <div className="absolute -bottom-5 -left-4 bg-[#22C55E] border-2 border-white text-white font-black text-[10px] px-3 py-1 transform -rotate-12 shadow-[3px_3px_0_rgba(0,0,0,0.2)] leading-tight uppercase tracking-wider">Built in Goa<br/>🌍 For the World</div>
          </div>
        </div>

        <div className="absolute bottom-5 right-5 bg-[#1a1a1a] text-[#22C55E] font-mono font-black text-xl px-4 py-2 border-2 border-white shadow-[4px_4px_0_rgba(0,0,0,0.2)] transform rotate-3">&lt;HH/&gt;</div>
        <div className="absolute top-5 right-5 bg-white border-[3px] border-[#F97316] rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-[4px_4px_0_#F97316] transform -rotate-6">
          <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f30a.svg" alt="" className="w-6 h-6" />
          <span className="font-black text-[#F97316] text-sm leading-none">GOA</span>
        </div>
        <div className="absolute bottom-24 left-6 bg-[#FF6B6B] border-2 border-white text-white font-black text-[10px] px-2.5 py-1.5 shadow-[3px_3px_0_rgba(0,0,0,0.2)] transform rotate-6 uppercase leading-tight tracking-wide">404<br/>Beach<br/>Not Found</div>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-[#FFFDF5]"
      style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper.png')" }}
    >
      <div className="w-full h-[70px] bg-[#F43F5E] flex items-center justify-between px-10 flex-shrink-0 relative">
        <div className="flex items-center gap-3">
          <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f334.svg" alt="" className="w-7 h-7" />
          <h1 className="text-white font-black text-3xl italic" style={{ fontFamily: "'Playfair Display', serif" }}>Squad Goals</h1>
          <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f30a.svg" alt="" className="w-7 h-7" />
        </div>
        <div className="bg-white text-[#F43F5E] font-black px-5 py-1.5 border-2 border-[#F43F5E] text-sm tracking-widest uppercase shadow-[3px_3px_0_rgba(0,0,0,0.15)] transform rotate-1">HH GOA 2026</div>
        <div className="absolute bottom-0 left-0 w-full h-4 overflow-hidden">
          <svg viewBox="0 0 1200 25" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,25 C200,0 400,25 600,12 C800,0 1000,25 1200,12 L1200,25 Z" fill="#FFFDF5"/>
          </svg>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center gap-6 px-10 py-3">
        {members.map((m, i) => {
          const rots = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-4'];
          const bgs = ['bg-[#FFE4CC]', 'bg-[#E0F2FE]', 'bg-[#FDE8F0]', 'bg-[#DCFCE7]'];
          const tapes = ['bg-[#FFD580]/80', 'bg-[#FF9A9E]/70', 'bg-[#A0E7A0]/80', 'bg-[#BAE6FD]/80'];
          return (
            <div key={m.id} className={`relative bg-white border-4 border-white shadow-[6px_8px_0_rgba(0,0,0,0.12)] ${rots[i] || ''} transform w-[210px] flex-shrink-0`}>
              <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-14 h-4 ${tapes[i]} rounded-sm`}></div>
              <div className={`w-full h-[160px] ${bgs[i] || 'bg-gray-100'} overflow-hidden flex items-center justify-center`}>
                {m.photo
                  ? <img src={m.photo} className="w-full h-full object-cover" alt="Profile" />
                  : <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f47d.svg" alt="" className="w-16 h-16 opacity-60" />
                }
              </div>
              <div className="p-3 pb-4">
                <p className="font-black text-[#1a1a1a] text-lg leading-tight truncate uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>{m.name || `Hacker ${i+1}`}</p>
                <p className="text-[#F43F5E] text-[10px] font-black uppercase tracking-widest mt-1 truncate">{m.builderClass}</p>
                {m.stack.length > 0 && <p className="text-[#0369A1] text-[10px] font-bold mt-1 truncate">{m.stack.join(' · ')}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-3 left-6 flex items-center gap-3">
        <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f3c4.svg" alt="" className="w-8 h-8" />
        <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f334.svg" alt="" className="w-7 h-7" />
        <div className="bg-[#FFD700] border-2 border-white font-black text-[10px] text-black px-3 py-1 shadow-[3px_3px_0_rgba(0,0,0,0.2)] transform -rotate-6 uppercase tracking-wider">WAGMI</div>
      </div>
      <div className="absolute bottom-3 right-6 bg-[#1a1a1a] text-[#22C55E] font-mono font-black text-xl px-4 py-2 border-2 border-white shadow-[4px_4px_0_rgba(0,0,0,0.2)] transform rotate-3">&lt;HH/&gt;</div>
    </div>
  );

  return (
    // Container: takes full width, height is computed from scale*CARD_H
    <div ref={containerRef} className="w-full relative">
      {/* Height spacer so parent knows how tall this is */}
      <div style={{ height: scale * CARD_H }}></div>
      {/* The rendered card, absolutely positioned, scaled from top-left */}
      <div
        className="absolute top-0 left-0"
        style={{
          width: CARD_W,
          height: CARD_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {/* ID for html-to-image capture */}
        <div
          id="frame-preview-node"
          className="w-full h-full rounded-[32px] border-[10px] border-[#0284C7] shadow-[0_20px_60px_rgba(2,132,199,0.25)] overflow-hidden relative"
        >
          {/* Inner dotted border */}
          <div className="absolute inset-2 border-[3px] border-dashed border-[#0284C7]/25 rounded-[22px] pointer-events-none z-10"></div>
          {isTeam ? renderTeam() : renderMember(members[0])}
        </div>
      </div>
    </div>
  );
};
