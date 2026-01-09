import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { name: 'All' },
    { name: 'For You', icon: <Star size={14} className="fill-orange-400 text-orange-400" /> },
    { name: 'High Protein' },
    { name: 'Verified', icon: <CheckCircle2 size={14} className="fill-[#9EF07F] text-[#9EF07F]" /> }
  ];

  return (
    <div className="flex overflow-x-auto no-scrollbar gap-2 px-5 py-2">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.name;
        return (
          <button
            key={filter.name}
            onClick={() => onFilterChange(filter.name)}
            className={`
              flex-none px-5 py-2.5 rounded-xl text-[14px] font-bold transition-all border flex items-center gap-2
              ${isActive 
                ? 'bg-transparent border-[#9EF07F] text-[#9EF07F]' 
                : 'bg-[#1a1a1a] border-zinc-800 text-white'}
            `}
          >
            {filter.icon && <span>{filter.icon}</span>}
            {filter.name}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;