
import React from 'react';
import { ChevronLeft, ChevronDown, Plus } from 'lucide-react';
import { CartItem, Dish } from '../types.ts';
import GoalCard from './GoalCard';
import { DISHES } from '../data';

interface OrderSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSummery?: () => void;
  items: CartItem[];
}

const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({ isOpen, onClose, onSummery, items }) => {
  if (!isOpen) return null;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  // Use some dishes for recommendations
  const recommendedDishes: Partial<Dish>[] = [
    { id: 'rec1', name: 'Veg Puff (Half)', price: 120, image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=400' },
    { id: 'rec2', name: 'Veg Puff (Half)', price: 120, image: '' }, // Empty for the placeholder look
    { id: 'rec3', name: 'Veg Puff (Half)', price: 120, image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="fixed inset-0 z-[140] bg-[#0c0c0c] flex flex-col animate-in fade-in duration-300 overflow-hidden">
      {/* Header */}
      <header className="relative flex items-center justify-center py-6 px-4 bg-[#0c0c0c] z-10">
        <button onClick={onClose} className="absolute left-6 text-white hover:opacity-70 transition-opacity">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-[20px] font-bold text-white">Order Cart</h1>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-5 pt-2 pb-32">
        {/* Goal Card Section */}
        <div className="mb-6">
          <GoalCard onTap={() => {}} />
        </div>

        {/* Order Items Dropdown Button */}
        <button className="w-full bg-[#141414] border border-zinc-800 rounded-[20px] p-4 flex items-center justify-between mb-8 group active:scale-[0.98] transition-all">
          <span className="text-lg font-medium text-white">Your Order item ({totalItems})</span>
          <ChevronDown size={24} className="text-zinc-400" />
        </button>

        {/* Recommended Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-5">Recomended For You</h2>
          
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-1 px-1">
            {recommendedDishes.map((dish, idx) => (
              <div key={dish.id || idx} className="flex-none w-[170px] bg-transparent border border-zinc-800 rounded-[24px] p-3 flex flex-col">
                <div className="w-full aspect-square bg-zinc-900 rounded-[18px] mb-3 overflow-hidden flex items-center justify-center border border-zinc-800/50">
                  {dish.image ? (
                    <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center opacity-20">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 15h18M3 11h18M3 7h18M3 19h18"/></svg>
                    </div>
                  )}
                </div>
                
                <h3 className="text-sm font-medium text-white mb-1.5 truncate">{dish.name}</h3>
                <p className="text-sm font-bold text-white mb-4">₹{dish.price}</p>
                
                <button className="w-full py-2 border border-green-500 rounded-xl text-green-500 font-bold text-sm bg-transparent hover:bg-green-500/5 transition-colors">
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-[#0c0c0c] flex flex-col items-center">
        <button 
          onClick={onSummery}
          className="w-full bg-[#9EF07F] hover:bg-[#8ee06f] text-black font-bold py-4 rounded-[20px] text-[20px] transition-all active:scale-[0.98] shadow-lg shadow-green-500/5"
        >
          Summery
        </button>
        {/* Home Indicator Mimic */}
        <div className="w-32 h-1.5 bg-white rounded-full mt-4 mb-2 opacity-30" />
      </div>
    </div>
  );
};

export default OrderSummaryModal;
