import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ShieldCheck, ArrowLeft, Lock, HelpCircle } from 'lucide-react';

export default function CheckoutStepper({ currentStep = 'address' }) {
  const navigate = useNavigate();

  // Step definitions
  const steps = [
    { id: 'cart', title: 'Cart', path: '/cart', num: 1 },
    { id: 'address', title: 'Address', path: '/checkout/address', num: 2 },
    { id: 'payment', title: 'Payment', path: '/checkout/payment', num: 3 },
    { id: 'confirmation', title: 'Done', path: '/checkout/success', num: 4 }
  ];

  const stepOrder = ['cart', 'address', 'payment', 'confirmation'];
  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <header className="sticky scale-105 pt-5 top-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100/90 shadow-2xs py-3 sm:py-4 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Little Joys Logo & Back to Bag */}
        {/* <div className="flex items-center gap-3 shrink-0">
          <Link to="/" className="flex items-center gap-1.5 group select-none">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-pink-600 transition-colors">
              little<span className="text-pink-500">joys</span>
            </span>
            <span className="text-base sm:text-lg">🍓</span>
          </Link>
          </div> */}

          {currentStep !== 'confirmation' && (
            <Link
              to="/cart"
              className="hidden md:inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-700 pl-3  border-slate-200 transition-colors"
              title="Return to Cart"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Bag</span>
            </Link>
          )}

        {/* Center: Intelligent Stepper Progress Bar */}
        <nav className="flex items-center gap-1.5 sm:gap-3 md:gap-6 flex-1 max-w-lg mx-auto justify-center" aria-label="Checkout Progress">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isFuture = idx > currentIndex;
            const isClickable = isCompleted && currentStep !== 'confirmation';

            return (
              <React.Fragment key={step.id}>
                {/* Step Item */}
                <div 
                  onClick={() => isClickable && navigate(step.path)}
                  className={`flex items-center gap-1 sm:gap-2 shrink-0 select-none transition-all ${
                    isClickable ? 'cursor-pointer group' : 'cursor-default'
                  }`}
                >
                  {/* Step Bubble */}
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full shrink-0 flex items-center justify-center text-[11px] sm:text-xs font-black transition-all ${
                      isCompleted
                        ? 'bg-[#13805B] text-white shadow-xs group-hover:scale-105'
                        : isCurrent
                        ? 'bg-[#13805B] text-white ring-4 ring-[#13805B]/20 shadow-xs'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5 stroke-3" />
                    ) : (
                      <span>{step.num}</span>
                    )}
                  </div>

                  {/* Step Title: Hidden on screens < sm (640px) to prevent wrapping and squishing at 320px-375px (F-2.2) */}
                  <span
                    className={`hidden sm:inline-block text-[11px] sm:text-xs md:text-sm tracking-tight whitespace-nowrap transition-colors ${
                      isCurrent
                        ? 'font-black text-slate-900'
                        : isCompleted
                        ? 'font-bold text-slate-700 group-hover:text-[#13805B]'
                        : 'font-semibold text-slate-400'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>

                {/* Connecting Line */}
                {idx < steps.length - 1 && (
                  <div className="flex-1 min-w-2 max-w-5 sm:max-w-11.25 h-0.5 shrink-0">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        idx < currentIndex ? 'bg-[#13805B]' : 'bg-slate-200'
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Right: Security & Support */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-emerald-50/70 border border-emerald-200/80 px-3 py-1.5 rounded-full">
            <Lock className="w-3.5 h-3.5 text-[#13805B]" />
            <span>100% Secure Checkout</span>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hi%20Little%20Joys%20Team,%20I%20need%20help%20with%20my%20order"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-[#13805B] transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Need Help?</span>
          </a>
        </div>

      </div>
    </header>
  );
}
