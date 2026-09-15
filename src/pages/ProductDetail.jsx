import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ALL_PRODUCTS } from '@/data/products';
import { productService } from '@/services/productService';

import ScallopDivider from '@/components/common/ScallopDivider';
import { 
  SunDoodle, 
  MiniStarCluster, 
  RainbowDoodle, 
  SproutDoodle, 
  HeartDoodle, 
  KidStampBadge,
  FlyingKidDoodle,
  CarrotDoodle,
  VeggiesClusterDoodle,
  SprigDoodle,
  AppleFruitDoodle,
  ScienceNutritionSeal
} from '@/components/graphics/KidsDoodles';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useAuthStore } from '@/stores/authStore';
import { sanitizeInput } from '@/utils';
import ResponsiveImage from '@/components/common/ResponsiveImage';
import SEO from '@/components/common/SEO';
import { ProductDetailSkeleton } from '@/components/common/Skeleton';
import { 
  Star, 
  ArrowRight, 
  Truck, 
  FileCheck2, 
  Heart, 
  Plus, 
  Minus, 
  Check, 
  Share2, 
  ThumbsUp, 
  ThumbsDown,
  HelpCircle, 
  ChevronDown, 
  ChevronRight, 
  X, 
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  RotateCcw,
  Lock,
  MapPin,
  MessageCircleQuestion
} from 'lucide-react';

