import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPersonalisationClick?: () => void;
  onPreferenceClick?: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ 
  isOpen, 
  onClose, 
  onPersonalisationClick, 
  onPreferenceClick 
}) => {
  const [name, setName] = useState('Krishna Sabhadi');
  const [isEditing, setIsEditing] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[160] bg-[#0c0c0c] flex flex-col animate-in slide-in-from-bottom duration-500 overflow-hidden">
      {/* Header */}
      <header className="relative flex items-center justify-center pt-14 pb-12 px-6">
        <button 
          onClick={onClose} 
          className="absolute left-6 text-white active:scale-90 transition-transform"
        >
          <ChevronLeft size={30} strokeWidth={2.5} />
        </button>
        <h1 className="text-[20px] font-bold text-white tracking-tight">Profile</h1>
      </header>

      {/* Profile Content */}
      <main className="flex-1 px-5 space-y-4">
        {/* Phone Number Field */}
        <div className="w-full bg-transparent border border-zinc-800 rounded-[20px] py-5 px-6">
          <span className="text-[18px] font-medium text-zinc-300">99000 65277</span>
        </div>

        {/* Name Field - Editable with Green Border as per image */}
        <div className={`w-full bg-transparent border rounded-[20px] py-5 px-6 flex justify-between items-center transition-colors ${
          isEditing ? 'border-[#22c55e]' : 'border-zinc-800'
        }`}>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setIsEditing(true)}
            className="bg-transparent text-[18px] font-medium text-white outline-none flex-1 placeholder-zinc-500"
            placeholder="Enter Your Name"
          />
          <button 
            onClick={() => setIsEditing(false)}
            className="text-[#9EF07F] text-[18px] font-bold underline underline-offset-4 decoration-[#9EF07F]/40 active:opacity-70 transition-opacity"
          >
            Save
          </button>
        </div>

        {/* Personalised Button */}
        <button 
          onClick={onPersonalisationClick}
          className="w-full bg-transparent border border-zinc-800 rounded-[20px] py-5 px-6 flex items-center justify-between active:bg-zinc-900 transition-colors group"
        >
          <span className="text-[18px] font-medium text-zinc-300">Personalised</span>
          <ChevronRight size={24} className="text-zinc-500" />
        </button>

        {/* Ingredients Button */}
        <button 
          onClick={onPreferenceClick}
          className="w-full bg-transparent border border-zinc-800 rounded-[20px] py-5 px-6 flex items-center justify-between active:bg-zinc-900 transition-colors group"
        >
          <span className="text-[18px] font-medium text-zinc-300">Ingredients</span>
          <ChevronRight size={24} className="text-zinc-500" />
        </button>
      </main>

      {/* Home Indicator */}
      <footer className="flex justify-center pb-4">
        <div className="w-36 h-1.5 bg-white rounded-full opacity-30" />
      </footer>
    </div>
  );
};

export default ProfileModal;