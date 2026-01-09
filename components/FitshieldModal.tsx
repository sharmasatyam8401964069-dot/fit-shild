import React, { useState, useEffect } from 'react';
import { ChevronLeft, Search, X } from 'lucide-react';

interface FitshieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
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
const CM_VALUES = Array.from({ length: 151 }, (_, i) => (100 + i).toString()); // 100 to 250
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

const FitshieldModal: React.FC<FitshieldModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
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
  const [tempHeight, setTempHeight] = useState({ val1: "5'", val2: "8\"", unit: 'Feet' });
  
  const [weight, setWeight] = useState('');
  const [isWeightPickerOpen, setIsWeightPickerOpen] = useState(false);
  const [tempWeight, setTempWeight] = useState({ value: '70', unit: 'Kg' });

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
        onLoginSuccess?.();
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
        onLoginSuccess?.();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step, timeLeft, onLoginSuccess]);

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
    if (code.length === 4) {
      setStep('profile');
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

  const goals = ['Fat loss', 'Muscle gain', 'Muscle gain', 'Healthy eating', 'Healthy eating'];

  const handleDateConfirm = () => {
    const formattedMonth = (MONTHS.indexOf(tempDate.month) + 1).toString().padStart(2, '0');
    setDob(`${tempDate.day.padStart(2, '0')}/${formattedMonth}/${tempDate.year}`);
    setIsDatePickerOpen(false);
  };

  const handleHeightConfirm = () => {
    if (tempHeight.unit === 'Feet') {
      setHeight(`${tempHeight.val1} ${tempHeight.val2}`);
    } else {
      setHeight(`${tempHeight.val1} Cm`);
    }
    setIsHeightPickerOpen(false);
  };

  const handleWeightConfirm = () => {
    setWeight(`${tempWeight.value} ${tempWeight.unit}`);
    setIsWeightPickerOpen(false);
  };

  const handleSkipConfirm = (confirm: boolean) => {
    if (confirm) {
      onLoginSuccess?.();
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

  if (step === 'profile') {
    return (
      <div className="fixed inset-0 z-[180] bg-[#0c0c0c] flex flex-col animate-in slide-in-from-bottom duration-500 overflow-y-auto no-scrollbar">
        {/* Header - Matching Screenshot Perfectly */}
        <div className="flex items-center justify-between px-6 pt-12 pb-4 sticky top-0 bg-[#0c0c0c] z-[190]">
          <button onClick={() => setStep('otp')} className="p-1">
            <ChevronLeft size={32} className="text-white" />
          </button>
          <div className="flex flex-col items-center">
            <div className="flex items-center text-[28px] font-bold">
              <span className="text-[#9EF07F]">F</span>
              <span className="text-white">itshield</span>
            </div>
            <span className="text-[12px] text-zinc-500 font-medium uppercase tracking-[0.2em] -mt-1">
              Your Food Intelligence
            </span>
          </div>
          <button onClick={() => setShowSkipConfirm(true)} className="text-[#9EF07F] font-bold text-xl underline underline-offset-[10px] decoration-[#9EF07F]/40">
            Skip
          </button>
        </div>

        <div className="px-6 py-8 space-y-10 pb-44">
          <section>
            <h3 className="text-[20px] font-bold text-white mb-5">Date of birth</h3>
            <div onClick={() => setIsDatePickerOpen(true)} className="w-full bg-transparent border border-zinc-800 rounded-[20px] py-5 px-7 text-[19px] text-zinc-400 flex items-center justify-between cursor-pointer">
              <span>{dob || 'DD/MM/YYYY'}</span>
            </div>
          </section>

          <section>
            <h3 className="text-[20px] font-bold text-white mb-5">Gender</h3>
            <div className="flex gap-4">
              <button 
                onClick={() => setGender('Male')} 
                className={`flex-1 flex items-center justify-center gap-3 py-4.5 rounded-[22px] border-2 transition-all ${
                  gender === 'Male' ? 'border-[#9EF07F] text-[#9EF07F]' : 'border-zinc-800 text-zinc-500'
                }`}
              >
                <span className="text-2xl">👱‍♂️</span><span className="text-[19px] font-bold">Male</span>
              </button>
              <button 
                onClick={() => setGender('Female')} 
                className={`flex-1 flex items-center justify-center gap-3 py-4.5 rounded-[22px] border-2 transition-all ${
                  gender === 'Female' ? 'border-[#9EF07F] text-[#9EF07F]' : 'border-zinc-800 text-zinc-500'
                }`}
              >
                <span className="text-2xl">👱‍♀️</span><span className="text-[19px] font-bold">Female</span>
              </button>
            </div>
          </section>

          <section>
            <h3 className="text-[20px] font-bold text-white mb-5">Height</h3>
            <div onClick={() => setIsHeightPickerOpen(true)} className="w-full bg-transparent border border-zinc-800 rounded-[20px] py-5 px-7 text-[19px] text-zinc-400 flex items-center justify-between cursor-pointer">
              <span>{height || 'Set your height...'}</span>
            </div>
          </section>

          <section>
            <h3 className="text-[20px] font-bold text-white mb-5">Weight</h3>
            <div onClick={() => setIsWeightPickerOpen(true)} className="w-full bg-transparent border border-zinc-800 rounded-[20px] py-5 px-7 text-[19px] text-zinc-400 flex items-center justify-between cursor-pointer">
              <span>{weight || 'Set your weight...'}</span>
            </div>
          </section>

          <section>
            <h3 className="text-[20px] font-bold text-white mb-5">Activity</h3>
            <div className="grid grid-cols-3 gap-3">
              {activityLevels.map((lvl) => (
                <button key={lvl.label} onClick={() => setActivity(lvl.label)} className={`py-4.5 px-2 rounded-[16px] border-2 text-[15px] font-bold transition-all ${activity === lvl.label ? 'border-[#9EF07F] text-[#9EF07F]' : 'border-zinc-800 text-zinc-500'}`}>
                  {lvl.label}
                </button>
              ))}
            </div>
            <p className="text-[14px] text-zinc-500 font-medium mt-4">*{activityLevels.find(l => l.label === activity)?.sub || 'Exercise frequency.'}</p>
          </section>

          <section>
            <h3 className="text-[20px] font-bold text-white mb-5">Goal</h3>
            <div className="grid grid-cols-3 gap-3">
              {goals.map((g, idx) => (
                <button key={idx} onClick={() => setGoal(g)} className={`py-4.5 px-2 rounded-[16px] border-2 text-[15px] font-bold transition-all ${goal === g ? 'border-[#9EF07F] text-[#9EF07F]' : 'border-zinc-800 text-zinc-500'}`}>
                  {g}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Footer Navigation Button */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#0c0c0c] border-t border-zinc-900/50 flex flex-col items-center z-[200]">
          <button onClick={() => setStep('ingredients')} className="w-full bg-[#9EF07F] text-black py-5.5 rounded-[24px] text-[20px] font-bold transition-all active:scale-[0.98]">Next</button>
          <div className="w-36 h-1.5 bg-white rounded-full mt-4 opacity-40" />
        </div>

        {/* Date Picker Modal */}
        {isDatePickerOpen && (
          <div className="fixed inset-0 z-[250] flex items-end justify-center bg-black/60 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setIsDatePickerOpen(false)} />
            <div className="bg-[#121212] w-full max-w-md rounded-t-[40px] border-t border-zinc-800 animate-in slide-in-from-bottom duration-500 overflow-hidden">
              <div className="px-8 pt-6 pb-2 relative">
                <div className="flex justify-end mb-4"><button onClick={handleDateConfirm} className="text-[#9EF07F] text-lg font-bold">Done</button></div>
                <div className="relative h-[240px] flex overflow-hidden">
                  <div className="absolute top-[100px] left-0 right-0 h-[40px] border-y border-zinc-800 pointer-events-none" />
                  <WheelColumn items={DAYS} value={tempDate.day} onChange={(val) => setTempDate(prev => ({ ...prev, day: val }))} />
                  <WheelColumn items={MONTHS} value={tempDate.month} onChange={(val) => setTempDate(prev => ({ ...prev, month: val }))} />
                  <WheelColumn items={YEARS} value={tempDate.year} onChange={(val) => setTempDate(prev => ({ ...prev, year: val }))} />
                </div>
              </div>
              <div className="w-full flex justify-center pb-8 pt-4"><div className="w-32 h-1.5 bg-white rounded-full opacity-40" /></div>
            </div>
          </div>
        )}

        {/* Height Picker Modal */}
        {isHeightPickerOpen && (
          <div className="fixed inset-0 z-[250] flex items-end justify-center bg-black/60 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setIsHeightPickerOpen(false)} />
            <div className="bg-[#121212] w-full max-w-md rounded-t-[40px] border-t border-zinc-800 animate-in slide-in-from-bottom duration-500 overflow-hidden">
              <div className="px-8 pt-6 pb-2 relative">
                <div className="flex justify-end mb-4"><button onClick={handleHeightConfirm} className="text-[#9EF07F] text-lg font-bold">Done</button></div>
                <div className="relative h-[240px] flex overflow-hidden">
                  <div className="absolute top-[100px] left-0 right-0 h-[40px] border-y border-zinc-800 pointer-events-none" />
                  {tempHeight.unit === 'Feet' ? (
                    <>
                      <WheelColumn items={FEET} value={tempHeight.val1} onChange={(val) => setTempHeight(prev => ({ ...prev, val1: val }))} />
                      <WheelColumn items={INCHES} value={tempHeight.val2} onChange={(val) => setTempHeight(prev => ({ ...prev, val2: val }))} />
                    </>
                  ) : (
                    <WheelColumn items={CM_VALUES} value={tempHeight.val1} onChange={(val) => setTempHeight(prev => ({ ...prev, val1: val }))} />
                  )}
                  <WheelColumn items={HEIGHT_UNITS} value={tempHeight.unit} onChange={(val) => setTempHeight(prev => ({ ...prev, unit: val, val1: val === 'Feet' ? "5'" : "170", val2: val === 'Feet' ? "8\"" : "" }))} />
                </div>
              </div>
              <div className="w-full flex justify-center pb-8 pt-4"><div className="w-32 h-1.5 bg-white rounded-full opacity-40" /></div>
            </div>
          </div>
        )}

        {/* Weight Picker Modal */}
        {isWeightPickerOpen && (
          <div className="fixed inset-0 z-[250] flex items-end justify-center bg-black/60 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setIsWeightPickerOpen(false)} />
            <div className="bg-[#121212] w-full max-w-md rounded-t-[40px] border-t border-zinc-800 animate-in slide-in-from-bottom duration-500 overflow-hidden">
              <div className="px-8 pt-6 pb-2 relative">
                <div className="flex justify-end mb-4"><button onClick={handleWeightConfirm} className="text-[#9EF07F] text-lg font-bold">Done</button></div>
                <div className="relative h-[240px] flex overflow-hidden">
                  <div className="absolute top-[100px] left-0 right-0 h-[40px] border-y border-zinc-800 pointer-events-none" />
                  <WheelColumn items={WEIGHT_VALUES} value={tempWeight.value} onChange={(val) => setTempWeight(prev => ({ ...prev, value: val }))} />
                  <WheelColumn items={WEIGHT_UNITS} value={tempWeight.unit} onChange={(val) => setTempWeight(prev => ({ ...prev, unit: val }))} />
                </div>
              </div>
              <div className="w-full flex justify-center pb-8 pt-4"><div className="w-32 h-1.5 bg-white rounded-full opacity-40" /></div>
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
                <button onClick={() => handleSkipConfirm(false)} className="flex-1 bg-transparent border-[1.5px] border-zinc-700 text-zinc-400 font-bold py-4 rounded-[18px] text-[18px]">No</button>
                <button onClick={() => handleSkipConfirm(true)} className="flex-1 bg-[#9EF07F] text-black font-bold py-4 rounded-[18px] text-[18px]">Okay</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Identify & OTP steps...
  return (
    <div className="fixed inset-0 z-[180] flex items-end justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#121212] w-full max-w-md rounded-t-[40px] px-6 pt-5 pb-10 border-t border-zinc-800/80 animate-in slide-in-from-bottom duration-500 flex flex-col items-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="w-16 h-1.5 bg-zinc-700/60 rounded-full mb-8" />
        {step === 'identify' ? (
          <>
            <div className="w-full flex justify-end mb-4">
              <button onClick={onClose} className="text-[#9EF07F] font-bold text-xl underline decoration-[#9EF07F]/30 underline-offset-8">Skip</button>
            </div>
            <div className="flex flex-col items-center mb-10">
              <div className="flex items-center text-[42px] font-bold tracking-tight"><span className="text-[#9EF07F]">F</span><span className="text-white">itshield</span></div>
              <span className="text-[16px] text-zinc-500 font-medium tracking-wide uppercase">Your Food Intelligence</span>
            </div>
            <div className="flex flex-col items-center mb-10">
              <h2 className="text-[28px] font-bold text-white mb-2 text-center tracking-tight">Phone number or Email</h2>
              <p className="text-[15px] text-zinc-400 font-medium text-center">So Next Time You Don't Need To Fill Up</p>
            </div>
            <div className="w-full mb-10">
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Mobile number or Mail id" className="w-full bg-transparent border border-zinc-700 rounded-[24px] py-6 px-8 text-white text-[18px] placeholder-zinc-500 focus:outline-none focus:border-[#9EF07F] transition-all" />
            </div>
            <button onClick={handleContinue} disabled={!isFilled} className={`w-full py-6 rounded-[22px] text-[22px] font-bold transition-all active:scale-[0.98] ${isFilled ? 'bg-[#9EF07F] text-black shadow-lg shadow-green-500/10' : 'bg-[#323232] text-zinc-500'}`}>Continue</button>
          </>
        ) : (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
            <h2 className="text-[30px] font-bold text-white mb-7 tracking-tight">OTP Verification</h2>
            <p className="text-[16px] text-zinc-400 text-center mb-12 px-2 leading-relaxed font-medium">Enter the verification code we just sent to <br /><span className="text-zinc-300">{inputValue || 'fitshield@gmail.com'}</span> number. <button onClick={() => setStep('identify')} className="text-[#9EF07F] underline decoration-[#9EF07F]/30 underline-offset-4 ml-0.5">edit</button></p>
            <div className="flex gap-4 mb-8">
              {otp.map((digit, idx) => (
                <input key={idx} id={`otp-${idx}`} type="number" value={digit} onChange={(e) => handleOtpChange(idx, e.target.value)} className={`w-[72px] h-[72px] bg-transparent border-2 rounded-[24px] text-center text-[28px] font-bold text-white focus:outline-none transition-all ${isError ? 'border-red-500' : digit ? 'border-[#9EF07F]' : 'border-zinc-800/80'}`} />
              ))}
            </div>
            <div className="h-10 flex items-center mb-4">{isError && <p className="text-red-500 text-[16px] font-semibold">Invalid code, please try again</p>}</div>
            {!isError && <p className="text-[16px] text-white font-medium mb-12">Didn't receive a code? <span className="text-[#9EF07F] ml-1">Resend in {formatTime(timeLeft)} Sec</span></p>}
            <button onClick={handleVerify} disabled={!isOtpFilled} className={`w-full py-6 rounded-[24px] text-[22px] font-bold transition-all active:scale-[0.98] ${isOtpFilled ? 'bg-[#9EF07F] text-black shadow-xl shadow-green-500/10' : 'bg-[#323232] text-zinc-500'}`}>Verify</button>
          </div>
        )}
        <div className="w-36 h-1.5 bg-white rounded-full mt-10 opacity-40" />
      </div>
    </div>
  );
};

export default FitshieldModal;