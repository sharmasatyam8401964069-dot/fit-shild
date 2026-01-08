
import React from 'react';

export type SortOrder = 'lowToHigh' | 'highToLow' | null;

interface SortDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  currentSort: SortOrder;
  onSortChange: (sort: SortOrder) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ 
  isOpen, 
  onClose, 
  currentSort, 
  onSortChange,
  onMouseEnter,
  onMouseLeave
}) => {
  if (!isOpen) return null;

  const options = [
    { label: 'Low to High', value: 'lowToHigh' as SortOrder },
    { label: 'High to Low', value: 'highToLow' as SortOrder },
  ];

  return (
    <div 
      className="absolute top-10 right-0 z-[150] w-52 bg-[#121212] border border-zinc-800 rounded-[24px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] animate-dropdown origin-top-right overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Top Arrow */}
      <div className="absolute -top-1.5 right-6 w-3 h-3 bg-[#121212] border-t border-l border-zinc-800 rotate-45" />
      
      <div className="p-6">
        <h4 className="text-white text-[17px] font-semibold mb-6">Sort</h4>
        
        <div className="space-y-6">
          {options.map((opt) => {
            const isActive = currentSort === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  onSortChange(opt.value);
                  onClose();
                }}
                className="w-full flex items-center gap-4 transition-colors group"
              >
                <div className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-all ${
                  isActive ? 'border-green-500' : 'border-zinc-700 group-hover:border-zinc-500'
                }`}>
                  {isActive && <div className="w-[11px] h-[11px] bg-green-500 rounded-full" />}
                </div>
                <span className={`text-[15px] font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                }`}>
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SortDropdown;
