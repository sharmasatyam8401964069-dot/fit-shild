import React from 'react';

export type SortOrder = 'lowToHigh' | 'highToLow' | null;

interface SortDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  currentSort: SortOrder;
  onSortChange: (sort: SortOrder) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ 
  isOpen, 
  onClose, 
  currentSort, 
  onSortChange
}) => {
  if (!isOpen) return null;

  const options = [
    { label: 'Low to High', value: 'lowToHigh' as SortOrder },
    { label: 'High to Low', value: 'highToLow' as SortOrder },
  ];

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-end px-6">
      {/* Backdrop with heavy blur as seen in the image */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[14px] animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Dropdown Container - Positioned towards the right side near the sort button */}
      <div 
        className="relative w-[240px] bg-[#121212] border border-zinc-800/80 rounded-[28px] shadow-2xl animate-dropdown mb-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Popover Arrow */}
        <div className="absolute -top-2 right-10 w-4 h-4 bg-[#121212] border-t border-l border-zinc-800/80 rotate-45 transform" />

        <div className="p-7">
          <h4 className="text-white text-[19px] font-bold mb-8">Sort</h4>
          
          <div className="space-y-7">
            {options.map((opt) => {
              const isActive = currentSort === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => {
                    onSortChange(opt.value);
                    onClose();
                  }}
                  className="w-full flex items-center gap-4 transition-all active:scale-[0.98] group"
                >
                  {/* Custom Radio Button - Styled exactly like the screenshot */}
                  <div className={`w-7 h-7 rounded-full border-[1.5px] flex items-center justify-center transition-all ${
                    isActive ? 'border-[#9EF07F]' : 'border-zinc-700'
                  }`}>
                    {isActive && (
                      <div className="w-3.5 h-3.5 bg-[#9EF07F] rounded-full" />
                    )}
                  </div>
                  
                  <span className={`text-[19px] font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-zinc-500'
                  }`}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortDropdown;