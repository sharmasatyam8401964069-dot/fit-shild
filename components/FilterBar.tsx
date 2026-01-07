
import React from 'react';
import { Check } from 'lucide-react';

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange }) => {
  const filters = ['All', 'High Protein', 'Low Kcal', 'Gluten Free'];

  return (
    <div className="flex overflow-x-auto no-scrollbar gap-2.5 px-4">
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`
              flex-none px-5 py-2 rounded-xl text-sm font-medium transition-all border
              ${isActive 
                ? 'bg-zinc-900 border-green-500 text-green-500' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-300'}
            `}
          >
            {filter}
          </button>
        );
      })}
      <button className="flex-none w-11 h-9 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center">
        <div className="relative">
          <Check size={16} className="text-green-500" />
          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full border border-zinc-900" />
        </div>
      </button>
    </div>
  );
};

export default FilterBar;
