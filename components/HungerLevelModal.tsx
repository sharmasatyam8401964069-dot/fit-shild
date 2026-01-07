
import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface HungerLevelModalProps {
  onSelect: (level: string) => void;
}

const HungerLevelModal: React.FC<HungerLevelModalProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const options = [
    { label: 'High', fill: 100 },
    { label: 'Medium', fill: 60 },
    { label: 'Low', fill: 30 },
  ];

  const handleSelect = (label: string) => {
    setSelected(label);
    // Brief delay to show selection, then show confirmation checkmark
    setTimeout(() => {
      setIsConfirmed(true);
      // After confirmation visual, proceed to the loading screen
      setTimeout(() => {
        onSelect(label);
      }, 800);
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#0c0c0c] flex flex-col px-6 pt-20">
      {isConfirmed ? (
        <div className="flex-1 flex flex-col items-center justify-center animate-in zoom-in fade-in duration-300">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
            <Check size={40} className="text-black stroke-[3]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Confirmed!</h2>
          <p className="text-zinc-500 mt-2">Setting up your menu...</p>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-white mb-12">Hunger level</h1>

          <div className="space-y-4">
            {options.map((opt) => {
              const isItemChecked = selected === opt.label;
              return (
                <button
                  key={opt.label}
                  onClick={() => handleSelect(opt.label)}
                  disabled={!!selected}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-[24px] border transition-all duration-300 ${
                    isItemChecked 
                      ? 'border-green-500 bg-green-500/10 scale-[0.98]' 
                      : 'border-zinc-800 bg-transparent active:scale-[0.97]'
                  }`}
                >
                  {/* Battery Icon */}
                  <div className={`w-5 h-8 border-2 rounded-sm p-0.5 flex flex-col justify-end relative transition-colors ${isItemChecked ? 'border-green-500' : 'border-white'}`}>
                    {/* Battery Cap */}
                    <div className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-1 rounded-t-[1px] transition-colors ${isItemChecked ? 'bg-green-500' : 'bg-white'}`} />
                    <div 
                      className={`w-full rounded-[1px] transition-colors ${isItemChecked ? 'bg-green-500' : 'bg-white'}`} 
                      style={{ height: `${opt.fill}%` }}
                    />
                  </div>
                  
                  <span className={`text-xl font-medium transition-colors ${isItemChecked ? 'text-green-500' : 'text-zinc-300'}`}>
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Footer Indicator */}
      <div className="mt-auto flex justify-center pb-8">
        <div className="w-32 h-1.5 bg-white/20 rounded-full" />
      </div>
    </div>
  );
};

export default HungerLevelModal;
