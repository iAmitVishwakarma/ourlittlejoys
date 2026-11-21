import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import NavCategoryDropdown from './NavCategoryDropdown';

const desktopNavClass = ({ isActive }) =>
  `relative px-3 py-1.5 rounded-full text-xs md:text-sm font-bold transition-all duration-200 ${
    isActive
      ? 'text-brand-forest bg-[#FAF4EB] shadow-xs'
      : 'text-slate-700 hover:text-brand-forest hover:bg-[#FAF4EB]'
  }`;

const NavDot = ({ isActive }) =>
  isActive ? (
    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1F3C24] nav-active-dot" />
  ) : null;

export default function DesktopNavLinks({
  isCategoryDropdownOpen,
  setIsCategoryDropdownOpen,
  categories,
}) {
  return (
    <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 font-bold text-xs md:text-sm">
      <NavLink to="/shop/all" className={desktopNavClass}>
        {({ isActive }) => (
          <>
            Shop All
            <NavDot isActive={isActive} />
          </>
        )}
      </NavLink>

      <NavCategoryDropdown
        isOpen={isCategoryDropdownOpen}
        setIsOpen={setIsCategoryDropdownOpen}
        categories={categories}
      />

      <NavLink to="/honest-report" className={desktopNavClass}>
        {({ isActive }) => (
          <>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C89B58]" />
              Honest Reports
            </span>
            <NavDot isActive={isActive} />
          </>
        )}
      </NavLink>

      <NavLink to="/aboutus" className={desktopNavClass}>
        {({ isActive }) => (
          <>
            About Us
            <NavDot isActive={isActive} />
          </>
        )}
      </NavLink>
    </div>
  );
}
