import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductVisual from '../components/ProductVisual';
import { 
  User, 
  Package, 
  MapPin, 
  Wallet, 
  Heart, 
  LogOut, 
  ChevronRight, 
  Truck, 
  Edit2,
  Plus
} from 'lucide-react';

export default function Profile() {
  const { user, isAuthenticated, login, logout, updateChildProfile } = useAuth();
  const { addToCart } = useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'profile' | 'addresses' | 'wallet' | 'wishlist'
  
  // Login form state for unauthenticated state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Edit child profile state
  const [isEditingChild, setIsEditingChild] = useState(false);
  const [childName, setChildName] = useState(user?.childName || 'Kabir');
  const [childAge, setChildAge] = useState(user?.childAge || '4');
  const [nutritionGoal, setNutritionGoal] = useState(user?.nutritionGoal || 'Immunity & Daily Growth');

  // Mock Orders list matching schema
  const orders = [
    {
      id: 'LJ-ORD-9824',
      date: '08 Sep, 2026',
      total: 800,
      discount: 298,
      status: 'Delivered',
      trackingNumber: 'DELHIVERY-LJ-88231',
      deliveryDate: '10 Sep, 2026',
      timelineStep: 4, // 1: Confirmed, 2: Packed, 3: Shipped, 4: Delivered
      items: [
        {
          title: 'Nutrimix Chocolate Nutrition Powder (350g)',
          quantity: 1,
          price: 599,
          visualType: 'nutrimix',
          flavor: 'chocolate'
        },
        {
          title: 'Multivitamin Gummies 4+ (30N)',
          quantity: 1,
          price: 499,
          visualType: 'gummies',
          flavor: 'strawberry'
        }
      ],
      address: 'Flat 402, Sunshine Orchards, Arera Colony, Bhopal - 462016'
    },
    {
      id: 'LJ-ORD-9102',
      date: '18 Aug, 2026',
      total: 999,
      discount: 200,
      status: 'Delivered',
      trackingNumber: 'BLUEDART-LJ-77192',
      deliveryDate: '21 Aug, 2026',
      timelineStep: 4,
      items: [
        {
          title: 'Immunity Support Kit (Nutrimix + Gummies)',
          quantity: 1,
          price: 999,
          visualType: 'combo',
          flavor: 'mixed'
        }
      ],
      address: 'Flat 402, Sunshine Orchards, Arera Colony, Bhopal - 462016'
    }
  ];

  // Mock addresses list
  const [addresses, setAddresses] = useState([
    {
      id: 'addr_1',
      label: 'Home',
      isDefault: true,
      recipient: user?.name || 'Pooja Sharma',
      phone: user?.phone || '+91 98765 43210',
      line1: 'Flat 402, Sunshine Orchards',
      line2: 'Near 10 No. Market, Arera Colony',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462016'
    }
  ]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setLoginError('Please enter a valid 10-digit mobile number');
      return;
    }
    setOtpSent(true);
    setLoginError('');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      setLoginError('Please enter 4-digit OTP (use 1234)');
      return;
    }
    login({
      name: 'Pooja Sharma',
      phone: phoneNumber,
      email: 'pooja.sharma@example.com',
      childName: 'Kabir',
      childAge: '4',
      walletBalance: 450
    });
  };

  const handleSaveChildProfile = (e) => {
    e.preventDefault();
    updateChildProfile?.({ childName, childAge, nutritionGoal });
    setIsEditingChild(false);
  };

  // If NOT logged in, show sleek login view
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#FFF9F5]">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-md border border-orange-100 p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center mx-auto text-3xl shadow-sm">
              🧸
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Parent Account Login</h1>
            <p className="text-xs text-slate-500">
              Sign in with your mobile number to view orders, track delivery, and use your LJ Wallet balance.
            </p>
          </div>

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Mobile Number</label>
                <div className="flex items-center border border-slate-200 rounded-2xl overflow-hidden focus-within:border-pink-500 bg-slate-50">
                  <span className="px-3 text-xs font-bold text-slate-500 border-r border-slate-200">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit number"
                    className="w-full px-3 py-3 text-sm font-bold bg-transparent focus:outline-none"
                    required
                  />
                </div>
              </div>

              {loginError && <p className="text-xs font-bold text-rose-500">{loginError}</p>}

              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-black py-3.5 rounded-2xl shadow-md shadow-pink-500/25 transition-all active:scale-98"
              >
                Send OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="bg-pink-50/60 border border-pink-100 rounded-2xl p-3 text-xs text-pink-700 flex justify-between items-center">
                <span>OTP sent to +91 {phoneNumber}</span>
                <button type="button" onClick={() => setOtpSent(false)} className="font-bold underline">Edit</button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Enter 4-Digit OTP</label>
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 1234"
                  className="w-full text-center tracking-widest text-lg font-black py-3 border border-slate-200 rounded-2xl focus:outline-none focus:border-pink-500 bg-slate-50"
                  required
                />
              </div>

              {loginError && <p className="text-xs font-bold text-rose-500">{loginError}</p>}

              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-black py-3.5 rounded-2xl shadow-md shadow-pink-500/25 transition-all active:scale-98"
              >
                Verify & Login
              </button>
            </form>
          )}

          <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200/60 text-center">
            <p className="text-[11px] font-bold text-amber-900">
              🎁 New to Little Joys? Get ₹200 instant welcome wallet credit on signup!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F5] pb-24 pt-4 md:pt-6">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Profile Header Banner */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-orange-100 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-pink-500/20 border-2 border-white">
              {user.name ? user.name.charAt(0).toUpperCase() : 'P'}
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                <span>{user.name || 'Parent'}</span>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                  Verified Parent
                </span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                <span>{user.phone || '+91 98765 43210'}</span>
                <span>•</span>
                <span>{user.email || 'pooja.sharma@example.com'}</span>
              </p>
              <p className="text-xs font-semibold text-pink-600 mt-1">
                Parent of {childName} ({childAge} Years Old)
              </p>
            </div>
          </div>

          {/* Quick Wallet Card */}
          <div className="flex items-center gap-4 w-full md:w-auto bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-700 shrink-0">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">LJ Wallet Balance</span>
              <span className="text-xl font-black text-amber-950">₹{user.walletBalance || 450}</span>
            </div>
            <Link
              to="/wallet-recharge"
              className="ml-auto md:ml-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow transition-colors shrink-0"
            >
              Recharge (+30%)
            </Link>
          </div>
        </div>

        {/* Dashboard Grid: Navigation Tabs (Left) vs Content Area (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Sidebar Navigation (4 cols) */}
          <div className="md:col-span-4 space-y-2">
            <div className="bg-white rounded-3xl p-3 shadow-sm border border-orange-100 space-y-1">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-bold text-xs md:text-sm transition-all ${
                  activeTab === 'orders'
                    ? 'bg-pink-500 text-white shadow-md shadow-pink-500/20'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4" />
                  <span>My Orders</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'orders' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {orders.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-bold text-xs md:text-sm transition-all ${
                  activeTab === 'profile'
                    ? 'bg-pink-500 text-white shadow-md shadow-pink-500/20'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4" />
                  <span>Personal & Child Profile</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-bold text-xs md:text-sm transition-all ${
                  activeTab === 'addresses'
                    ? 'bg-pink-500 text-white shadow-md shadow-pink-500/20'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>Saved Delivery Addresses</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>

              <button
                onClick={() => setActiveTab('wallet')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-bold text-xs md:text-sm transition-all ${
                  activeTab === 'wallet'
                    ? 'bg-pink-500 text-white shadow-md shadow-pink-500/20'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Wallet className="w-4 h-4" />
                  <span>LJ Wallet Ledger</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'wallet' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'}`}>
                  ₹{user.walletBalance || 450}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-bold text-xs md:text-sm transition-all ${
                  activeTab === 'wishlist'
                    ? 'bg-pink-500 text-white shadow-md shadow-pink-500/20'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4" />
                  <span>My Wishlist</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'wishlist' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {wishlistItems.length}
                </span>
              </button>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="w-full flex items-center gap-3 p-3.5 rounded-2xl font-bold text-xs md:text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Main Content (8 cols) */}
          <div className="md:col-span-8 space-y-6">
            {/* 1. ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg md:text-xl font-black text-slate-800">My Orders ({orders.length})</h2>
                  <span className="text-xs text-slate-400">All orders are dispatched from clean-certified hubs</span>
                </div>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-orange-100 space-y-5 hover:border-pink-200 transition-colors"
                    >
                      {/* Order Header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-slate-900">{order.id}</span>
                            <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                              {order.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">Placed on {order.date}</p>
                        </div>

                        <div className="text-right">
                          <span className="text-sm md:text-base font-black text-slate-900">₹{order.total}</span>
                          <p className="text-[11px] text-emerald-600 font-bold">Saved ₹{order.discount}</p>
                        </div>
                      </div>

                      {/* Delivery Status Timeline */}
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <p className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-emerald-600" />
                          <span>Delivered on {order.deliveryDate} • Tracking: <strong>{order.trackingNumber}</strong></span>
                        </p>
                        <div className="grid grid-cols-4 gap-2 text-center text-[10px] md:text-xs font-bold text-slate-600">
                          <div className="space-y-1">
                            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xs">✓</div>
                            <span>Confirmed</span>
                          </div>
                          <div className="space-y-1">
                            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xs">✓</div>
                            <span>Packed</span>
                          </div>
                          <div className="space-y-1">
                            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xs">✓</div>
                            <span>Shipped</span>
                          </div>
                          <div className="space-y-1">
                            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xs">✓</div>
                            <span className="text-emerald-700 font-black">Delivered</span>
                          </div>
                        </div>
                      </div>

                      {/* Items List */}
                      <div className="space-y-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-orange-50 p-1.5 flex items-center justify-center border border-orange-100 shrink-0">
                              <ProductVisual visualType={item.visualType} flavor={item.flavor} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs md:text-sm font-black text-slate-800 truncate">{item.title}</p>
                              <p className="text-xs text-slate-400">Qty: {item.quantity} • ₹{item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Delivery Address & Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                        <div className="text-slate-500 text-[11px] truncate max-w-sm">
                          📍 {order.address}
                        </div>
                        <button
                          onClick={() => {
                            order.items.forEach((item) => addToCart({ ...item, quantity: 1 }));
                            navigate('/cart');
                          }}
                          className="bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold px-3 py-1.5 rounded-xl border border-pink-200 transition-colors"
                        >
                          Reorder Items
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. PERSONAL & CHILD PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h2 className="text-lg font-black text-slate-800">Child Nutrition Profile</h2>
                    {!isEditingChild && (
                      <button
                        onClick={() => setIsEditingChild(true)}
                        className="text-xs font-bold text-pink-600 hover:underline flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit Child Info
                      </button>
                    )}
                  </div>

                  {!isEditingChild ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-pink-50/50 border border-pink-100 rounded-2xl p-4">
                        <span className="text-[11px] font-bold text-pink-800 uppercase tracking-wider">Child Name</span>
                        <p className="text-base font-black text-slate-900 mt-1">{childName}</p>
                      </div>
                      <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4">
                        <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Age Group</span>
                        <p className="text-base font-black text-slate-900 mt-1">{childAge} Years Old</p>
                      </div>
                      <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4">
                        <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Primary Goal</span>
                        <p className="text-base font-black text-slate-900 mt-1">{nutritionGoal}</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveChildProfile} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Child's Name</label>
                          <input
                            type="text"
                            value={childName}
                            onChange={(e) => setChildName(e.target.value)}
                            className="w-full text-xs font-bold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-pink-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Child's Age (Years)</label>
                          <select
                            value={childAge}
                            onChange={(e) => setChildAge(e.target.value)}
                            className="w-full text-xs font-bold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-pink-500"
                          >
                            <option value="2">2 Years</option>
                            <option value="3">3 Years</option>
                            <option value="4">4 Years</option>
                            <option value="5">5 Years</option>
                            <option value="6">6 Years</option>
                            <option value="7+">7+ Years</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Primary Nutrition Goal</label>
                        <select
                          value={nutritionGoal}
                          onChange={(e) => setNutritionGoal(e.target.value)}
                          className="w-full text-xs font-bold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-pink-500"
                        >
                          <option value="Immunity & Daily Growth">Immunity & Daily Growth</option>
                          <option value="Brain Health & Focus">Brain Health & Focus</option>
                          <option value="Healthy Weight Gain">Healthy Weight Gain</option>
                          <option value="Digestion & Fibre">Digestion & Fibre</option>
                        </select>
                      </div>

                      <div className="flex gap-2 justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => setIsEditingChild(false)}
                          className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold rounded-xl shadow"
                        >
                          Save Child Profile
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Parent Contact Details */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 space-y-4">
                  <h3 className="text-base font-black text-slate-800">Parent Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="border border-slate-100 bg-slate-50/60 rounded-2xl p-3.5">
                      <span className="text-slate-400 font-bold block mb-1">Full Name</span>
                      <span className="text-slate-800 font-bold text-sm">{user.name}</span>
                    </div>
                    <div className="border border-slate-100 bg-slate-50/60 rounded-2xl p-3.5">
                      <span className="text-slate-400 font-bold block mb-1">Mobile Number</span>
                      <span className="text-slate-800 font-bold text-sm">{user.phone}</span>
                    </div>
                    <div className="border border-slate-100 bg-slate-50/60 rounded-2xl p-3.5 sm:col-span-2">
                      <span className="text-slate-400 font-bold block mb-1">Email Address</span>
                      <span className="text-slate-800 font-bold text-sm">{user.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. SAVED ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-black text-slate-800">Saved Addresses</h2>
                  <button className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1.5 rounded-xl border border-pink-200 hover:bg-pink-100 flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Add New Address
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="bg-white rounded-3xl p-6 shadow-sm border-2 border-pink-300 relative space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black bg-pink-500 text-white px-2.5 py-0.5 rounded-full">
                            {addr.label}
                          </span>
                          <span className="text-xs font-bold text-emerald-600">Default Shipping Address</span>
                        </div>
                        <button className="text-xs font-bold text-slate-400 hover:text-pink-600">Edit</button>
                      </div>

                      <div>
                        <p className="text-sm font-black text-slate-900">{addr.recipient}</p>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {addr.line1}, {addr.line2}, {addr.city}, {addr.state} - <strong>{addr.pincode}</strong>
                        </p>
                        <p className="text-xs text-slate-500 mt-1">Phone: {addr.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. LJ WALLET LEDGER TAB */}
            {activeTab === 'wallet' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-amber-500 to-rose-500 rounded-3xl p-6 text-white shadow-lg shadow-amber-500/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Available Balance</span>
                    <h3 className="text-3xl font-black mt-1">₹{user.walletBalance || 450}</h3>
                    <p className="text-xs text-white/90 mt-1">Save up to 30% automatically at checkout!</p>
                  </div>
                  <Link
                    to="/wallet-recharge"
                    className="bg-white hover:bg-orange-50 text-slate-900 text-xs font-extrabold px-5 py-3 rounded-2xl shadow transition-transform active:scale-95 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4 text-pink-600" />
                    <span>Top-up Wallet</span>
                  </Link>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Transaction History</h3>
                  <div className="divide-y divide-slate-100 text-xs">
                    <div className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-slate-800">LJ Wallet 30% Bonus Top-up</p>
                        <span className="text-[11px] text-slate-400">10 Sep, 2026</span>
                      </div>
                      <span className="font-black text-emerald-600 text-sm">+ ₹300</span>
                    </div>
                    <div className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-slate-800">Used on Order #LJ-ORD-9824</p>
                        <span className="text-[11px] text-slate-400">08 Sep, 2026</span>
                      </div>
                      <span className="font-black text-slate-800 text-sm">- ₹298</span>
                    </div>
                    <div className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-slate-800">Welcome Cashback Credit</p>
                        <span className="text-[11px] text-slate-400">01 Sep, 2026</span>
                      </div>
                      <span className="font-black text-emerald-600 text-sm">+ ₹150</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-black text-slate-800">Saved Wishlist ({wishlistItems.length})</h2>
                  <Link to="/shop/all" className="text-xs font-bold text-pink-600 hover:underline">
                    Browse Catalog
                  </Link>
                </div>

                {wishlistItems.length === 0 ? (
                  <div className="bg-white rounded-3xl p-8 text-center border border-orange-100 space-y-3">
                    <p className="text-sm font-bold text-slate-600">No items saved in wishlist yet.</p>
                    <Link
                      to="/shop/all"
                      className="inline-block bg-pink-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow"
                    >
                      Explore Products
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlistItems.map((item) => (
                      <div
                        key={item.id || item.slug}
                        className="bg-white rounded-3xl p-4 shadow-sm border border-orange-100 flex gap-4 items-center"
                      >
                        <div className="w-16 h-16 bg-orange-50 rounded-2xl p-1.5 flex items-center justify-center shrink-0">
                          <ProductVisual visualType={item.visualType} flavor={item.flavor} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-slate-800 truncate">{item.title || item.name}</p>
                          <p className="text-xs font-bold text-slate-900 mt-0.5">₹{item.price}</p>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => {
                                addToCart({ ...item, quantity: 1 });
                                removeFromWishlist(item.id || item.slug);
                              }}
                              className="text-[11px] font-bold bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-lg"
                            >
                              Move to Bag
                            </button>
                            <button
                              onClick={() => removeFromWishlist(item.id || item.slug)}
                              className="text-[11px] text-slate-400 hover:text-rose-500"
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
          </div>
        </div>
      </div>
    </div>
  );
}
