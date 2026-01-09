import React, { useState } from 'react';
import { ChevronLeft, ChevronUp, ChevronDown, Plus, Minus } from 'lucide-react';
import { CartItem, Dish } from '../types.ts';
import GoalCard from './GoalCard';

interface OrderSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSummery?: () => void;
  onUpdateQuantity?: (id: string, delta: number) => void;
  onAddItem?: (dish: Dish) => void;
  items: CartItem[];
}

const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({ 
  isOpen, 
  onClose, 
  onSummery, 
  onUpdateQuantity, 
  onAddItem,
  items 
}) => {
  const [isItemsExpanded, setIsItemsExpanded] = useState(true);

  if (!isOpen) return null;

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Mock recommendations structured as real Dish objects
  const recommendations: Dish[] = [
    {
      id: 'r1',
      name: 'Veg Puff (Half)',
      price: 120,
      kcal: 340,
      protein: 24,
      carb: 24,
      fat: 24,
      fiber: 2,
      isVeg: true,
      tags: ['Light Snack'],
      image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'r2',
      name: 'Veg Puff (Half)',
      price: 120,
      kcal: 340,
      protein: 24,
      carb: 24,
      fat: 24,
      fiber: 2,
      isVeg: true,
      tags: ['Light Snack'],
      image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <div className="fixed inset-0 z-[140] bg-[#0c0c0c] flex flex-col animate-in fade-in duration-300 overflow-hidden">
      {/* Header */}
      <header className="relative flex items-center justify-center pt-14 pb-8 px-6 bg-[#0c0c0c] z-10">
        <button onClick={onClose} className="absolute left-6 text-white active:scale-90 transition-transform">
          <ChevronLeft size={30} strokeWidth={2.5} />
        </button>
        <h1 className="text-[20px] font-bold text-white tracking-tight">Order Cart</h1>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-5 pb-40">
        {/* Goal Card Section */}
        <div className="mb-8">
          <GoalCard onTap={() => {}} />
        </div>

        {/* Order Items Section */}
        <div className="bg-[#141414] border border-zinc-800 rounded-[28px] p-6 mb-10 transition-all duration-300">
          <button 
            onClick={() => setIsItemsExpanded(!isItemsExpanded)}
            className="w-full flex justify-between items-center mb-0 active:opacity-70 transition-opacity"
          >
            <h2 className="text-[20px] font-medium text-white">Your Order item ({totalItemsCount})</h2>
            {isItemsExpanded ? <ChevronUp size={24} className="text-white" /> : <ChevronDown size={24} className="text-white" />}
          </button>

          {isItemsExpanded && (
            <div className="mt-8 space-y-10 animate-in slide-in-from-top-2 duration-300">
              {items.length === 0 ? (
                <div className="text-center py-6 text-zinc-500 font-medium">No items in cart</div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className={`w-4 h-4 rounded-sm border-[1.5px] flex items-center justify-center bg-transparent ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                        </div>
                        <span className="text-[17px] font-medium text-white">
                          {item.name}
                        </span>
                      </div>
                      <div className="text-[17px] font-bold text-white mb-3">₹{item.price}</div>
                      <button 
                        className="flex items-center gap-1.5 text-[14px] font-medium text-white group active:scale-95 transition-transform"
                      >
                        Edit 
                        <div className="w-2.5 h-2.5 border-t-[5px] border-t-transparent border-l-[8px] border-l-green-500 border-b-[5px] border-b-transparent ml-1" />
                      </button>
                    </div>
                    <div className="flex flex-col items-end gap-5">
                      <div className="flex items-center justify-between w-[110px] px-3 py-2.5 border border-[#9EF07F] rounded-[14px]">
                        <button 
                          onClick={() => onUpdateQuantity?.(item.id, -1)}
                          className="text-white cursor-pointer active:scale-125 transition-transform"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="text-[18px] font-bold text-white">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity?.(item.id, 1)}
                          className="text-white cursor-pointer active:scale-125 transition-transform"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                      <div className="text-[17px] font-bold text-white">₹{item.price * item.quantity}</div>
                    </div>
                  </div>
                ))
              )}

              <div className="flex justify-end mt-10">
                <button 
                  onClick={onClose}
                  className="text-[#9EF07F] text-[18px] font-bold active:scale-95 transition-transform"
                >
                  +Add Item
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Recommended Section */}
        <h2 className="text-[22px] font-bold text-white mb-6">Recomended For You</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6">
          {recommendations.map((rec, i) => (
            <div key={i} className="flex-none w-[220px] bg-transparent border border-zinc-800 rounded-[32px] p-5 flex flex-col relative overflow-hidden">
              <div className="flex justify-between mb-4">
                <div>
                  <div className="text-[#9EF07F] text-[18px] font-bold mb-3">{rec.kcal} Kcal</div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                      <span className="text-[12px] font-bold text-white">{rec.protein}g</span>
                      <span className="text-[10px] text-zinc-500">Protein</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                      <span className="text-[12px] font-bold text-white">{rec.carb}g</span>
                      <span className="text-[10px] text-zinc-500">Carb</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                      <span className="text-[12px] font-bold text-white">{rec.fat}g</span>
                      <span className="text-[10px] text-zinc-500">Fat</span>
                    </div>
                  </div>
                </div>
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-zinc-800">
                  <img src={rec.image} className="w-full h-full object-cover" alt="" />
                </div>
              </div>

              <div className="flex justify-between items-end mt-4">
                <div>
                  <div className="text-[14px] font-medium text-white mb-1">{rec.name}</div>
                  <div className="text-[14px] font-bold text-zinc-400">₹{rec.price}</div>
                </div>
                <button 
                  onClick={() => onAddItem?.(rec)}
                  className="px-5 py-2 border border-[#9EF07F] rounded-xl text-[#9EF07F] font-bold text-[15px] active:bg-[#9EF07F] active:text-black transition-all"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Summery Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-[#0c0c0c] flex flex-col items-center">
        <button 
          onClick={onSummery}
          disabled={items.length === 0}
          className={`w-full font-bold py-4.5 rounded-[22px] text-[20px] transition-all active:scale-[0.98] shadow-lg mb-4 ${
            items.length === 0 
              ? 'bg-zinc-800 text-zinc-500 opacity-50 cursor-not-allowed' 
              : 'bg-[#9EF07F] hover:bg-[#8ee06f] text-black shadow-green-500/5'
          }`}
        >
          Summery
        </button>
        <div className="w-36 h-1.5 bg-white rounded-full opacity-30 mb-2" />
      </div>
    </div>
  );
};

export default OrderSummaryModal;