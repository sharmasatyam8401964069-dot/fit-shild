
import React from 'react';
import { Utensils } from 'lucide-react';

interface BottomNavProps {
  cartCount: number;
  onContinue: () => void;
  onMenuClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ cartCount, onContinue, onMenuClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 flex flex-col items-center pointer-events-none">
      {/* Menu Floating Button */}
      <button 
        onClick={onMenuClick}
        className="pointer-events-auto flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full shadow-2xl mb-4 transform hover:scale-105 active:scale-95 transition-all font-bold text-sm"
      >
        <Utensils size={18} />
        Menu
      </button>

      {/* Cart Summary Bar */}
      <div className="pointer-events-auto w-full bg-black border border-zinc-800 rounded-2xl p-2.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4 pl-3">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">{cartCount} Items</span>
            <span className="text-[10px] text-zinc-500 font-medium">VIEW DETAILS</span>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
        </div>

        <button 
          onClick={onContinue}
          className="bg-green-400 hover:bg-green-300 text-black px-10 py-3 rounded-xl font-bold text-base transition-colors flex items-center gap-2"
        >
          Continue
        </button>
      </div>
      
      {/* Home Indicator Mimic */}
      <div className="w-32 h-1 bg-white/20 rounded-full mt-4" />
    </div>
  );
};

export default BottomNav;
