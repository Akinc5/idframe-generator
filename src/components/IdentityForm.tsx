import React from 'react';

interface IdentityFormProps {
  name: string;
  handle: string;
  igHandle: string;
  onNameChange: (val: string) => void;
  onHandleChange: (val: string) => void;
  onIgHandleChange: (val: string) => void;
}

export const IdentityForm: React.FC<IdentityFormProps> = ({ 
  name, handle, igHandle, onNameChange, onHandleChange, onIgHandleChange 
}) => {
  const labelClass = "text-xs font-black uppercase tracking-widest text-[#8B4513] mb-1 block";
  const inputClass = "w-full bg-white/70 border-b-2 border-[#D2B48C] rounded-none px-3 py-2.5 text-base text-[#1a1a1a] placeholder-[#c8b89a] focus:outline-none focus:border-[#F97316] transition-all font-medium";

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-1">
        {/* Washi tape header decoration */}
        <div className="h-1 w-8 bg-[#FFD580] rounded-full transform -rotate-1"></div>
        <h3 className="font-black text-[#1a1a1a] text-lg tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          2. Identity
        </h3>
        <div className="h-1 flex-1 bg-[#FFD580]/50 rounded-full"></div>
      </div>
      
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Nickname</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="e.g. Satoshi"
          className={inputClass}
          maxLength={15}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className={`${labelClass} flex items-center gap-1`}>
            <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Twitter
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c8b89a] font-mono text-sm">@</span>
            <input 
              type="text" 
              value={handle}
              onChange={(e) => onHandleChange(e.target.value.replace('@', ''))}
              placeholder="satoshi"
              className={`${inputClass} pl-8`}
              maxLength={15}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className={`${labelClass} flex items-center gap-1`}>
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path></svg>
            Instagram
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c8b89a] font-mono text-sm">@</span>
            <input 
              type="text" 
              value={igHandle}
              onChange={(e) => onIgHandleChange(e.target.value.replace('@', ''))}
              placeholder="satoshi"
              className={`${inputClass} pl-8`}
              maxLength={15}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
