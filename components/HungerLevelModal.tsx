
import React from 'react';

interface HungerLevelModalProps {
  onSelect: (level: string) => void;
}

const HungerLevelModal: React.FC<HungerLevelModalProps> = ({ onSelect }) => {
  const [selected, setSelected] = React.useState('High');

  const options = [
    { label: 'High', color: 'text-green-500', border: 'border-green-500', fill: 100 },
    { label: 'Medium', color: 'text-zinc-400', border: 'border-zinc-800', fill: 60 },
    { label: 'Low', color: 'text-zinc-400', border: 'border-zinc-800', fill: 30 },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-[#0c0c0c] flex flex-col px-6 pt-20">
      <h1 className="text-3xl font-bold text-white mb-12">Hunger level</h1>

      <div className="space-y-4">
        {options.map((opt) => {
          const isSelected = selected === opt.label;
          return (
            <button
              key={opt.label}
              onClick={() => {
                setSelected(opt.label);
                // Artificial delay to show selection before proceeding
                setTimeout(() => onSelect(opt.label), 300);
              }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-[20px] border transition-all duration-200 ${
                isSelected ? 'border-green-500 bg-green-500/5' : 'border-zinc-800 bg-transparent'
              }`}
            >
              {/* Battery Icon */}
              <div className="w-5 h-8 border-2 border-white rounded-sm p-0.5 flex flex-col justify-end relative">
                {/* Battery Cap */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-1 bg-white rounded-t-[1px]" />
                <div 
                  className="w-full bg-white rounded-[1px]" 
                  style={{ height: `${opt.fill}%` }}
                />
              </div>
              
              <span className={`text-xl font-medium ${isSelected ? 'text-green-500' : 'text-zinc-300'}`}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer Indicator */}
      <div className="mt-auto flex justify-center pb-8">
        <div className="w-32 h-1.5 bg-white/20 rounded-full" />
      </div>
    </div>
  );
};

export default HungerLevelModal;
