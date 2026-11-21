import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';

const INITIAL_MOCK_ORDERS = [
  {
    id: 'LJ-ORD-9824',
    date: '08 Sep, 2026',
    total: 800,
    discount: 298,
    status: 'Delivered',
    statusType: 'delivered',
    trackingNumber: 'DELHIVERY-LJ-88231',
    deliveryDate: '10 Sep, 2026',
    timeline: [
      { label: 'Confirmed', date: '08 Sep', completed: true },
      { label: 'Packed', date: '09 Sep', completed: true },
      { label: 'Shipped', date: '09 Sep', completed: true },
      { label: 'Delivered', date: '10 Sep', completed: true },
    ],
    items: [
      {
        id: 'item_1',
        slug: 'nutrimix-nutrition-powder',
        title: 'Nutrimix Chocolate Nutrition Powder (350g)',
        quantity: 1,
        price: 599,
        visualType: 'nutrimix',
        flavor: 'chocolate',
      },
      {
        id: 'item_2',
        slug: 'multivitamin-gummies',
        title: 'Multivitamin Gummies 4+ (30N)',
        quantity: 1,
        price: 499,
        visualType: 'gummies',
        flavor: 'strawberry',
      },
    ],
    address: 'Flat 402, Sunshine Orchards, Arera Colony, Bhopal - 462016',
  },
  {
    id: 'LJ-ORD-9102',
    date: '18 Aug, 2026',
    total: 999,
    discount: 200,
    status: 'Delivered',
    statusType: 'delivered',
    trackingNumber: 'BLUEDART-LJ-77192',
    deliveryDate: '21 Aug, 2026',
    timeline: [
      { label: 'Confirmed', date: '18 Aug', completed: true },
      { label: 'Packed', date: '20 Aug', completed: true },
      { label: 'Shipped', date: '20 Aug', completed: true },
      { label: 'Delivered', date: '21 Aug', completed: true },
    ],
    items: [
      {
        id: 'item_3',
        slug: 'immunity-support-kit',
        title: 'Immunity Support Kit (Nutrimix + Gummies)',
        quantity: 1,
        price: 999,
        visualType: 'combo',
        flavor: 'mixed',
      },
    ],
    address: 'Flat 402, Sunshine Orchards, Arera Colony, Bhopal - 462016',
  },
];

