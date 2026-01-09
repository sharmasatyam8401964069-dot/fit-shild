import React from 'react';

interface GoalCardProps {
  onTap: () => void;
  onEdit?: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ onTap, onEdit }) => {
  return (
    <div 
      onClick={onTap}
      className="bg-[#141414] border border-zinc-800 rounded-[28px] p-5 pb-6 relative overflow-hidden shadow-2xl cursor-pointer active:scale-[0.99] transition-transform"
    >
      <div className="flex justify-between items-center mb-5">
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
        <div className="relative w-[82px] h-[82px] flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="41" cy="41" r="35"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-zinc-800"
            />
            {/* White progress */}
            <circle
              cx="41" cy="41" r="35"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={219.9}
              strokeDashoffset={219.9 * (1 - 0.65)}
              className="text-white"
              strokeLinecap="round"
            />
            {/* Purple accent piece */}
            <circle
              cx="41" cy="41" r="35"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={219.9}
              strokeDashoffset={219.9 * (1 - 0.15)}
              className="text-pink-400"
              strokeLinecap="round"
              style={{ transform: 'rotate(110deg)', transformOrigin: 'center' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[19px] font-bold text-white">622</span>
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-tight">Kcal</span>
          </div>
        </div>

        {/* Macros Grid Container */}
        <div className="flex-1 bg-transparent border border-zinc-800/80 rounded-[22px] overflow-hidden flex flex-col">
          <div className="grid grid-cols-4 gap-0 h-[68px] pt-2">
            <div className="flex flex-col items-center justify-center border-r border-zinc-800/50">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                <span className="text-[13px] font-bold text-white">25gm</span>
              </div>
              <span className="text-[11px] text-zinc-500 font-medium">Protein</span>
            </div>
            
            <div className="flex flex-col items-center justify-center border-r border-zinc-800/50">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                <span className="text-[13px] font-bold text-white">90gm</span>
              </div>
              <span className="text-[11px] text-zinc-500 font-medium">Carb</span>
            </div>
            
            <div className="flex flex-col items-center justify-center border-r border-zinc-800/50">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                <span className="text-[13px] font-bold text-white">18gm</span>
              </div>
              <span className="text-[11px] text-zinc-500 font-medium">Fat</span>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                <span className="text-[13px] font-bold text-white">18gm</span>
              </div>
              <span className="text-[11px] text-zinc-500 font-medium">Fiber</span>
            </div>
          </div>

          {/* Mini Progress Bar at Bottom of Macro Box */}
          <div className="w-full h-[5px] bg-zinc-800 flex mt-1">
            <div className="h-full bg-yellow-500" style={{ width: '45%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;