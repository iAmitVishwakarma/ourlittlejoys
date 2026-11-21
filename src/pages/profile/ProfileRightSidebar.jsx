import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Headphones, ChevronRight } from 'lucide-react';
import { HeartDoodle } from '@/components/graphics/KidsDoodles';

export default function ProfileRightSidebar({
  orders = [],
  onReorderWholeOrder,
  onShowToast,
}) {
  const navigate = useNavigate();

  return (
    <aside className="lg:col-span-3 space-y-5">
      {/* Card 1: Reorder in One Click Card */}
      <div className="bg-white rounded-3xl p-5 border border-orange-100/90 shadow-2xs space-y-4 overflow-hidden relative">
        <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-orange-50">
          <img
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
            alt="Happy child drinking healthy milk"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />

          <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white text-[11px] font-black drop-shadow-xs flex items-center gap-1">
            <span>Good Nutrition Brighter Tomorrows</span>
            <HeartDoodle className="w-3 h-3 text-rose-400 inline-block" />
          </div>
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-sm font-black text-slate-900">Loved your products?</h3>
          <p className="text-xs text-slate-500 font-medium">Reorder in one click</p>
        </div>

        <button
          onClick={() => {
            if (orders.length > 0) {
              onReorderWholeOrder(orders[0]);
            } else {
              navigate('/shop/all');
            }
          }}
          className="w-full bg-[#1F3C24] hover:bg-[#142718] text-white font-black text-xs py-2.5 px-4 rounded-full shadow-xs transition-all active:scale-98 flex items-center justify-center gap-1.5"
        >
          <span>Shop Again</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Card 2: Need Help? Support Card */}
      <div className="bg-[#FAF8F5] rounded-3xl p-5 border border-orange-100/80 shadow-2xs space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-900">Need Help?</h3>
            <p className="text-[11px] text-slate-500">We're here for you.</p>
          </div>
        </div>

        <div className="space-y-1 text-xs font-bold text-slate-700 pt-1">
          <Link
            to="/honest-report"
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-white transition-colors"
          >
            <span>Track Order</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            to="/faq"
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-white transition-colors"
          >
            <span>Returns &amp; Refunds</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            to="/contact"
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-white transition-colors"
          >
            <span>Contact Support</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Card 3: Give the Gift of Health */}
      <div className="bg-[#FAF4EB] rounded-3xl p-5 border border-[#C89B58]/30 shadow-2xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white text-2xl flex items-center justify-center border border-[#C89B58]/20 shrink-0 shadow-2xs">
            🎁
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900">Give the gift of health</h4>
            <p className="text-[11px] text-slate-500 leading-snug">
              Share Nestor with friends &amp; family.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            navigator.clipboard?.writeText('https://nestorhealth.in?ref=AMIT200');
            onShowToast?.(
              'Referral link copied! 📋',
              'Share with fellow parents to give ₹200 & get ₹200.'
            );
          }}
          className="text-xs font-black text-[#1F3C24] hover:text-[#C89B58] hover:underline flex items-center gap-1 pt-1"
        >
          <span>Refer Now &rarr;</span>
        </button>
      </div>
    </aside>
  );
}
