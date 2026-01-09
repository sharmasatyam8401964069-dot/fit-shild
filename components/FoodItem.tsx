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
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* Badge & Status Row */}
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 size={24} className="text-[#9EF07F] fill-[#9EF07F]/5" />
            {matchType === 'best' && (
              <div className="flex items-center gap-2 bg-[#1e2a3b]/40 border border-[#3b82f6]/30 px-3.5 py-1.5 rounded-xl">
                <span className="text-white text-[13px] font-bold">Best Match</span>
                <Star size={14} className="fill-orange-400 text-orange-400" />
              </div>
            )}
            {matchType === 'good' && (
              <div className="flex items-center gap-2 bg-[#2a1e3b]/40 border border-[#a855f7]/30 px-3.5 py-1.5 rounded-xl">
                <span className="text-white text-[13px] font-bold">Good Match</span>
                <ThumbsUp size={14} className="fill-[#e9d5ff] text-[#e9d5ff]" />
              </div>
            )}
          </div>

          {/* Kcal & Macros Section */}
          <div className="mb-4">
            <div className="text-[24px] font-bold text-[#9EF07F] mb-1 leading-none tracking-tight">{dish.kcal} Kcal</div>
            <div className="flex items-center gap-3.5 text-[14px] text-white font-bold">
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                {dish.protein}g <span className="text-zinc-500 font-medium ml-0.5">Protein</span>
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                {dish.carb}g <span className="text-zinc-500 font-medium ml-0.5">Carb</span>
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                {dish.fat}g <span className="text-zinc-500 font-medium ml-0.5">Fat</span>
              </span>
            </div>
          </div>

          {/* Tag Row */}
          <div className="flex gap-2 mb-4">
            <span className="px-3.5 py-1.5 bg-[#2d2416] border border-[#fbbf24]/20 text-[#fbbf24] rounded-lg text-[12px] font-bold tracking-tight">
              Rich Calcium
            </span>
          </div>

          {/* Title & Price */}
          <div className="space-y-1 mt-6">
            <h3 className="text-[19px] font-bold text-white tracking-tight leading-tight">{dish.name}</h3>
            <p className="text-zinc-400 font-bold text-[17px]">₹{dish.price}</p>
          </div>
        </div>

        {/* Right Side: Visual Elements & Add */}
        <div className="flex flex-col items-center pt-1 ml-4">
          {/* Status Icons Row */}
          <div className="flex gap-2 mb-4 self-end pr-1">
             <div className="w-8 h-8 rounded-full bg-[#121212] border border-zinc-800 flex items-center justify-center">
                <img src="https://img.icons8.com/color/48/laurel-wreath.png" alt="award" className="w-5 h-5" />
             </div>
             <div className="w-8 h-8 rounded-full bg-[#121212] border border-zinc-800 flex items-center justify-center">
                <img src="https://img.icons8.com/emoji/48/fire.png" alt="fire" className="w-5 h-5" />
             </div>
             <div className="w-8 h-8 rounded-lg border border-zinc-800 bg-[#121212] flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-green-600 border border-zinc-900" />
             </div>
          </div>

          {/* Image */}
          <div className="w-24 h-24 rounded-2xl overflow-hidden mb-5 border border-zinc-800 shadow-2xl">
            <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
          </div>

          {/* Add Button Section */}
          <div className="flex flex-col items-center">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              className="w-24 py-2 border border-[#9EF07F] rounded-xl text-[#9EF07F] font-bold text-lg active:bg-[#9EF07F]/20 transition-all active:scale-95"
            >
              Add
            </button>
            <span className="text-[10px] font-medium text-zinc-500 mt-2 tracking-tight">Customisable</span>
          </div>
        </div>
      </div>
      
      {/* Dashed Separator */}
      <div className="mt-10 border-b border-zinc-900 border-dashed opacity-50" />
    </div>
  );
};

export default FoodItem;