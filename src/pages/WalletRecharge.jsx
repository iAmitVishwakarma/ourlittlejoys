import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import SEO from '@/components/common/SEO';
import {
  ShoppingCart,
  CreditCard,
  Banknote,
  ArrowLeft,
  History,
  CheckCircle2,
} from 'lucide-react';

const MOCK_TRANSACTIONS = [
  {
    id: 'tx_3',
    title: 'Nestor Wallet 30% Bonus Top-up',
    date: '10 Sep, 2026',
    amount: '+ ₹300',
    type: 'credit',
  },
  {
    id: 'tx_2',
    title: 'Used on Order #NEST-ORD-9824',
    date: '08 Sep, 2026',
    amount: '- ₹298',
    type: 'debit',
  },
  {
    id: 'tx_1',
    title: 'Welcome Cashback Credit',
    date: '01 Sep, 2026',
    amount: '+ ₹200',
    type: 'credit',
  },
];

export default function WalletRecharge() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const [selectedPlan, setSelectedPlan] = useState(1001);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const rechargeTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (rechargeTimerRef.current) clearTimeout(rechargeTimerRef.current);
    };
  }, []);

  const plans = [
    {
      amount: 1001,
      bonus: '10% BONUS',
      getAmount: 1102,
      tag: null,
    },
    {
      amount: 2500,
      bonus: '15% BONUS',
      getAmount: 2875,
      tag: 'Most Preferred',
    },
    {
      amount: 5000,
      bonus: '30% BONUS',
      getAmount: 6500,
      tag: 'Best value offer',
    },
  ];

  const currentPlan = plans.find((p) => p.amount === selectedPlan) || plans[0];
  const currentGetAmount = currentPlan.getAmount;

  const handleRecharge = () => {
    const newBalance = (user?.walletBalance || 0) + currentGetAmount;
    updateProfile({ walletBalance: newBalance });

    // Append new transaction to ledger
    const newTx = {
      id: `tx_${Date.now()}`,
      title: `Top-up (${currentPlan.bonus})`,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      amount: `+ ₹${currentGetAmount}`,
      type: 'credit',
    };
    setTransactions((prev) => [newTx, ...prev]);

    setIsSuccess(true);
    if (rechargeTimerRef.current) clearTimeout(rechargeTimerRef.current);
    rechargeTimerRef.current = setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 md:py-12 px-4 md:px-6 font-sans selection:bg-[#FAF4EB] selection:text-[#1F3C24]">
      <SEO
        title="Nestor Wallet & Top-up | Nestor"
        description="Manage your Nestor wallet balance, review transaction history, and unlock up to 30% instant bonus credit for your child's nutrition orders."
      />

      <div className="container mx-auto max-w-3xl space-y-8">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            aria-label="Back to previous page"
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-xs font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="bg-white border border-stone-200/80 rounded-full py-1.5 px-4 flex items-center gap-2.5 shadow-2xs">
            <span className="text-base" aria-hidden="true">
              👛
            </span>
            <span className="text-[11px] font-bold text-slate-500">
              Balance: <strong className="text-slate-900 font-black">₹{user?.walletBalance || 200}</strong>
            </span>
          </div>
        </div>

        {/* Main Recharge Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
          <div className="text-center space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#C89B58] block">
              NESTOR WALLET TOP-UP
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-brand-display">
              Add Money &amp; Unlock Instant Bonus
            </h1>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Save up to 30% automatically on every checkout order.
            </p>
          </div>

          {/* Amount Display */}
          <div className="text-center">
            <div className="inline-block bg-slate-50 border border-slate-200 rounded-2xl px-8 py-3.5 text-3xl sm:text-4xl font-black text-slate-900 mb-2">
              ₹{selectedPlan.toLocaleString()}
            </div>
            <div className="text-xs font-bold text-slate-600">
              Get{' '}
              <span className="bg-[#1F3C24] text-white px-2 py-0.5 rounded font-black">
                ₹{currentGetAmount.toLocaleString()}
              </span>{' '}
              credited to your wallet
            </div>
          </div>

          {/* 3 Bonus Option Cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3.5"
            role="radiogroup"
            aria-label="Wallet top-up plans"
          >
            {plans.map((p) => (
              <button
                key={p.amount}
                type="button"
                role="radio"
                aria-checked={selectedPlan === p.amount}
                onClick={() => setSelectedPlan(p.amount)}
                className={`p-4 rounded-2xl border text-center cursor-pointer transition-all ${
                  selectedPlan === p.amount
                    ? 'border-[#1F3C24] bg-[#FAF4EB] shadow-xs ring-2 ring-[#1F3C24]/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span className="text-[10px] font-black text-[#1F3C24] bg-white border border-[#C89B58]/30 px-2 py-0.5 rounded-full inline-block mb-2">
                  {p.bonus}
                </span>
                <div className="text-lg font-black text-slate-900">₹{p.amount}</div>
                <div className="text-xs font-bold text-slate-500 mt-0.5">
                  Get ₹{p.getAmount}
                </div>
                {p.tag && (
                  <span
                    className={`text-[10px] font-extrabold block mt-2 ${
                      p.tag.includes('Best') ? 'text-[#C89B58]' : 'text-[#1F3C24]'
                    }`}
                  >
                    {p.tag}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Perks list */}
          <div className="space-y-3 text-xs text-slate-600 bg-slate-50/70 rounded-2xl p-4 sm:p-5 border border-slate-100">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-4 h-4 text-[#1F3C24] shrink-0" />
              <span>
                <strong>Save up to 30%:</strong> On all doctor-formulated organic nutrition products.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-[#1F3C24] shrink-0" />
              <span>
                <strong>No-Cost EMIs:</strong> Easy payment via UPI, Debit, and Credit Card above ₹2000.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Banknote className="w-4 h-4 text-[#1F3C24] shrink-0" />
              <span>
                <strong>Cashback Guarantee:</strong> Minimum 2% bonus credit on all recharges.
              </span>
            </div>
          </div>

          {/* Action button / Feedback */}
          {isSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center text-xs font-black text-emerald-800 flex items-center justify-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>₹{currentGetAmount} added successfully to your Nestor Wallet!</span>
            </div>
          ) : (
            <button
              onClick={handleRecharge}
              className="w-full bg-[#1F3C24] hover:bg-[#142718] active:scale-98 text-white font-black py-4 rounded-xl text-sm uppercase tracking-wider shadow-md shadow-[#1F3C24]/15 transition-all cursor-pointer"
            >
              Add Money &bull; ₹{selectedPlan}
            </button>
          )}
        </div>

        {/* Transaction History Ledger */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#1F3C24]" />
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Recent Wallet Transactions
              </h2>
            </div>
            <span className="text-[11px] font-bold text-slate-400">
              {transactions.length} entries
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs font-medium">
            {transactions.map((tx) => (
              <div key={tx.id} className="py-3.5 flex justify-between items-center gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-slate-800 truncate">{tx.title}</p>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">{tx.date}</span>
                </div>
                <span
                  className={`font-black text-sm shrink-0 ${
                    tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-800'
                  }`}
                >
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
