import React, { useState, useEffect, useRef } from 'react';
import SEO from '@/components/common/SEO';
import ScallopDivider from '@/components/common/ScallopDivider';
import { KidStampBadge, HeartDoodle } from '@/components/graphics/KidsDoodles';
import { useCartStore } from '@/stores/cartStore';
import { HERO_SLIDES, ALL_PRODUCTS } from '@/data/products';
import { HOME_FAQS } from '@/data/faqs';
import { productService } from '@/services/productService';
import ParentReviewsSection from '@/components/ParentReviewsSection';

import {
  HomeHeroSlider,
  HomeCategoriesGrid,
  HomeTrustPillars,
  HomeProductShowcase,
  HomePediatricianBanner,
  HomeHonestReportPreview,
  HomeFAQSection,
} from '@/components/home';

const BrandPaymentSection = React.lazy(
  () => import('@/components/checkout/BrandPaymentSection')
);

export default function Home({ onAddToCart, cartItems = [], onUpdateCartQuantity }) {
  const ctxCartItems = useCartStore((s) => s.cartItems);
  const ctxAddToCart = useCartStore((s) => s.addToCart);
  const ctxUpdateQty = useCartStore((s) => s.updateQuantity);
  const effectiveCartItems = cartItems?.length ? cartItems : ctxCartItems || [];
  const handleAdd = onAddToCart || ctxAddToCart;
  const handleUpdateQty = onUpdateCartQuantity || ctxUpdateQty;

  const [activeCategory, setActiveCategory] = useState('All');
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const [slides, setSlides] = useState(HERO_SLIDES);
  const [allProducts, setAllProducts] = useState(ALL_PRODUCTS);
  const categoryTimerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    productService.getHeroSlides().then((res) => {
      if (isMounted && Array.isArray(res)) setSlides(res);
    });
    productService.getAllProducts().then((res) => {
      if (isMounted && Array.isArray(res)) setAllProducts(res);
    });
    return () => {
      isMounted = false;
      if (categoryTimerRef.current) clearTimeout(categoryTimerRef.current);
    };
  }, []);

  const handleCategoryChange = (tab) => {
    if (tab === activeCategory) return;
    setIsCategoryLoading(true);
    setActiveCategory(tab);
    if (categoryTimerRef.current) clearTimeout(categoryTimerRef.current);
    categoryTimerRef.current = setTimeout(() => {
      setIsCategoryLoading(false);
    }, 220);
  };

  const topFavourites = allProducts.slice(0, 4);
  const displayedProducts =
    activeCategory === 'All'
      ? topFavourites
      : allProducts.filter(
          (p) =>
            p.category === activeCategory ||
            p.subCategory?.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="bg-brand-cream min-h-screen pb-20 sm:pb-16">
      <SEO
        title="Nestor | Nourishing Brighter Tomorrows - Pediatrician-Backed Nutrition"
        description="Pediatrician-formulated clean nutrition, sprouted superfoods, essential gummies & whole-food organic wellness crafted for children's brighter tomorrows. Zero refined sugar."
        keywords="Nestor nutrition, kids nutrition, sprouted millets, organic wellness, multivitamin gummies, pediatric nutrition India, clean ragi chocolate drink, Nestor"
        canonical="https://nestorbio.com/"
        schemaData={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: HOME_FAQS.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.a,
            },
          })),
        }}
      />

      <h1 className="sr-only">
        Nestor - Expert-Formulated Pediatric Nutrition &amp; Daily Wellness For Kids
      </h1>

      {/* Hero Carousel */}
      <HomeHeroSlider slides={slides} />

      {/* Divider 1 */}
      <div className="container mx-auto max-w-6xl px-4 my-2">
        <ScallopDivider
          direction="up"
          color="text-orange-300/80"
          centerBadge={<KidStampBadge text="Loved by 2 Lakh+ Happy Kids" />}
        />
      </div>

      {/* Categories */}
      <HomeCategoriesGrid />

      {/* Brand Trust Pillars */}
      <HomeTrustPillars />

      {/* Products Showcase */}
      <HomeProductShowcase
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        isCategoryLoading={isCategoryLoading}
        products={displayedProducts}
        effectiveCartItems={effectiveCartItems}
        onAddToCart={handleAdd}
        onUpdateCartQuantity={handleUpdateQty}
      />

      {/* Divider 2 */}
      <div className="container mx-auto max-w-6xl px-4 my-2">
        <ScallopDivider direction="down" color="text-orange-300/80" />
      </div>

      {/* Pediatrician Assessment Banner */}
      <HomePediatricianBanner />

      {/* Honest Lab Reports Section */}
      <HomeHonestReportPreview />

      {/* Divider 3 */}
      <div className="container mx-auto max-w-6xl px-4 my-2">
        <ScallopDivider
          direction="up"
          color="text-[#C89B58]/30"
          centerBadge={
            <div className="flex items-center gap-1.5 text-[11px] font-black text-[#1F3C24] bg-white px-3.5 py-0.5 rounded-full border border-[#C89B58]/30 shadow-2xs">
              <HeartDoodle className="w-3.5 h-3.5 text-[#C89B58]" />
              <span>Real Stories From Real Parents</span>
            </div>
          }
        />
      </div>

      {/* Parent Reviews Section */}
      <ParentReviewsSection />

      {/* FAQ Section */}
      <HomeFAQSection openFaq={openFaq} setOpenFaq={setOpenFaq} />

      {/* Payment Partners & Brand Footer */}
      <React.Suspense
        fallback={
          <div className="container mx-auto max-w-6xl px-4 py-8">
            <div className="w-full h-48 skeleton-shimmer rounded-3xl" />
          </div>
        }
      >
        <BrandPaymentSection />
      </React.Suspense>
    </div>
  );
}
