
import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ListFilter, CheckCircle2 } from 'lucide-react';
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

const App: React.FC = () => {
  const [hungerLevel, setHungerLevel] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVegOnly, setIsVegOnly] = useState(true);
  const [activeFilter, setActiveFilter] = useState('High Protein');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);
  
  // State for Product Detail
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // State for Customization
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);

  // State for Cart Summary
  const [isCartOpen, setIsCartOpen] = useState(false);

  // State for Menu Modal
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initial cart state to match screenshot (2 items)
  useEffect(() => {
    setCart([
      { ...DISHES[0], quantity: 1 },
      { ...DISHES[1], quantity: 1 }
    ]);
  }, []);

  const filteredDishes = useMemo(() => {
    return DISHES.filter(dish => {
      const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = isVegOnly ? dish.isVeg : true;
      const matchesFilter = activeFilter === 'All' || 
                           activeFilter === 'Signature' ||
                           (activeFilter === 'High Protein' && dish.isHighProtein) ||
                           (activeFilter === 'Low Kcal' && dish.kcal < 500) ||
                           (activeFilter === 'Gluten Free' && dish.tags.includes('Gluten Free'));
      return matchesSearch && matchesVeg && matchesFilter;
    });
  }, [searchQuery, isVegOnly, activeFilter]);

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

  const openDishDetail = (dish: Dish) => {
    setSelectedDish(dish);
    setIsDetailOpen(true);
  };

  const openCustomization = (dish: Dish) => {
    setSelectedDish(dish);
    setIsCustomizationOpen(true);
  };

  if (!hungerLevel) {
    return <HungerLevelModal onSelect={setHungerLevel} />;
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white pb-32 animate-in fade-in duration-700">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <h1 className="text-xl font-bold tracking-tight">Boketto</h1>
          <CheckCircle2 size={18} className="text-green-500 fill-green-500/20" />
        </div>
        <div className="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700">
          <span className="text-sm font-semibold text-zinc-300">K</span>
        </div>
      </header>

      {/* Search & Veg Toggle */}
      <div className="px-4 flex gap-3 items-center mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            type="text"
            placeholder="Dish name..."
            className="w-full bg-[#1e1e1e] border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-zinc-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-zinc-400 mb-1">VEG</span>
          <button 
            onClick={() => setIsVegOnly(!isVegOnly)}
            className={`w-10 h-5 rounded-full relative transition-colors ${isVegOnly ? 'bg-green-600' : 'bg-zinc-700'}`}
          >
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${isVegOnly ? 'left-[22px]' : 'left-0.5'}`} />
          </button>
        </div>
      </div>

      {/* Dinner Goal Card */}
      <div className="px-4 mb-6">
        <GoalCard onTap={() => setIsRecommendationOpen(true)} />
      </div>

      {/* Filters */}
      <div className="mb-6">
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      {/* Section Header */}
      <div className="px-4 mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold capitalize">{activeFilter.toLowerCase()}</h2>
          <div className="flex items-center gap-1 text-zinc-400 text-[11px] mt-0.5">
            <span className="w-3.5 h-3.5 flex items-center justify-center rounded-full border border-zinc-500 text-[8px]">i</span>
            Sorted by highest {activeFilter.toLowerCase()}
          </div>
        </div>
        <div className="flex gap-4">
          <ListFilter size={20} className="text-zinc-400" />
          <ChevronDown size={20} className="text-zinc-400" />
        </div>
      </div>

      {/* Food Items */}
      <div className="px-4 space-y-8">
        {filteredDishes.map(dish => (
          <FoodItem 
            key={dish.id} 
            dish={dish} 
            onAdd={() => handleAddToCart(dish)} 
            onClick={() => openDishDetail(dish)}
            onCustomize={() => openCustomization(dish)}
          />
        ))}
        {filteredDishes.length === 0 && (
          <div className="py-20 text-center text-zinc-500">
            No items found for this filter.
          </div>
        )}
      </div>

      {/* Modals & Navigation */}
      <SmartRecommendationModal 
        isOpen={isRecommendationOpen} 
        onClose={() => setIsRecommendationOpen(false)} 
      />
      <ProductDetailModal 
        dish={selectedDish}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
      <CustomizationModal 
        dish={selectedDish}
        isOpen={isCustomizationOpen}
        onClose={() => setIsCustomizationOpen(false)}
      />
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateCartQuantity}
      />
      <MenuModal 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeCategory={activeFilter}
        onCategorySelect={setActiveFilter}
      />
      <BottomNav 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onContinue={() => setIsCartOpen(true)}
        onMenuClick={() => setIsMenuOpen(true)}
      />
    </div>
  );
};

export default App;
