import React from 'react';
import { Star, CheckCircle2, Check } from 'lucide-react';

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { name: 'All' },
    { name: 'For You', icon: <Star size={14} className="fill-orange-400 text-orange-400" /> },
    { name: 'High Protein' },
    { name: 'Verified', icon: <CheckCircle2 size={14} className="fill-green-500 text-black" /> }
  ];

  return (
    <div className="flex overflow-x-auto no-scrollbar gap-3 px-4 py-2">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.name;
        return (
          <button
            key={filter.name}
            onClick={() => onFilterChange(filter.name)}
            className={`
              flex-none px-4 py-2.5 rounded-[14px] text-sm font-bold transition-all border flex items-center gap-2
              ${isActive 
                ? 'bg-transparent border-[#9EF07F] text-[#9EF07F]' 
                : 'bg-[#141414] border-zinc-800 text-zinc-300'}
            `}
          >
            {filter.icon && <span>{filter.icon}</span>}
            {filter.name}
          </button>
        );
      })}
      <button className="flex-none w-11 h-10 rounded-[14px] border border-zinc-800 bg-[#141414] flex items-center justify-center">
        <div className="relative">
          <Check size={16} className="text-[#9EF07F]" />
          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#9EF07F] rounded-full border border-zinc-900" />
        </div>
      </button>
    </div>
  );
};

export default FilterBar;