import React from 'react';
import { CheckCircle2, Star, ThumbsUp } from 'lucide-react';
import { Dish } from '../types.ts';

interface FoodItemProps {
  dish: Dish;
  onAdd: () => void;
  onClick: () => void;
  onCustomize: () => void;
  matchType?: 'best' | 'good';
}

const FoodItem: React.FC<FoodItemProps> = ({ dish, onAdd, onClick, onCustomize, matchType }) => {
  return (
    <div className="relative group cursor-pointer" onClick={onClick}>
      <div className="flex flex-row justify-between items-start gap-3">
        {/* Left Side: Info */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Badge & Status Row */}
          <div className="flex items-center gap-2 mb-3 overflow-x-auto no-scrollbar">
            <CheckCircle2 size={22} className="text-[#9EF07F] fill-[#9EF07F]/5 flex-shrink-0" />
            {matchType === 'best' && (
              <div className="flex items-center gap-1.5 bg-[#1e2a3b]/40 border border-[#3b82f6]/30 px-3 py-1 rounded-xl whitespace-nowrap">
                <span className="text-white text-[11px] font-bold">Best Match</span>
                <Star size={12} className="fill-orange-400 text-orange-400" />
              </div>
            )}
            {matchType === 'good' && (
              <div className="flex items-center gap-1.5 bg-[#2a1e3b]/40 border border-[#a855f7]/30 px-3 py-1 rounded-xl whitespace-nowrap">
                <span className="text-white text-[11px] font-bold">Good Match</span>
                <ThumbsUp size={12} className="fill-[#e9d5ff] text-[#e9d5ff]" />
              </div>
            )}
          </div>

          {/* Kcal & Macros Section */}
          <div className="mb-3">
            <div className="text-[22px] font-bold text-[#9EF07F] mb-1 leading-none tracking-tight">{dish.kcal} Kcal</div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-white font-bold">
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                {dish.protein}g <span className="text-zinc-500 font-medium ml-0.5">Protein</span>
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                {dish.carb}g <span className="text-zinc-500 font-medium ml-0.5">Carb</span>
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                {dish.fat}g <span className="text-zinc-500 font-medium ml-0.5">Fat</span>
              </span>
            </div>
          </div>

          {/* Tag Row */}
          <div className="flex gap-2 mb-3">
            <span className="px-3 py-1 bg-[#2d2416] border border-[#fbbf24]/20 text-[#fbbf24] rounded-lg text-[11px] font-bold tracking-tight">
              Rich Calcium
            </span>
          </div>

          {/* Title & Price */}
          <div className="space-y-0.5 mt-auto">
            <h3 className="text-lg font-bold text-white tracking-tight leading-snug line-clamp-2">{dish.name}</h3>
            <p className="text-zinc-400 font-bold text-base">₹{dish.price}</p>
          </div>
        </div>

        {/* Right Side: Visual Elements & Add */}
        <div className="flex flex-col items-center flex-shrink-0">
          {/* Status Icons Row */}
          <div className="flex gap-1.5 mb-3 self-end">
             <div className="w-7 h-7 rounded-full bg-[#121212] border border-zinc-800 flex items-center justify-center">
                <img src="https://img.icons8.com/color/48/laurel-wreath.png" alt="award" className="w-4 h-4" />
             </div>
             <div className="w-7 h-7 rounded-full bg-[#121212] border border-zinc-800 flex items-center justify-center">
                <img src="https://img.icons8.com/emoji/48/fire.png" alt="fire" className="w-4 h-4" />
             </div>
             <div className="w-7 h-7 rounded-lg border border-zinc-800 bg-[#121212] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-600 border border-zinc-900" />
             </div>
          </div>

          {/* Image */}
          <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 border border-zinc-800 shadow-xl">
            <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
          </div>

          {/* Add Button Section */}
          <div className="flex flex-col items-center">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              className="w-24 py-2 border border-[#9EF07F] rounded-xl text-[#9EF07F] font-bold text-base active:bg-[#9EF07F]/20 transition-all active:scale-95"
            >
              Add
            </button>
            <span className="text-[10px] font-medium text-zinc-500 mt-1.5 tracking-tight">Customisable</span>
          </div>
        </div>
      </div>
      
      {/* Dashed Separator */}
      <div className="mt-8 border-b border-zinc-900 border-dashed opacity-50" />
    </div>
  );
};

export default FoodItem;