export function useProfile(defaultTab) {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const login = useAuthStore((s) => s.login);
  const updateChildProfile = useAuthStore((s) => s.updateChildProfile);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const addToCart = useCartStore((s) => s.addToCart);
  const wishlistItems = useWishlistStore((s) => s.wishlistItems);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(
    defaultTab && defaultTab !== 'wishlist' ? defaultTab : 'orders'
  );
  const [isTabLoading, setIsTabLoading] = useState(false);

  const handleTabSelect = useCallback((tabKey) => {
    setActiveTab((prev) => {
      if (prev === tabKey) return prev;
      setIsTabLoading(true);
      setTimeout(() => setIsTabLoading(false), 200);
      return tabKey;
    });
  }, []);

  useEffect(() => {
    if (defaultTab && defaultTab !== 'wishlist') {
      handleTabSelect(defaultTab);
    }
  }, [defaultTab, handleTabSelect]);

  const [orderFilter, setOrderFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (title, subtext = '') => {
    setToastMessage({ title, subtext });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [isEditingChild, setIsEditingChild] = useState(false);
  const [childName, setChildName] = useState(user?.childName || 'Shubh');
  const [childAge, setChildAge] = useState(user?.childAge || '7');
  const [nutritionGoal, setNutritionGoal] = useState(
    user?.nutritionGoal || 'Growth & Immunity'
  );

  const [orders] = useState(INITIAL_MOCK_ORDERS);

  const [addresses, setAddresses] = useState([
    {
      id: 'addr_1',
      label: 'Home',
      isDefault: true,
      recipient: user?.name || 'Amit Vishwakarma',
      phone: user?.phone || '7772929755',
      line1: 'Flat 402, Sunshine Orchards',
      line2: 'Near 10 No. Market, Arera Colony',
      city: 'Bhopal',
      state: 'Madhya Pradesh',
      pincode: '462016',
    },
  ]);

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: 'Home',
    recipient: user?.name || 'Amit Vishwakarma',
    phone: user?.phone || '7772929755',
    line1: '',
    line2: '',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    pincode: '',
  });

  const filteredOrders = orders.filter((ord) => {
    if (orderFilter === 'delivered') return ord.statusType === 'delivered';
    if (orderFilter === 'processing') return ord.statusType !== 'delivered';
    return true;
  });

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
      name: 'Amit Vishwakarma',
      phone: phoneNumber || '7772929755',
      email: 'iam.itvishwakarma03@gmail.com',
      childName: 'Shubh',
      childAge: '7',
      nutritionGoal: 'Growth & Immunity',
      walletBalance: 200,
    });
  };

  const handleQuickDemoLogin = () => {
    login({
      name: 'Amit Vishwakarma',
      phone: '7772929755',
      email: 'iam.itvishwakarma03@gmail.com',
      childName: 'Shubh',
      childAge: '7',
      nutritionGoal: 'Growth & Immunity',
      walletBalance: 200,
    });
  };

  const handleSaveChildProfile = (e) => {
    e.preventDefault();
    updateChildProfile?.({ childName, childAge, nutritionGoal });
    setIsEditingChild(false);
    showToast('Child profile updated!', `${childName}'s nutrition roadmap refreshed.`);
  };

  const handleSaveParentProfile = async (updatedData) => {
    await updateProfile?.(updatedData);
    showToast('Parent profile updated! 🎉', 'Your profile details have been saved.');
  };

  const handleBuyAgain = (item) => {
    addToCart({
      id: item.slug || item.id,
      title: item.title,
      price: item.price,
      quantity: 1,
      visualType: item.visualType,
      flavor: item.flavor,
    });
    showToast(`${item.title} added to your bag! 🛍️`, 'Item is ready in your cart for fast checkout.');
  };

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
    showToast(`Order #${order.id} items added to bag!`, 'Ready to reorder your favourites.');
    navigate('/cart');
  };

  const currentUserName = user?.name || 'Amit Vishwakarma';
  const currentUserPhone = user?.phone || '7772929755';
  const currentUserEmail = user?.email || 'iam.itvishwakarma03@gmail.com';
  const currentChildName = user?.childName || childName || 'Shubh';
  const currentChildAge = user?.childAge || childAge || '7';
  const currentWalletBalance = user?.walletBalance !== undefined ? user.walletBalance : 200;
  const initialLetter = currentUserName.charAt(0).toUpperCase();

  return {
    user,
    isAuthenticated,
    activeTab,
    setActiveTab,
    handleTabSelect,
    isTabLoading,
    orders,
    filteredOrders,
    orderFilter,
    setOrderFilter,
    isFilterOpen,
    setIsFilterOpen,
    selectedOrderDetail,
    setSelectedOrderDetail,
    toastMessage,
    setToastMessage,
    showToast,
    phoneNumber,
    setPhoneNumber,
    otp,
    setOtp,
    otpSent,
    setOtpSent,
    loginError,
    handleSendOtp,
    handleVerifyOtp,
    handleQuickDemoLogin,
    isEditingChild,
    setIsEditingChild,
    childName,
    setChildName,
    childAge,
    setChildAge,
    nutritionGoal,
    setNutritionGoal,
    handleSaveChildProfile,
    handleSaveParentProfile,
    addresses,
    setAddresses,
    isAddingAddress,
    setIsAddingAddress,
    newAddress,
    setNewAddress,
    handleBuyAgain,
    handleReorderWholeOrder,
    currentUserName,
    currentUserPhone,
    currentUserEmail,
    currentChildName,
    currentChildAge,
    currentWalletBalance,
    initialLetter,
    wishlistItems,
    navigate,
  };
}

export default useProfile;
