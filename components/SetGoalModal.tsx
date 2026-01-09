import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface SetGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SetGoalModal: React.FC<SetGoalModalProps> = ({ isOpen, onClose }) => {
  const [selectedGoal, setSelectedGoal] = useState('Balanced');
  const [kcal, setKcal] = useState('622');
  const [protein, setProtein] = useState(25);
  const [carbs, setCarbs] = useState(90);
  const [fat, setFat] = useState(18);

  const handleReset = () => {
    setSelectedGoal('Balanced');
    setKcal('622');
    setProtein(25);
    setCarbs(90);
    setFat(18);
  };

  if (!isOpen) return null;

  const goals = ['Balanced', 'Low fat', 'Low carbs', 'High Protein'];

  const MacroSlider = ({ label, value, unit, onChange }: { label: string, value: number, unit: string, onChange: (val: number) => void }) => (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center px-1">
        <span className="text-[16px] font-medium text-white">{label}</span>
        <span className="text-[14px] font-medium text-zinc-400">{value}{unit}</span>
      </div>
      <div className="relative h-6 flex items-center">
        <div className="absolute w-full h-1.5 bg-zinc-800 rounded-full" />
        <div 
          className="absolute h-1.5 bg-[#9EF07F] rounded-full" 
          style={{ width: `${(value / (label === 'Carbs' ? 150 : 100)) * 100}%` }} 
        />
        <input 
          type="range" 
          min="0" 
          max={label === 'Carbs' ? "150" : "100"}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div 
          className="absolute w-5 h-5 bg-white rounded-full shadow-lg border-2 border-zinc-900 pointer-events-none"
          style={{ left: `calc(${(value / (label === 'Carbs' ? 150 : 100)) * 100}% - 10px)` }}
        />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-[#121212] rounded-t-[32px] border-t border-zinc-800 p-6 pb-12 animate-in slide-in-from-bottom duration-500 overflow-hidden">
        {/* Handle */}
        <div className="w-full flex justify-center pb-2">
          <div className="w-16 h-1.5 bg-zinc-700 rounded-full opacity-50" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mt-2 mb-8">
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose} 
              className="p-1 -ml-1 text-white active:scale-90 transition-transform"
              aria-label="Back"
            >
              <ChevronLeft size={28} />
            </button>
            <h2 className="text-[20px] font-bold text-white">Set Goal</h2>
          </div>
          <button 
            onClick={handleReset} 
            className="text-[#9EF07F] font-bold text-[16px] active:opacity-60 transition-opacity"
          >
            Reset
          </button>
        </div>

        {/* Goal Chips */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {goals.map((goal) => {
            const isSelected = selectedGoal === goal;
            return (
              <button
                key={goal}
                onClick={() => setSelectedGoal(goal)}
                className={`px-6 py-3 rounded-xl text-[15px] font-bold border transition-all ${
                  isSelected 
                    ? 'border-[#9EF07F] text-[#9EF07F] bg-transparent' 
                    : 'border-zinc-800 text-zinc-400 bg-transparent'
                }`}
              >
                {goal}
              </button>
            );
          })}
        </div>

        {/* Kcal Input */}
        <div className="w-full bg-transparent border border-zinc-800 rounded-[18px] p-4 flex justify-between items-center mb-10">
          <input 
            type="number" 
            value={kcal} 
            onChange={(e) => setKcal(e.target.value)}
            className="bg-transparent text-white text-[18px] font-bold outline-none flex-1"
          />
          <span className="text-white text-[18px] font-bold">Kcal</span>
        </div>

        {/* Macro Sliders */}
        <div className="space-y-8 mb-12">
          <MacroSlider label="Protein" value={protein} unit="g" onChange={setProtein} />
          <MacroSlider label="Carbs" value={carbs} unit="g" onChange={setCarbs} />
          <MacroSlider label="Fat" value={fat} unit="g" onChange={setFat} />
        </div>

        {/* Action Button */}
        <button 
          onClick={onClose}
          className="w-full bg-[#9EF07F] hover:bg-[#8ee06f] text-black font-bold py-4.5 rounded-[20px] text-[20px] transition-all active:scale-[0.98] shadow-lg shadow-green-500/10"
        >
          Save Goal
        </button>

        {/* Home Indicator */}
        <div className="flex justify-center mt-6">
          <div className="w-32 h-1.5 bg-white rounded-full opacity-20" />
        </div>
      </div>
    </div>
  );
};

export default SetGoalModal;