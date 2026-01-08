import React from 'react';
import { CheckCircle2, Flame, Trophy, Star, ThumbsUp } from 'lucide-react';
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
          {/* Status Icon & Match Badge */}
          <div className="flex items-center gap-3 mb-5">
            <CheckCircle2 size={24} className="text-[#9EF07F] fill-[#9EF07F]/10" />
            {matchType === 'best' && (
              <div className="flex items-center gap-2 bg-[#1e2a3b] border border-[#3b82f6]/30 px-4 py-1.5 rounded-xl">
                <span className="text-white text-[13px] font-bold">Best Match</span>
                <Star size={14} className="fill-orange-400 text-orange-400" />
              </div>
            )}
            {matchType === 'good' && (
              <div className="flex items-center gap-2 bg-[#2a1e3b] border border-[#a855f7]/30 px-4 py-1.5 rounded-xl">
                <span className="text-white text-[13px] font-bold">Good Match</span>
                <ThumbsUp size={14} className="fill-[#e9d5ff] text-[#e9d5ff]" />
              </div>
            )}
          </div>

          {/* Kcal & Macros */}
          <div className="mb-4">
            <div className="text-[22px] font-bold text-[#9EF07F] mb-1.5">{dish.kcal} Kcal</div>
            <div className="flex items-center gap-3 text-[13px] text-white font-bold">
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-zinc-600 rounded-full" />
                {dish.protein}g <span className="text-zinc-500 font-medium">Protein</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-zinc-600 rounded-full" />
                {dish.carb}g <span className="text-zinc-500 font-medium">Carb</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-zinc-600 rounded-full" />
                {dish.fat}g <span className="text-zinc-500 font-medium">Fat</span>
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-6">
            {dish.tags.map(tag => (
              <span 
                key={tag} 
                className="px-4 py-1.5 bg-yellow-900/10 border border-yellow-700/30 text-yellow-500 rounded-[10px] text-[11px] font-bold"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title & Price */}
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white tracking-tight">{dish.name}</h3>
            <p className="text-zinc-400 font-bold text-base">₹{dish.price}</p>
          </div>
        </div>

        {/* Right Side: Image & Actions */}
        <div className="flex flex-col items-center pt-1">
          {/* Icons Row */}
          <div className="flex gap-2.5 mb-3 self-end">
            {dish.isBestSeller && (
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center p-1.5">
                <img src="https://img.icons8.com/color/48/laurel-wreath.png" alt="award" className="w-5 h-5" />
              </div>
            )}
            {dish.isHot && (
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center p-1.5">
                <img src="https://img.icons8.com/emoji/48/fire.png" alt="fire" className="w-5 h-5" />
              </div>
            )}
            <div className="w-8 h-8 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center p-1">
              <div className="w-3 h-3 rounded-full bg-green-600 border border-zinc-500" />
            </div>
          </div>

          {/* Dish Image */}
          <div className="w-28 h-28 rounded-[24px] overflow-hidden mb-4 border border-zinc-800 shadow-xl">
            <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
          </div>

          {/* Add Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="w-28 py-3.5 border border-[#9EF07F] rounded-2xl text-[#9EF07F] font-bold text-lg bg-transparent hover:bg-[#9EF07F]/5 active:scale-95 transition-all"
          >
            Add
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onCustomize();
            }}
            className="text-[11px] font-medium text-zinc-500 mt-2 hover:text-zinc-300 transition-colors"
          >
            Customisable
          </button>
        </div>
      </div>
      
      {/* Divider */}
      <div className="mt-8 border-b border-zinc-900 border-dashed" />
    </div>
  );
};

export default FoodItem;