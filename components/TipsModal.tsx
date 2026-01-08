import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface TipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TipsModal: React.FC<TipsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const benefits = [
    {
      id: 1,
      text: (
        <>
          This meal provides <span className="font-bold">50 g of protein</span>, which helps build muscles and repair tissues, ensuring your body stays strong and healthy.
        </>
      )
    },
    {
      id: 2,
      text: (
        <>
          This meal includes <span className="font-bold">85 mg of Vitamin C</span>, which boosts immunity and helps protect your cells from damage.
        </>
      )
    },
    {
      id: 3,
      text: (
        <>
          This meal provides <span className="font-bold">15 g of fiber</span>, which is essential for improving digestion and promoting gut health.
        </>
      )
    },
    {
      id: 4,
      text: (
        <>
          This meal provides <span className="font-bold">15 g of fiber</span>, which is essential for improving digestion and promoting gut health.
        </>
      )
    },
    {
      id: 5,
      text: (
        <>
          This meal provides <span className="font-bold">15 g of fiber</span>, which is essential for improving digestion and promoting gut health.
        </>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col animate-in fade-in duration-300 overflow-hidden">
      {/* Background Side Glows */}
      <div className="absolute top-[20%] -right-20 w-40 h-80 bg-green-500/10 blur-[80px] pointer-events-none" />
      <div className="absolute top-[50%] -left-20 w-40 h-80 bg-green-500/10 blur-[80px] pointer-events-none" />

      {/* Header */}
      <header className="relative flex items-center justify-center pt-14 pb-4 px-6 z-10">
        <button 
          onClick={onClose} 
          className="absolute left-6 p-1 text-white active:scale-90 transition-transform"
        >
          <ChevronLeft size={32} strokeWidth={2.5} />
        </button>
        <h1 className="text-[19px] font-bold text-white tracking-tight">Tips</h1>
      </header>

      <main className="flex-1 px-5 pt-12 overflow-y-auto no-scrollbar relative z-10">
        {/* Functional Benefits Header */}
        <div className="flex items-center gap-3 mb-10 pl-1">
          <div className="shrink-0 text-zinc-400">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22C12 22 12 16 17 11C22 6 22 2 22 2C22 2 18 2 13 7C8 12 2 12 2 12" />
              <path d="M12 22C12 22 12 13 15 9" />
              <path d="M12 22L7 17" />
            </svg>
          </div>
          <h2 className="text-[24px] font-semibold text-white tracking-tight">Functional Benefits</h2>
        </div>

        {/* Benefits Card */}
        <div className="w-full bg-[#27D344] rounded-[36px] overflow-hidden shadow-[0_20px_50px_rgba(39,211,68,0.25)] mb-20">
          <div className="flex flex-col">
            {benefits.map((benefit, index) => (
              <React.Fragment key={benefit.id}>
                <div className="flex items-start px-7 py-7 gap-5">
                  {/* Large Translucent Number */}
                  <span className="text-[36px] font-bold text-white/40 leading-none shrink-0 w-8 flex justify-center pt-0.5">
                    {benefit.id}
                  </span>
                  {/* Text Description */}
                  <p className="text-[16.5px] text-white leading-[1.35] font-normal pt-1 pr-1">
                    {benefit.text}
                  </p>
                </div>
                {/* Custom Dashed Line */}
                {index < benefits.length - 1 && (
                  <div className="mx-7 h-[1px] border-t border-white/20 border-dashed" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Home Indicator */}
      <div className="flex justify-center pb-4 pt-4">
        <div className="w-36 h-1.5 bg-white rounded-full opacity-30" />
      </div>
    </div>
  );
};

export default TipsModal;