export default function ProductDetail({ onAddToCart, cartItems = [] }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const ctxAddToCart = useCartStore((s) => s.addToCart);
  const wishlistItems = useWishlistStore((s) => s.wishlistItems);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // Standardized product resolution via productService with fallback (F-0.1, F-3.2)
  const [catalogList, setCatalogList] = useState(ALL_PRODUCTS);
  const [product, setProduct] = useState(() => {
    const target = String(slug || '').toLowerCase().trim();
    return (
      ALL_PRODUCTS.find(
        (p) =>
          String(p.slug || '').toLowerCase() === target ||
          String(p.id).toLowerCase() === target
      ) || ALL_PRODUCTS[0]
    );
  });

  // Pack size variants with clear savings & explicit selected states
  const packVariants = [
    { label: product.weight || "350g", desc: "Single Pack (1 Month)", price: product.price, mrp: product.originalPrice || Math.round(product.price * 1.15), badge: null, perDay: "₹19 / day" },
    { label: "Pack of 2 (Value Saver)", desc: "2-Month Supply (700g)", price: Math.round(product.price * 1.8), mrp: Math.round((product.originalPrice || product.price * 1.15) * 2), badge: "SAVE EXTRA 15%", perDay: "₹16 / day" },
    { label: "Family Trio Pack (3x)", desc: "3-Month Supply (1050g)", price: Math.round(product.price * 2.5), mrp: Math.round((product.originalPrice || product.price * 1.15) * 3), badge: "SAVE EXTRA 25%", perDay: "₹14 / day" }
  ];

  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const currentPack = packVariants[selectedPackIndex];

  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleReviewSubmit = (e) => {
    e?.preventDefault?.();
    const cleanTitle = sanitizeInput(reviewTitle);
    const cleanComment = sanitizeInput(reviewComment);

    if (!cleanTitle && !cleanComment) {
      alert('Please enter a review title or comment.');
      return;
    }

    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setShowReviewModal(false);
      setReviewTitle('');
      setReviewComment('');
      setReviewRating(5);
    }, 1200);
  };
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeReviewFilter, setActiveReviewFilter] = useState('All');
  const [bundleAdded, setBundleAdded] = useState(false);
  const [includeBundleItem2, setIncludeBundleItem2] = useState(true);
  const [scienceTab, setScienceTab] = useState('vitamins'); // 'vitamins' | 'ingredients'
  const [openScienceAccordion, setOpenScienceAccordion] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let isMounted = true;

    productService.getProductBySlugOrId(slug).then((resolved) => {
      if (isMounted && resolved) {
        setProduct(resolved);
      }
    });

    productService.getAllProducts().then((list) => {
      if (isMounted && Array.isArray(list) && list.length > 0) {
        setCatalogList(list);
      }
    });

    const timer = setTimeout(() => setIsLoading(false), 240);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [slug]);

  // Interactive Pincode Delivery Checker
  const [pincode, setPincode] = useState("462016");
  const [pincodeStatus, setPincodeStatus] = useState({ checked: true, deliveryDate: "Thursday, 17 Sep", isFree: true });

  // Frequently bought together bundle complementary product
  const bundleComplement =
    catalogList.find(
      (p) =>
        String(p.id) !== String(product.id) &&
        (p.category === "Gummies" || p.category === "Nutrimix")
    ) || ALL_PRODUCTS[1];

  // Gallery multi-images (Product hero, nutrition facts, kid enjoying milk, raw ingredients)
  const galleryImages = [
    product.image,
    "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80"
  ];

  // Scroll listener for Sticky Add-to-Cart bar
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const discount = currentPack.mrp 
    ? Math.round(((currentPack.mrp - currentPack.price) / currentPack.mrp) * 100) 
    : 0;

  const effectiveAddToCart = onAddToCart || ctxAddToCart;
  
  const isFavorite = Boolean(
    (wishlistItems || []).some((item) => {
      const targetId = String(product.id || '').toLowerCase();
      const targetSlug = String(product.slug || slug || '').toLowerCase();
      const itemId = String(item.id || '').toLowerCase();
      const itemSlug = String(item.slug || '').toLowerCase();
      const itemProductId = String(item.productId || '').toLowerCase();
      return (
        (targetId && (itemId === targetId || itemProductId === targetId || itemSlug === targetId)) ||
        (targetSlug && (itemSlug === targetSlug || itemId === targetSlug || itemProductId === targetSlug))
      );
    })
  );

  const handleToggleWishlist = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/wishlist' } });
      return;
    }
    toggleWishlist(product);
  };

  const handleAdd = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    setAddedAnimation(true);
    if (effectiveAddToCart) {
      effectiveAddToCart({
        ...product,
        price: currentPack.price,
        originalPrice: currentPack.mrp,
        weight: currentPack.label,
        quantity
      });
    }
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    if (effectiveAddToCart) {
      effectiveAddToCart({
        ...product,
        price: currentPack.price,
        originalPrice: currentPack.mrp,
        weight: currentPack.label,
        quantity
      });
    }
    navigate('/checkout');
  };

  const handleAddBundle = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    setBundleAdded(true);
    if (effectiveAddToCart) {
      effectiveAddToCart({
        ...product,
        price: currentPack.price,
        weight: currentPack.label,
        quantity: 1
      });
      if (includeBundleItem2) {
        effectiveAddToCart({
          ...bundleComplement,
          quantity: 1
        });
      }
    }
    setTimeout(() => setBundleAdded(false), 1400);
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeStatus({ checked: true, deliveryDate: "Thursday, 17 Sep", isFree: true });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out ${product.title} on Little Joys!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  };

  // Complementary Related Products (F-0.1, F-3.2)
  const relatedProducts = catalogList
    .filter((p) => String(p.id) !== String(product.id))
    .slice(0, 4);

  // Reviews Data
  const productReviews = [
    {
      id: "rev-1",
      author: "Ritu Verma",
      location: "Bhopal, MP",
      child: "Mother of 4-year-old Kabir",
      rating: 5,
      date: "2 days ago",
      verified: true,
      title: "Morning milk tantrums are completely gone!",
      comment: "My 4-year-old Kabir would run away from regular milk every single morning. Nutrimix chocolate smells like real roasted cocoa and he finishes his tumbler in 2 minutes flat! Knowing it has sprouted ragi, oats, and zero refined white sugar gives me total peace of mind.",
      helpful: 34,
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "rev-2",
      author: "Dr. Sameer Joshi",
      location: "Mumbai, MH",
      child: "Father of 5-year-old Ananya",
      rating: 5,
      date: "1 week ago",
      verified: true,
      title: "Clean formulation with zero heavy metals",
      comment: "Being a pediatrician myself, I inspect lab reports religiously before giving anything to my daughter. No heavy metals, pectin-based, zero white sugar, and no synthetic dyes. Ananya reminds me every single morning for her healthy routine!",
      helpful: 52
    },
    {
      id: "rev-3",
      author: "Kavita Deshmukh",
      location: "Pune, MH",
      child: "Mother of 4 & 7 yr old",
      rating: 5,
      date: "3 weeks ago",
      verified: true,
      title: "Noticeable boost in immunity & school stamina",
      comment: "Both my kids have been having this daily for over 3 months now. They stay energized throughout school hours and handle changing seasons without frequent coughs. Truly grateful for clean Indian nutrition without any white sugar.",
      helpful: 28,
      image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=300&q=80"
    }
  ];

  // Specific FAQs for Product Page
  const productFaqs = [
    {
      q: `What age group is ${product.title} recommended for?`,
      a: `Carefully formulated for kids aged ${product.age || "2 to 6 years"} and pre-teens. The vitamin, mineral, calcium, and plant protein dosages strictly adhere to the Indian Council of Medical Research (ICMR) Recommended Dietary Allowances.`
    },
    {
      q: "Can this be mixed in cold milk as well as warm milk?",
      a: "Yes! Nutrimix dissolves smoothly in both warm and chilled milk. You can also blend it into fruit smoothies, stir it into morning pancake batter, or mix it with oatmeal for a delicious chocolate breakfast bowl."
    },
    {
      q: "Is there any refined white sugar, maltodextrin, or preservatives?",
      a: "Zero refined white sugar, zero maltodextrin, and zero artificial preservatives. We sweeten exclusively with organic Dhampur jaggery and real cocoa, delivering a rich natural taste without the sugar crash."
    },
    {
      q: "How does sprouted ragi help my child's digestion?",
      a: "Sprouting unlocks the bioavailability of grain nutrients, breaking down complex starches into easily digestible components. It increases natural calcium and iron absorption by up to 300% and prevents tummy heaviness."
    },
    {
      q: "How can I verify the NABL lab test report for this batch?",
      a: "Radical transparency is our core promise. Every batch is tested by third-party NABL-accredited labs for heavy metals (Lead, Mercury, Arsenic, Cadmium). You can download the certified lab report anytime under our 'Honest Reports' section."
    }
  ];

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  return (
    <div className="bg-brand-cream min-h-screen pb-24 pt-4 md:pt-6">
      {/* 🚀 DESKTOP STICKY ADD-TO-CART BAR (Top) */}
      {showStickyBar && (
        <div className="hidden md:block fixed top-18.5 md:top-20.5 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-md py-2.5 px-4 animate-in slide-in-from-top duration-300">
          <div className="container mx-auto max-w-6xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img 
                src={product.image} 
                alt={product.title} 
                width={44}
                height={44}
                className="w-11 h-11 object-cover rounded-xl border border-orange-100 shrink-0" 
              />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-black text-slate-900 truncate">
                  {product.title}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="font-extrabold text-[#13805B]">₹{currentPack.price}</span>
                  <span>•</span>
                  <span>{currentPack.label}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleAdd}
                className="bg-[#13805B] hover:bg-[#0E6346] text-white text-xs font-black px-7 py-2.5 rounded-full uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center gap-1.5"
              >
                {addedAnimation ? <Check className="w-4 h-4 stroke-3" /> : <ShoppingBag className="w-4 h-4" />}
                <span>{addedAnimation ? 'ADDED TO BAG' : 'ADD TO BAG'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📱 MOBILE STICKY BOTTOM BAR (Fixed Bottom CTA) */}
      {showStickyBar && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-2xl p-3 px-4 flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-900">₹{currentPack.price}</span>
              {currentPack.mrp && (
                <span className="text-xs text-slate-400 line-through">₹{currentPack.mrp}</span>
              )}
            </div>
            <span className="text-[10px] text-slate-500 font-semibold block truncate max-w-35">
              {currentPack.label}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className="bg-[#13805B] active:bg-[#0E6346] text-white text-xs font-black px-6 py-3 rounded-full uppercase tracking-wider shadow-lg shadow-[#13805B]/30 flex items-center gap-1.5 shrink-0"
          >
            {addedAnimation ? <Check className="w-4 h-4 stroke-3" /> : <ShoppingBag className="w-4 h-4" />}
            <span>{addedAnimation ? 'ADDED!' : 'ADD TO BAG'}</span>
          </button>
        </div>
      )}

      <SEO
        title={`${product.title} - Pediatrician Formulated Kids Nutrition`}
        description={product.description || `Shop ${product.title} at Little Joys. 100% lab tested clean nutrition with zero refined sugar.`}
        ogImage={product.image}
        ogType="product"
        schemaData={{
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": product.title,
          "image": [product.image],
          "description": product.description,
          "sku": product.id || product.slug,
          "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": product.price,
            "availability": "https://schema.org/InStock"
          }
        }}
      />

      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {/* 1. BREADCRUMBS & SHARE */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-5">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <Link to="/" className="hover:text-[#13805B] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop/all" className="hover:text-[#13805B] transition-colors">Shop All</Link>
            <span>/</span>
            <Link to={`/shop/all?category=${encodeURIComponent(product.category)}`} className="hover:text-[#13805B] transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate max-w-45 sm:max-w-none">
              {product.title}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-slate-700 hover:text-[#13805B] bg-white px-3 py-1.5 rounded-full border border-orange-100 shadow-2xs transition-colors shrink-0"
            title="Share product link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-xs font-bold">Share</span>
          </button>
        </div>

        {showShareToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl animate-in fade-in">
            Link copied to clipboard! 📋
          </div>
        )}

        {/* 2. COMPACT FIRST-FOLD PURCHASE HERO (Purchase First, Education Second) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start bg-white rounded-3xl p-5 sm:p-7 md:p-9 border border-orange-100/90 shadow-sm">
          
          {/* Left Column: Product Gallery */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Big Main Image Showcase */}
            <div className="relative w-full aspect-square max-w-md bg-linear-to-tr from-brand-cream via-white to-amber-50/40 rounded-3xl p-6 flex items-center justify-center border border-orange-100 shadow-inner overflow-hidden group">
              <ResponsiveImage
                src={galleryImages[selectedThumbnail]}
                alt={product.title}
                width={420}
                height={420}
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                sizes="(max-width: 640px) 320px, 420px"
                className="w-full h-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
              />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.tag && (
                  <span className="bg-[#FF2F92] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                    {product.tag}
                  </span>
                )}
                <span className="bg-[#13805B] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                  NABL Tested
                </span>
              </div>

              {/* Top Right: Age Pill & Wishlist Button (44x44px touch target) */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="bg-slate-900 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase">
                  {product.age || "4+ Yr"}
                </span>
                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  aria-label={isFavorite ? "Remove from Wishlist" : "Save to Wishlist"}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-sm cursor-pointer ${
                    isFavorite 
                      ? 'bg-red-500 text-white shadow-md scale-105' 
                      : 'bg-white/95 text-slate-400 hover:text-red-500 hover:bg-white'
                  }`}
                  title={isFavorite ? "Remove from Wishlist" : "Save to Wishlist"}
                >
                  <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-white text-white' : ''}`} />
                </button>
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="grid grid-cols-4 gap-2.5 w-full max-w-md mt-3.5">
              {galleryImages.map((imgSrc, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedThumbnail(idx)}
                  className={`aspect-square rounded-2xl overflow-hidden p-1 border-2 transition-all ${
                    selectedThumbnail === idx 
                      ? 'border-[#13805B] shadow-sm scale-102 bg-emerald-50/40' 
                      : 'border-slate-100 hover:border-slate-300 bg-white opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgSrc} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover rounded-xl" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Complete Buying Decision Engine */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              {/* Category & Ratings Row */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-[#FF2F92] bg-pink-50 px-2.5 py-0.5 rounded-full">
                  {product.subCategory || product.category}
                </span>

                <a 
                  href="#customer-reviews"
                  className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full text-xs font-bold border border-amber-200/80 transition-colors"
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">({product.reviews || "4,680"} reviews)</span>
                </a>
              </div>

              {/* Title (30-36px font-black) */}
              <h1 className="text-2xl sm:text-3xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                {product.title}
              </h1>

              {/* One-Line Benefit Hook */}
              <p className="text-sm text-slate-600 mt-1 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            {/* Price & Savings Block */}
            <div className="p-4 rounded-2xl bg-linear-to-r from-brand-cream to-orange-50/50 border border-orange-200/80 flex items-baseline justify-between gap-3">
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900">
                    ₹{currentPack.price}
                  </span>
                  {currentPack.mrp && (
                    <span className="text-base text-slate-400 line-through">
                      ₹{currentPack.mrp}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="bg-[#13805B] text-white text-xs font-black px-2.5 py-0.5 rounded-full">
                      {discount}% OFF
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-emerald-700 mt-1 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-3" />
                  <span>You save ₹{currentPack.mrp - currentPack.price} on this pack</span>
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 font-semibold block">
                  Inclusive of all taxes
                </span>
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 justify-end mt-0.5">
                  <Truck className="w-3.5 h-3.5" /> Free Delivery
                </span>
              </div>
            </div>

            {/* Pack Size Variant Cards with Obvious Selected State */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Select Pack Size:
                </label>
                <span className="text-[11px] text-[#13805B] font-bold">100% Satisfaction Guarantee</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {packVariants.map((pack, idx) => {
                  const isSelected = selectedPackIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedPackIndex(idx)}
                      className={`relative p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                        isSelected 
                          ? 'border-[#13805B] bg-emerald-50/50 shadow-xs ring-2 ring-[#13805B]/20' 
                          : 'border-slate-200/90 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {pack.badge && (
                        <span className="absolute -top-2.5 right-2 bg-[#FF2F92] text-white text-[9px] font-black px-2 py-0.2 rounded-full uppercase tracking-wider">
                          {pack.badge}
                        </span>
                      )}

                      {/* Selected Indicator Pill */}
                      {isSelected && (
                        <span className="absolute -top-2 left-2 bg-[#13805B] text-white text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider flex items-center gap-0.5">
                          <Check className="w-2.5 h-2.5 stroke-3" /> Selected
                        </span>
                      )}

                      <div className="mt-0.5">
                        <span className="text-xs font-black text-slate-900 block truncate">
                          {pack.label}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium block">
                          {pack.desc}
                        </span>
                      </div>
                      <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-baseline justify-between">
                        <span className="text-sm font-black text-slate-900">₹{pack.price}</span>
                        <span className="text-[10px] font-bold text-emerald-700">{pack.perDay}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Wallet Cashback Promotion Banner */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🪙</span>
                <div>
                  <span className="text-xs font-black text-amber-950 block">
                    Get ₹150 Cashback with LJ Wallet
                  </span>
                  <span className="text-[11px] text-amber-800">
                    Use your parenting balance for an instant 30% bonus.
                  </span>
                </div>
              </div>
              <Link to="/wallet" className="text-xs font-black text-amber-900 underline shrink-0">
                Top Up →
              </Link>
            </div>

            {/* Quantity Stepper & Main CTAs */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                    className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-slate-700 hover:text-[#13805B] font-bold shadow-xs active:scale-90 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-9 text-center text-sm font-black text-slate-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                    className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-slate-700 hover:text-[#13805B] font-bold shadow-xs active:scale-90 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Brand Green ADD TO BAG */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 font-black py-4 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all transform active:scale-95 shadow-md flex items-center justify-center gap-2 ${
                    addedAnimation
                      ? 'bg-[#13805B] text-white shadow-[#13805B]/30'
                      : 'bg-[#13805B] hover:bg-[#0E6346] text-white shadow-[#13805B]/25'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4 stroke-3" />
                      <span>ADDED TO BAG!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO BAG</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-[#FF2F92] hover:bg-[#E11D74] text-white font-black py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#FF2F92]/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
              >
                <span>BUY NOW WITH 1-CLICK</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pincode & Delivery Confidence Module (Surfaced Right Beside CTA) */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2.5">
              <form onSubmit={handleCheckPincode} className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 bg-white border border-slate-200 text-xs font-bold px-3 py-2 rounded-xl focus:outline-none focus:border-[#13805B]"
                />
                <button
                  type="submit"
                  className="bg-slate-900 text-white text-xs font-black px-4 py-2 rounded-xl hover:bg-black transition-colors"
                >
                  CHECK
                </button>
              </form>

              {pincodeStatus.checked && (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50/70 p-2 rounded-xl border border-emerald-200/60">
                  <Check className="w-3.5 h-3.5 stroke-3 text-emerald-600 shrink-0" />
                  <span>Delivery by <strong>{pincodeStatus.deliveryDate}</strong> • Free Express Shipping</span>
                </div>
              )}

              {/* 3 Reassurance Bullets */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] font-bold text-slate-600 text-center">
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#13805B]" />
                  <span>100% Genuine</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-[#13805B]" />
                  <span>Secure UPI/Cards</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-[#13805B]" />
                  <span>Easy 7-Day Returns</span>
                </div>
              </div>
            </div>

            {/* 4 Trust Badges Right Beside Purchase Decision */}
            <div className="grid grid-cols-4 gap-2 text-center pt-1 text-[11px] font-bold text-slate-700">
              <div className="bg-orange-50/60 p-2 rounded-xl border border-orange-100">
                <span className="text-base block">🛡️</span>
                <span className="truncate block">NABL Lab Tested</span>
              </div>
              <div className="bg-orange-50/60 p-2 rounded-xl border border-orange-100">
                <span className="text-base block">🍯</span>
                <span className="truncate block">0% White Sugar</span>
              </div>
              <div className="bg-orange-50/60 p-2 rounded-xl border border-orange-100">
                <span className="text-base block">🩺</span>
                <span className="truncate block">Doctor Approved</span>
              </div>
              <div className="bg-orange-50/60 p-2 rounded-xl border border-orange-100">
                <span className="text-base block">🌿</span>
                <span className="truncate block">100% Vegetarian</span>
              </div>
            </div>
          </div>
        </div>

        {/* 〰️ STRATEGIC SCALLOP DIVIDER 1: Hero → Quick Benefits 〰️ */}
        <div className="max-w-6xl mx-auto px-4 my-6">
          <ScallopDivider 
            direction="up" 
            color="text-orange-300/80" 
            centerBadge={<KidStampBadge text="Doctor-Formulated Daily Care" />} 
          />
        </div>

        {/* 3. QUICK CLINICAL BENEFITS GRID ("Why Little Joys Works So Well") */}
        <section className="py-6">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1.5">
            <span className="text-xs font-black uppercase tracking-widest text-[#13805B] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Evidence-Backed Nutrition
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Little Joys Works So Well
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Formulated to fill vital nutrient gaps without upsetting delicate young tummies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:border-[#13805B] transition-all space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl shadow-2xs">
                🌾
              </div>
              <h3 className="text-base font-black text-slate-900">Healthy Physical Growth</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Sprouted Ragi and Bajra deliver high-bioavailability calcium and plant protein for strong bones, teeth, and natural height gain.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:border-[#13805B] transition-all space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#FF2F92] flex items-center justify-center text-2xl shadow-2xs">
                🧠
              </div>
              <h3 className="text-base font-black text-slate-900">Sharper Focus &amp; Memory</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Pure cocoa polyphenols, iron, and choline fuel growing neural pathways for sustained concentration during school and study hours.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:border-[#13805B] transition-all space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#13805B] flex items-center justify-center text-2xl shadow-2xs">
                🛡️
              </div>
              <h3 className="text-base font-black text-slate-900">Stronger Daily Immunity</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Provides 100% RDA of essential Zinc, Vitamin C, and Vitamin D3 to build daily resistance against seasonal colds and coughs.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:border-[#13805B] transition-all space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl shadow-2xs">
                🥣
              </div>
              <h3 className="text-base font-black text-slate-900">Gentle Tummy Digestion</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Sprouting breaks down complex starches into simple, easily absorbable nutrients with zero bloating, heaviness, or white sugar spikes.
              </p>
            </div>
          </div>
        </section>

        {/* 4. FREQUENTLY BOUGHT TOGETHER (ONE-CLICK CONVERTING COMBO) */}
        <section className="py-6">
          <div className="bg-linear-to-r from-emerald-50/90 via-white to-amber-50/90 rounded-3xl p-6 sm:p-8 border border-emerald-200/90 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  Frequently Bought Together
                </h2>
              </div>
              <span className="bg-[#FF2F92] text-white text-xs font-black px-3 py-1 rounded-full uppercase shadow-2xs">
                Save ₹149 Combo Discount
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Checkbox Items Row */}
              <div className="lg:col-span-8 flex flex-col sm:flex-row items-center gap-4">
                {/* Item 1 */}
                <div className="bg-white rounded-2xl p-4 border border-orange-100 flex items-center gap-3 w-full sm:w-auto flex-1 shadow-2xs">
                  <input type="checkbox" checked readOnly className="w-4 h-4 accent-[#13805B] rounded" />
                  <img src={product.image} alt={product.title} className="w-14 h-14 object-contain rounded-xl" />
                  <div className="min-w-0">
                    <span className="text-xs font-black text-slate-900 block truncate">{product.title}</span>
                    <span className="text-xs font-extrabold text-[#13805B]">₹{currentPack.price}</span>
                  </div>
                </div>

                <div className="text-slate-400 font-black text-xl shrink-0">+</div>

                {/* Item 2 with Interactive Checkbox */}
                <div className="bg-white rounded-2xl p-4 border border-orange-100 flex items-center gap-3 w-full sm:w-auto flex-1 shadow-2xs">
                  <input 
                    type="checkbox" 
                    checked={includeBundleItem2} 
                    onChange={(e) => setIncludeBundleItem2(e.target.checked)} 
                    className="w-4 h-4 accent-[#13805B] rounded cursor-pointer" 
                  />
                  <img src={bundleComplement.image} alt={bundleComplement.title} className="w-14 h-14 object-contain rounded-xl" />
                  <div className="min-w-0">
                    <span className="text-xs font-black text-slate-900 block truncate">{bundleComplement.title}</span>
                    <span className="text-xs font-extrabold text-[#13805B]">₹{bundleComplement.price}</span>
                  </div>
                </div>
              </div>

              {/* Total & 1-Click Action */}
              <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-emerald-200 flex flex-col justify-between space-y-3 shadow-2xs">
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-slate-500">Combo Total:</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-slate-900">
                        ₹{includeBundleItem2 ? currentPack.price + (bundleComplement.price || 499) - 149 : currentPack.price}
                      </span>
                      {includeBundleItem2 && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{currentPack.price + (bundleComplement.price || 499)}
                        </span>
                      )}
                    </div>
                  </div>
                  {includeBundleItem2 && (
                    <span className="text-[11px] text-emerald-700 font-bold block mt-1">
                      🎉 Instant Combo Discount of ₹149 Applied!
                    </span>
                  )}
                </div>

                <button
                  onClick={handleAddBundle}
                  className="w-full bg-[#13805B] hover:bg-[#0E6346] text-white font-black py-3.5 rounded-full text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  {bundleAdded ? <Check className="w-4 h-4 stroke-3" /> : <Plus className="w-4 h-4" />}
                  <span>{bundleAdded ? 'ADDED BOTH TO BAG!' : 'ADD BOTH TO BAG (1-CLICK)'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. "HEALTHY HABITS START HERE..." & 4-STEP DAILY ROUTINE GUIDE (Right after purchase) */}
        <section className="py-6">
          <div className="relative text-center bg-linear-to-b from-amber-50/70 via-white to-orange-50/40 rounded-3xl p-6 sm:p-8 border border-orange-200/80 mb-6 shadow-xs overflow-hidden">
            {/* Playful Floating Sun & Stars */}
            <SunDoodle className="w-9 h-9 text-amber-400 absolute top-4 left-6 hidden sm:block animate-pulse" />
            <MiniStarCluster className="text-amber-400 absolute top-5 right-8 hidden sm:inline-flex" />

            {/* Rainbow Whimsical Heading */}
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight font-sans select-none mb-1">
              <span className="text-sky-500 inline-block hover:scale-110 transition-transform">H</span>
              <span className="text-sky-600 inline-block hover:scale-110 transition-transform">E</span>
              <span className="text-indigo-500 inline-block hover:scale-110 transition-transform">A</span>
              <span className="text-indigo-600 inline-block hover:scale-110 transition-transform">L</span>
              <span className="text-emerald-500 inline-block hover:scale-110 transition-transform">T</span>
              <span className="text-emerald-600 inline-block hover:scale-110 transition-transform">H</span>
              <span className="text-emerald-700 inline-block hover:scale-110 transition-transform mr-2 sm:mr-3">Y</span>

              <span className="text-amber-500 inline-block hover:scale-110 transition-transform">H</span>
              <span className="text-amber-600 inline-block hover:scale-110 transition-transform">A</span>
              <span className="text-orange-500 inline-block hover:scale-110 transition-transform">B</span>
              <span className="text-orange-600 inline-block hover:scale-110 transition-transform">I</span>
              <span className="text-rose-500 inline-block hover:scale-110 transition-transform">T</span>
              <span className="text-rose-600 inline-block hover:scale-110 transition-transform mr-2 sm:mr-3">S</span>

              <span className="text-yellow-500 inline-block hover:scale-110 transition-transform">S</span>
              <span className="text-amber-500 inline-block hover:scale-110 transition-transform">T</span>
              <span className="text-orange-500 inline-block hover:scale-110 transition-transform">A</span>
              <span className="text-rose-500 inline-block hover:scale-110 transition-transform">R</span>
              <span className="text-pink-500 inline-block hover:scale-110 transition-transform mr-2 sm:mr-3">T</span>

              <span className="text-rose-600 inline-block hover:scale-110 transition-transform">H</span>
              <span className="text-pink-600 inline-block hover:scale-110 transition-transform">E</span>
              <span className="text-purple-600 inline-block hover:scale-110 transition-transform">R</span>
              <span className="text-red-500 inline-block hover:scale-110 transition-transform">E</span>
              <span className="text-red-600 inline-block hover:scale-110 transition-transform">...</span>
            </h2>

            {/* 🦸 Iconic Flying Kid Superhero SVG Doodle */}
            <div className="flex justify-center -my-2">
              <FlyingKidDoodle className="w-48 sm:w-64 h-20 sm:h-24 drop-shadow-xs" />
            </div>

            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto leading-relaxed -mt-1">
              Build a joyful morning nutrition habit that kids remind you for every single day!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-3xl p-5 border border-orange-100 text-center shadow-xs space-y-2 hover:border-[#13805B] transition-all">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#13805B] font-black text-sm flex items-center justify-center mx-auto">
                1
              </div>
              <h4 className="text-base font-black text-slate-900">Scoop</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Take 2 level scoops (approx. 30g) of Nutrimix powder.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-orange-100 text-center shadow-xs space-y-2 hover:border-[#13805B] transition-all">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center mx-auto">
                2
              </div>
              <h4 className="text-base font-black text-slate-900">Pour</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Add to 150ml-200ml of warm or chilled milk (or smoothies).
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-orange-100 text-center shadow-xs space-y-2 hover:border-[#13805B] transition-all">
              <div className="w-10 h-10 rounded-full bg-pink-100 text-[#FF2F92] font-black text-sm flex items-center justify-center mx-auto">
                3
              </div>
              <h4 className="text-base font-black text-slate-900">Shake / Stir</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Stir vigorously or shake in tumbler for 10 seconds.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-orange-100 text-center shadow-xs space-y-2 hover:border-[#13805B] transition-all">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center mx-auto">
                4
              </div>
              <h4 className="text-base font-black text-slate-900">Enjoy Daily</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Serve once daily with breakfast or evening snack.
              </p>
            </div>
          </div>
        </section>

        {/* 6. CLEAN INGREDIENTS SPOTLIGHT (SIMPLIFIED, READABLE CARDS) */}
        <section className="py-6">
          <div className="bg-white rounded-3xl p-6 sm:p-9 border border-orange-100 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#13805B]">
                  Radical Transparency
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  What's Inside Every Scoop
                </h2>
              </div>
              <Link
                to="/honest-report"
                className="text-xs font-black text-[#13805B] bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>View NABL Lab Test Certificate</span>
              </Link>
            </div>

            {/* 5 Clean Ingredient Cards with Bigger Titles */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 text-center">
              <div className="bg-brand-cream p-4 rounded-2xl border border-orange-100">
                <span className="text-3xl block mb-2">🌾</span>
                <span className="text-sm font-black text-slate-900 block">Sprouted Ragi</span>
                <span className="text-xs text-slate-500 font-medium mt-0.5 block">High Calcium</span>
              </div>
              <div className="bg-brand-cream p-4 rounded-2xl border border-orange-100">
                <span className="text-3xl block mb-2">🍫</span>
                <span className="text-sm font-black text-slate-900 block">Real Cocoa</span>
                <span className="text-xs text-slate-500 font-medium mt-0.5 block">Brain Polyphenols</span>
              </div>
              <div className="bg-brand-cream p-4 rounded-2xl border border-orange-100">
                <span className="text-3xl block mb-2">🍯</span>
                <span className="text-sm font-black text-slate-900 block">Dhampur Jaggery</span>
                <span className="text-xs text-slate-500 font-medium mt-0.5 block">Zero White Sugar</span>
              </div>
              <div className="bg-brand-cream p-4 rounded-2xl border border-orange-100">
                <span className="text-3xl block mb-2">🥣</span>
                <span className="text-sm font-black text-slate-900 block">Pearl Millet</span>
                <span className="text-xs text-slate-500 font-medium mt-0.5 block">Iron &amp; Energy</span>
              </div>
              <div className="bg-brand-cream p-4 rounded-2xl border border-orange-100 col-span-2 sm:col-span-1">
                <span className="text-3xl block mb-2">🥜</span>
                <span className="text-sm font-black text-slate-900 block">Almonds &amp; Walnuts</span>
                <span className="text-xs text-slate-500 font-medium mt-0.5 block">Healthy Brain Fats</span>
              </div>
            </div>

            {/* Full Ingredients Statement */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              <strong className="text-slate-900 font-bold">Complete Formulation: </strong>
              {product.ingredients || "Sprouted Finger Millet (Ragi), Pearl Millet (Bajra), Rolled Oats, Pure Alkalized Cocoa, Dhampur Organic Jaggery, Almonds, Walnuts, Whey Protein Isolate, 18 Essential Vitamins & Minerals (Vitamin A, C, D3, E, B-Complex, Zinc Gluconate, Iron Bisglycinate). Zero Artificial Colours or Preservatives."}
            </div>
          </div>
        </section>

        {/* 〰️ STRATEGIC SCALLOP DIVIDER 2: Ingredients → Science & Care 〰️ */}
        <div className="max-w-6xl mx-auto px-4 my-6">
          <ScallopDivider 
            direction="down" 
            color="text-emerald-300/80" 
            centerBadge={
              <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-white px-3.5 py-0.5 rounded-full border border-emerald-200 shadow-2xs">
                <SproutDoodle className="w-4 h-4 text-emerald-600" />
                <span>Backed by Science + Care</span>
              </div>
            } 
          />
        </div>

        {/* 7. "BACKED BY SCIENCE + CARE" SIGNATURE BOTANICAL HERO & EDUCATIONAL ACCORDIONS */}
        <section className="py-6 space-y-6">
          {/* Signature Mint Green Botanical Banner */}
          <div className="bg-[#D2EBE0] border border-[#B5DEC9] rounded-3xl p-6 sm:p-9 text-center relative overflow-hidden shadow-xs">
            {/* Hand-Drawn Veggie & Botanical Doodles Row */}
            <div className="flex items-end justify-center gap-3 sm:gap-6 flex-wrap">
              <VeggiesClusterDoodle className="w-12 sm:w-16 h-12 sm:h-16 text-emerald-700 hover:scale-105 transition-transform" />
              <CarrotDoodle className="w-10 sm:w-12 h-16 sm:h-20 hover:scale-105 transition-transform" />
              
              {/* Circular Nutrition Science Seal */}
              <div className="mx-1 sm:mx-3 hover:rotate-6 transition-transform">
                <ScienceNutritionSeal className="w-24 sm:w-32 h-24 sm:h-32 drop-shadow-sm" />
              </div>

              <SprigDoodle className="w-10 sm:w-12 h-14 sm:h-16 text-emerald-700 hover:scale-105 transition-transform" />
              <AppleFruitDoodle className="w-10 sm:w-12 h-12 sm:h-14 hover:scale-105 transition-transform" />
            </div>

            {/* Prominent Clean Heading */}
            <h2 className="text-2xl sm:text-4xl font-black text-[#0B4A34] tracking-tight uppercase mt-4">
              BACKED BY SCIENCE + CARE
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#18533E] max-w-xl mx-auto mt-1 leading-relaxed">
              Formulated alongside India's top pediatricians and nutrition scientists to meet 100% ICMR RDA requirements.
            </p>

            {/* 4 Clinical Certifications Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mt-6 pt-5 border-t border-[#B5DEC9]/80 text-left sm:text-center">
              <div className="bg-white/70 backdrop-blur-xs p-3 rounded-2xl border border-white/60">
                <span className="text-lg block">🛡️</span>
                <span className="text-xs font-black text-slate-900 block mt-0.5">NABL Lab Tested</span>
                <span className="text-[11px] text-slate-600 font-medium block">&lt;0.01 ppm Heavy Metals</span>
              </div>

              <div className="bg-white/70 backdrop-blur-xs p-3 rounded-2xl border border-white/60">
                <span className="text-lg block">🍯</span>
                <span className="text-xs font-black text-slate-900 block mt-0.5">Zero Refined Sugar</span>
                <span className="text-[11px] text-slate-600 font-medium block">100% Clean Sweetness</span>
              </div>

              <div className="bg-white/70 backdrop-blur-xs p-3 rounded-2xl border border-white/60">
                <span className="text-lg block">🩺</span>
                <span className="text-xs font-black text-slate-900 block mt-0.5">Pediatrician Approved</span>
                <span className="text-[11px] text-slate-600 font-medium block">100% ICMR Dosages</span>
              </div>

              <div className="bg-white/70 backdrop-blur-xs p-3 rounded-2xl border border-white/60">
                <span className="text-lg block">🌿</span>
                <span className="text-xs font-black text-slate-900 block mt-0.5">100% Vegetarian</span>
                <span className="text-[11px] text-slate-600 font-medium block">Zero Gelatin / Palm Oil</span>
              </div>
            </div>
          </div>

          {/* Layer 2 Deep Education: Interactive Tabs & Accordions */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-100 shadow-xs space-y-5">
            {/* Tabs Selector */}
            <div className="flex justify-center">
              <div className="inline-flex bg-slate-100 p-1 rounded-full border border-slate-200">
                <button
                  onClick={() => setScienceTab('vitamins')}
                  className={`px-5 py-2 rounded-full text-xs font-black transition-all ${
                    scienceTab === 'vitamins'
                      ? 'bg-[#13805B] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Vitamins &amp; Minerals
                </button>
                <button
                  onClick={() => setScienceTab('ingredients')}
                  className={`px-5 py-2 rounded-full text-xs font-black transition-all ${
                    scienceTab === 'ingredients'
                      ? 'bg-[#13805B] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Whole Food Ingredients
                </button>
              </div>
            </div>

            {/* Accordion Rows based on active tab */}
            <div className="space-y-3 max-w-3xl mx-auto">
              {scienceTab === 'vitamins' ? (
                <>
                  <div 
                    onClick={() => setOpenScienceAccordion(openScienceAccordion === 0 ? null : 0)}
                    className="p-4 rounded-2xl bg-brand-cream border border-orange-100/90 cursor-pointer hover:border-orange-300 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🦴</span>
                        <h4 className="text-sm font-black text-slate-900">High-Bioavailability Calcium &amp; Vitamin D3</h4>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openScienceAccordion === 0 ? 'rotate-180 text-[#13805B]' : ''}`} />
                    </div>
                    {openScienceAccordion === 0 && (
                      <p className="text-xs sm:text-sm text-slate-600 mt-2.5 pt-2.5 border-t border-orange-100 font-medium leading-relaxed">
                        Fortified with plant-derived calcium and clean Vitamin D3 to ensure 100% of the recommended bone mineralization in children during active growth spurts.
                      </p>
                    )}
                  </div>

                  <div 
                    onClick={() => setOpenScienceAccordion(openScienceAccordion === 1 ? null : 1)}
                    className="p-4 rounded-2xl bg-brand-cream border border-orange-100/90 cursor-pointer hover:border-orange-300 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🛡️</span>
                        <h4 className="text-sm font-black text-slate-900">Zinc &amp; Vitamin C Daily Immunity Shield</h4>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openScienceAccordion === 1 ? 'rotate-180 text-[#13805B]' : ''}`} />
                    </div>
                    {openScienceAccordion === 1 && (
                      <p className="text-xs sm:text-sm text-slate-600 mt-2.5 pt-2.5 border-t border-orange-100 font-medium leading-relaxed">
                        Zinc gluconate combined with pure citrus Vitamin C works synergistically to power white blood cell responses against seasonal viral changes and school bugs.
                      </p>
                    )}
                  </div>

                  <div 
                    onClick={() => setOpenScienceAccordion(openScienceAccordion === 2 ? null : 2)}
                    className="p-4 rounded-2xl bg-brand-cream border border-orange-100/90 cursor-pointer hover:border-orange-300 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🧠</span>
                        <h4 className="text-sm font-black text-slate-900">Iron Bisglycinate &amp; Active B-Complex</h4>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openScienceAccordion === 2 ? 'rotate-180 text-[#13805B]' : ''}`} />
                    </div>
                    {openScienceAccordion === 2 && (
                      <p className="text-xs sm:text-sm text-slate-600 mt-2.5 pt-2.5 border-t border-orange-100 font-medium leading-relaxed">
                        Gentle iron chelate prevents tummy constipation while supporting optimal oxygen delivery to brain cells, improving daytime attention span and classroom memory.
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div 
                    onClick={() => setOpenScienceAccordion(openScienceAccordion === 0 ? null : 0)}
                    className="p-4 rounded-2xl bg-brand-cream border border-orange-100/90 cursor-pointer hover:border-orange-300 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🌾</span>
                        <h4 className="text-sm font-black text-slate-900">Sprouted Ragi &amp; Pearl Millet (Bajra)</h4>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openScienceAccordion === 0 ? 'rotate-180 text-[#13805B]' : ''}`} />
                    </div>
                    {openScienceAccordion === 0 && (
                      <p className="text-xs sm:text-sm text-slate-600 mt-2.5 pt-2.5 border-t border-orange-100 font-medium leading-relaxed">
                        Sprouting grains deactivates anti-nutritional phytates, unlocking 300% greater natural iron and calcium absorption with zero digestive heaviness.
                      </p>
                    )}
                  </div>

                  <div 
                    onClick={() => setOpenScienceAccordion(openScienceAccordion === 1 ? null : 1)}
                    className="p-4 rounded-2xl bg-brand-cream border border-orange-100/90 cursor-pointer hover:border-orange-300 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🍫</span>
                        <h4 className="text-sm font-black text-slate-900">Pure Alkalized Cocoa &amp; Brain Polyphenols</h4>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openScienceAccordion === 1 ? 'rotate-180 text-[#13805B]' : ''}`} />
                    </div>
                    {openScienceAccordion === 1 && (
                      <p className="text-xs sm:text-sm text-slate-600 mt-2.5 pt-2.5 border-t border-orange-100 font-medium leading-relaxed">
                        Real cocoa delivers the chocolate taste kids adore, while naturally supplying flavanols that boost cerebral blood circulation and mood stability.
                      </p>
                    )}
                  </div>

                  <div 
                    onClick={() => setOpenScienceAccordion(openScienceAccordion === 2 ? null : 2)}
                    className="p-4 rounded-2xl bg-brand-cream border border-orange-100/90 cursor-pointer hover:border-orange-300 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🍯</span>
                        <h4 className="text-sm font-black text-slate-900">Organic Dhampur Jaggery (Zero White Sugar)</h4>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openScienceAccordion === 2 ? 'rotate-180 text-[#13805B]' : ''}`} />
                    </div>
                    {openScienceAccordion === 2 && (
                      <p className="text-xs sm:text-sm text-slate-600 mt-2.5 pt-2.5 border-t border-orange-100 font-medium leading-relaxed">
                        Traditional slow-cooked jaggery retains natural magnesium and potassium, providing gentle sweetness with a lower glycemic index and zero sugar crashes.
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Radical Transparency CTA Button */}
            <div className="pt-2 text-center">
              <Link
                to="/honest-report"
                className="inline-flex items-center gap-2 bg-[#13805B] hover:bg-[#0E6346] text-white text-xs font-black px-6 py-3 rounded-full uppercase tracking-wider shadow-md transition-all active:scale-95"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Download Certified NABL Lab Heavy-Metal Report</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 〰️ STRATEGIC SCALLOP DIVIDER 3: Science → Customer Reviews 〰️ */}
        <div className="max-w-6xl mx-auto px-4 my-6">
          <ScallopDivider 
            direction="up" 
            color="text-pink-300/80" 
            centerBadge={
              <div className="flex items-center gap-1.5 text-xs font-black text-[#FF2F92] bg-white px-3.5 py-0.5 rounded-full border border-pink-200 shadow-2xs">
                <HeartDoodle className="w-3.5 h-3.5 text-[#FF2F92]" />
                <span>Verified Parent Reviews</span>
              </div>
            } 
          />
        </div>

        {/* 8. SCANNABLE CUSTOMER REVIEWS & RATINGS BREAKDOWN */}
        <section id="customer-reviews" className="py-6">
          <div className="bg-white rounded-3xl p-6 sm:p-9 border border-orange-100 shadow-xs space-y-7">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              {/* Rating Summary Block */}
              <div className="flex items-center gap-6">
                <div className="text-center bg-brand-cream p-5 rounded-3xl border border-orange-100 shrink-0">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 block">
                    {product.rating}
                  </span>
                  <div className="flex items-center justify-center gap-1 my-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 font-bold block">
                    {product.reviews || "4,680"} Verified Reviews
                  </span>
                </div>

                {/* Star Distribution Progress Bars */}
                <div className="space-y-1.5 flex-1 max-w-xs text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-slate-600 font-bold">5 ★</span>
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '84%' }} />
                    </div>
                    <span className="w-8 text-right text-slate-500 font-semibold">84%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-slate-600 font-bold">4 ★</span>
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: '12%' }} />
                    </div>
                    <span className="w-8 text-right text-slate-500 font-semibold">12%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-slate-600 font-bold">3 ★</span>
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: '3%' }} />
                    </div>
                    <span className="w-8 text-right text-slate-500 font-semibold">3%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 text-slate-600 font-bold">2 ★</span>
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-400 rounded-full" style={{ width: '1%' }} />
                    </div>
                    <span className="w-8 text-right text-slate-500 font-semibold">1%</span>
                  </div>
                </div>
              </div>

              {/* Write a Review Button */}
              <div>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="w-full md:w-auto bg-white hover:bg-orange-50 text-slate-900 border-2 border-slate-900 font-black py-3 px-6 rounded-full text-xs uppercase tracking-wider transition-all active:scale-95"
                >
                  Write a Review
                </button>
              </div>
            </div>

            {/* Review Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {['All', 'With Photos', 'Verified Buyers', '5 Stars'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveReviewFilter(filter)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    activeReviewFilter === filter
                      ? 'bg-[#13805B] text-white'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Structured Reviews List (Concise, scannable) */}
            <div className="space-y-5 divide-y divide-slate-100">
              {productReviews.map((rev) => (
                <div key={rev.id} className="pt-5 first:pt-0 space-y-2.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-1.5 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <h4 className="text-sm sm:text-base font-black text-slate-900 mt-1">
                        "{rev.title}"
                      </h4>
                    </div>
                    <span className="text-xs text-slate-400 font-semibold">{rev.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {rev.comment}
                  </p>

                  {rev.image && (
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border border-orange-100 mt-2 shadow-2xs">
                      <img src={rev.image} alt="Customer photo" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{rev.author}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500 font-medium">{rev.child}</span>
                      <span className="text-slate-400 hidden sm:inline">•</span>
                      <span className="text-slate-500 font-medium hidden sm:inline">{rev.location}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        ✓ Verified Buyer
                      </span>
                      <button className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-xs font-bold">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Helpful ({rev.helpful})</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. "PARENTS ALSO PURCHASED" RELATED PRODUCTS */}
        <section className="py-6">
          <div className="flex justify-between items-center mb-5">
            <div>
              <span className="text-[11px] font-black uppercase text-[#13805B] tracking-wider">
                Complementary Nutrition
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                Parents Also Purchased
              </h2>
            </div>
            <Link
              to="/shop/all"
              className="text-xs font-black text-[#13805B] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map((p) => {
              const inCart = (cartItems || []).find((c) => c.id === p.id || c.slug === p.slug);
              return (
                <div key={p.id} className="bg-white rounded-3xl p-3.5 sm:p-4 border border-orange-100 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
                  <Link to={`/product/${p.slug}`} className="block h-36 sm:h-44 bg-brand-cream rounded-2xl overflow-hidden p-2 mb-2">
                    <img src={p.image} alt={p.title} className="w-full h-full object-contain hover:scale-105 transition-transform" />
                  </Link>

                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-[#FF2F92] uppercase">{p.subCategory}</span>
                    <Link to={`/product/${p.slug}`} className="text-xs sm:text-sm font-black text-slate-900 block line-clamp-2 hover:text-[#13805B]">
                      {p.title}
                    </Link>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-sm font-black text-slate-900">₹{p.price}</span>
                      <button
                        onClick={() => effectiveAddToCart && effectiveAddToCart(p)}
                        className={`text-[11px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-all ${
                          inCart 
                            ? 'bg-emerald-100 text-[#13805B] border border-emerald-300' 
                            : 'bg-[#13805B] hover:bg-[#0E6346] text-white'
                        }`}
                      >
                        {inCart ? 'IN BAG' : 'ADD'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 10. PRODUCT-SPECIFIC FAQS (INTERACTIVE WITH FEEDBACK) */}
        <section className="py-6 max-w-3xl mx-auto">
          <div className="text-center mb-6 space-y-1.5">
            <span className="text-xs font-black uppercase tracking-widest text-[#13805B]">
              Questions &amp; Answers
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Frequently Asked Questions About This Product
            </h2>
          </div>

          <div className="space-y-3">
            {productFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer ${
                    isOpen ? 'border-[#13805B] shadow-sm' : 'border-orange-100 shadow-2xs hover:border-slate-300'
                  }`}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h4 className={`text-sm flex items-center gap-2.5 ${
                      isOpen ? 'font-black text-slate-900' : 'font-bold text-slate-800'
                    }`}>
                      <HelpCircle className={`w-4 h-4 shrink-0 ${isOpen ? 'text-[#13805B]' : 'text-slate-400'}`} />
                      <span>{faq.q}</span>
                    </h4>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                        isOpen ? 'rotate-180 text-[#13805B]' : ''
                      }`}
                    />
                  </div>
                  {isOpen && (
                    <div className="mt-3 pl-6 border-t border-slate-100 pt-3 space-y-3">
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        {faq.a}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                        <span>Was this answer helpful?</span>
                        <div className="flex items-center gap-2">
                          <button onClick={(e) => { e.stopPropagation(); alert("Thanks for your feedback!"); }} className="flex items-center gap-1 hover:text-[#13805B] font-bold">
                            <ThumbsUp className="w-3 h-3" /> Yes
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); alert("Thanks for your feedback!"); }} className="flex items-center gap-1 hover:text-rose-500 font-bold">
                            <ThumbsDown className="w-3 h-3" /> No
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Ask Pediatric Nutritionist CTA */}
          <div className="mt-6 text-center">
            <button 
              onClick={() => alert("Our certified pediatric nutrition team is available Mon-Sat 9 AM - 7 PM on WhatsApp (+91 98765 43210).")}
              className="inline-flex items-center gap-2 bg-white hover:bg-orange-50 text-slate-800 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full border border-orange-200 shadow-2xs transition-colors"
            >
              <MessageCircleQuestion className="w-4 h-4 text-[#13805B]" />
              <span>Have More Questions? Ask Our Pediatrician</span>
            </button>
          </div>
        </section>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-orange-100 space-y-4 animate-in fade-in">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-black text-slate-900">Share Your Experience</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Rating</label>
                <div className="flex gap-2 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setReviewRating(s)}
                      className="focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 transition-transform hover:scale-110 ${
                          s <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Review Title</label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. My child loves the chocolate taste!"
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#13805B]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Review</label>
                <textarea
                  rows="4"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share how this product helped your child's daily nutrition routine..."
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#13805B]"
                />
              </div>

              <button
                type="button"
                onClick={handleReviewSubmit}
                disabled={reviewSubmitted}
                className="w-full bg-[#13805B] hover:bg-[#0E6346] text-white font-black py-3.5 rounded-full text-xs uppercase tracking-wider shadow-md transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
              >
                {reviewSubmitted ? (
                  <span>Thank You! Review Submitted ✓</span>
                ) : (
                  <span>Submit Review</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
