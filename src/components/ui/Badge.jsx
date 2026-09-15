import React from 'react';

/**
 * LittleJoys V2 Badge / Tag Primitive
 */
export default function Badge({
  children,
  variant = 'trust',
  size = 'sm',
  className = '',
  icon: Icon,
  ...props
}) {
  const baseStyles = 'inline-flex items-center font-black rounded-full tracking-wide shrink-0 select-none';

  const sizeStyles = {
    xs: 'text-[9px] px-2 py-0.5 gap-1',
    sm: 'text-[10px] sm:text-[11px] px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5'
  };

  const variantStyles = {
    trust: 'bg-emerald-50 text-[#13805B] border border-emerald-200/80',
    berry: 'bg-[#FF2F92] text-white shadow-2xs',
    berryLight: 'bg-pink-50 text-pink-700 border border-pink-200',
    amber: 'bg-amber-100 text-amber-900 border border-amber-200/70',
    age: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    discount: 'bg-[#13805B] text-white shadow-2xs',
    neutral: 'bg-slate-50 text-slate-600 border border-slate-200'
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.sm} ${variantStyles[variant] || variantStyles.trust} ${className}`}
      {...props}
    >
      {Icon && (
        <span className="shrink-0" aria-hidden="true">
          {typeof Icon === 'function' ? <Icon className="w-3 h-3" /> : Icon}
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}
