
import React from 'react';
import { Minus, Plus, ChevronRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, items, onUpdateQuantity }) => {
  if (!isOpen) return null;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#0e0e0e] w-full max-w-md rounded-t-[40px] flex flex-col border-t border-zinc-800 animate-in slide-in-from-bottom duration-500 max-h-[85vh]">
        
        {/* Pull Indicator */}
        <div className="w-full flex justify-center pt-4 pb-2" onClick={onClose}>
          <div className="w-12 h-1.5 bg-zinc-800 rounded-full cursor-pointer" />
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-4">
          <h2 className="text-xl font-bold text-white mb-8">Your Cart</h2>

          <div className="space-y-10">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3.5 h-3.5 rounded-sm border border-green-600 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                    </div>
                    <span className="text-base font-semibold text-white">{item.name}</span>
                  </div>
                  
                  <div className="flex flex-col mb-2">
                    <span className="text-sm font-medium text-zinc-300">₹{item.price}</span>
                    {item.quantity > 1 && (
                       <span className="text-[11px] text-zinc-500 font-medium">₹{item.price} x {item.quantity}</span>
                    )}
                  </div>

                  <button className="flex items-center gap-1 text-[11px] font-bold text-zinc-400">
                    Edit <ChevronRight size={10} className="text-green-500 fill-green-500" />
                  </button>
                </div>

                {/* Quantity Control */}
                <div className="flex items-center gap-4 px-3 py-1.5 border border-green-500 rounded-lg bg-green-500/5">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="text-green-500 p-0.5"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold text-green-500 w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="text-green-500 p-0.5"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={onClose}
            className="w-full text-center mt-10 text-green-500 font-bold text-sm underline underline-offset-4 decoration-green-900"
          >
            +Add new item
          </button>
        </div>

        {/* Divider & Footer */}
        <div className="px-6 pb-10 pt-4 bg-[#0e0e0e] border-t border-zinc-900 border-dashed">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 h-full">
              <span className="text-lg font-medium text-zinc-300">{totalItems} Items</span>
              <div className="w-[1px] h-10 bg-zinc-800" />
            </div>

            <button 
              className="bg-green-400 hover:bg-green-300 text-black px-12 py-3.5 rounded-xl font-bold text-base transition-colors shadow-lg shadow-green-500/10 active:scale-95"
            >
              Continue
            </button>
          </div>
        </div>
        
        {/* Home Indicator */}
        <div className="flex justify-center pb-2">
           <div className="w-32 h-1.5 bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CartModal;
