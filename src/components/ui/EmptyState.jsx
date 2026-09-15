import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

/**
 * LittleJoys V2 Reusable Empty State Component
 */
export default function EmptyState({
  emoji = '🛒',
  icon: Icon,
  title,
  description,
  actionText = 'Start Shopping',
  actionLink = '/shop/all',
  onAction,
  className = ''
}) {
  return (
    <div className={`text-center py-12 md:py-16 px-4 bg-white rounded-3xl border border-orange-100/80 shadow-xs max-w-md mx-auto space-y-5 ${className}`}>
      <div className="w-20 h-20 bg-emerald-50/80 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner border border-emerald-100 text-emerald-700">
        {Icon ? <Icon className="w-8 h-8" /> : <span>{emoji}</span>}
      </div>

      <div className="space-y-1.5">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actionText && (actionLink || onAction) && (
        <div>
          {actionLink ? (
            <Link to={actionLink}>
              <Button variant="primary" size="md">
                {actionText}
              </Button>
            </Link>
          ) : (
            <Button variant="primary" size="md" onClick={onAction}>
              {actionText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
