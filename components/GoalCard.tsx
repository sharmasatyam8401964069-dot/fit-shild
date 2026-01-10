import React from 'react';

interface GoalCardProps {
  onTap: () => void;
  onEdit?: () => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ onTap, onEdit }) => {
  return (
    <div 
      onClick={onTap}
      className="bg-[#141414] border border-zinc-800 rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 pb-5 sm:pb-6 relative overflow-hidden shadow-2xl cursor-pointer active:scale-[0.99] transition-transform"
    >
      <div className="flex justify-between items-center mb-4 sm:mb-5">
        <h3 className="text-sm font-medium text-zinc-300">Your Dinner Goal</h3>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (onEdit) onEdit();
          }}
          className="text-[#9EF07F] text-sm sm:text-[15px] font-bold active:opacity-70"
        >
          Edit
        </button>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Responsive Radial Progress */}
        <div className="relative w-16 h-16 sm:w-[82px] sm:h-[82px] flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%" cy="50%" r="42%"
              stroke="currentColor"
              strokeWidth="12%"
              fill="transparent"
              className="text-zinc-800"
            />
            {/* White progress */}
            <circle
              cx="50%" cy="50%" r="42%"
              stroke="currentColor"
              strokeWidth="12%"
              fill="transparent"
              strokeDasharray="264"
              strokeDashoffset={264 * (1 - 0.65)}
              className="text-white"
              strokeLinecap="round"
            />
            {/* Purple accent piece */}
            <circle
              cx="50%" cy="50%" r="42%"
              stroke="currentColor"
              strokeWidth="12%"
              fill="transparent"
              strokeDasharray="264"
              strokeDashoffset={264 * (1 - 0.15)}
              className="text-pink-400"
              strokeLinecap="round"
              style={{ transform: 'rotate(110deg)', transformOrigin: 'center' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-base sm:text-[19px] font-bold text-white">622</span>
            <span className="text-[8px] sm:text-[9px] text-zinc-500 font-bold uppercase tracking-tight">Kcal</span>
          </div>
        </div>

        {/* Macros Grid Container */}
        <div className="flex-1 bg-transparent border border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col">
          <div className="grid grid-cols-4 h-14 sm:h-[68px]">
            <div className="flex flex-col items-center justify-center border-r border-zinc-800/50">
              <div className="flex items-center gap-1 mb-0.5">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full hidden sm:block" />
                <span className="text-[12px] sm:text-[13px] font-bold text-white">25g</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-medium">Pro</span>
            </div>
            
            <div className="flex flex-col items-center justify-center border-r border-zinc-800/50">
              <div className="flex items-center gap-1 mb-0.5">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full hidden sm:block" />
                <span className="text-[12px] sm:text-[13px] font-bold text-white">90g</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-medium">Carb</span>
            </div>
            
            <div className="flex flex-col items-center justify-center border-r border-zinc-800/50">
              <div className="flex items-center gap-1 mb-0.5">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full hidden sm:block" />
                <span className="text-[12px] sm:text-[13px] font-bold text-white">18g</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-medium">Fat</span>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 mb-0.5">
                <div className="w-1.5 h-1.5 bg-pink-400 rounded-full hidden sm:block" />
                <span className="text-[12px] sm:text-[13px] font-bold text-white">18g</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-medium">Fiber</span>
            </div>
          </div>

          {/* Mini Progress Bar */}
          <div className="w-full h-1 bg-zinc-800 flex">
            <div className="h-full bg-yellow-500" style={{ width: '45%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;