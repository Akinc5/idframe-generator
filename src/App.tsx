import { useState, useMemo } from 'react';
import { GoaBackground } from './components/GoaBackground';
import { Navbar } from './components/Navbar';
import { PhotoUploader } from './components/PhotoUploader';
import { IdentityForm } from './components/IdentityForm';
import { StackSelector } from './components/StackSelector';
import { FramePreview } from './components/FramePreview';
import { Actions } from './components/Actions';
import { determineBuilderClass } from './lib/builderClass';
import type { TeamMember } from './lib/types';
import { Plus, Trash2 } from 'lucide-react';

function App() {
  const [members, setMembers] = useState<TeamMember[]>([{
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    photo: null, name: '', handle: '', igHandle: '', stack: [], builderClass: 'Undiscovered Talent'
  }]);

  const [activeId, setActiveId] = useState(members[0].id);
  const activeMemberIndex = useMemo(() => members.findIndex(m => m.id === activeId), [members, activeId]);
  const activeMember = members[activeMemberIndex] || members[0];

  const updateActiveMember = (updates: Partial<TeamMember>) => {
    setMembers(prev => {
      const newMembers = [...prev];
      const newMember = { ...newMembers[activeMemberIndex], ...updates };
      if (updates.stack) newMember.builderClass = determineBuilderClass(updates.stack);
      newMembers[activeMemberIndex] = newMember;
      return newMembers;
    });
  };

  const addMember = () => {
    if (members.length >= 4) return;
    const newId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    setMembers(prev => [...prev, { id: newId, photo: null, name: '', handle: '', igHandle: '', stack: [], builderClass: 'Undiscovered Talent' }]);
    setActiveId(newId);
  };

  const removeMember = (id: string) => {
    if (members.length <= 1) return;
    const filtered = members.filter(m => m.id !== id);
    setMembers(filtered);
    if (activeId === id) setActiveId(filtered[0].id);
  };

  return (
    // Single viewport — no page scroll
    <main className="h-screen w-screen overflow-hidden relative flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <GoaBackground />

{/* Navbar — fixed height */}
      <div className="relative z-10 flex-shrink-0">
        <Navbar />
      </div>

      {/* Main content grid — fills remaining height, no overflow */}
      <div className="relative z-10 flex-1 min-h-0 flex gap-0 px-6 pb-6">

        {/* ── Left panel: scrollable internally ── */}
        <div className="w-[340px] flex-shrink-0 flex flex-col gap-3 h-full">

          {/* Squad roster card */}
          <div className="bg-white border-2 border-[#e0d5c5] shadow-[5px_5px_0_rgba(0,0,0,0.07)] px-4 py-3 relative flex-shrink-0">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#F43F5E] rounded-full border-2 border-white shadow z-10"></div>
            <div className="flex items-center justify-between mt-1">
              <div>
                <h2 className="font-black text-[#1a1a1a] text-sm leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Squad Roster</h2>
                <p className="text-[#8B4513] text-[11px] font-bold">{members.length}/4 builders</p>
              </div>
              {members.length < 4 && (
                <button onClick={addMember}
                  className="bg-[#F97316] text-white w-7 h-7 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-[2px_2px_0_rgba(0,0,0,0.15)] font-black">
                  <Plus size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Member tabs */}
          {members.length > 1 && (
            <div className="flex gap-1.5 overflow-x-auto flex-shrink-0 pb-0.5">
              {members.map((m, i) => (
                <button key={m.id} onClick={() => setActiveId(m.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 text-xs font-black whitespace-nowrap transition-all border-2 shadow-[2px_2px_0_rgba(0,0,0,0.08)] flex-shrink-0 ${
                    activeId === m.id ? 'bg-[#F97316] text-white border-[#d4610f]' : 'bg-white text-[#555] border-[#D2B48C] hover:border-[#F97316]'
                  }`}>
                  {m.name || `Builder ${i + 1}`}
                  {members.length > 1 && (
                    <Trash2 size={10} className="opacity-60 hover:opacity-100"
                      onClick={(e) => { e.stopPropagation(); removeMember(m.id); }} />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Scrollable form card */}
          <div
            className="flex-1 min-h-0 overflow-y-auto bg-[#FFFDF7] border-2 border-[#e0d5c5] shadow-[6px_6px_0_rgba(0,0,0,0.06)] p-5 flex flex-col gap-6 relative custom-scrollbar"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper.png')" }}
          >
            {/* Corner tape strips */}
            <div className="absolute top-0 left-0 w-16 h-5 bg-[#FFD580]/70 -rotate-45 -translate-x-5 translate-y-2.5 origin-center pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-16 h-5 bg-[#FF9A9E]/60 rotate-45 translate-x-5 translate-y-2.5 origin-center pointer-events-none"></div>

            <PhotoUploader
              photo={activeMember.photo}
              onPhotoUpload={(photo) => updateActiveMember({ photo })}
            />
            <IdentityForm
              name={activeMember.name}
              handle={activeMember.handle}
              igHandle={activeMember.igHandle}
              onNameChange={(name) => updateActiveMember({ name })}
              onHandleChange={(handle) => updateActiveMember({ handle })}
              onIgHandleChange={(igHandle) => updateActiveMember({ igHandle })}
            />
            <StackSelector
              selectedStack={activeMember.stack}
              onToggleStack={(tech) => {
                const stack = activeMember.stack.includes(tech)
                  ? activeMember.stack.filter(t => t !== tech)
                  : activeMember.stack.length < 3 ? [...activeMember.stack, tech] : activeMember.stack;
                updateActiveMember({ stack });
              }}
            />
            {activeMember.stack.length > 0 && (
              <div className="pt-3 border-t-2 border-dashed border-[#D2B48C]">
                <div className="bg-[#FFF3E0] border-2 border-[#F97316] px-4 py-2.5 flex justify-between items-center shadow-[2px_2px_0_rgba(249,115,22,0.2)]">
                  <span className="text-xs text-[#8B4513] font-bold uppercase tracking-widest">Class</span>
                  <span className="font-black text-sm text-[#F97316] truncate pl-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {activeMember.builderClass}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 3 small beach polaroids pinned at the bottom of the left col */}
          <div className="flex gap-2 flex-shrink-0 pt-1">
            {[
              { src: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=120&q=70', rot: '-rotate-3', tape: 'bg-[#FFD580]/80' },
              { src: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=120&q=70', rot: 'rotate-2', tape: 'bg-[#FF9A9E]/70' },
              { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=120&q=70', rot: '-rotate-1', tape: 'bg-[#A0E7A0]/80' },
            ].map(({ src, rot, tape }, i) => (
              <div key={i} className={`relative flex-1 h-20 bg-white border-[3px] border-white shadow-[3px_4px_10px_rgba(0,0,0,0.12)] ${rot} overflow-hidden`}>
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 ${tape} rounded-sm`}></div>
                <img src={src} className="w-full h-full object-cover" alt="Goa" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel: preview + buttons ── */}
        <div className="flex-1 min-w-0 flex flex-col items-center justify-center gap-4 pl-8 h-full">

          {/* Preview label sticker */}
          <div className="self-start flex-shrink-0 relative">
            <div className="absolute -top-2.5 left-5 w-16 h-4 bg-[#FFD580]/80 rounded-sm transform rotate-2"></div>
            <div className="bg-white border-2 border-[#D2B48C] shadow-[3px_3px_0_rgba(0,0,0,0.08)] px-5 py-2 relative">
              <span className="font-black text-[#1a1a1a] text-base tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Card Preview
              </span>
              <span className="ml-2 bg-[#F43F5E] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">LIVE</span>
            </div>
          </div>

          {/* Card preview — takes remaining space */}
          <div className="w-full flex-1 min-h-0 flex items-center">
            <FramePreview members={members} />
          </div>

          <div className="flex-shrink-0">
            <Actions members={members} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
