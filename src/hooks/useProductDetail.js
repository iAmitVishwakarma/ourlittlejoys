import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ALL_PRODUCTS } from '@/data/products';
import { productService } from '@/services/productService';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useAuthStore } from '@/stores/authStore';
import { sanitizeInput } from '@/utils';

export function useProductDetail({ onAddToCart, cartItems: _cartItems = [] } = {}) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const ctxAddToCart = useCartStore((s) => s.addToCart);
  const wishlistItems = useWishlistStore((s) => s.wishlistItems);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

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

  const packVariants = [
    {
      label: product.weight || '350g',
      desc: 'Single Pack (1 Month)',
      price: product.price,
      mrp: product.originalPrice || Math.round(product.price * 1.15),
      badge: null,
      perDay: '₹19 / day',
    },
    {
      label: 'Pack of 2 (Value Saver)',
      desc: '2-Month Supply (700g)',
      price: Math.round(product.price * 1.8),
      mrp: Math.round((product.originalPrice || product.price * 1.15) * 2),
      badge: 'SAVE EXTRA 15%',
      perDay: '₹16 / day',
    },
    {
      label: 'Family Trio Pack (3x)',
      desc: '3-Month Supply (1050g)',
      price: Math.round(product.price * 2.5),
      mrp: Math.round((product.originalPrice || product.price * 1.15) * 3),
      badge: 'SAVE EXTRA 25%',
      perDay: '₹14 / day',
    },
  ];

  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const currentPack = packVariants[selectedPackIndex];

  const discount = currentPack.mrp
    ? Math.round(((currentPack.mrp - currentPack.price) / currentPack.mrp) * 100)
    : 0;

  const [quantity, setQuantity] = useState(1);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  const [pincode, setPincode] = useState('462016');
  const [pincodeStatus, setPincodeStatus] = useState({
    checked: true,
    deliveryDate: 'Thursday, 17 Sep',
    isFree: true,
  });

  const [includeBundleItem2, setIncludeBundleItem2] = useState(true);
  const [bundleAdded, setBundleAdded] = useState(false);

  const [scienceTab, setScienceTab] = useState('vitamins');
  const [openScienceAccordion, setOpenScienceAccordion] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [activeReviewFilter, setActiveReviewFilter] = useState('All');

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80',
  ];

  const bundleComplement =
    catalogList.find(
      (p) =>
        String(p.id) !== String(product.id) &&
        (p.category === 'Gummies' || p.category === 'Nutrimix')
    ) || ALL_PRODUCTS[1];

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

  const effectiveAddToCart = onAddToCart || ctxAddToCart;

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
        quantity,
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
        quantity,
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
        quantity: 1,
      });
      if (includeBundleItem2) {
        effectiveAddToCart({
          ...bundleComplement,
          quantity: 1,
        });
      }
    }
    setTimeout(() => setBundleAdded(false), 1400);
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeStatus({ checked: true, deliveryDate: 'Thursday, 17 Sep', isFree: true });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.title,
          text: `Check out ${product.title} on Nestor!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  };

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

  const relatedProducts = catalogList
    .filter((p) => String(p.id) !== String(product.id))
    .slice(0, 4);

  const productReviews = [
    {
      id: 'rev-1',
      author: 'Ritu Verma',
      location: 'Bhopal, MP',
      child: 'Mother of 4-year-old Kabir',
      rating: 5,
      date: '2 days ago',
      verified: true,
      title: 'Morning milk tantrums are completely gone!',
      comment:
        'My 4-year-old Kabir would run away from regular milk every single morning. Nutrimix chocolate smells like real roasted cocoa and he finishes his tumbler in 2 minutes flat! Knowing it has sprouted ragi, oats, and zero refined white sugar gives me total peace of mind.',
      helpful: 34,
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'rev-2',
      author: 'Dr. Sameer Joshi',
      location: 'Mumbai, MH',
      child: 'Father of 5-year-old Ananya',
      rating: 5,
      date: '1 week ago',
      verified: true,
      title: 'Clean formulation with zero heavy metals',
      comment:
        'Being a pediatrician myself, I inspect lab reports religiously before giving anything to my daughter. No heavy metals, pectin-based, zero white sugar, and no synthetic dyes. Ananya reminds me every single morning for her healthy routine!',
      helpful: 52,
    },
    {
      id: 'rev-3',
      author: 'Kavita Deshmukh',
      location: 'Pune, MH',
      child: 'Mother of 4 & 7 yr old',
      rating: 5,
      date: '3 weeks ago',
      verified: true,
      title: 'Noticeable boost in immunity & school stamina',
      comment:
        'Both my kids have been having this daily for over 3 months now. They stay energized throughout school hours and handle changing seasons without frequent coughs. Truly grateful for clean Indian nutrition without any white sugar.',
      helpful: 28,
      image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=300&q=80',
    },
  ];

  const productFaqs = [
    {
      q: `What age group is ${product.title} recommended for?`,
      a: `Carefully formulated for kids aged ${product.age || '2 to 6 years'} and pre-teens. The vitamin, mineral, calcium, and plant protein dosages strictly adhere to the Indian Council of Medical Research (ICMR) Recommended Dietary Allowances.`,
    },
    {
      q: 'Can this be mixed in cold milk as well as warm milk?',
      a: 'Yes! Nutrimix dissolves smoothly in both warm and chilled milk. You can also blend it into fruit smoothies, stir it into morning pancake batter, or mix it with oatmeal for a delicious chocolate breakfast bowl.',
    },
    {
      q: 'Is there any refined white sugar, maltodextrin, or preservatives?',
      a: 'Zero refined white sugar, zero maltodextrin, and zero artificial preservatives. We sweeten exclusively with organic Dhampur jaggery and real cocoa, delivering a rich natural taste without the sugar crash.',
    },
    {
      q: "How does sprouted ragi help my child's digestion?",
      a: 'Sprouting unlocks the bioavailability of grain nutrients, breaking down complex starches into easily digestible components. It increases natural calcium and iron absorption by up to 300% and prevents tummy heaviness.',
    },
    {
      q: 'How can I verify the NABL lab test report for this batch?',
      a: "Radical transparency is our core promise. Every batch is tested by third-party NABL-accredited labs for heavy metals (Lead, Mercury, Arsenic, Cadmium). You can download the certified lab report anytime under our 'Honest Reports' section.",
    },
  ];

  return {
    slug,
    product,
    isLoading,
    packVariants,
    selectedPackIndex,
    setSelectedPackIndex,
    currentPack,
    discount,
    quantity,
    setQuantity,
    selectedThumbnail,
    setSelectedThumbnail,
    galleryImages,
    isFavorite,
    handleToggleWishlist,
    showStickyBar,
    showShareToast,
    handleShare,
    pincode,
    setPincode,
    pincodeStatus,
    handleCheckPincode,
    bundleComplement,
    includeBundleItem2,
    setIncludeBundleItem2,
    bundleAdded,
    handleAddBundle,
    addedAnimation,
    handleAdd,
    handleBuyNow,
    scienceTab,
    setScienceTab,
    openScienceAccordion,
    setOpenScienceAccordion,
    openFaq,
    setOpenFaq,
    showReviewModal,
    setShowReviewModal,
    reviewRating,
    setReviewRating,
    reviewTitle,
    setReviewTitle,
    reviewComment,
    setReviewComment,
    reviewSubmitted,
    handleReviewSubmit,
    activeReviewFilter,
    setActiveReviewFilter,
    productReviews,
    productFaqs,
    relatedProducts,
    effectiveAddToCart,
  };
}

export default useProductDetail;
