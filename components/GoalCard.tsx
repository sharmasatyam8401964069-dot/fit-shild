import React from 'react';

interface GoalCardProps {
  onTap: () => void;
  onEdit?: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ onTap, onEdit }) => {
  return (
    <div 
      onClick={onTap}
      className="bg-[#141414] border border-zinc-800 rounded-[28px] p-5 relative overflow-hidden shadow-2xl cursor-pointer active:scale-[0.99] transition-transform"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[15px] font-medium text-zinc-300">Your Dinner Goal</h3>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (onEdit) onEdit();
          }}
          className="text-[#9EF07F] text-[15px] font-bold active:opacity-70"
        >
          Edit
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Radial Progress */}
        <div className="relative w-[76px] h-[76px] flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="38" cy="38" r="33"
              stroke="currentColor"
              strokeWidth="5"
              fill="transparent"
              className="text-zinc-800"
            />
            <circle
              cx="38" cy="38" r="33"
              stroke="currentColor"
              strokeWidth="5"
              fill="transparent"
              strokeDasharray={207.3}
              strokeDashoffset={207.3 * (1 - 0.75)}
              className="text-white"
              strokeLinecap="round"
            />
            {/* Purple accent piece */}
            <circle
              cx="38" cy="38" r="33"
              stroke="currentColor"
              strokeWidth="5"
              fill="transparent"
              strokeDasharray={207.3}
              strokeDashoffset={207.3 * (1 - 0.2)}
              className="text-purple-500"
              strokeLinecap="round"
              style={{ transform: 'rotate(45deg)', transformOrigin: 'center' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[17px] font-bold text-white">622</span>
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-tight">Kcal</span>
          </div>
        </div>

        {/* Macros Grid */}
        <div className="flex-1 bg-[#0c0c0c]/40 border border-zinc-800/50 rounded-[20px] p-3 grid grid-cols-4 gap-1 h-[76px]">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 mb-0.5">
              <div className="w-1 h-1 bg-yellow-500 rounded-full" />
              <span className="text-[11px] font-bold text-white">25gm</span>
            </div>
            <span className="text-[10px] text-zinc-500">Protein</span>
          </div>
          <div className="w-px h-6 bg-zinc-800 self-center" />
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 mb-0.5">
              <div className="w-1 h-1 bg-blue-400 rounded-full" />
              <span className="text-[11px] font-bold text-white">90gm</span>
            </div>
            <span className="text-[10px] text-zinc-500">Carb</span>
          </div>
          <div className="w-px h-6 bg-zinc-800 self-center" />
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 mb-0.5">
              <div className="w-1 h-1 bg-purple-500 rounded-full" />
              <span className="text-[11px] font-bold text-white">18gm</span>
            </div>
            <span className="text-[10px] text-zinc-500">Fat</span>
          </div>
          <div className="w-px h-6 bg-zinc-800 self-center" />
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 mb-0.5">
              <div className="w-1 h-1 bg-pink-400 rounded-full" />
              <span className="text-[11px] font-bold text-white">18gm</span>
            </div>
            <span className="text-[10px] text-zinc-500">Fiber</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;