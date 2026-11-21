import React from 'react';
import { Search, X, ArrowLeft } from 'lucide-react';

export default function NavMobileSearch({
  searchQuery,
  setSearchQuery,
  onSubmit,
  onClose,
  inputRef,
}) {
  return (
    <div className="flex md:hidden items-center w-full gap-2 py-0.5 animate-in fade-in duration-200">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close search bar"
        className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <form onSubmit={onSubmit} className="relative flex-1 flex items-center">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          ref={inputRef}
          type="search"
          enterKeyHint="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search "Nutrimix", "Gummies"...'
          aria-label="Search catalog"
          className="w-full bg-slate-100 text-sm font-medium pl-10 pr-8 py-2.5 rounded-full border border-slate-200 focus:border-brand-berry focus:bg-white focus:outline-none transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            aria-label="Clear text"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>

      <button
        type="button"
        onClick={onSubmit}
        className="bg-brand-berry hover:bg-brand-berry-hover text-white font-black text-xs px-3.5 py-2.5 rounded-full shadow-xs shrink-0 cursor-pointer min-h-11"
      >
        Search
      </button>
    </div>
  );
}
