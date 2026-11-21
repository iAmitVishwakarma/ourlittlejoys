import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { HOME_FAQS } from '@/data/faqs';

export default function HomeFAQSection({ openFaq, setOpenFaq }) {
  return (
    <section className="py-6 sm:py-8 px-3 sm:px-4 md:px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-6 space-y-2">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-brand-primary">
            Common Questions
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {HOME_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q || `faq-${idx}`}
                className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer ${
                  isOpen
                    ? 'border-brand-primary shadow-sm'
                    : 'border-orange-100/90 shadow-2xs hover:border-slate-300'
                }`}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3
                    className={`text-xs sm:text-sm flex items-center gap-2.5 ${
                      isOpen ? 'font-black text-slate-900' : 'font-bold text-slate-800'
                    }`}
                  >
                    <HelpCircle
                      className={`w-4 h-4 shrink-0 ${
                        isOpen ? 'text-brand-primary' : 'text-slate-400'
                      }`}
                    />
                    <span>{faq.q}</span>
                  </h3>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                      isOpen ? 'rotate-180 text-brand-primary' : ''
                    }`}
                  />
                </div>
                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 pl-6 leading-relaxed border-t border-slate-100 pt-3 font-medium">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
