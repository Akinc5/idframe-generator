import React from 'react';

export const TECH_STACK = [
  'React', 'Vue', 'Svelte', 'Next.js', 
  'Node.js', 'Python', 'Go', 'Rust', 
  'Solidity', 'Rust (Solana)', 'Cairo', 'Move',
  'UI/UX', 'Product', 'Marketing', 'DevOps',
  'AI/ML', 'Data Science', 'Security'
] as const;

export type TechStack = typeof TECH_STACK[number];

interface StackSelectorProps {
  selectedStack: TechStack[];
  onToggleStack: (stack: TechStack) => void;
}

export const StackSelector: React.FC<StackSelectorProps> = ({ 
  selectedStack, onToggleStack 
}) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <div className="h-1 w-8 bg-[#A0E7A0] rounded-full transform -rotate-1"></div>
        <h3 className="font-black text-[#1a1a1a] text-lg tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          3. Stack
        </h3>
        <div className="h-1 flex-1 bg-[#A0E7A0]/50 rounded-full"></div>
        <span className="text-xs font-bold text-[#8B4513] bg-[#FFF8EE] border border-[#D2B48C] px-2 py-0.5 rounded-full">{selectedStack.length}/3</span>
      </div>
      
      <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto pr-1 custom-scrollbar">
        {TECH_STACK.map(tech => {
          const isSelected = selectedStack.includes(tech);
          const isDisabled = !isSelected && selectedStack.length >= 3;
          
          return (
            <button
              key={tech}
              onClick={() => onToggleStack(tech)}
              disabled={isDisabled}
              className={`
                px-3 py-1.5 rounded-full text-sm font-bold transition-all duration-200 border-2
                ${isSelected 
                  ? 'bg-[#F97316] text-white border-[#F97316] shadow-[3px_3px_0_rgba(249,115,22,0.3)] scale-105' 
                  : 'bg-white text-[#555] border-[#D2B48C] hover:border-[#F97316] hover:text-[#F97316]'}
                ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {tech}
            </button>
          );
        })}
      </div>
    </div>
  );
};
