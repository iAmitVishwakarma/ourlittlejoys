import React from 'react';
import { HelpCircle, ChevronDown, ThumbsUp, ThumbsDown, MessageCircleQuestion } from 'lucide-react';

export default function ProductFAQ({ productFaqs, openFaq, setOpenFaq }) {
  return (
    <section className="py-6 max-w-3xl mx-auto">
      <div className="text-center mb-6 space-y-1.5">
        <span className="text-xs font-black uppercase tracking-widest text-[#13805B]">
          Questions &amp; Answers
        </span>
        <h2 className="text-2xl font-black text-slate-900">
          Frequently Asked Questions About This Product
        </h2>
      </div>

      <div className="space-y-3">
        {productFaqs.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div
              key={faq.q || `faq-${idx}`}
              className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer ${
                isOpen
                  ? 'border-[#13805B] shadow-sm'
                  : 'border-orange-100 shadow-2xs hover:border-slate-300'
              }`}
              onClick={() => setOpenFaq(isOpen ? null : idx)}
            >
              <div className="flex items-center justify-between gap-4">
                <h4
                  className={`text-sm flex items-center gap-2.5 ${
                    isOpen ? 'font-black text-slate-900' : 'font-bold text-slate-800'
                  }`}
                >
                  <HelpCircle
                    className={`w-4 h-4 shrink-0 ${
                      isOpen ? 'text-[#13805B]' : 'text-slate-400'
                    }`}
                  />
                  <span>{faq.q}</span>
                </h4>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                    isOpen ? 'rotate-180 text-[#13805B]' : ''
                  }`}
                />
              </div>
              {isOpen && (
                <div className="mt-3 pl-6 border-t border-slate-100 pt-3 space-y-3">
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {faq.a}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span>Was this answer helpful?</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Thanks for your feedback!');
                        }}
                        className="flex items-center gap-1 hover:text-[#13805B] font-bold"
                      >
                        <ThumbsUp className="w-3 h-3" /> Yes
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Thanks for your feedback!');
                        }}
                        className="flex items-center gap-1 hover:text-rose-500 font-bold"
                      >
                        <ThumbsDown className="w-3 h-3" /> No
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Ask Pediatric Nutritionist CTA */}
      <div className="mt-6 text-center">
        <button
          onClick={() =>
            alert(
              'Our certified pediatric nutrition team is available Mon-Sat 9 AM - 7 PM on WhatsApp (+91 98765 43210).'
            )
          }
          className="inline-flex items-center gap-2 bg-white hover:bg-orange-50 text-slate-800 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full border border-orange-200 shadow-2xs transition-colors"
        >
          <MessageCircleQuestion className="w-4 h-4 text-[#13805B]" />
          <span>Have More Questions? Ask Our Pediatrician</span>
        </button>
      </div>
    </section>
  );
}
