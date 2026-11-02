import React from 'react';

/**
 * LittleJoys V2 Accessible Button Primitive
 * Designed with touch targets (>= 44px on md/lg), accessible focus rings, and tactile feedback.
 */
export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-black rounded-full transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 select-none btn-interactive focus-ring';

  const sizeStyles = {
    sm: 'min-h-[36px] text-xs px-3.5 py-1.5 gap-1.5',
    md: 'min-h-[44px] text-xs sm:text-sm px-5 sm:px-6 py-2.5 gap-2',
    lg: 'min-h-[50px] text-sm sm:text-base px-7 py-3.5 gap-2.5'
  };

  const variantStyles = {
    primary: 'bg-[#1F3C24] hover:bg-[#142718] text-white shadow-md shadow-[#1F3C24]/20 active:scale-97',
    secondary: 'bg-[#C89B58] hover:bg-[#B38644] text-white shadow-md shadow-[#C89B58]/25 active:scale-97',
    outline: 'border-2 border-slate-200 hover:border-[#1F3C24] text-slate-700 hover:text-[#1F3C24] bg-white hover:bg-[#F2F7F2]',
    ghost: 'text-slate-600 hover:text-[#1F3C24] hover:bg-slate-100',
    mint: 'bg-[#F2F7F2] text-[#1F3C24] hover:bg-[#DDECDD] border border-emerald-200'
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${widthStyle} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" aria-hidden="true" />
      ) : LeftIcon ? (
        <span className="shrink-0" aria-hidden="true">{typeof LeftIcon === 'function' ? <LeftIcon className="w-4 h-4" /> : LeftIcon}</span>
      ) : null}
      
      <span>{children}</span>

      {!isLoading && RightIcon ? (
        <span className="shrink-0" aria-hidden="true">{typeof RightIcon === 'function' ? <RightIcon className="w-4 h-4" /> : RightIcon}</span>
      ) : null}
    </button>
  );
}
