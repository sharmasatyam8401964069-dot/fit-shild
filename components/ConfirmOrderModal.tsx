
import React from 'react';

interface ConfirmOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmOrderModal: React.FC<ConfirmOrderModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-6 animate-in fade-in duration-200">
      {/* Blurred Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} />
      
      {/* Dialog Card */}
      <div className="relative w-full max-w-[340px] bg-[#1a1a1a] rounded-[32px] p-8 flex flex-col items-center shadow-2xl border border-zinc-800 animate-in zoom-in duration-300">
        <h2 className="text-[24px] font-bold text-white mb-3">Are You Sure?</h2>
        
        <p className="text-[14px] text-zinc-400 text-center leading-relaxed mb-10 px-2 font-medium">
          You ordered your meal!, this will take you to Menu.
        </p>

        <div className="w-full flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 bg-[#9EF07F] hover:bg-[#8ee06f] text-black font-bold py-4 rounded-[18px] text-[18px] transition-all active:scale-[0.98]"
          >
            No
          </button>
          
          <button 
            onClick={onConfirm}
            className="flex-1 bg-transparent border-[1.5px] border-red-500 text-red-500 font-bold py-4 rounded-[18px] text-[18px] hover:bg-red-500/5 transition-all active:scale-[0.98]"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrderModal;
