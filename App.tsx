import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, ChevronDown, ListFilter, CheckCircle2, Info, ChevronUp } from 'lucide-react';
import { DISHES } from './data';
import { CartItem, Dish } from './types';
import GoalCard from './components/GoalCard';
import FilterBar from './components/FilterBar';
import FoodItem from './components/FoodItem';
import BottomNav from './components/BottomNav';
import SmartRecommendationModal from './components/SmartRecommendationModal';
import ProductDetailModal from './components/ProductDetailModal';
import CustomizationModal from './components/CustomizationModal';
import CartModal from './components/CartModal';
import MenuModal from './components/MenuModal';
import HungerLevelModal from './components/HungerLevelModal';
import LoadingScreen from './components/LoadingScreen';
import SortDropdown, { SortOrder } from './components/SortDropdown';
import OrderSummaryModal from './components/OrderSummaryModal';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import TipsModal from './components/TipsModal';
import ConfirmOrderModal from './components/ConfirmOrderModal';
import FitshieldModal from './components/FitshieldModal';

const App: React.FC = () => {
  const [hungerLevel, setHungerLevel] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVegOnly, setIsVegOnly] = useState(true);
  const [activeFilter, setActiveFilter] = useState('High Protein');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);
  
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [isConfirmOrderOpen, setIsConfirmOrderOpen] = useState(false);
  const [isFitshieldOpen, setIsFitshieldOpen] = useState(false);

  // Sorting state
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if we need to show initial modals. 
    // For now, let's assume login flow is handled and we start at home for demo.
    // If you want to force login, set hungerLevel to null.
    setHungerLevel('Medium'); 
  }, []);

  const filteredDishes = useMemo(() => {
    let result = DISHES.filter(dish => {
      const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = isVegOnly ? dish.isVeg : true;
      const matchesFilter = activeFilter === 'All' || 
                           activeFilter === 'For You' ||
                           activeFilter === 'Verified' ||
                           activeFilter === 'Signature' ||
                           (activeFilter === 'High Protein' && dish.isHighProtein) ||
                           (activeFilter === 'Low Kcal' && dish.kcal < 500) ||
                           (activeFilter === 'Gluten Free' && dish.tags.includes('Gluten Free'));
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

  const updateCartQuantity = (id: string, delta: number) => {
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

  const handleSortMouseEnter = () => {
    if (sortTimeoutRef.current) clearTimeout(sortTimeoutRef.current);
    setIsSortOpen(true);
  };

  const handleSortMouseLeave = () => {
    sortTimeoutRef.current = window.setTimeout(() => {
      setIsSortOpen(false);
    }, 300);
  };

  if (!hungerLevel) {
    return (
      <div className="fixed inset-0 bg-[#0c0c0c] flex justify-center overflow-hidden">
        <div className="w-full max-w-md h-full relative">
          <HungerLevelModal onSelect={(level) => {
            setHungerLevel(level);
            setIsPreparing(true);
          }} />
        </div>
      </div>
    );
  }

  if (isPreparing) {
    return (
      <div className="fixed inset-0 bg-black flex justify-center overflow-hidden">
        <div className="w-full max-w-md h-full relative">
          <LoadingScreen onComplete={() => setIsPreparing(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-black min-h-screen">
      <div className="w-full max-w-md min-h-screen bg-[#0c0c0c] text-white pb-32 animate-in fade-in duration-700 overflow-x-hidden relative">
        <header className="p-4 pt-6 flex justify-between items-center sticky top-0 bg-[#0c0c0c]/90 backdrop-blur-lg z-40">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Boketto</h1>
            <CheckCircle2 size={22} className="text-[#9EF07F] fill-[#9EF07F]/20" />
          </div>
          <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700 shadow-lg">
            <span className="text-base font-bold text-zinc-300">K</span>
          </div>
        </header>

        <div className="px-4 flex gap-4 items-center mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            <input
              type="text"
              placeholder="Dish name..."
              className="w-full bg-[#141414] border border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-zinc-700 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-white mb-1 tracking-widest uppercase">Veg</span>
            <button 
              onClick={() => setIsVegOnly(!isVegOnly)}
              className={`w-11 h-6 rounded-full relative transition-all duration-300 ${isVegOnly ? 'bg-green-600' : 'bg-zinc-800'}`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all shadow-md ${isVegOnly ? 'left-[22px]' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

        <div className="px-4 mb-8">
          <GoalCard onTap={() => setIsFitshieldOpen(true)} />
        </div>

        <div className="mb-10">
          <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        <div className="px-4 mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-[26px] font-bold text-white leading-none">{activeFilter}</h2>
            <div className="flex items-center gap-1.5 text-zinc-500 text-[13px] mt-3 font-medium">
              <Info size={14} className="text-zinc-500" />
              <span>Sorted by highest protein</span>
            </div>
          </div>
          <div 
            className="flex gap-4 relative items-center"
            onMouseEnter={handleSortMouseEnter}
            onMouseLeave={handleSortMouseLeave}
          >
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className={`transition-colors p-1 ${isSortOpen ? 'text-[#9EF07F]' : 'text-zinc-400'}`}
            >
              <ListFilter size={24} />
            </button>
            <ChevronUp size={24} className="text-zinc-400" />
            
            <SortDropdown 
              isOpen={isSortOpen}
              onClose={() => setIsSortOpen(false)}
              currentSort={sortOrder}
              onSortChange={setSortOrder}
              onMouseEnter={handleSortMouseEnter}
              onMouseLeave={handleSortMouseLeave}
            />
          </div>
        </div>

        <div className="px-4 space-y-12">
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
          {filteredDishes.length === 0 && (
            <div className="py-20 text-center text-zinc-500 font-medium">
              No items found for this filter.
            </div>
          )}
        </div>

        {/* Modals */}
        <SmartRecommendationModal isOpen={isRecommendationOpen} onClose={() => setIsRecommendationOpen(false)} />
        <ProductDetailModal dish={selectedDish} isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} />
        <CustomizationModal dish={selectedDish} isOpen={isCustomizationOpen} onClose={() => setIsCustomizationOpen(false)} />
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onUpdateQuantity={updateCartQuantity} onContinue={() => { setIsCartOpen(false); setIsOrderSummaryOpen(true); }} />
        <OrderSummaryModal isOpen={isOrderSummaryOpen} onClose={() => setIsOrderSummaryOpen(false)} onSummery={() => { setIsOrderSummaryOpen(false); setIsConfirmationOpen(true); }} items={cart} />
        <OrderConfirmationModal isOpen={isConfirmationOpen} onClose={() => setIsConfirmationOpen(false)} onTipsClick={() => setIsConfirmOrderOpen(true)} items={cart} />
        <ConfirmOrderModal isOpen={isConfirmOrderOpen} onClose={() => setIsConfirmOrderOpen(false)} onConfirm={() => { setIsConfirmOrderOpen(false); setIsTipsOpen(true); }} />
        <TipsModal isOpen={isTipsOpen} onClose={() => setIsTipsOpen(false)} />
        <FitshieldModal isOpen={isFitshieldOpen} onClose={() => setIsFitshieldOpen(false)} />
        <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} activeCategory={activeFilter} onCategorySelect={setActiveFilter} />
        
        <BottomNav 
          cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
          onContinue={() => setIsCartOpen(true)}
          onMenuClick={() => setIsMenuOpen(true)}
        />
      </div>
    </div>
  );
};

export default App;