
import React, { useState } from 'react';
import { X, Star, ChevronDown } from 'lucide-react';
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
        <span className="text-sm font-bold">{value}</span>
      </div>
      <span className="text-[10px] text-zinc-500 font-medium">{label}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#0e0e0e] w-full max-w-md h-[95vh] rounded-t-[40px] flex flex-col border-t border-zinc-800 animate-in slide-in-from-bottom duration-500">
        
        {/* Pull Indicator & Header */}
        <div className="w-full flex justify-center pt-4 pb-2" onClick={onClose}>
          <div className="w-12 h-1.5 bg-zinc-800 rounded-full cursor-pointer" />
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-32">
          <h2 className="text-xl font-bold text-white mb-6 mt-2">{dish.name} Customization</h2>

          {/* Macro Summary Row */}
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-zinc-800" />
                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={175.9} strokeDashoffset={175.9 * (1 - 0.7)} className="text-white" strokeLinecap="round" />
              </svg>
              <div className="flex flex-col items-center">
                <span className="text-sm font-bold">622</span>
                <span className="text-[8px] text-zinc-500 font-bold">Kcal</span>
              </div>
            </div>
            <MacroIndicator label="Protein" value="24g" colorClass="bg-yellow-400" />
            <MacroIndicator label="Carb" value="24g" colorClass="bg-blue-400" />
            <MacroIndicator label="Fat" value="24g" colorClass="bg-purple-500" />
            <MacroIndicator label="Fiber" value="24g" colorClass="bg-pink-400" />
          </div>

          {/* Size Selection */}
          <section className="bg-[#141414] border border-zinc-800 rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-white">Size</h3>
            </div>
            <p className="text-[11px] text-zinc-500 mb-4 font-medium">Required • Select any 1 option</p>
            
            <div className="space-y-4">
              {[
                { label: 'Regular', price: 250, bestMatch: true, sub: '250g • 1 serve' },
                { label: 'Medium', price: 500, bestMatch: false, sub: '500g • 2 serve' }
              ].map(opt => (
                <div key={opt.label} onClick={() => setSelectedSize(opt.label)} className="flex items-center justify-between cursor-pointer">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{opt.label}</span>
                      {opt.bestMatch && (
                        <span className="bg-[#1e2a1e] text-green-400 text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 border border-green-900/50">
                          Best Match <Star size={8} className="fill-green-400" />
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-500">{opt.sub}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold">₹{opt.price}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedSize === opt.label ? 'border-green-500' : 'border-zinc-700'}`}>
                      {selectedSize === opt.label && <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Crust Selection */}
          <section className="bg-[#141414] border border-zinc-800 rounded-2xl p-4 mb-4">
            <h3 className="font-bold text-white mb-1">Crust</h3>
            <p className="text-[11px] text-zinc-500 mb-4 font-medium">Required • Select any 1 option</p>
            
            <div className="space-y-6">
              {[
                'Korean Sweet Chili Cheese Burst',
                'Cheese Bust',
                'Hot n Fiery Chasse Burst',
                'Creamy Makhanai Cheese Burst'
              ].map(crust => (
                <div key={crust} onClick={() => setSelectedCrust(crust)} className="cursor-pointer">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-sm font-medium flex-1 pr-4">{crust}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedCrust === crust ? 'border-green-500' : 'border-zinc-700'}`}>
                      {selectedCrust === crust && <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[10px] text-zinc-500"><span className="w-1.5 h-1.5 inline-block bg-yellow-400 rounded-full mr-1" /> 24g Protein</span>
                    <span className="text-[10px] text-zinc-500"><span className="w-1.5 h-1.5 inline-block bg-blue-400 rounded-full mr-1" /> 24g Carb</span>
                    <span className="text-[10px] text-zinc-500"><span className="w-1.5 h-1.5 inline-block bg-purple-500 rounded-full mr-1" /> 24g Fat</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Add-ons (Toppings) */}
          <section className="bg-[#141414] border border-zinc-800 rounded-2xl p-4 mb-4">
            <h3 className="font-bold text-white mb-1">Extra Toppings</h3>
            <p className="text-[11px] text-zinc-500 mb-4 font-medium">Select up to 8 options</p>
            
            <div className="space-y-6">
              {[
                { name: 'Onion', price: 34 },
                { name: 'Black Olive', price: 34 },
                { name: 'Grilled Mushrooms', price: 34 },
                { name: 'Crisp Capsicum', price: 34 }
              ].map(topping => (
                <div key={topping.name} onClick={() => toggleTopping(topping.name)} className="cursor-pointer">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-sm font-medium">{topping.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold">₹{topping.price}</span>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${selectedToppings.includes(topping.name) ? 'bg-green-500 border-green-500' : 'border-zinc-700'}`}>
                        {selectedToppings.includes(topping.name) && <X size={14} className="text-black stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[10px] text-zinc-500"><span className="w-1.5 h-1.5 inline-block bg-yellow-400 rounded-full mr-1" /> 24g Protein</span>
                    <span className="text-[10px] text-zinc-500"><span className="w-1.5 h-1.5 inline-block bg-blue-400 rounded-full mr-1" /> 24g Carb</span>
                    <span className="text-[10px] text-zinc-500"><span className="w-1.5 h-1.5 inline-block bg-purple-500 rounded-full mr-1" /> 24g Fat</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-1 text-[11px] text-zinc-400 mt-6 font-bold">
              +4 more <ChevronDown size={12} />
            </button>
          </section>
        </div>

        {/* Sticky Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-[#0e0e0e] border-t border-zinc-800 flex justify-center pb-8">
          <button 
            onClick={onClose}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-2xl text-lg transition-all active:scale-[0.98]"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;
