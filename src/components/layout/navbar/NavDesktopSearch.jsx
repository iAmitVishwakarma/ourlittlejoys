import React from 'react';
import { Search, X } from 'lucide-react';

export default function NavDesktopSearch({
  searchQuery,
  setSearchQuery,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="hidden md:flex flex-1 max-w-xs xl:max-w-md relative">
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Search for "Nutrimix", "Gummies"...'
        aria-label="Search products"
        className="w-full bg-slate-100 text-xs md:text-sm pl-10 pr-9 py-2.5 rounded-full border border-slate-200 focus:border-brand-forest focus:bg-white focus:outline-none transition-all focus:shadow-sm focus:shadow-brand-forest/10"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => setSearchQuery('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </form>
  );
}
