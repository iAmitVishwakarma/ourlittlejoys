import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/common/SEO';
import { 
  HelpCircle, 
  ChevronDown, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  RotateCcw, 
  Lock,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export function FAQPage() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "What age groups are Little Joys products suitable for?",
      a: "Our products are specifically formulated by pediatricians for different growth stages: Nutrimix is ideal for children aged 2–6 years, while our Gummies are recommended for children aged 4+ years. We also have specialized blends for teens and mothers."
    },
    {
      q: "Are Little Joys products 100% natural and free from white sugar?",
      a: "Yes, absolutely! We do not use any refined white sugar, artificial syrups, maltodextrin, or preservatives. Our Nutrimix is sweetened naturally with organic Dhampur jaggery, and our gummies are made from citrus pectin and real fruit pulp."
    },
    {
      q: "How does the LJ Wallet work and how do I save 30%?",
      a: "LJ Wallet is our exclusive prepaid parenting credit. When you recharge your wallet with any of our bonus packs (₹1,000, ₹2,000, or ₹3,000), you receive up to 30% extra cashback immediately credited to your balance, which applies automatically at checkout!"
    },
    {
      q: "Can I review the lab test reports for my product batch?",
      a: "Yes! Every single production batch is independently tested by NABL accredited third-party laboratories for heavy metals (Lead, Mercury, Cadmium, Arsenic), microbiological safety, and exact protein content. Visit our Honest Reports page (/honest-report) to download certificates."
    },
    {
      q: "What is your return & replacement policy?",
      a: "If your order arrives damaged, missing items, or expired, we provide an instant 100% free replacement or full refund to your LJ Wallet or original payment method within 7 days of delivery."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F5] pb-24 pt-8">
      <SEO 
        title="Frequently Asked Questions | Little Joys"
        description="Everything you need to know about our clean ingredients, doctor formulations, shipping, and wallet savings."
      />
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
            Parent Support Center
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Everything you need to know about our clean ingredients, doctor formulations, shipping, and wallet savings.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-orange-100 transition-all"
            >
              <button
                type="button"
                aria-expanded={openIdx === idx}
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between gap-4 text-left min-h-[44px]"
              >
                <h2 className="text-sm md:text-base font-black text-slate-800 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-pink-50 text-pink-600 font-bold flex items-center justify-center text-xs shrink-0">
                    Q{idx + 1}
                  </span>
                  <span>{faq.q}</span>
                </h2>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform shrink-0 ${
                    openIdx === idx ? 'rotate-180 text-pink-600' : ''
                  }`}
                />
              </button>
              {openIdx === idx && (
                <p className="mt-4 text-xs md:text-sm text-slate-600 pl-10 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF9F5] pb-24 pt-8">
      <SEO 
        title="Contact Pediatric Nutrition Team | Little Joys"
        description="Reach out to Little Joys pediatric nutrition team for guidance on child diet, order help, and customer support."
      />
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
            We Are Here For You
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
            Contact Our Nutrition Team
          </h1>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Have questions about your child's dietary requirements or need help with your order? Reach out to our pediatric care team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Contact Details (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 space-y-4">
              <h2 className="text-base font-black text-slate-800">Support Channels</h2>
              
              <div className="flex items-start gap-3 text-xs">
                <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Email Us</span>
                  <a href="mailto:care@ourlittlejoys.com" className="font-bold text-slate-800 hover:text-pink-600">
                    care@ourlittlejoys.com
                  </a>
                  <p className="text-[11px] text-slate-400">Response within 24 business hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">WhatsApp & Helpline</span>
                  <a href="tel:+919876543210" className="font-bold text-slate-800 hover:text-emerald-600">
                    +91 98765 43210
                  </a>
                  <p className="text-[11px] text-slate-400">Mon - Sat: 9:30 AM to 6:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Headquarters</span>
                  <p className="font-bold text-slate-800 leading-snug">
                    Mosaic Wellness Pvt. Ltd., 7th Floor, Technopolis Knowledge Park, Andheri East, Mumbai, Maharashtra 400093
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="md:col-span-7">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-orange-100">
              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                    ✓
                  </div>
                  <h2 className="text-xl font-black text-slate-800">Message Received!</h2>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Thank you for contacting us. A pediatric nutrition advisor will respond to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block font-bold text-slate-700 mb-1">Your Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="e.g. Pooja Sharma"
                        className="w-full font-bold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-mobile" className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                      <input
                        id="contact-mobile"
                        type="tel"
                        required
                        placeholder="10-digit number"
                        className="w-full font-bold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-pink-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block font-bold text-slate-700 mb-1">Subject / Order ID</label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="e.g. Question regarding Nutrimix age recommendations"
                      className="w-full font-bold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block font-bold text-slate-700 mb-1">Message</label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder="Tell us how we can help..."
                      className="w-full font-medium px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white font-black py-3 rounded-xl shadow-md transition-all active:scale-98 text-sm min-h-[44px]"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LegalPage({ title, lastUpdated = "September 2026", content }) {
  return (
    <div className="min-h-screen bg-[#FFF9F5] pb-24 pt-8">
      <SEO 
        title={`${title} | Little Joys`}
        description={`Official Little Joys ${title.toLowerCase()} policy and guidelines.`}
      />
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-orange-100 space-y-6">
          <div>
            <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">Official Policy</span>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 mt-1">{title}</h1>
            <p className="text-xs text-slate-400 mt-1">Last Updated: {lastUpdated}</p>
          </div>

          <div className="prose prose-sm text-slate-600 space-y-4 leading-relaxed text-xs md:text-sm border-t border-slate-100 pt-6">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
