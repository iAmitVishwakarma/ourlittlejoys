import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function RelatedProducts({
  relatedProducts,
  cartItems = [],
  onAddToCart,
}) {
  return (
    <section className="py-6">
      <div className="flex justify-between items-center mb-5">
        <div>
          <span className="text-[11px] font-black uppercase text-[#13805B] tracking-wider">
            Complementary Nutrition
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            Parents Also Purchased
          </h2>
        </div>
        <Link
          to="/shop/all"
          className="text-xs font-black text-[#13805B] hover:underline flex items-center gap-1"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {relatedProducts.map((p) => {
          const inCart = (cartItems || []).find((c) => c.id === p.id || c.slug === p.slug);
          return (
            <div
              key={p.id}
              className="bg-white rounded-3xl p-3.5 sm:p-4 border border-orange-100 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
            >
              <Link
                to={`/product/${p.slug}`}
                className="block h-36 sm:h-44 bg-brand-cream rounded-2xl overflow-hidden p-2 mb-2"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-contain hover:scale-105 transition-transform"
                />
              </Link>

              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-[#C89B58] uppercase">
                  {p.subCategory}
                </span>
                <Link
                  to={`/product/${p.slug}`}
                  className="text-xs sm:text-sm font-black text-slate-900 block line-clamp-2 hover:text-[#1F3C24]"
                >
                  {p.title}
                </Link>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-sm font-black text-slate-900">₹{p.price}</span>
                  <button
                    onClick={() => onAddToCart && onAddToCart(p)}
                    className={`text-[11px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all ${
                      inCart
                        ? 'bg-emerald-100 text-[#1F3C24] border border-emerald-300'
                        : 'bg-[#1F3C24] hover:bg-[#142718] text-white'
                    }`}
                  >
                    {inCart ? 'IN BAG' : 'ADD'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
