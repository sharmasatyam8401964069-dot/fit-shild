import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Search, X } from 'lucide-react';

interface FitshieldModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalStep = 'identify' | 'otp' | 'welcome' | 'profile' | 'ingredients' | 'understanding' | 'matching';

const DAYS = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const YEARS = Array.from({ length: 125 }, (_, i) => (2024 - i).toString());

// Height Picker Data
const FEET = Array.from({ length: 9 }, (_, i) => (i + 1).toString() + "'");
const INCHES = Array.from({ length: 12 }, (_, i) => i.toString() + '"');
const CM_10S = Array.from({ length: 10 }, (_, i) => i.toString()); // 0-9
const CM_1S = Array.from({ length: 10 }, (_, i) => i.toString()); // 0-9
const HEIGHT_UNITS = ['Cm', 'Feet'];

// Weight Picker Data
const WEIGHT_VALUES = Array.from({ length: 221 }, (_, i) => (30 + i).toString()); // 30 to 250
const WEIGHT_UNITS = ['Lbs', 'Kg'];

interface IngredientOption {
  id: string;
  name: string;
  icon: string;
}

const INGREDIENT_OPTIONS: IngredientOption[] = [
  { id: 'peanuts', name: 'Peanuts', icon: '🥜' },
  { id: 'milk', name: 'Milk', icon: '🥛' },
  { id: 'onion', name: 'Onion', icon: '🧅' },
  { id: 'garlic', name: 'Garlic', icon: '🧄' },
  { id: 'refined_flour', name: 'Refined flour', icon: '🥡' },
  { id: 'potato', name: 'Potato', icon: '🥔' },
  { id: 'soy', name: 'Soy', icon: '🫘' },
  { id: 'mushroom', name: 'Mushroom', icon: '🍄' },
  { id: 'eggs', name: 'Eggs', icon: '🥚' },
  { id: 'shellfish', name: 'Shellfish', icon: '🦐' },
];

