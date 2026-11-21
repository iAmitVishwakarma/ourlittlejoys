import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { NAVBAR_CATEGORIES } from '@/data/categories';

export default function NavCategoryDropdown({
  isOpen,
  setIsOpen,
  categories = NAVBAR_CATEGORIES,
}) {
  const location = useLocation();
  const isCategoryActive =
    location.pathname.startsWith('/shop/') && !location.pathname.endsWith('/all');

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer focus:outline-none ${
          isCategoryActive
            ? 'text-brand-forest bg-[#FAF4EB] shadow-xs'
            : 'text-slate-700 hover:text-brand-forest hover:bg-[#FAF4EB]'
        }`}
      >
        <span>Shop By Category</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-brand-forest' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-brand-border py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.link}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-brand-forest hover:bg-[#FAF4EB] transition-all flex items-center justify-between group/item"
              >
                <span>{cat.name}</span>
                <span className="opacity-0 group-hover/item:opacity-100 transition-opacity text-brand-forest">
                  ›
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
