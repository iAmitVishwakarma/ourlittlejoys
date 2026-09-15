import React from 'react';

/**
 * LittleJoys V2 Accessible Form Input Primitive
 */
export default function Input({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error = null,
  helperText = null,
  leftIcon: LeftIcon,
  rightElement = null,
  className = '',
  inputClassName = '',
  disabled = false,
  ...props
}) {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className={`space-y-1 text-left ${className}`}>
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold text-slate-700">
          {label} {required && <span className="text-pink-500">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {LeftIcon && (
          <span className="absolute left-3.5 text-slate-400 pointer-events-none" aria-hidden="true">
            {typeof LeftIcon === 'function' ? <LeftIcon className="w-4 h-4" /> : LeftIcon}
          </span>
        )}

        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full min-h-11 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all focus-ring ${
            LeftIcon ? 'pl-10' : 'pl-3.5'
          } ${rightElement ? 'pr-11' : 'pr-3.5'} ${
            error
              ? 'bg-rose-50/50 border border-rose-300 text-rose-900 focus:border-rose-500'
              : 'bg-slate-50 border border-slate-200 text-slate-900 focus:border-[#13805B] focus:bg-white'
          } disabled:bg-slate-100 disabled:cursor-not-allowed ${inputClassName}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-2.5 flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {error && (
        <p id={`${inputId}-error`} className="text-[11px] font-bold text-rose-600 mt-1">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={`${inputId}-helper`} className="text-[11px] text-slate-500 mt-0.5">
          {helperText}
        </p>
      )}
    </div>
  );
}
