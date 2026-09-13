import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import SEO from '@/components/common/SEO';
import { 
  ChevronRight, 
  ShoppingCart, 
  CreditCard, 
  Banknote, 
  HelpCircle, 
  ArrowLeft
} from 'lucide-react';

export default function WalletRecharge() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const [selectedPlan, setSelectedPlan] = useState(1001);
  const [isSuccess, setIsSuccess] = useState(false);

  const plans = [
    {
      amount: 1001,
      bonus: "10% BONUS",
      getAmount: 1102,
      tag: null
    },
    {
      amount: 2500,
      bonus: "15% BONUS",
      getAmount: 2875,
      tag: "Most Preferred"
    },
    {
      amount: 5000,
      bonus: "30% BONUS",
      getAmount: 6500,
      tag: "Best value offer"
    }
  ];

  const currentGetAmount = plans.find(p => p.amount === selectedPlan)?.getAmount || 1102;

  const handleRecharge = () => {
    const newBalance = (user?.walletBalance || 0) + currentGetAmount;
    updateProfile({ walletBalance: newBalance });
    setIsSuccess(true);
    setTimeout(() => {
      navigate(-1);
    }, 1800);
  };

  return (
    <div className="bg-white min-h-screen py-10 px-4 md:px-6">
      <SEO 
        title="Recharge LJ Wallet | Little Joys"
        description="Top up your Little Joys wallet and unlock up to 30% instant bonus credit for your child's nutrition orders."
      />
      <div className="container mx-auto max-w-xl">
        <button
          onClick={() => navigate(-1)}
          aria-label="Back to previous page"
          className="flex items-center gap-1 text-slate-600 hover:text-slate-900 text-xs font-bold mb-6 min-h-[44px] min-w-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Current Balance Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-full py-2.5 px-6 max-w-xs mx-auto flex items-center justify-between mb-8 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xl" aria-hidden="true">👛</span>
            <div>
              <span className="text-[11px] text-slate-400 block font-semibold">Your LJ Wallet balance</span>
              <span className="text-sm font-black text-slate-900">₹{user?.walletBalance || 0}</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        {/* Header & Enter Amount Display */}
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
            Recharge LJ Wallet
          </h1>
          <span className="text-xs font-bold text-slate-400 block mb-2">Select Top-Up Amount</span>
          <div className="inline-block bg-slate-50 border border-slate-200 rounded-2xl px-8 py-3 text-3xl md:text-4xl font-black text-slate-900 mb-2">
            ₹{selectedPlan.toLocaleString()}
          </div>
          <div className="text-xs font-bold text-slate-600">
            Get <span className="bg-emerald-600 text-white px-2 py-0.5 rounded font-black">₹{currentGetAmount.toLocaleString()}</span> in your wallet
          </div>
        </div>

        {/* 3 Bonus Option Cards */}
        <div className="grid grid-cols-3 gap-3 mb-10" role="radiogroup" aria-label="Wallet top-up plans">
          {plans.map((p) => (
            <button
              key={p.amount}
              type="button"
              role="radio"
              aria-checked={selectedPlan === p.amount}
              onClick={() => setSelectedPlan(p.amount)}
              className={`p-3.5 rounded-2xl border text-center cursor-pointer transition-all min-h-[44px] ${
                selectedPlan === p.amount
                  ? 'border-emerald-500 bg-emerald-50/40 shadow-xs scale-102 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full block mb-2">
                {p.bonus}
              </span>
              <div className="text-base font-black text-slate-900">₹{p.amount}</div>
              <div className="text-[11px] font-bold text-slate-500 mt-1">Get ₹{p.getAmount}</div>
              {p.tag && (
                <span className={`text-[9px] font-extrabold block mt-2 ${
                  p.tag.includes('Best') ? 'text-amber-600' : 'text-[#13805B]'
                }`}>
                  {p.tag}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Perks list matching Screenshot 3 */}
        <div className="space-y-3.5 text-xs text-slate-600 mb-10 px-2">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-4 h-4 text-slate-400 shrink-0" />
            <span><strong>Save up to 30%:</strong> On all your Favorite Products</span>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard className="w-4 h-4 text-slate-400 shrink-0" />
            <span><strong>No-Cost EMIs:</strong> Easy Payment with No Cost EMI on UPI, Debit, Credit Card above 2000</span>
          </div>
          <div className="flex items-center gap-3">
            <Banknote className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Minimum 2% cashback on amount Rs 100 &amp; above</span>
          </div>
          <div className="flex items-center gap-3">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Have concerns? <a href="#faq" className="text-[#13805B] font-bold underline">Check FAQs</a></span>
          </div>
        </div>

        {/* Success animation or Add Money button */}
        {isSuccess ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center text-xs font-black text-emerald-800">
            ✓ ₹{currentGetAmount} added successfully to your LJ Wallet!
          </div>
        ) : (
          <button
            onClick={handleRecharge}
            className="w-full bg-[#13805B] hover:bg-[#0D6849] active:scale-98 text-white font-black py-4 rounded-xl text-sm uppercase tracking-wider shadow-lg shadow-emerald-700/20 transition-all"
          >
            Add Money
          </button>
        )}
      </div>
    </div>
  );
}
