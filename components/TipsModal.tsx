
import React from 'react';
import { ChevronLeft, Leaf } from 'lucide-react';

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
    <div className="fixed inset-0 z-[160] bg-black flex flex-col animate-in fade-in duration-300 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e2a0e]/30 to-black pointer-events-none" />
      
      {/* Header */}
      <header className="relative flex items-center justify-center py-6 px-4 z-10">
        <button onClick={onClose} className="absolute left-6 text-white hover:opacity-70 transition-opacity">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-[20px] font-bold text-white tracking-wide">Tips</h1>
      </header>

      <main className="flex-1 px-6 pt-10 relative z-10 overflow-y-auto no-scrollbar">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center">
             <Leaf size={18} className="text-zinc-400" />
          </div>
          <h2 className="text-[22px] font-bold text-white">Functional Benefits</h2>
        </div>

        {/* Benefits Card */}
        <div className="w-full bg-[#32d74b] rounded-[32px] overflow-hidden shadow-2xl shadow-green-900/10">
          <div className="flex flex-col">
            {benefits.map((benefit, index) => (
              <React.Fragment key={benefit.id}>
                <div className="flex items-start gap-6 px-8 py-8">
                  <span className="text-[28px] font-bold text-white/40 leading-none mt-1">
                    {benefit.id}
                  </span>
                  <p className="text-[17px] text-white/90 leading-snug font-medium">
                    {benefit.text}
                  </p>
                </div>
                {index < benefits.length - 1 && (
                  <div className="mx-8 border-t-[1.5px] border-white/20 border-dashed" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>

      {/* Home Indicator */}
      <div className="flex justify-center pb-3 pt-6">
        <div className="w-36 h-1.5 bg-white rounded-full opacity-40" />
      </div>
    </div>
  );
};

export default TipsModal;
