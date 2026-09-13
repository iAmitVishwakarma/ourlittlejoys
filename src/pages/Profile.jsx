import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useCartStore } from "../stores/cartStore";
import { useWishlistStore } from "../stores/wishlistStore";
import { resetAppSession } from "@/utils/session";
import ProductVisual from "@/components/product/ProductVisual";
import SEO from "@/components/common/SEO";
import ChildCharacterIllustration from "@/components/graphics/ChildCharacterIllustration";
import { HeartDoodle, SunDoodle, MiniStarCluster } from "@/components/graphics/KidsDoodles";
import { OrderCardSkeleton, TableSkeleton } from "@/components/common/Skeleton";
import ProfileDetailsTab from "./profile/tabs/ProfileDetailsTab";
import ChildProfileTab from "./profile/tabs/ChildProfileTab";
import OrdersTab from "./profile/tabs/OrdersTab";
import AddressesTab from "./profile/tabs/AddressesTab";
import WalletTab from "./profile/tabs/WalletTab";
import {
  User,
  Package,
  MapPin,
  Wallet,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  Check,
  CheckCircle2,
  Headphones,
  Phone,
  Mail,
  X,
} from "lucide-react";

export default function Profile({ defaultTab }) {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const login = useAuthStore((s) => s.login);
  const updateChildProfile = useAuthStore((s) => s.updateChildProfile);
  const addToCart = useCartStore((s) => s.addToCart);
  const wishlistItems = useWishlistStore((s) => s.wishlistItems);
  const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist);
  const navigate = useNavigate();

  // Active dashboard tab: 'orders' | 'profile' | 'addresses' | 'wallet' | 'wishlist' | 'settings'
  const [activeTab, setActiveTab] = useState(defaultTab || "orders");
  const [isTabLoading, setIsTabLoading] = useState(false);

  const handleTabSelect = (tabKey) => {
    if (tabKey === activeTab) return;
    setIsTabLoading(true);
    setActiveTab(tabKey);
    setTimeout(() => setIsTabLoading(false), 200);
  };

  useEffect(() => {
    if (defaultTab) {
      handleTabSelect(defaultTab);
    }
  }, [defaultTab]);

  // Order filter state
  const [orderFilter, setOrderFilter] = useState("all"); // 'all' | 'delivered' | 'processing'
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Selected order for detailed modal
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);

  // Toast notification for interactive feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (title, subtext = "") => {
    setToastMessage({ title, subtext });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Login form state for unauthenticated state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Edit child profile state
  const [isEditingChild, setIsEditingChild] = useState(false);
  const [childName, setChildName] = useState(user?.childName || "Shubh");
  const [childAge, setChildAge] = useState(user?.childAge || "7");
  const [nutritionGoal, setNutritionGoal] = useState(
    user?.nutritionGoal || "Growth & Immunity",
  );

  // Mock Orders matching the user's uploaded dashboard screenshot exactly
  const [orders, setOrders] = useState([
    {
      id: "LJ-ORD-9824",
      date: "08 Sep, 2026",
      total: 800,
      discount: 298,
      status: "Delivered",
      statusType: "delivered", // 'delivered' | 'processing' | 'shipped'
      trackingNumber: "DELHIVERY-LJ-88231",
      deliveryDate: "10 Sep, 2026",
      timeline: [
        { label: "Confirmed", date: "08 Sep", completed: true },
        { label: "Packed", date: "09 Sep", completed: true },
        { label: "Shipped", date: "09 Sep", completed: true },
        { label: "Delivered", date: "10 Sep", completed: true },
      ],
      items: [
        {
          id: "item_1",
          slug: "nutrimix-nutrition-powder",
          title: "Nutrimix Chocolate Nutrition Powder (350g)",
          quantity: 1,
          price: 599,
          visualType: "nutrimix",
          flavor: "chocolate",
        },
        {
          id: "item_2",
          slug: "multivitamin-gummies",
          title: "Multivitamin Gummies 4+ (30N)",
          quantity: 1,
          price: 499,
          visualType: "gummies",
          flavor: "strawberry",
        },
      ],
      address: "Flat 402, Sunshine Orchards, Arera Colony, Bhopal - 462016",
    },
    {
      id: "LJ-ORD-9102",
      date: "18 Aug, 2026",
      total: 999,
      discount: 200,
      status: "Delivered",
      statusType: "delivered",
      trackingNumber: "BLUEDART-LJ-77192",
      deliveryDate: "21 Aug, 2026",
      timeline: [
        { label: "Confirmed", date: "18 Aug", completed: true },
        { label: "Packed", date: "20 Aug", completed: true },
        { label: "Shipped", date: "20 Aug", completed: true },
        { label: "Delivered", date: "21 Aug", completed: true },
      ],
      items: [
        {
          id: "item_3",
          slug: "immunity-support-kit",
          title: "Immunity Support Kit (Nutrimix + Gummies)",
          quantity: 1,
          price: 999,
          visualType: "combo",
          flavor: "mixed",
        },
      ],
      address: "Flat 402, Sunshine Orchards, Arera Colony, Bhopal - 462016",
    },
  ]);

  // Saved Delivery Addresses
  const [addresses, setAddresses] = useState([
    {
      id: "addr_1",
      label: "Home",
      isDefault: true,
      recipient: user?.name || "Amit Vishwakarma",
      phone: user?.phone || "7772929755",
      line1: "Flat 402, Sunshine Orchards",
      line2: "Near 10 No. Market, Arera Colony",
      city: "Bhopal",
      state: "Madhya Pradesh",
      pincode: "462016",
    },
  ]);

  // New Address Modal state
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "Home",
    recipient: user?.name || "Amit Vishwakarma",
    phone: user?.phone || "7772929755",
    line1: "",
    line2: "",
    city: "Bhopal",
    state: "Madhya Pradesh",
    pincode: "",
  });

  // Filtered orders list
  const filteredOrders = orders.filter((ord) => {
    if (orderFilter === "delivered") return ord.statusType === "delivered";
    if (orderFilter === "processing") return ord.statusType !== "delivered";
    return true;
  });

  // Handlers
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setLoginError("Please enter a valid 10-digit mobile number");
      return;
    }
    setOtpSent(true);
    setLoginError("");
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      setLoginError("Please enter 4-digit OTP (use 1234)");
      return;
    }
    login({
      name: "Amit Vishwakarma",
      phone: phoneNumber || "7772929755",
      email: "iam.itvishwakarma03@gmail.com",
      childName: "Shubh",
      childAge: "7",
      nutritionGoal: "Growth & Immunity",
      walletBalance: 200,
    });
  };

  const handleQuickDemoLogin = () => {
    login({
      name: "Amit Vishwakarma",
      phone: "7772929755",
      email: "iam.itvishwakarma03@gmail.com",
      childName: "Shubh",
      childAge: "7",
      nutritionGoal: "Growth & Immunity",
      walletBalance: 200,
    });
  };

  const handleSaveChildProfile = (e) => {
    e.preventDefault();
    updateChildProfile?.({ childName, childAge, nutritionGoal });
    setIsEditingChild(false);
    showToast("Child profile updated!", `${childName}'s nutrition roadmap refreshed.`);
  };

  // Interactive "Buy Again" action at product level
  const handleBuyAgain = (item) => {
    addToCart({
      id: item.slug || item.id,
      title: item.title,
      price: item.price,
      quantity: 1,
      visualType: item.visualType,
      flavor: item.flavor,
    });
    showToast(`${item.title} added to your bag! 🛍️`, "Item is ready in your cart for fast checkout.");
  };

  // Reorder entire order
  const handleReorderWholeOrder = (order) => {
    order.items.forEach((item) => {
      addToCart({
        id: item.slug || item.id,
        title: item.title,
        price: item.price,
        quantity: 1,
        visualType: item.visualType,
        flavor: item.flavor,
      });
    });
    showToast(`Order #${order.id} items added to bag!`, "Ready to reorder your favourites.");
    navigate("/cart");
  };

  // Safe user presentation values
  const currentUserName = user?.name || "Amit Vishwakarma";
  const currentUserPhone = user?.phone || "7772929755";
  const currentUserEmail = user?.email || "iam.itvishwakarma03@gmail.com";
  const currentChildName = user?.childName || childName || "Shubh";
  const currentChildAge = user?.childAge || childAge || "7";
  const currentWalletBalance = user?.walletBalance !== undefined ? user.walletBalance : 200;
  const initialLetter = currentUserName.charAt(0).toUpperCase();

  // If NOT logged in, show sleek login view with 1-click Demo Login
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-[#FFF9F5]">
        <SEO
          title="Parent Account Login | Little Joys"
          description="Sign in to your Little Joys account to track orders, manage your child's nutrition profile, and view your LJ Wallet."
        />
        <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-orange-100 p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div
              className="w-16 h-16 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center mx-auto text-3xl shadow-xs"
              aria-hidden="true"
            >
              🧸
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              Parent Account Login
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Sign in with your mobile number to view orders, track delivery,
              and use your LJ Wallet balance.
            </p>
          </div>

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label
                  htmlFor="profile-phone-input"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Mobile Number
                </label>
                <div className="flex items-center border border-slate-200 rounded-2xl overflow-hidden focus-within:border-pink-500 bg-slate-50 transition-colors">
                  <span className="px-3.5 text-xs font-bold text-slate-500 border-r border-slate-200">
                    +91
                  </span>
                  <input
                    id="profile-phone-input"
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Enter 10-digit number"
                    className="w-full px-3 py-3 text-sm font-bold bg-transparent focus:outline-none"
                    required
                  />
                </div>
              </div>

              {loginError && (
                <p className="text-xs font-bold text-rose-500">{loginError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-[#FF2F92] hover:bg-pink-600 text-white font-black py-3.5 rounded-2xl shadow-sm transition-all active:scale-98 min-h-[44px]"
              >
                Send OTP
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Or Instant Review
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full bg-emerald-50 hover:bg-emerald-100 text-[#13805B] border border-emerald-200 font-extrabold py-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>⚡ Quick Login as Amit Vishwakarma</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="bg-pink-50/70 border border-pink-100 rounded-2xl p-3 text-xs text-pink-700 flex justify-between items-center">
                <span>OTP sent to +91 {phoneNumber}</span>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="font-bold underline text-pink-600"
                >
                  Edit
                </button>
              </div>

              <div>
                <label
                  htmlFor="profile-otp-input"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Enter 4-Digit OTP
                </label>
                <input
                  id="profile-otp-input"
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 1234"
                  className="w-full text-center tracking-widest text-lg font-black py-3 border border-slate-200 rounded-2xl focus:outline-none focus:border-pink-500 bg-slate-50"
                  required
                />
              </div>

              {loginError && (
                <p className="text-xs font-bold text-rose-500">{loginError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-[#FF2F92] hover:bg-pink-600 text-white font-black py-3.5 rounded-2xl shadow-sm transition-all active:scale-98 min-h-[44px]"
              >
                Verify &amp; Login
              </button>
            </form>
          )}

          <div className="bg-amber-50/80 rounded-2xl p-3.5 border border-amber-200/60 text-center">
            <p className="text-[11px] font-bold text-amber-900">
              🎁 Instant ₹200 welcome wallet cash credited to all verified parent accounts!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F5] pb-24 pt-3 md:pt-5 font-sans selection:bg-pink-100 selection:text-pink-600">
      <SEO
        title="Parent Account & Orders | Little Joys"
        description="Manage your Little Joys orders, child nutrition profile, saved delivery addresses, and LJ Wallet."
      />

      {/* Floating Animated Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce max-w-md bg-white border border-pink-200 shadow-xl rounded-2xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 pr-2">
            <p className="text-xs font-black text-slate-900">{toastMessage.title}</p>
            {toastMessage.subtext && (
              <p className="text-[11px] text-slate-500 mt-0.5">{toastMessage.subtext}</p>
            )}
          </div>
          <Link
            to="/cart"
            className="text-[11px] font-extrabold text-[#FF2F92] hover:underline shrink-0 bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-100"
          >
            View Cart &rarr;
          </Link>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-slate-600 ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 max-w-6xl space-y-6">
        
        {/* =========================================================================
            1. TOP PROFILE WELCOME BANNER (With Child Illustration & Wallet Card)
           ========================================================================= */}
        <section 
          className="relative bg-gradient-to-r from-[#FFF4EE] via-[#FFF9F5] to-[#FFF6E9] rounded-3xl p-6 sm:p-7 md:p-8 border border-orange-100/90 shadow-xs overflow-hidden"
          aria-label="Parent welcome banner"
        >
          {/* Subtle Ambient Decorative Doodles */}
          <div className="absolute top-2 left-4 text-orange-200/50 pointer-events-none">
            <SunDoodle className="w-8 h-8" />
          </div>
          <div className="absolute bottom-2 right-1/3 text-emerald-200/40 pointer-events-none hidden md:block">
            <MiniStarCluster className="text-emerald-400" />
          </div>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 relative z-10">
            
            {/* Left Parent & Child Info + Illustration */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1 min-w-0">
              {/* Initial Avatar */}
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#FF2F92] via-pink-500 to-rose-400 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-md shadow-pink-500/20 border-3 border-white shrink-0"
                aria-label="Parent avatar"
              >
                {initialLetter}
              </div>

              {/* Identity & Child Meta */}
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs sm:text-sm font-bold text-slate-500">Hello,</span>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">
                    {currentUserName}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Verified Parent</span>
                  </span>
                </div>

                {/* Contact Coordinates */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    {currentUserPhone}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 truncate">
                    <Mail className="w-3 h-3 text-slate-400" />
                    {currentUserEmail}
                  </span>
                </div>

                {/* Child Persona & Brand Warmth */}
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-700 bg-pink-50/90 px-3 py-1 rounded-full border border-pink-100">
                    <span>👦</span>
                    <span>Parent of {currentChildName} ({currentChildAge} Years Old)</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs font-extrabold text-slate-600">
                    <span>Healthy kids, Happier Tomorrows</span>
                    <HeartDoodle className="w-3.5 h-3.5 text-rose-500 inline-block" />
                  </span>
                </div>
              </div>

              {/* Vector Child Character Illustration */}
              <div className="hidden md:flex items-center justify-center shrink-0 pr-2">
                <ChildCharacterIllustration className="w-24 h-24 lg:w-28 lg:h-28 drop-shadow-xs" />
              </div>
            </div>

            {/* Right Side: LJ Wallet Balance Card */}
            <div className="w-full lg:w-72 bg-[#FFFBEB] border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs shrink-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100/80 border border-amber-200 flex items-center justify-center text-amber-700 text-lg shrink-0">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold text-amber-900 uppercase tracking-wider block">
                    LJ Wallet Balance
                  </span>
                  <span className="text-2xl font-black text-slate-900 tracking-tight">
                    ₹{currentWalletBalance}
                  </span>
                </div>
              </div>

              <Link
                to="/wallet-recharge"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs py-2.5 px-4 rounded-xl shadow-xs transition-transform active:scale-98 flex items-center justify-center gap-1.5"
              >
                <span>Recharge &amp; Get 30% Extra</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </section>

        {/* =========================================================================
            2. QUICK STATS OVERVIEW (Orders, Wishlist, Wallet Balance)
           ========================================================================= */}
        <section className="grid grid-cols-3 gap-3 sm:gap-4" aria-label="Account quick stats">
          {/* Stat 1: Orders */}
          <button
            onClick={() => setActiveTab("orders")}
            className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all ${
              activeTab === "orders"
                ? "bg-white border-pink-300 shadow-xs ring-2 ring-pink-100"
                : "bg-white border-slate-200/70 hover:border-slate-300 shadow-2xs"
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 border border-pink-100">
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-black text-slate-900 block truncate">
                  {orders.length} Orders
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 font-medium block truncate">
                  Track &amp; manage
                </span>
              </div>
            </div>
          </button>

          {/* Stat 2: Wishlist */}
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all ${
              activeTab === "wishlist"
                ? "bg-white border-pink-300 shadow-xs ring-2 ring-pink-100"
                : "bg-white border-slate-200/70 hover:border-slate-300 shadow-2xs"
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 border border-rose-100">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-black text-slate-900 block truncate">
                  {wishlistItems.length || 4} Wishlist
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 font-medium block truncate">
                  Saved favorites
                </span>
              </div>
            </div>
          </button>

          {/* Stat 3: Wallet */}
          <button
            onClick={() => setActiveTab("wallet")}
            className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all ${
              activeTab === "wallet"
                ? "bg-white border-amber-300 shadow-xs ring-2 ring-amber-100"
                : "bg-white border-slate-200/70 hover:border-slate-300 shadow-2xs"
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
                <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-black text-slate-900 block truncate">
                  ₹{currentWalletBalance} Wallet
                </span>
                <span className="text-[10px] sm:text-xs text-emerald-600 font-bold block truncate">
                  Instant 30% saving
                </span>
              </div>
            </div>
          </button>
        </section>

        {/* =========================================================================
            3. MAIN DASHBOARD GRID (3-Column Layout on Desktop)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* =======================================================================
              COLUMN 1: ACCOUNT NAVIGATION SIDEBAR (3 Cols)
             ======================================================================= */}
          <aside className="lg:col-span-3 space-y-3">
            <div 
              className="bg-white rounded-3xl p-3.5 border border-orange-100/90 shadow-2xs space-y-1"
              role="tablist"
              aria-label="Account navigation menu"
            >
              <div className="px-3 pt-2 pb-1.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                  Account Navigation
                </span>
              </div>

              {/* 1. My Orders */}
              <button
                role="tab"
                aria-selected={activeTab === "orders"}
                onClick={() => handleTabSelect("orders")}
                className={`w-full flex items-center justify-between p-3 rounded-2xl font-bold text-xs md:text-sm transition-all min-h-[44px] ${
                  activeTab === "orders"
                    ? "bg-[#FF2F92] text-white shadow-xs shadow-pink-500/25"
                    : "text-slate-700 hover:bg-orange-50/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package className={`w-4 h-4 ${activeTab === "orders" ? "text-white" : "text-slate-500"}`} />
                  <span>My Orders</span>
                </div>
                <span
                  className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                    activeTab === "orders" ? "bg-white/20 text-white" : "bg-pink-100 text-pink-700"
                  }`}
                >
                  {orders.length}
                </span>
              </button>

              {/* 2. Personal & Child Profile */}
              <button
                role="tab"
                aria-selected={activeTab === "profile"}
                onClick={() => handleTabSelect("profile")}
                className={`w-full flex items-center justify-between p-3 rounded-2xl font-bold text-xs md:text-sm transition-all min-h-[44px] ${
                  activeTab === "profile"
                    ? "bg-[#FF2F92] text-white shadow-xs shadow-pink-500/25"
                    : "text-slate-700 hover:bg-orange-50/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className={`w-4 h-4 ${activeTab === "profile" ? "text-white" : "text-slate-500"}`} />
                  <span className="truncate">Personal &amp; Child Profile</span>
                </div>
                <ChevronRight className={`w-4 h-4 ${activeTab === "profile" ? "text-white" : "text-slate-300"}`} />
              </button>

              {/* 3. Saved Delivery Addresses */}
              <button
                role="tab"
                aria-selected={activeTab === "addresses"}
                onClick={() => handleTabSelect("addresses")}
                className={`w-full flex items-center justify-between p-3 rounded-2xl font-bold text-xs md:text-sm transition-all min-h-[44px] ${
                  activeTab === "addresses"
                    ? "bg-[#FF2F92] text-white shadow-xs shadow-pink-500/25"
                    : "text-slate-700 hover:bg-orange-50/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className={`w-4 h-4 ${activeTab === "addresses" ? "text-white" : "text-slate-500"}`} />
                  <span className="truncate">Saved Delivery Addresses</span>
                </div>
                <ChevronRight className={`w-4 h-4 ${activeTab === "addresses" ? "text-white" : "text-slate-300"}`} />
              </button>

              {/* 4. LJ Wallet Ledger */}
              <button
                role="tab"
                aria-selected={activeTab === "wallet"}
                onClick={() => handleTabSelect("wallet")}
                className={`w-full flex items-center justify-between p-3 rounded-2xl font-bold text-xs md:text-sm transition-all min-h-[44px] ${
                  activeTab === "wallet"
                    ? "bg-[#FF2F92] text-white shadow-xs shadow-pink-500/25"
                    : "text-slate-700 hover:bg-orange-50/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Wallet className={`w-4 h-4 ${activeTab === "wallet" ? "text-white" : "text-slate-500"}`} />
                  <span>LJ Wallet Ledger</span>
                </div>
                <span
                  className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                    activeTab === "wallet" ? "bg-white/20 text-white" : "bg-amber-100 text-amber-800"
                  }`}
                >
                  ₹{currentWalletBalance}
                </span>
              </button>

              {/* 5. My Wishlist */}
              <button
                role="tab"
                aria-selected={activeTab === "wishlist"}
                onClick={() => handleTabSelect("wishlist")}
                className={`w-full flex items-center justify-between p-3 rounded-2xl font-bold text-xs md:text-sm transition-all min-h-[44px] ${
                  activeTab === "wishlist"
                    ? "bg-[#FF2F92] text-white shadow-xs shadow-pink-500/25"
                    : "text-slate-700 hover:bg-orange-50/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Heart className={`w-4 h-4 ${activeTab === "wishlist" ? "text-white" : "text-slate-500"}`} />
                  <span>My Wishlist</span>
                </div>
                <span
                  className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                    activeTab === "wishlist" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {wishlistItems.length}
                </span>
              </button>

              {/* 6. Account Settings */}
              <button
                role="tab"
                aria-selected={activeTab === "settings"}
                onClick={() => handleTabSelect("settings")}
                className={`w-full flex items-center justify-between p-3 rounded-2xl font-bold text-xs md:text-sm transition-all min-h-[44px] ${
                  activeTab === "settings"
                    ? "bg-[#FF2F92] text-white shadow-xs shadow-pink-500/25"
                    : "text-slate-700 hover:bg-orange-50/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Settings className={`w-4 h-4 ${activeTab === "settings" ? "text-white" : "text-slate-500"}`} />
                  <span>Account Settings</span>
                </div>
                <ChevronRight className={`w-4 h-4 ${activeTab === "settings" ? "text-white" : "text-slate-300"}`} />
              </button>

              {/* Separator & Logout */}
              <div className="pt-2 border-t border-slate-100 mt-1">
                <button
                  onClick={() => {
                    resetAppSession();
                    navigate("/");
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl font-extrabold text-xs md:text-sm text-rose-600 hover:bg-rose-50/80 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </aside>

          {/* =======================================================================
              COLUMN 2: CENTER MAIN CONTENT (6 Cols)
             ======================================================================= */}
          <main className="lg:col-span-6 space-y-6">
            {isTabLoading ? (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-3">
                  <div className="w-36 h-6 skeleton-shimmer rounded-md" />
                  <div className="w-64 h-4 skeleton-shimmer rounded-md" />
                </div>
                <OrderCardSkeleton />
                <OrderCardSkeleton />
              </div>
            ) : (
              <>
                {/* ---------------------------------------------------------------------
                    TAB 1: MY ORDERS (Extracted Tab Component)
                   --------------------------------------------------------------------- */}
                {activeTab === "orders" && (
                  <OrdersTab
                    filteredOrders={filteredOrders}
                    orderFilter={orderFilter}
                    setOrderFilter={setOrderFilter}
                    isFilterOpen={isFilterOpen}
                    setIsFilterOpen={setIsFilterOpen}
                    onSelectOrder={setSelectedOrderDetail}
                    onBuyAgain={handleBuyAgain}
                  />
                )}

                {/* ---------------------------------------------------------------------
                    TAB 2: PERSONAL & CHILD PROFILE (Extracted Tab Components)
                   --------------------------------------------------------------------- */}
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    <ChildProfileTab
                      childName={currentChildName}
                      childAge={currentChildAge}
                      nutritionGoal={nutritionGoal}
                      isEditingChild={isEditingChild}
                      setIsEditingChild={setIsEditingChild}
                      editName={childName}
                      setEditName={setChildName}
                      editAge={childAge}
                      setEditAge={setChildAge}
                      editGoal={nutritionGoal}
                      setEditGoal={setNutritionGoal}
                      onSaveChildProfile={handleSaveChildProfile}
                    />
                    <ProfileDetailsTab
                      userName={currentUserName}
                      userPhone={currentUserPhone}
                      userEmail={currentUserEmail}
                      childName={currentChildName}
                    />
                  </div>
                )}

                {/* ---------------------------------------------------------------------
                    TAB 3: SAVED DELIVERY ADDRESSES (Extracted Tab Component)
                   --------------------------------------------------------------------- */}
                {activeTab === "addresses" && (
                  <AddressesTab
                    addresses={addresses}
                    isAddingAddress={isAddingAddress}
                    setIsAddingAddress={setIsAddingAddress}
                    newAddress={newAddress}
                    setNewAddress={setNewAddress}
                    onSaveAddress={() => {
                      if (newAddress.line1 && newAddress.pincode) {
                        setAddresses([
                          ...addresses,
                          { ...newAddress, id: `addr_${Date.now()}`, isDefault: false },
                        ]);
                        setIsAddingAddress(false);
                        showToast("New address saved!");
                      }
                    }}
                    showToast={showToast}
                  />
                )}

                {/* ---------------------------------------------------------------------
                    TAB 4: LJ WALLET LEDGER (Extracted Tab Component)
                   --------------------------------------------------------------------- */}
                {activeTab === "wallet" && (
                  <WalletTab walletBalance={currentWalletBalance} />
                )}

            {/* ---------------------------------------------------------------------
                TAB 5: MY WISHLIST
               --------------------------------------------------------------------- */}
            {activeTab === "wishlist" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900">
                    Saved Wishlist ({wishlistItems.length})
                  </h2>
                  <Link
                    to="/shop/all"
                    className="text-xs font-bold text-pink-600 hover:underline"
                  >
                    Browse Catalog &rarr;
                  </Link>
                </div>

                {wishlistItems.length === 0 ? (
                  <div className="bg-white rounded-3xl p-10 text-center border border-orange-100 space-y-3 shadow-2xs">
                    <div className="text-3xl">♡</div>
                    <h3 className="text-base font-black text-slate-800">Your wishlist is waiting</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Save products you love for later. Tap the heart on any product to bookmark it.
                    </p>
                    <Link
                      to="/shop/all"
                      className="inline-block bg-[#FF2F92] text-white text-xs font-black px-5 py-2.5 rounded-full shadow-xs hover:bg-pink-600 transition-all"
                    >
                      Explore Products &rarr;
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistItems.map((item) => (
                      <div
                        key={item.id || item.slug}
                        className="bg-white rounded-3xl p-4 shadow-2xs border border-orange-100 flex gap-4 items-center"
                      >
                        <div className="w-16 h-16 bg-orange-50 rounded-2xl p-1.5 flex items-center justify-center shrink-0">
                          <ProductVisual
                            visualType={item.visualType}
                            flavor={item.flavor}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-slate-800 truncate">
                            {item.title || item.name}
                          </p>
                          <p className="text-xs font-bold text-slate-900 mt-0.5">
                            ₹{item.price}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => {
                                addToCart({ ...item, quantity: 1 });
                                removeFromWishlist(item.id || item.slug);
                                showToast(`${item.title || item.name} moved to bag!`);
                              }}
                              className="text-[11px] font-bold bg-[#FF2F92] hover:bg-pink-600 text-white px-3 py-1 rounded-lg transition-colors"
                            >
                              Move to Bag
                            </button>
                            <button
                              onClick={() => removeFromWishlist(item.id || item.slug)}
                              className="text-[11px] text-slate-400 hover:text-rose-500 font-semibold"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ---------------------------------------------------------------------
                TAB 6: ACCOUNT SETTINGS
               --------------------------------------------------------------------- */}
            {activeTab === "settings" && (
              <ProfileDetailsTab
                userName={currentUserName}
                userPhone={currentUserPhone}
                userEmail={currentUserEmail}
                childName={currentChildName}
              />
            )}
              </>
            )}

          </main>

          {/* =======================================================================
              COLUMN 3: RIGHT UTILITY & REORDER SIDEBAR (3 Cols on Desktop)
             ======================================================================= */}
          <aside className="lg:col-span-3 space-y-5">
            
            {/* Card 1: Reorder in One Click Card */}
            <div className="bg-white rounded-3xl p-5 border border-orange-100/90 shadow-2xs space-y-4 overflow-hidden relative">
              {/* Adorable Kid Drinking Milk Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-orange-50">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
                  alt="Happy child drinking healthy milk"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                
                {/* Floating handwritten brand doodle badge */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white text-[11px] font-black drop-shadow-xs flex items-center gap-1">
                  <span>Good Nutrition Brighter Tomorrows</span>
                  <HeartDoodle className="w-3 h-3 text-rose-400 inline-block" />
                </div>
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-sm font-black text-slate-900">
                  Loved your products?
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Reorder in one click
                </p>
              </div>

              <button
                onClick={() => {
                  if (orders.length > 0) {
                    handleReorderWholeOrder(orders[0]);
                  } else {
                    navigate("/shop/all");
                  }
                }}
                className="w-full bg-[#FF2F92] hover:bg-pink-600 text-white font-black text-xs py-2.5 px-4 rounded-full shadow-xs transition-all active:scale-98 flex items-center justify-center gap-1.5"
              >
                <span>Shop Again</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: Need Help? Support Card */}
            <div className="bg-[#FAF8F5] rounded-3xl p-5 border border-orange-100/80 shadow-2xs space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900">Need Help?</h3>
                  <p className="text-[11px] text-slate-500">We're here for you.</p>
                </div>
              </div>

              <div className="space-y-1 text-xs font-bold text-slate-700 pt-1">
                <Link
                  to="/honest-report"
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-white transition-colors"
                >
                  <span>Track Order</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/faq"
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-white transition-colors"
                >
                  <span>Returns &amp; Refunds</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-white transition-colors"
                >
                  <span>Contact Support</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Card 3: Give the Gift of Health (Referral Card) */}
            <div className="bg-[#FFF5F7] rounded-3xl p-5 border border-pink-200/70 shadow-2xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white text-2xl flex items-center justify-center border border-pink-100 shrink-0 shadow-2xs">
                  🎁
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">
                    Give the gift of health
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Share Little Joys with friends &amp; family.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText("https://littlejoys.in?ref=AMIT200");
                  showToast("Referral link copied! 📋", "Share with fellow parents to give ₹200 & get ₹200.");
                }}
                className="text-xs font-black text-[#FF2F92] hover:underline flex items-center gap-1 pt-1"
              >
                <span>Refer Now &rarr;</span>
              </button>
            </div>

          </aside>

        </div>

      </div>

      {/* =========================================================================
          ORDER DETAILS MODAL (When clicking "View Details")
         ========================================================================= */}
      {selectedOrderDetail && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-orange-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {selectedOrderDetail.status}
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1">
                  Order #{selectedOrderDetail.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderDetail(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-bold block">Delivery Tracking</span>
                <p className="text-slate-800 font-black">
                  Carrier: {selectedOrderDetail.trackingNumber}
                </p>
                <p className="text-slate-500 text-[11px]">
                  Delivered on {selectedOrderDetail.deliveryDate}
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-black text-slate-800 block">Items Purchased</span>
                {selectedOrderDetail.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-orange-50/50">
                    <span className="font-bold text-slate-800 truncate max-w-[240px]">
                      {item.title} (x{item.quantity})
                    </span>
                    <span className="font-black text-slate-900">₹{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>₹{selectedOrderDetail.total + selectedOrderDetail.discount}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>LJ Wallet Discount</span>
                  <span>- ₹{selectedOrderDetail.discount}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-black text-sm pt-1 border-t border-slate-100">
                  <span>Total Paid</span>
                  <span>₹{selectedOrderDetail.total}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  handleReorderWholeOrder(selectedOrderDetail);
                  setSelectedOrderDetail(null);
                }}
                className="flex-1 bg-[#FF2F92] hover:bg-pink-600 text-white font-black text-xs py-2.5 rounded-xl shadow-xs transition-colors"
              >
                Reorder All Items
              </button>
              <button
                onClick={() => setSelectedOrderDetail(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
