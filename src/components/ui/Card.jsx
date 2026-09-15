import React from 'react';

/**
 * LittleJoys V2 Card Container Primitive
 */
export default function Card({
  children,
  className = '',
  interactive = false,
  as: Component = 'div',
  ...props
}) {
  const baseStyles = 'bg-white rounded-3xl p-5 sm:p-6 border border-orange-100/80 shadow-xs';
  const interactiveStyles = interactive ? 'card-interactive hover:border-emerald-200 cursor-pointer' : '';

  return (
    <Component
      className={`${baseStyles} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
