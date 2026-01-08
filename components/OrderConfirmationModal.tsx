
import React from 'react';
import { ChevronLeft, Sparkle } from 'lucide-react';
import { CartItem } from '../types.ts';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTipsClick?: () => void;
  items: CartItem[];
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ isOpen, onClose, onTipsClick, items }) => {
  if (!isOpen) return null;

  // Mock list items to match the screenshot more closely if cart is small
  const displayItems = items.length > 2 ? items : [
    { name: 'Hyderabadi Biryani (Half)', quantity: 1, sub: '[ Tomato, Extra cheese, olives ]' },
    { name: 'Broccoli Almond Soup (Half) ji', quantity: 1 },
    { name: 'Fruit Salad', quantity: 1 },
    { name: 'Hyderabadi Biryani (Half)', quantity: 1 },
    { name: 'Broccoli Almond Soup (Half) ji', quantity: 1 },
    { name: 'Fruit Salad', quantity: 1 },
    { name: 'Peri Peri fries', quantity: 1 },
    { name: 'Peach Tea', quantity: 1 },
    { name: 'Hyderabadi Biryani (Half)', quantity: 1 },
    { name: 'Veg Pizza', quantity: 1 },
    { name: 'Fruit Salad', quantity: 1 },
    { name: 'Paneer Chilly', quantity: 1 },
    { name: 'Broccoli Almond Soup (Half) ji', quantity: 1 },
    { name: 'Peri Peri fries', quantity: 1 },
    { name: 'Peach Tea', quantity: 1 },
    { name: 'Veg Pizza', quantity: 1 },
  ];

  return (
    <div className="fixed inset-0 z-[150] bg-black flex flex-col animate-in fade-in duration-300 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e2a0e]/20 to-black pointer-events-none" />
      
      {/* Header */}
      <header className="relative flex items-center justify-center py-6 px-4 z-10">
        <button onClick={onClose} className="absolute left-6 text-white hover:opacity-70 transition-opacity">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-[20px] font-bold text-white tracking-wide">Order Summery</h1>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 pt-4 relative z-10 overflow-hidden">
        {/* Confident Status */}
        <div className="flex flex-col items-center mb-8 flex-shrink-0">
          <h2 className="text-[32px] font-bold text-zinc-800 mb-1">You're Confident</h2>
          <p className="text-[14px] text-zinc-100 font-medium">Show this card to captain to place order</p>
        </div>

        {/* Tips Badge */}
        <div className="absolute top-28 right-6 z-20">
          <button 
            onClick={onTipsClick}
            className="flex items-center gap-2 bg-[#1a1a1a] px-3.5 py-2 rounded-full border border-zinc-800 shadow-xl group active:scale-95 transition-all"
          >
            <div className="w-5 h-5 bg-zinc-700 rounded-full flex items-center justify-center">
              <Sparkle size={12} className="text-white fill-white" />
            </div>
            <span className="text-sm font-bold text-white">Tips</span>
          </button>
        </div>

        {/* Green Bordered List Box */}
        <div className="w-full flex-1 mb-4 border-[1.5px] border-[#9EF07F] rounded-[40px] bg-black/40 backdrop-blur-md overflow-hidden flex flex-col shadow-[0_0_30px_rgba(158,240,127,0.05)]">
          <div className="flex-1 overflow-y-auto no-scrollbar px-8 py-8 space-y-4">
            {displayItems.map((item, idx) => (
              <div key={idx} className="flex flex-col space-y-0.5">
                <div className="flex justify-between items-start">
                   <div className="flex items-start gap-1.5">
                      <span className="text-[18px] font-medium text-zinc-100 leading-tight">
                        {item.name}
                      </span>
                      {/* Sub-indicator if it has 'ji' or similar */}
                      {item.name?.includes('ji') && (
                        <div className="w-1.5 h-1.5 bg-[#9EF07F] rounded-full mt-2" />
                      )}
                   </div>
                   <span className="text-[18px] font-bold text-zinc-100">{item.quantity}</span>
                </div>
                {'sub' in item && (
                  <span className="text-[14px] text-zinc-500 font-medium">{item.sub}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Area with Add More */}
      <footer className="relative z-10 flex flex-col items-center pb-6">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-[#9EF07F] text-[20px] font-bold py-4 px-8 group transition-all active:scale-95"
        >
          <span className="text-2xl font-light mb-0.5 group-hover:scale-110 transition-transform">+</span>
          <span className="underline underline-offset-[8px] decoration-[#9EF07F]/40">Add More</span>
        </button>
        
        {/* Home Indicator */}
        <div className="w-36 h-1.5 bg-white rounded-full opacity-40 mt-2" />
      </footer>
    </div>
  );
};

export default OrderConfirmationModal;
