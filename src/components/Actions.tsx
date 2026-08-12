import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { generateFrameCanvas } from '../lib/frameRenderer';
import type { TeamMember } from '../lib/types';

interface ActionsProps {
  members: TeamMember[];
}

export const Actions = ({ members }: ActionsProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const isValid = members.some(m => m.name.trim().length > 0);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      const canvas = await generateFrameCanvas(members);
      const link = document.createElement('a');
      const filename = members.length > 1 ? 'HH-Goa-Team.png' : `HH-Goa-${members[0].name.replace(/\s+/g, '-').toLowerCase() || 'id'}.png`;
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
      alert('Oops! Failed to generate image.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareX = () => {
    const text = members.length === 1
      ? `I'm a ${members[0].builderClass} heading to Hacker House Goa '26! 🌴☀️ Come build with us:`
      : `My squad is ready for Hacker House Goa '26! 🌴🔥 Generate your team card:`;
    const url = 'https://goa26.example.com';
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-5 w-full">
      {/* Scrapbook-style buttons */}
      <button 
        onClick={handleDownload}
        disabled={isGenerating || !isValid}
        className={`
          flex items-center gap-2 px-8 py-3 font-black text-sm uppercase tracking-widest shadow-[4px_4px_0_rgba(0,0,0,0.15)] transition-all duration-200 border-2
          ${isValid 
            ? 'bg-[#F97316] text-white border-[#d4610f] hover:translate-y-[-2px] hover:shadow-[4px_6px_0_rgba(0,0,0,0.2)] active:translate-y-[1px]' 
            : 'bg-[#e0d5c5] text-[#aaa] border-[#c8b89a] cursor-not-allowed'}
        `}
      >
        {isGenerating ? <Loader2 className="animate-spin w-4 h-4" /> : <Download className="w-4 h-4" />}
        {isGenerating ? 'Generating...' : 'Download'}
      </button>

      <button 
        onClick={handleShareX}
        disabled={!isValid}
        className={`flex items-center gap-2 px-8 py-3 font-black text-sm uppercase tracking-widest shadow-[4px_4px_0_rgba(0,0,0,0.15)] transition-all duration-200 border-2 bg-[#1a1a1a] text-white border-black hover:translate-y-[-2px] hover:shadow-[4px_6px_0_rgba(0,0,0,0.3)] active:translate-y-[1px] ${!isValid && 'opacity-40 cursor-not-allowed'}`}
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Post to X
      </button>
    </div>
  );
};
