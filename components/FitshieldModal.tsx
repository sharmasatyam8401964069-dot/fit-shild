
import React, { useState, useEffect } from 'react';

interface FitshieldModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalStep = 'identify' | 'otp';

const FitshieldModal: React.FC<FitshieldModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<ModalStep>('identify');
  const [inputValue, setInputValue] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(59);

  useEffect(() => {
    if (step === 'otp' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  if (!isOpen) return null;

  const isFilled = inputValue.trim().length > 0;
  const isOtpFilled = otp.every(digit => digit !== '');

  const handleContinue = () => {
    if (isFilled) {
      setStep('otp');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[180] flex items-end justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#121212] w-full max-w-md rounded-t-[32px] p-6 pb-10 border-t border-zinc-800 animate-in slide-in-from-bottom duration-500 flex flex-col items-center">
        {/* Pull Indicator */}
        <div className="w-14 h-1 bg-zinc-600 rounded-full mb-4" />

        {step === 'identify' ? (
          <>
            {/* Top Actions */}
            <div className="w-full flex justify-end mb-6">
              <button 
                onClick={onClose}
                className="text-[#9EF07F] font-bold text-lg underline decoration-[#9EF07F]/40 underline-offset-4"
              >
                Skip
              </button>
            </div>

            {/* Logo Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center text-[36px] font-bold tracking-tight">
                <span className="text-[#9EF07F]">F</span>
                <span className="text-white">itshield</span>
              </div>
              <span className="text-[14px] text-zinc-500 font-medium -mt-1 tracking-wide">
                Your Food Intelligence
              </span>
            </div>

            {/* Header Section */}
            <div className="flex flex-col items-center mb-10">
              <h2 className="text-[26px] font-bold text-white mb-2 text-center">Phone number or Email</h2>
              <p className="text-[14px] text-zinc-400 font-medium text-center">
                So Next Time You Don't Need To Fill Up
              </p>
            </div>

            {/* Input Field */}
            <div className="w-full mb-8">
              <div className="relative group">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Mobile number or Mail id"
                  className="w-full bg-transparent border border-zinc-700 rounded-[20px] py-6 px-6 text-white text-[16px] placeholder-zinc-500 focus:outline-none focus:border-[#9EF07F] transition-all"
                />
              </div>
            </div>

            {/* Continue Button */}
            <button 
              onClick={handleContinue}
              disabled={!isFilled}
              className={`w-full py-5 rounded-[20px] text-[20px] font-bold transition-all active:scale-[0.98] ${
                isFilled 
                  ? 'bg-[#9EF07F] text-black shadow-lg shadow-green-500/10' 
                  : 'bg-[#323232] text-[#9a9a9a]'
              }`}
            >
              Continue
            </button>
          </>
        ) : (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
            {/* Top spacing to match the header look */}
            <div className="h-6 w-full" />

            <h2 className="text-[26px] font-bold text-white mb-4">OTP Verification</h2>
            
            <p className="text-[14px] text-zinc-400 text-center mb-10 px-4 leading-relaxed font-medium">
              Enter the verification code we just sent to <br />
              <span className="text-zinc-300">{inputValue}</span> number. <button onClick={() => setStep('identify')} className="text-[#9EF07F] underline decoration-[#9EF07F]/40 underline-offset-4">edit</button>
            </p>

            {/* OTP Inputs */}
            <div className="flex gap-4 mb-10">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="number"
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className={`w-16 h-16 bg-transparent border-2 rounded-[18px] text-center text-[24px] font-bold text-white focus:outline-none transition-all ${
                    digit ? 'border-green-500' : 'border-zinc-800'
                  }`}
                />
              ))}
            </div>

            <p className="text-[14px] text-white font-medium mb-10">
              Didn't receive a code? <span className="text-[#9EF07F] ml-1">Resend in {formatTime(timeLeft)} Sec</span>
            </p>

            <button 
              onClick={onClose}
              disabled={!isOtpFilled}
              className={`w-full py-5 rounded-[20px] text-[20px] font-bold transition-all active:scale-[0.98] ${
                isOtpFilled 
                  ? 'bg-[#9EF07F] text-black' 
                  : 'bg-[#323232] text-[#9a9a9a]'
              }`}
            >
              Verify
            </button>
          </div>
        )}

        {/* Home Indicator */}
        <div className="w-32 h-1.5 bg-white rounded-full mt-8 opacity-40" />
      </div>
    </div>
  );
};

export default FitshieldModal;
