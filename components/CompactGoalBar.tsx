import React from 'react';

const CompactGoalBar: React.FC = () => {
  return (
    <div className="w-full h-8 bg-[#4a4a4a] rounded-full overflow-hidden flex relative border border-zinc-800 shadow-inner">
      {/* Progress Fill (Yellow) */}
      <div 
        className="h-full bg-[#EAB308] flex items-center justify-start pl-4 transition-all duration-700 ease-out"
        style={{ width: '50%' }}
      >
        <span className="text-[12px] font-bold text-white whitespace-nowrap">666 Kcal</span>
      </div>
      {/* Target Background (Grey) */}
      <div className="flex-1 flex items-center justify-end pr-4">
        <span className="text-[12px] font-bold text-zinc-100 whitespace-nowrap">1332 Kcal</span>
      </div>
    </div>
  );
};

export default CompactGoalBar;