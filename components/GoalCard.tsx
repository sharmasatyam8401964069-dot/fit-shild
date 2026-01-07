
import React from 'react';

interface GoalCardProps {
  onTap: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ onTap }) => {
  return (
    <div className="bg-[#141414] border border-zinc-800 rounded-2xl p-4 relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-zinc-400">Your Dinner Goal</h3>
        <button className="text-green-500 text-xs font-semibold">Edit</button>
      </div>

      <div className="flex items-center gap-6">
        {/* Radial Progress */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48" cy="48" r="42"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-zinc-800"
            />
            <circle
              cx="48" cy="48" r="42"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={263.8}
              strokeDashoffset={263.8 * (1 - 0.75)}
              className="text-[#323232]"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold">622</span>
            <span className="text-[10px] text-zinc-500 font-medium">Kcal</span>
          </div>
        </div>

        {/* Macro Progress */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400">Protein</span>
            <span className="text-zinc-300 font-medium">25gm</span>
          </div>
          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="w-[60%] h-full bg-green-500/80 rounded-full" />
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400">Carbs</span>
            <span className="text-zinc-300 font-medium">70gm</span>
          </div>
          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="w-[45%] h-full bg-zinc-600 rounded-full" />
          </div>
        </div>

        {/* Floating Fiber Stat */}
        <div className="flex flex-col items-end">
           <div className="flex items-center gap-1.5 mb-3">
             <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
             <span className="text-[11px] text-zinc-400">18gm Fiber</span>
           </div>
           <div className="flex items-center gap-1.5">
             <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
             <span className="text-[11px] text-zinc-400">Fat</span>
           </div>
        </div>
      </div>

      {/* Recommendation Overlay */}
      <div 
        onClick={onTap}
        className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] cursor-pointer"
      >
        <p className="text-lg font-medium text-white mb-1">“See what’s best for you”</p>
        <span className="text-green-500 font-bold underline decoration-2 underline-offset-4">Tap here</span>
      </div>
    </div>
  );
};

export default GoalCard;
