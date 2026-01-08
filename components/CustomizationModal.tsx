
import React, { useState } from 'react';
import { X, Star, ChevronDown, ChevronLeft } from 'lucide-react';
import { Dish } from '../types.ts';

interface CustomizationModalProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
}

const CustomizationModal: React.FC<CustomizationModalProps> = ({ dish, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('Regular');
  const [selectedCrust, setSelectedCrust] = useState('Korean Sweet Chili Cheese Burst');
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['Black Olive']);

  if (!isOpen || !dish) return null;

  const toggleTopping = (topping: string) => {
    setSelectedToppings(prev => 
      prev.includes(topping) ? prev.filter(t => t !== topping) : [...prev, topping]
    );
  };

  const MacroIndicator = ({ label, value, colorClass }: { label: string, value: string, colorClass: string }) => (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1.5">
        <div className={`w-1.5 h-1.5 rounded-full ${colorClass}`} />
        <span className="text-sm font-bold text-zinc-100">{value}</span>
      </div>
      <span className="text-[11px] text-zinc-500 font-medium">{label}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#0c0c0c] w-full max-w-md h-[95vh] rounded-t-[40px] flex flex-col border-t border-zinc-800/50 animate-in slide-in-from-bottom duration-500 relative">
        
        {/* Pull Indicator & Navigation */}
        <div className="w-full flex justify-center pt-4 pb-1">
          <div className="w-14 h-1.5 bg-zinc-800 rounded-full" />
        </div>

        {/* Header with Back Button */}
        <div className="flex items-center px-6 py-4">
          <button 
            onClick={onClose} 
            className="p-2 bg-zinc-900/50 rounded-full mr-4 hover:bg-zinc-800 transition-colors active:scale-90"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          <h2 className="text-xl font-bold text-white tracking-tight">{dish.name}</h2>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-32 pt-2">
          {/* Macro Summary Row - Matching Screenshot */}
          <div className="flex items-center justify-between mb-10 px-1">
            <div className="relative w-[72px] h-[72px] flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="36" cy="36" r="32" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-zinc-800" />
                <circle cx="36" cy="36" r="32" stroke="currentColor" strokeWidth="5" fill="transparent" strokeDasharray={201} strokeDashoffset={201 * (1 - 0.75)} className="text-white" strokeLinecap="round" />
                {/* Accent arc */}
                <circle cx="36" cy="36" r="32" stroke="currentColor" strokeWidth="5" fill="transparent" strokeDasharray={201} strokeDashoffset={201 * (1 - 0.2)} className="text-purple-500" strokeLinecap="round" style={{ transform: 'rotate(20deg)', transformOrigin: 'center' }} />
              </svg>
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold">622</span>
                <span className="text-[9px] text-zinc-500 font-bold tracking-tight">Kcal</span>
              </div>
            </div>
            <MacroIndicator label="Protein" value="24g" colorClass="bg-yellow-400" />
            <MacroIndicator label="Carb" value="24g" colorClass="bg-blue-400" />
            <MacroIndicator label="Fat" value="24g" colorClass="bg-purple-500" />
            <MacroIndicator label="Fiber" value="24g" colorClass="bg-pink-400" />
          </div>

          {/* Size Selection */}
          <section className="bg-[#141414] border border-zinc-800 rounded-[28px] p-5 mb-4 shadow-sm">
            <h3 className="text-lg font-bold text-white mb-0.5">Size</h3>
            <p className="text-[11px] text-zinc-500 mb-5 font-medium">Required • Select any 1 option</p>
            
            <div className="space-y-6">
              {[
                { label: 'Regular', price: 250, bestMatch: true, sub: '250g • 1 serve' },
                { label: 'Medium', price: 500, bestMatch: false, sub: '500g • 2 serve' }
              ].map(opt => (
                <div key={opt.label} onClick={() => setSelectedSize(opt.label)} className="flex items-center justify-between cursor-pointer">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[15px] font-semibold text-zinc-100">{opt.label}</span>
                      {opt.bestMatch && (
                        <span className="bg-[#1e2a1e] text-green-400 text-[9px] px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-green-900/50 font-bold">
                          Best Match <Star size={8} className="fill-green-400" />
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-zinc-500">{opt.sub}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[15px] font-bold text-zinc-100">₹{opt.price}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedSize === opt.label ? 'border-green-500' : 'border-zinc-700'}`}>
                      {selectedSize === opt.label && <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Crust Selection */}
          <section className="bg-[#141414] border border-zinc-800 rounded-[28px] p-5 mb-4 shadow-sm">
            <h3 className="text-lg font-bold text-white mb-0.5">Crust</h3>
            <p className="text-[11px] text-zinc-500 mb-5 font-medium">Required • Select any 1 option</p>
            
            <div className="space-y-7">
              {[
                'Korean Sweet Chili Cheese Burst',
                'Cheese Bust',
                'Hot n Fiery Chasse Burst',
                'Creamy Makhanai Cheese Burst'
              ].map(crust => (
                <div key={crust} onClick={() => setSelectedCrust(crust)} className="cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[15px] font-semibold text-zinc-100 flex-1 pr-4">{crust}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedCrust === crust ? 'border-green-500' : 'border-zinc-700'}`}>
                      {selectedCrust === crust && <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[11px] text-zinc-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" /> 24g Protein</span>
                    <span className="text-[11px] text-zinc-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> 24g Carb</span>
                    <span className="text-[11px] text-zinc-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> 24g Fat</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Add-ons (Toppings) */}
          <section className="bg-[#141414] border border-zinc-800 rounded-[28px] p-5 mb-4 shadow-sm">
            <h3 className="text-lg font-bold text-white mb-0.5">Extra Toppings</h3>
            <p className="text-[11px] text-zinc-500 mb-5 font-medium">Select up to 8 options</p>
            
            <div className="space-y-7">
              {[
                { name: 'Onion', price: 34 },
                { name: 'Black Olive', price: 34 },
                { name: 'Grilled Mushrooms', price: 34 },
                { name: 'Crisp Capsicum', price: 34 }
              ].map(topping => (
                <div key={topping.name} onClick={() => toggleTopping(topping.name)} className="cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[15px] font-semibold text-zinc-100">{topping.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-[15px] font-bold text-zinc-100">₹{topping.price}</span>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${selectedToppings.includes(topping.name) ? 'bg-green-500 border-green-500' : 'border-zinc-700'}`}>
                        {selectedToppings.includes(topping.name) && <X size={14} className="text-black stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[11px] text-zinc-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" /> 24g Protein</span>
                    <span className="text-[11px] text-zinc-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> 24g Carb</span>
                    <span className="text-[11px] text-zinc-500 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> 24g Fat</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-1 text-[11px] text-zinc-400 mt-6 font-bold hover:text-zinc-200 transition-colors">
              +4 more <ChevronDown size={14} />
            </button>
          </section>
        </div>

        {/* Sticky Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-[#0c0c0c] border-t border-zinc-800/50 flex flex-col items-center pb-8 z-20">
          <button 
            onClick={onClose}
            className="w-full bg-[#9EF07F] hover:bg-[#8ee06f] text-black font-bold py-4 rounded-2xl text-lg transition-all active:scale-[0.98] shadow-lg shadow-green-500/5"
          >
            Add Item
          </button>
          <div className="w-32 h-1.5 bg-white/20 rounded-full mt-4" />
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;
