import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/common/SEO';
import Button from '@/components/ui/Button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

/**
 * LittleJoys V2 Friendly 404 Not Found Page
 */
export default function NotFound() {
  return (
    <div className="min-h-[65vh] flex items-center justify-center px-4 py-16 bg-brand-cream">
      <SEO
        title="Page Not Found | Little Joys"
        description="The page you are looking for does not exist. Return to Little Joys for pediatric-formulated clean nutrition."
      />
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xs border border-orange-100/80 p-8 text-center space-y-6">
        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner border border-pink-100">
          🍓
        </div>

        <div className="space-y-2">
          <span className="inline-block bg-pink-100 text-[#FF2F92] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            Error 404
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
            We couldn't find the page you were looking for. Explore our clean nutrition catalog or return home.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="outline" size="md" fullWidth leftIcon={ArrowLeft}>
              Back to Home
            </Button>
          </Link>
          <Link to="/shop/all" className="w-full sm:w-auto">
            <Button variant="primary" size="md" fullWidth leftIcon={ShoppingBag}>
              Shop All
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
