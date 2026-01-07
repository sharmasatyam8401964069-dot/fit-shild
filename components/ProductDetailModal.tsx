
import React from 'react';
import { Download } from 'lucide-react';
import { Dish } from '../types.ts';

interface ProductDetailModalProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ dish, isOpen, onClose }) => {
  if (!isOpen || !dish) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-[#121212] w-full max-w-md h-[92vh] rounded-t-[40px] overflow-y-auto no-scrollbar border-t border-zinc-800 animate-in slide-in-from-bottom duration-500"
      >
        {/* Pull Indicator */}
        <div className="w-full flex justify-center pt-4 pb-2 sticky top-0 bg-[#121212] z-10" onClick={onClose}>
          <div className="w-12 h-1 bg-zinc-700 rounded-full" />
        </div>

        <div className="px-6 pb-24">
          {/* Top Section: Image & Header Info */}
          <div className="flex gap-5 mb-10 pt-4">
            <div className="w-32 h-32 rounded-2xl overflow-hidden border border-zinc-800 flex-shrink-0 shadow-2xl">
              <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2 leading-tight">{dish.name}</h2>
              <p className="text-[12px] text-zinc-400 leading-relaxed mb-4 font-normal">
                {dish.description || "Grilled paneer tikka is a popular Indian vegetarian starter featuring marinated cubes of paneer and vegetables, skewered and grilled to perfection."}
              </p>
              <button className="flex items-center gap-2 text-green-400 text-sm font-semibold hover:opacity-80 transition-opacity">
                <Download size={18} className="text-green-500" />
                <span className="underline underline-offset-4 decoration-1">Trust Certificate</span>
              </button>
            </div>
          </div>

          {/* Macros Gauge & Stats */}
          <div className="flex items-center justify-between mb-12 px-2">
             {/* Kcal Circle */}
             <div className="relative w-20 h-20">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="40" cy="40" r="34"
                    stroke="currentColor"
                    strokeWidth="5"
                    fill="transparent"
                    className="text-zinc-800"
                  />
                  <circle
                    cx="40" cy="40" r="34"
                    stroke="currentColor"
                    strokeWidth="5"
                    fill="transparent"
                    strokeDasharray={213.6}
                    strokeDashoffset={213.6 * (1 - 0.85)}
                    className="text-white"
                    strokeLinecap="round"
                  />
                  {/* Purple Accent Part */}
                  <circle
                    cx="40" cy="40" r="34"
                    stroke="currentColor"
                    strokeWidth="5"
                    fill="transparent"
                    strokeDasharray={213.6}
                    strokeDashoffset={213.6 * (1 - 0.2)}
                    className="text-purple-500"
                    strokeLinecap="round"
                    style={{ transform: 'rotate(25deg)', transformOrigin: 'center' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-white leading-none">{dish.kcal}</span>
                  <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-tight">Kcal</span>
                </div>
             </div>

             {/* Macro Labels */}
             <div className="flex flex-1 justify-around ml-4">
                <div className="flex flex-col items-center">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                      <span className="text-base font-bold text-white">{dish.protein}g</span>
                   </div>
                   <span className="text-[11px] text-zinc-500 font-medium">Protein</span>
                </div>
                <div className="flex flex-col items-center">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <span className="text-base font-bold text-white">{dish.carb}g</span>
                   </div>
                   <span className="text-[11px] text-zinc-500 font-medium">Carb</span>
                </div>
                <div className="flex flex-col items-center">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                      <span className="text-base font-bold text-white">{dish.fat}g</span>
                   </div>
                   <span className="text-[11px] text-zinc-500 font-medium">Fat</span>
                </div>
                <div className="flex flex-col items-center">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                      <span className="text-base font-bold text-white">{dish.fiber || 1}g</span>
                   </div>
                   <span className="text-[11px] text-zinc-500 font-medium">Fiber</span>
                </div>
             </div>
          </div>

          {/* Ingredients Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-white mb-8">Ingredients</h3>
            <div className="space-y-6">
              {dish.ingredients?.map((ing, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-lg font-normal text-zinc-200">
                    {ing.name}
                  </span>
                  <span className="text-base font-bold text-zinc-400">
                    {ing.weight}
                  </span>
                </div>
              )) || (
                <p className="text-zinc-500 italic">Ingredient breakdown coming soon...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
