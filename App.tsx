import React, { useState, useMemo, useEffect } from 'react';
import { Search, ListFilter, CheckCircle2, Info, ChevronUp } from 'lucide-react';
import { DISHES } from './data';
import { CartItem, Dish } from './types';
import FilterBar from './components/FilterBar';
import FoodItem from './components/FoodItem';
import BottomNav from './components/BottomNav';
import ProductDetailModal from './components/ProductDetailModal';
import CustomizationModal from './components/CustomizationModal';
import CartModal from './components/CartModal';
import MenuModal from './components/MenuModal';
import HungerLevelModal from './components/HungerLevelModal';
import LoadingScreen from './components/LoadingScreen';
import SortDropdown, { SortOrder } from './components/SortDropdown';
import CompactGoalBar from './components/CompactGoalBar';
import OrderSummaryModal from './components/OrderSummaryModal';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import ConfirmOrderModal from './components/ConfirmOrderModal';
import TipsModal from './components/TipsModal';
import FitshieldModal from './components/FitshieldModal';
import SetGoalModal from './components/SetGoalModal';
import GoalCard from './components/GoalCard';
import ProfileModal from './components/ProfileModal';

const App: React.FC = () => {
  const [hungerLevel, setHungerLevel] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVegOnly, setIsVegOnly] = useState(true);
  const [activeFilter, setActiveFilter] = useState('High Protein');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [isTipsConfirmOpen, setIsTipsConfirmOpen] = useState(false);
  const [isFitshieldOpen, setIsFitshieldOpen] = useState(false);
  const [isSetGoalOpen, setIsSetGoalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredDishes = useMemo(() => {
    let result = DISHES.filter(dish => {
      const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = isVegOnly ? dish.isVeg : true;
      const matchesFilter = activeFilter === 'All' || 
                           activeFilter === 'For You' ||
                           activeFilter === 'Verified' ||
                           (activeFilter === 'High Protein' && dish.isHighProtein);
      return matchesSearch && matchesVeg && matchesFilter;
    });

    if (sortOrder === 'lowToHigh') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    return result;
  }, [searchQuery, isVegOnly, activeFilter, sortOrder]);

  const handleAddToCart = (dish: Dish) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        return prev.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const handleProfileButtonClick = () => {
    if (isLoggedIn) {
      setIsProfileOpen(true);
    } else {
      setIsFitshieldOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsFitshieldOpen(false);
    // Give a small delay for the FitshieldModal to close before opening ProfileModal
    setTimeout(() => {
      setIsProfileOpen(true);
    }, 300);
  };

  if (!hungerLevel) {
    return (
      <div className="w-full h-full relative">
        <HungerLevelModal onSelect={(level) => {
          setHungerLevel(level);
          setIsPreparing(true);
        }} />
      </div>
    );
  }

  if (isPreparing) {
    return (
      <div className="w-full h-full relative">
        <LoadingScreen onComplete={() => setIsPreparing(false)} />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#0c0c0c] text-white pb-48 animate-in fade-in duration-700 overflow-x-hidden relative">
      
      {/* Sticky Header Container */}
      <div className={`sticky top-0 z-50 bg-[#0c0c0c]/98 backdrop-blur-xl transition-all duration-300 ${isScrolled ? 'border-b border-zinc-900 shadow-xl' : ''}`}>
        {/* Logo Row */}
        <header className="px-5 pt-10 pb-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-[22px] font-bold tracking-tight text-white">Boketto</span>
            <div className="w-5 h-5 bg-[#9EF07F] rounded-full flex items-center justify-center">
              <CheckCircle2 size={12} className="text-black stroke-[3]" />
            </div>
          </div>
          <button 
            onClick={handleProfileButtonClick}
            className="w-9 h-9 bg-zinc-800/80 rounded-full flex items-center justify-center border border-zinc-700/50 active:scale-95 transition-transform"
          >
            <span className="text-sm font-bold text-zinc-300">K</span>
          </button>
        </header>

        {/* Search Row */}
        <div className="px-5 flex gap-3 items-center mt-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              placeholder="Dish name..."
              className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-2xl py-3 pr-4 pl-11 text-sm font-medium focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-black text-zinc-400 tracking-tighter uppercase">Veg</span>
            <button 
              onClick={() => setIsVegOnly(!isVegOnly)}
              className={`w-[42px] h-[22px] rounded-full relative transition-all duration-300 ${isVegOnly ? 'bg-[#22c55e]' : 'bg-zinc-800'}`}
            >
              <div className={`absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full transition-all shadow-sm ${isVegOnly ? 'left-[21px]' : 'left-[3px]'}`} />
            </button>
          </div>
        </div>

        {/* Sticky Compact Elements - Only when scrolled */}
        {isScrolled && (
          <div className="animate-in slide-in-from-top-1 duration-300">
             <div className="px-5 mb-2">
               <CompactGoalBar />
             </div>
             <div className="mb-2">
                <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
             </div>
          </div>
        )}
      </div>

      {/* Home Page Main Content Area */}
      <div className="mt-4">
         {/* Original Large Elements - Only when NOT scrolled */}
         <div className={`transition-opacity duration-300 ${isScrolled ? 'opacity-0 pointer-events-none h-0 overflow-hidden' : 'opacity-100 h-auto'}`}>
            <div className="px-5 mb-6">
              <GoalCard onTap={() => {}} onEdit={() => setIsSetGoalOpen(true)} />
            </div>
            <div className="mb-4">
              <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            </div>
         </div>

        {/* Section Heading with subtle sort trigger */}
        <div className="px-5 mb-6 flex justify-between items-end mt-4 group">
          <div>
            <h2 className="text-[26px] font-bold text-white leading-none capitalize">{activeFilter}</h2>
            <div className="flex items-center gap-1.5 text-zinc-500 text-[13px] mt-3 font-medium">
              <Info size={14} className="text-zinc-500" />
              <span>Sorted by highest protein</span>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {/* Sort button: visible on hover (desktop) or always subtle on mobile (opacity-70) */}
            <button 
              onClick={() => setIsSortOpen(true)} 
              className={`transition-all duration-300 p-1 active:scale-90 ${
                isSortOpen ? 'text-[#9EF07F]' : 'text-zinc-400 sm:opacity-0 group-hover:opacity-100 opacity-70'
              }`}
            >
              <ListFilter size={22} />
            </button>
            <ChevronUp size={24} className="text-zinc-400 opacity-70" />
          </div>
        </div>

        <div className="px-5 space-y-10">
          {filteredDishes.map((dish, idx) => (
            <FoodItem 
              key={dish.id} 
              dish={dish} 
              onAdd={() => handleAddToCart(dish)} 
              onClick={() => {
                setSelectedDish(dish);
                setIsDetailOpen(true);
              }}
              onCustomize={() => {
                setSelectedDish(dish);
                setIsCustomizationOpen(true);
              }}
              matchType={idx === 0 ? 'best' : idx === 1 ? 'good' : undefined}
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onContinue={() => setIsCartOpen(true)}
        onMenuClick={() => setIsMenuOpen(true)}
      />

      {/* All Modals */}
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        onPersonalisationClick={() => { setIsProfileOpen(false); setIsFitshieldOpen(true); }}
        onPreferenceClick={() => { setIsProfileOpen(false); setIsFitshieldOpen(true); }}
      />
      <SortDropdown 
        isOpen={isSortOpen} 
        onClose={() => setIsSortOpen(false)} 
        currentSort={sortOrder} 
        onSortChange={setSortOrder} 
      />
      <ProductDetailModal dish={selectedDish} isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} />
      <CustomizationModal dish={selectedDish} isOpen={isCustomizationOpen} onClose={() => setIsCustomizationOpen(false)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onUpdateQuantity={handleUpdateQuantity} onContinue={() => {setIsCartOpen(false); setIsOrderSummaryOpen(true)}} />
      <OrderSummaryModal isOpen={isOrderSummaryOpen} onClose={() => setIsOrderSummaryOpen(false)} items={cart} onUpdateQuantity={handleUpdateQuantity} onAddItem={handleAddToCart} onSummery={() => {setIsOrderSummaryOpen(false); setIsConfirmationOpen(true)}} />
      <OrderConfirmationModal isOpen={isConfirmationOpen} onClose={() => setIsConfirmationOpen(false)} onTipsClick={() => setIsTipsConfirmOpen(true)} items={cart} />
      <ConfirmOrderModal isOpen={isTipsConfirmOpen} onClose={() => setIsTipsConfirmOpen(false)} onConfirm={() => { setIsTipsConfirmOpen(false); setIsTipsOpen(true); }} />
      <TipsModal isOpen={isTipsOpen} onClose={() => setIsTipsOpen(false)} />
      <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} activeCategory={activeFilter} onCategorySelect={setActiveFilter} />
      <FitshieldModal 
        isOpen={isFitshieldOpen} 
        onClose={() => setIsFitshieldOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
      <SetGoalModal isOpen={isSetGoalOpen} onClose={() => setIsSetGoalOpen(false)} />
    </div>
  );
};

export default App;