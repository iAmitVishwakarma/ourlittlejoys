import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { HONEST_REPORT_FAQS } from '@/data/faqs';

export default function HonestReportFAQ({ faqs = HONEST_REPORT_FAQS }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="container mx-auto max-w-3xl px-3.5 sm:px-4 md:px-6 mb-12 sm:mb-16">
      <div className="text-center mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 text-[#1F3C24] font-bold text-xs uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4 text-[#C89B58]" />
          <span>Have Concerns?</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 font-brand-display">
          Commonly Asked Questions
        </h2>
      </div>

      <div className="space-y-2.5 sm:space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={faq.q || `faq-${idx}`}
            className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
              openFaq === idx
                ? 'border-[#1F3C24]/30 shadow-md shadow-[#1F3C24]/10'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <button
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              aria-expanded={openFaq === idx}
              className="w-full text-left px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center font-bold text-xs sm:text-sm text-slate-800 hover:text-[#1F3C24] transition-colors cursor-pointer"
            >
              <span className="pr-4 sm:pr-8 leading-snug">{faq.q}</span>
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  openFaq === idx ? 'bg-[#FAF4EB]' : 'bg-slate-50'
                }`}
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${
                    openFaq === idx ? 'rotate-180 text-[#1F3C24]' : 'text-slate-400'
                  }`}
                />
              </div>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {faq.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
