
import React from 'react';
import { Minus, Plus, Play } from 'lucide-react';
import { CartItem } from '../types.ts';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onContinue?: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, items, onUpdateQuantity, onContinue }) => {
  if (!isOpen) return null;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Clickable background to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="bg-[#121212] w-full max-w-md rounded-t-[32px] flex flex-col border-t border-zinc-800/50 animate-in slide-in-from-bottom duration-500 max-h-[90vh] relative z-10">
        
        {/* Pull Indicator */}
        <div className="w-full flex justify-center pt-4 pb-1">
          <div className="w-14 h-1 bg-zinc-600 rounded-full" />
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-6 pb-4">
          <h2 className="text-[22px] font-bold text-white mb-10">Your Cart</h2>

          <div className="space-y-12">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    {/* Native-look Veg Icon */}
                    <div className="w-4 h-4 rounded-sm border-[1.5px] border-green-600 flex items-center justify-center bg-transparent">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                    </div>
                    <span className="text-lg font-medium text-white tracking-tight">{item.name}</span>
                  </div>
                  
                  <div className="flex flex-col mb-3">
                    <span className="text-base font-semibold text-white">₹{item.price}</span>
                    {item.quantity > 1 && (
                       <span className="text-[12px] text-zinc-500 font-medium">₹{item.price} x {item.quantity}</span>
                    )}
                  </div>

                  <button className="flex items-center gap-1.5 text-xs font-semibold text-white group">
                    Edit 
                    <Play size={8} className="text-green-500 fill-green-500 rotate-0" />
                  </button>
                </div>

                {/* Styled Quantity Control */}
                <div className="flex items-center justify-between w-24 px-2 py-2 border border-green-500/80 rounded-xl bg-transparent">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="text-white hover:text-green-500 transition-colors"
                  >
                    <Minus size={18} strokeWidth={2.5} />
                  </button>
                  <span className="text-lg font-bold text-green-500">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="text-white hover:text-green-500 transition-colors"
                  >
                    <Plus size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12 mb-8">
            <button 
              onClick={onClose}
              className="text-green-500 font-bold text-base underline underline-offset-[6px] decoration-green-500/40 hover:decoration-green-500"
            >
              +Add new item
            </button>
          </div>
        </div>

        {/* Dash Divider */}
        <div className="px-6">
          <div className="w-full border-t border-zinc-800 border-dashed" />
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-8 bg-[#121212]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8 h-full pl-2">
              <span className="text-xl font-medium text-white">{totalItems} Items</span>
              <div className="w-[1px] h-10 bg-zinc-800" />
            </div>

            <button 
              onClick={onContinue}
              className="bg-[#9EF07F] hover:bg-[#8ee06f] text-black px-12 py-3.5 rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-500/5 active:scale-95"
            >
              Continue
            </button>
          </div>
        </div>
        
        {/* Home Indicator Mimic */}
        <div className="flex justify-center pb-2">
           <div className="w-32 h-1.5 bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CartModal;
