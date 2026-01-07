
import React from 'react';
import { X } from 'lucide-react';

interface MenuCategory {
  name: string;
  count: number;
}

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
  onCategorySelect: (category: string) => void;
}

const CATEGORIES: MenuCategory[] = [
  { name: 'Signature', count: 20 },
  { name: 'Recommended for you', count: 25 },
  { name: 'Newly Launched', count: 30 },
  { name: 'Burgers With Milet Bun', count: 6 },
  { name: 'Group Sharing Combos', count: 27 },
  { name: 'Group Sharing Combos (Family)', count: 66 },
  { name: 'McSaver Combos (2 Pc Meals)', count: 66 },
  { name: 'Burger Combos (3 Pc Meals)', count: 45 },
  { name: 'Burgers & Wraps', count: 34 },
  { name: 'Fries & Sides', count: 17 },
  { name: 'Coffee & Beverages (Hot and Cold)', count: 44 },
  { name: 'Cakes Brownies and Cookies', count: 12 },
  { name: 'Desserts', count: 9 },
];

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, activeCategory, onCategorySelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md px-4 pb-10 flex flex-col items-center">
        {/* Categories Container */}
        <div className="bg-[#121212] w-full rounded-[24px] border border-zinc-800 overflow-hidden animate-in slide-in-from-bottom duration-500 max-h-[70vh] flex flex-col">
          <div className="overflow-y-auto no-scrollbar py-2">
            {CATEGORIES.map((cat, idx) => {
              const isSelected = activeCategory === cat.name || (activeCategory === 'High Protein' && cat.name === 'Signature');
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onCategorySelect(cat.name);
                    onClose();
                  }}
                  className={`w-full flex justify-between items-center px-6 py-4 transition-colors active:bg-zinc-800/50 ${
                    isSelected ? 'text-green-500' : 'text-zinc-200 hover:text-white'
                  }`}
                >
                  <span className="text-base font-medium text-left">{cat.name}</span>
                  <span className="text-base font-medium">{cat.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 bg-white text-black px-8 py-3 rounded-xl flex items-center gap-2 font-bold shadow-2xl animate-in fade-in zoom-in duration-300 delay-150"
        >
          <X size={20} className="stroke-[3]" />
          Close
        </button>
      </div>
    </div>
  );
};

export default MenuModal;
