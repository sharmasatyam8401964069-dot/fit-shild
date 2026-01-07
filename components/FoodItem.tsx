
import React from 'react';
import { CheckCircle2, Flame, Trophy } from 'lucide-react';
import { Dish } from '../types';

interface FoodItemProps {
  dish: Dish;
  onAdd: () => void;
  onClick: () => void;
  onCustomize: () => void;
}

const FoodItem: React.FC<FoodItemProps> = ({ dish, onAdd, onClick, onCustomize }) => {
  return (
    <div className="relative group cursor-pointer" onClick={onClick}>
      <div className="flex justify-between">
        <div className="flex-1">
          {/* Status Icon */}
          <div className="mb-4">
            <CheckCircle2 size={20} className="text-green-500 fill-green-500/10" />
          </div>

          {/* Kcal & Macros */}
          <div className="mb-4">
            <div className="text-xl font-bold text-green-500 mb-1.5">{dish.kcal} Kcal</div>
            <div className="flex items-center gap-2.5 text-[13px] text-zinc-300 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                {dish.protein}g <span className="text-zinc-500 font-normal">Protein</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                {dish.carb}g <span className="text-zinc-500 font-normal">Carb</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                {dish.fat}g <span className="text-zinc-500 font-normal">Fat</span>
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-4">
            {dish.tags.map(tag => (
              <span 
                key={tag} 
                className="px-3 py-1 bg-yellow-900/10 border border-yellow-700/30 text-yellow-500 rounded-lg text-[11px] font-semibold hover:bg-yellow-900/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title & Price */}
          <div className="space-y-1">
            <h3 className="text-lg font-medium text-white group-hover:text-green-400 transition-colors">{dish.name}</h3>
            <p className="text-zinc-400 font-medium">₹{dish.price}</p>
          </div>
        </div>

        {/* Right Side: Image & Actions */}
        <div className="flex flex-col items-center">
          {/* Icons Row */}
          <div className="flex gap-2.5 mb-3 self-end">
            {dish.isBestSeller && (
              <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center p-1.5">
                <Trophy size={14} className="text-yellow-500" />
              </div>
            )}
            {dish.isHot && (
              <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center p-1.5">
                <Flame size={14} className="text-orange-500" />
              </div>
            )}
            <div className="w-7 h-7 rounded-lg border border-zinc-700 bg-zinc-900 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-green-600 border border-zinc-400" />
            </div>
          </div>

          {/* Dish Image */}
          <div className="w-28 h-28 rounded-2xl overflow-hidden mb-4 border border-zinc-800">
            <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
          </div>

          {/* Add Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="w-24 py-2 border border-green-500 rounded-xl text-green-500 font-bold text-sm bg-green-500/5 hover:bg-green-500/10 active:scale-95 transition-all"
          >
            Add
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onCustomize();
            }}
            className="text-[10px] text-zinc-500 mt-2 hover:text-zinc-300 transition-colors underline decoration-zinc-700"
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