const FitshieldModal: React.FC<FitshieldModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<ModalStep>('identify');
  const [inputValue, setInputValue] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(59);
  const [isError, setIsError] = useState(false);

  // Profile states
  const [dob, setDob] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [tempDate, setTempDate] = useState({ day: '31', month: 'December', year: '2000' });
  
  const [gender, setGender] = useState('Male');
  
  const [height, setHeight] = useState('');
  const [isHeightPickerOpen, setIsHeightPickerOpen] = useState(false);
  const [tempHeight, setTempHeight] = useState({ val1: "6'", val2: "6'", unit: 'Feet' });
  
  const [weight, setWeight] = useState('');
  const [isWeightPickerOpen, setIsWeightPickerOpen] = useState(false);
  const [tempWeight, setTempWeight] = useState({ value: '151', unit: 'Kg' });

  const [activity, setActivity] = useState('Sedentary');
  const [goal, setGoal] = useState('Fat loss');

  // Ingredients states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [noRestrictions, setNoRestrictions] = useState(true);

  // Skip Confirmation
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);

  useEffect(() => {
    if (step === 'otp' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    
    if (step === 'welcome') {
      const timer = setTimeout(() => {
        onClose();
        resetModal();
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (step === 'understanding') {
      const timer = setTimeout(() => {
        setStep('matching');
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (step === 'matching') {
      const timer = setTimeout(() => {
        onClose();
        resetModal();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, timeLeft, onClose]);

  const resetModal = () => {
    setTimeout(() => {
      setStep('identify');
      setInputValue('');
      setOtp(['', '', '', '']);
      setIsError(false);
      setTimeLeft(59);
      setDob('');
      setIsDatePickerOpen(false);
      setGender('Male');
      setHeight('');
      setIsHeightPickerOpen(false);
      setWeight('');
      setIsWeightPickerOpen(false);
      setActivity('Sedentary');
      setGoal('Fat loss');
      setShowSkipConfirm(false);
      setSelectedIngredients([]);
      setNoRestrictions(true);
      setSearchQuery('');
    }, 300);
  };

  if (!isOpen) return null;

  const isFilled = inputValue.trim().length > 0;
  const isOtpFilled = otp.every(digit => digit !== '');

  const handleContinue = () => {
    if (isFilled) {
      setStep('otp');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isError) setIsError(false);
    
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code === '1111') {
      setStep('profile');
    } else if (code === '1234') {
      setStep('welcome');
    } else {
      setIsError(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const activityLevels = [
    { label: 'Sedentary', sub: 'Little or no exercise.' },
    { label: 'Light' },
    { label: 'Moderate' },
    { label: 'Active' },
    { label: 'Very active' },
    { label: 'Super active' }
  ];

  const goals = ['Fat loss', 'Muscle gain', 'Healthy eating'];

  const handleDateConfirm = () => {
    const formattedMonth = (MONTHS.indexOf(tempDate.month) + 1).toString().padStart(2, '0');
    setDob(`${tempDate.day.padStart(2, '0')}/${formattedMonth}/${tempDate.year}`);
    setIsDatePickerOpen(false);
  };

  const handleHeightConfirm = () => {
    if (tempHeight.unit === 'Feet') {
      setHeight(`${tempHeight.val1} ${tempHeight.val2}`);
    } else {
      setHeight(`${tempHeight.val1}${tempHeight.val2} Cm`);
    }
    setIsHeightPickerOpen(false);
  };

  const handleWeightConfirm = () => {
    setWeight(`${tempWeight.value} ${tempWeight.unit}`);
    setIsWeightPickerOpen(false);
  };

  const handleSkipClick = () => {
    setShowSkipConfirm(true);
  };

  const handleConfirmSkip = (confirm: boolean) => {
    if (confirm) {
      onClose();
      resetModal();
    } else {
      setShowSkipConfirm(false);
    }
  };

  const toggleIngredient = (id: string) => {
    setNoRestrictions(false);
    setSelectedIngredients(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleNoRestrictions = () => {
    setNoRestrictions(true);
    setSelectedIngredients([]);
  };

  // Wheel Picker Component
  const WheelColumn = ({ 
    items, 
    value, 
    onChange,
    className = ""
  }: { 
    items: string[], 
    value: string, 
    onChange: (val: string) => void,
    className?: string
  }) => {
    return (
      <div className={`flex-1 h-full overflow-y-auto no-scrollbar snap-y snap-mandatory py-[100px] ${className}`}>
        {items.map((item) => {
          const isSelected = item === value;
          return (
            <div 
              key={item}
              onClick={() => onChange(item)}
              className={`h-[40px] flex items-center justify-center snap-center cursor-pointer transition-all duration-200 ${
                isSelected ? 'text-white text-[24px] font-bold' : 'text-zinc-600 text-[18px] font-medium'
              }`}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  };

  if (step === 'welcome') {
    return (
      <div className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center animate-in fade-in duration-500">
        <h1 className="text-[32px] font-medium text-white tracking-tight">
          Welcome back ...
        </h1>
        <div className="absolute bottom-8 w-32 h-1.5 bg-white rounded-full opacity-20" />
      </div>
    );
  }

  if (step === 'understanding') {
    return (
      <div className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center animate-in fade-in duration-500 px-10">
        <h1 className="text-[32px] font-medium text-white text-center leading-tight tracking-tight">
          “Understanding your needs”
        </h1>
        <div className="absolute bottom-8 w-32 h-1.5 bg-white rounded-full opacity-20" />
      </div>
    );
  }

  if (step === 'matching') {
    return (
      <div className="fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center animate-in fade-in duration-500 px-10">
        <h1 className="text-[32px] font-medium text-white text-center leading-tight tracking-tight">
          “Matching with Menu”
        </h1>
        <div className="absolute bottom-8 w-32 h-1.5 bg-white rounded-full opacity-20" />
      </div>
    );
  }

  if (step === 'profile') {
    return (
      <div className="fixed inset-0 z-[180] bg-[#0c0c0c] flex flex-col animate-in slide-in-from-bottom duration-500 overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2 sticky top-0 bg-[#0c0c0c] z-[190]">
          <button onClick={() => setStep('otp')} className="p-1">
            <ChevronLeft size={28} className="text-white" />
          </button>
          <div className="flex flex-col items-center">
            <div className="flex items-center text-[24px] font-bold">
              <span className="text-[#9EF07F]">F</span>
              <span className="text-white">itshield</span>
            </div>
            <span className="text-[10px] text-zinc-500 font-medium -mt-1 uppercase tracking-widest">
              Your Food Intelligence
            </span>
          </div>
          <button onClick={handleSkipClick} className="text-[#9EF07F] font-bold text-lg underline underline-offset-4 decoration-[#9EF07F]/40">
            Skip
          </button>
        </div>

        <div className="px-6 py-6 space-y-8 pb-32">
          {/* DOB */}
          <section>
            <h3 className="text-[20px] font-bold text-white mb-4">Date of birth</h3>
            <div 
              onClick={() => setIsDatePickerOpen(true)}
              className="w-full bg-transparent border border-zinc-700 rounded-[16px] py-4 px-5 text-white text-[16px] flex items-center justify-between cursor-pointer"
            >
              <span className={dob ? 'text-white' : 'text-zinc-500'}>
                {dob || 'DD/MM/YYYY'}
              </span>
            </div>
          </section>

          {/* Gender */}
          <section>
            <h3 className="text-[20px] font-bold text-white mb-4">Gender</h3>
            <div className="flex gap-4">
              {['Male', 'Female'].map(g => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[16px] border-2 transition-all ${
                    gender === g ? 'border-[#9EF07F] bg-transparent text-[#9EF07F]' : 'border-zinc-800 bg-transparent text-zinc-400'
                  }`}
                >
                  <span className="text-xl">{g === 'Male' ? '👱‍♂️' : '👱‍♀️'}</span>
                  <span className="text-[18px] font-bold">{g}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Height */}
          <section>
            <h3 className="text-[20px] font-bold text-white mb-4">Height</h3>
            <div 
              onClick={() => setIsHeightPickerOpen(true)}
              className="w-full bg-transparent border border-zinc-700 rounded-[16px] py-4 px-5 text-white text-[16px] flex items-center justify-between cursor-pointer"
            >
              <span className={height ? 'text-white' : 'text-zinc-500'}>
                {height || 'Set your height...'}
              </span>
            </div>
          </section>

          {/* Weight */}
          <section>
            <h3 className="text-[20px] font-bold text-white mb-4">Weight</h3>
            <div 
              onClick={() => setIsWeightPickerOpen(true)}
              className="w-full bg-transparent border border-zinc-700 rounded-[16px] py-4 px-5 text-white text-[16px] flex items-center justify-between cursor-pointer"
            >
              <span className={weight ? 'text-white' : 'text-zinc-500'}>
                {weight || 'Set your weight...'}
              </span>
            </div>
          </section>

          {/* Activity */}
          <section>
            <h3 className="text-[20px] font-bold text-white mb-4">Activity</h3>
            <div className="grid grid-cols-3 gap-3 mb-2">
              {activityLevels.map((lvl) => (
                <button
                  key={lvl.label}
                  onClick={() => setActivity(lvl.label)}
                  className={`py-3.5 px-2 rounded-[14px] border-2 text-[14px] font-bold transition-all ${
                    activity === lvl.label ? 'border-[#9EF07F] text-[#9EF07F]' : 'border-zinc-800 text-zinc-400'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
            <p className="text-[12px] text-zinc-500 font-medium italic">
              *{activityLevels.find(l => l.label === activity)?.sub || 'Exercise frequency.'}
            </p>
          </section>

          {/* Goal */}
          <section>
            <h3 className="text-[20px] font-bold text-white mb-4">Goal</h3>
            <div className="flex flex-wrap gap-3">
              {goals.map((g) => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`py-3.5 px-6 rounded-[14px] border-2 text-[14px] font-bold transition-all ${
                    goal === g ? 'border-[#9EF07F] text-[#9EF07F]' : 'border-zinc-800 text-zinc-400'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Date Picker Wheel Modal */}
        {isDatePickerOpen && (
          <div className="fixed inset-0 z-[250] flex items-end justify-center bg-black/60 animate-in fade-in duration-300">
            <div 
              className="absolute inset-0" 
              onClick={() => setIsDatePickerOpen(false)}
            />
            <div className="bg-[#121212] w-full max-w-md rounded-t-[40px] border-t border-zinc-800 animate-in slide-in-from-bottom duration-500 overflow-hidden">
              <div className="px-8 pt-6 pb-1 relative">
                <div className="flex justify-end mb-4">
                  <button 
                    onClick={handleDateConfirm}
                    className="text-[#9EF07F] text-lg font-bold"
                  >
                    Done
                  </button>
                </div>

                <div className="relative h-[240px] flex overflow-hidden">
                  <div className="absolute top-[100px] left-0 right-0 h-[40px] border-y border-zinc-800 pointer-events-none" />
                  
                  <WheelColumn 
                    items={DAYS} 
                    value={tempDate.day} 
                    onChange={(val) => setTempDate(prev => ({ ...prev, day: val }))} 
                  />
                  <WheelColumn 
                    items={MONTHS} 
                    value={tempDate.month} 
                    onChange={(val) => setTempDate(prev => ({ ...prev, month: val }))} 
                  />
                  <WheelColumn 
                    items={YEARS} 
                    value={tempDate.year} 
                    onChange={(val) => setTempDate(prev => ({ ...prev, year: val }))} 
                  />
                </div>
              </div>
              <div className="w-full flex justify-center pb-4 pt-4">
                <div className="w-32 h-1.5 bg-white rounded-full opacity-40" />
              </div>
            </div>
          </div>
        )}

        {/* Height Picker Wheel Modal */}
        {isHeightPickerOpen && (
          <div className="fixed inset-0 z-[250] flex items-end justify-center bg-black/60 animate-in fade-in duration-300">
            <div 
              className="absolute inset-0" 
              onClick={() => setIsHeightPickerOpen(false)}
            />
            <div className="bg-[#121212] w-full max-w-md rounded-t-[40px] border-t border-zinc-800 animate-in slide-in-from-bottom duration-500 overflow-hidden">
              <div className="px-8 pt-6 pb-1 relative">
                <div className="flex justify-end mb-4">
                  <button 
                    onClick={handleHeightConfirm}
                    className="text-[#9EF07F] text-lg font-bold"
                  >
                    Done
                  </button>
                </div>

                <div className="relative h-[240px] flex overflow-hidden">
                  <div className="absolute top-[100px] left-0 right-0 h-[40px] border-y border-zinc-800 pointer-events-none" />
                  
                  <WheelColumn 
                    items={tempHeight.unit === 'Feet' ? FEET : CM_10S} 
                    value={tempHeight.val1} 
                    onChange={(val) => setTempHeight(prev => ({ ...prev, val1: val }))} 
                  />
                  <WheelColumn 
                    items={tempHeight.unit === 'Feet' ? INCHES : CM_1S} 
                    value={tempHeight.val2} 
                    onChange={(val) => setTempHeight(prev => ({ ...prev, val2: val }))} 
                  />
                  <WheelColumn 
                    items={HEIGHT_UNITS} 
                    value={tempHeight.unit} 
                    onChange={(val) => setTempHeight(prev => ({ ...prev, unit: val, val1: val === 'Feet' ? "6'" : "1", val2: val === 'Feet' ? "6\"" : "7" }))} 
                  />
                </div>
              </div>
              <div className="w-full flex justify-center pb-4 pt-4">
                <div className="w-32 h-1.5 bg-white rounded-full opacity-40" />
              </div>
            </div>
          </div>
        )}

        {/* Weight Picker Wheel Modal */}
        {isWeightPickerOpen && (
          <div className="fixed inset-0 z-[250] flex items-end justify-center bg-black/60 animate-in fade-in duration-300">
            <div 
              className="absolute inset-0" 
              onClick={() => setIsWeightPickerOpen(false)}
            />
            <div className="bg-[#121212] w-full max-w-md rounded-t-[40px] border-t border-zinc-800 animate-in slide-in-from-bottom duration-500 overflow-hidden">
              <div className="px-8 pt-6 pb-1 relative">
                <div className="flex justify-end mb-4">
                  <button 
                    onClick={handleWeightConfirm}
                    className="text-[#9EF07F] text-lg font-bold"
                  >
                    Done
                  </button>
                </div>

                <div className="relative h-[240px] flex overflow-hidden">
                  {/* Selection Overlay Lines */}
                  <div className="absolute top-[100px] left-0 right-0 h-[40px] border-y border-zinc-800 pointer-events-none" />
                  
                  <WheelColumn 
                    items={WEIGHT_VALUES} 
                    value={tempWeight.value} 
                    onChange={(val) => setTempWeight(prev => ({ ...prev, value: val }))} 
                  />
                  <WheelColumn 
                    items={WEIGHT_UNITS} 
                    value={tempWeight.unit} 
                    onChange={(val) => setTempWeight(prev => ({ ...prev, unit: val }))} 
                  />
                </div>
              </div>
              <div className="w-full flex justify-center pb-4 pt-4">
                <div className="w-32 h-1.5 bg-white rounded-full opacity-40" />
              </div>
            </div>
          </div>
        )}

        {/* Skip Confirmation Dialog */}
        {showSkipConfirm && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center px-6 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setShowSkipConfirm(false)} />
            <div className="relative w-full max-w-[340px] bg-[#1a1a1a] rounded-[32px] p-8 flex flex-col items-center shadow-2xl border border-zinc-800 animate-in zoom-in duration-300">
              <h2 className="text-[24px] font-bold text-white mb-3">Are You Sure?</h2>
              <p className="text-[14px] text-zinc-400 text-center leading-relaxed mb-10 px-2 font-medium">
                Smart defaults applied.<br />Edit anytime from your profile.
              </p>
              <div className="w-full flex gap-3">
                <button 
                  onClick={() => handleConfirmSkip(false)}
                  className="flex-1 bg-transparent border-[1.5px] border-zinc-700 text-zinc-400 font-bold py-4 rounded-[18px] text-[18px] transition-all active:scale-[0.98]"
                >
                  No
                </button>
                <button 
                  onClick={() => handleConfirmSkip(true)}
                  className="flex-1 bg-[#9EF07F] text-black font-bold py-4 rounded-[18px] text-[18px] transition-all active:scale-[0.98]"
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Button */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#0c0c0c] border-t border-zinc-900 flex flex-col items-center z-20">
          <button 
            onClick={() => setStep('ingredients')}
            className="w-full bg-[#9EF07F] text-black py-5 rounded-[20px] text-[20px] font-bold transition-all active:scale-[0.98]"
          >
            Next
          </button>
          <div className="w-32 h-1.5 bg-white rounded-full mt-4 opacity-40" />
        </div>
      </div>
    );
  }

  if (step === 'ingredients') {
    const filteredIngredients = INGREDIENT_OPTIONS.filter(opt => 
      opt.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="fixed inset-0 z-[180] bg-[#0c0c0c] flex flex-col animate-in slide-in-from-bottom duration-500 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2 sticky top-0 bg-[#0c0c0c] z-[190]">
          <button onClick={() => setStep('profile')} className="p-1">
            <ChevronLeft size={28} className="text-white" />
          </button>
          <div className="flex flex-col items-center">
             <div className="flex items-center text-[24px] font-bold">
               <span className="text-[#9EF07F]">F</span>
               <span className="text-white">itshield</span>
             </div>
          </div>
          <button onClick={handleSkipClick} className="text-[#9EF07F] font-bold text-lg underline underline-offset-4 decoration-[#9EF07F]/40">
            Skip
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-6 pb-32">
          <h2 className="text-[28px] font-bold text-white mb-6 leading-tight">
            Any ingredients you want to avoid?
          </h2>

          {/* Selected Pills Area (Matches Screenshot) */}
          {selectedIngredients.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedIngredients.map(id => {
                const opt = INGREDIENT_OPTIONS.find(o => o.id === id);
                if (!opt) return null;
                return (
                  <button 
                    key={id} 
                    onClick={() => toggleIngredient(id)}
                    className="flex items-center gap-2 bg-[#1a1a1a] border border-zinc-800 rounded-full px-4 py-2 text-[15px] font-medium text-white transition-all active:scale-95"
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.name}</span>
                    <X size={14} className="text-zinc-500" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Ingredients ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border border-zinc-700 rounded-[20px] py-4 pl-14 pr-6 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
            />
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {/* No Restrictions Option */}
            <button 
              onClick={handleNoRestrictions}
              className={`w-full flex items-center px-6 py-5 rounded-[20px] border-[1.5px] transition-all ${
                noRestrictions 
                  ? 'border-zinc-700 bg-transparent text-zinc-500' 
                  : 'border-zinc-800 bg-transparent text-zinc-400'
              }`}
            >
              <span className="text-[18px] font-bold">No Restrictions</span>
            </button>

            {/* Ingredient List (Updated styles to match screenshot) */}
            {filteredIngredients.map((opt) => {
              const isSelected = selectedIngredients.includes(opt.id);
              return (
                <button 
                  key={opt.id}
                  onClick={() => toggleIngredient(opt.id)}
                  className={`w-full flex items-center gap-4 px-6 py-5 rounded-[20px] border-[1.5px] transition-all ${
                    isSelected 
                      ? 'border-[#9EF07F] bg-transparent' 
                      : 'border-zinc-800 bg-transparent'
                  }`}
                >
                  <span className="text-[24px]">{opt.icon}</span>
                  <span className={`text-[18px] font-bold ${
                    isSelected ? 'text-[#9EF07F]' : 'text-white'
                  }`}>
                    {opt.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skip Confirmation Dialog */}
        {showSkipConfirm && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center px-6 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setShowSkipConfirm(false)} />
            <div className="relative w-full max-w-[340px] bg-[#1a1a1a] rounded-[32px] p-8 flex flex-col items-center shadow-2xl border border-zinc-800 animate-in zoom-in duration-300">
              <h2 className="text-[24px] font-bold text-white mb-3">Are You Sure?</h2>
              <p className="text-[14px] text-zinc-400 text-center leading-relaxed mb-10 px-2 font-medium">
                Smart defaults applied.<br />Edit anytime from your profile.
              </p>
              <div className="w-full flex gap-3">
                <button 
                  onClick={() => handleConfirmSkip(false)}
                  className="flex-1 bg-transparent border-[1.5px] border-zinc-700 text-zinc-400 font-bold py-4 rounded-[18px] text-[18px] transition-all active:scale-[0.98]"
                >
                  No
                </button>
                <button 
                  onClick={() => handleConfirmSkip(true)}
                  className="flex-1 bg-[#9EF07F] text-black font-bold py-4 rounded-[18px] text-[18px] transition-all active:scale-[0.98]"
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Button */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#0c0c0c] border-t border-zinc-900 flex flex-col items-center z-20">
          <button 
            onClick={() => setStep('understanding')}
            className="w-full bg-[#9EF07F] text-black py-5 rounded-[20px] text-[20px] font-bold transition-all active:scale-[0.98]"
          >
            Continue
          </button>
          <div className="w-32 h-1.5 bg-white rounded-full mt-4 opacity-40" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[180] flex items-end justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#121212] w-full max-w-md rounded-t-[32px] p-6 pb-10 border-t border-zinc-800 animate-in slide-in-from-bottom duration-500 flex flex-col items-center">
        <div className="w-14 h-1 bg-zinc-600 rounded-full mb-4" />

        {step === 'identify' ? (
          <>
            <div className="w-full flex justify-end mb-6">
              <button onClick={onClose} className="text-[#9EF07F] font-bold text-lg underline decoration-[#9EF07F]/40 underline-offset-4">Skip</button>
            </div>

            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center text-[36px] font-bold tracking-tight">
                <span className="text-[#9EF07F]">F</span>
                <span className="text-white">itshield</span>
              </div>
              <span className="text-[14px] text-zinc-500 font-medium -mt-1 tracking-wide">Your Food Intelligence</span>
            </div>

            <div className="flex flex-col items-center mb-10">
              <h2 className="text-[26px] font-bold text-white mb-2 text-center">Phone number or Email</h2>
              <p className="text-[14px] text-zinc-400 font-medium text-center">So Next Time You Don't Need To Fill Up</p>
            </div>

            <div className="w-full mb-8">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Mobile number or Mail id"
                className="w-full bg-transparent border border-zinc-700 rounded-[20px] py-6 px-6 text-white text-[16px] placeholder-zinc-500 focus:outline-none focus:border-[#9EF07F] transition-all"
              />
            </div>

            <button 
              onClick={handleContinue}
              disabled={!isFilled}
              className={`w-full py-5 rounded-[20px] text-[20px] font-bold transition-all active:scale-[0.98] ${
                isFilled ? 'bg-[#9EF07F] text-black shadow-lg shadow-green-500/10' : 'bg-[#323232] text-[#9a9a9a]'
              }`}
            >
              Continue
            </button>
          </>
        ) : (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
            <div className="h-6 w-full" />
            <h2 className="text-[26px] font-bold text-white mb-4">OTP Verification</h2>
            <p className="text-[14px] text-zinc-400 text-center mb-10 px-4 leading-relaxed font-medium">
              Enter the verification code we just sent to <br />
              <span className="text-zinc-300">{inputValue || 'fitshield@gmail.com'}</span> number. <button onClick={() => setStep('identify')} className="text-[#9EF07F] underline decoration-[#9EF07F]/40 underline-offset-4">edit</button>
            </p>

            <div className="flex gap-4 mb-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="number"
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className={`w-16 h-16 bg-transparent border-2 rounded-[18px] text-center text-[24px] font-bold text-white focus:outline-none transition-all ${
                    isError ? 'border-red-500' : digit ? 'border-green-500' : 'border-zinc-800'
                  }`}
                />
              ))}
            </div>

            <div className="h-10 flex items-center mb-2">
              {isError && (
                <p className="text-red-500 text-[14px] font-medium animate-in fade-in slide-in-from-top-1 duration-200">
                  Invalid code, please try again
                </p>
              )}
            </div>

            {!isError && (
              <p className="text-[14px] text-white font-medium mb-10">
                Didn't receive a code? <span className="text-[#9EF07F] ml-1">Resend in {formatTime(timeLeft)} Sec</span>
              </p>
            )}

            <button 
              onClick={handleVerify}
              disabled={!isOtpFilled}
              className={`w-full py-5 rounded-[20px] text-[20px] font-bold transition-all active:scale-[0.98] ${
                isOtpFilled ? 'bg-[#9EF07F] text-black' : 'bg-[#323232] text-[#9a9a9a]'
              }`}
            >
              Verify
            </button>
          </div>
        )}

        <div className="w-32 h-1.5 bg-white rounded-full mt-8 opacity-40" />
      </div>
    </div>
  );
};

export default FitshieldModal;