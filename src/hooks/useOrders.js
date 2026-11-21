import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { orderService } from '@/services/orderService';

export const INITIAL_ORDERS = [
  {
    id: 'NEST-ORD-9824',
    date: '08 Sep, 2026',
    total: 800,
    discount: 298,
    status: 'Delivered',
    statusType: 'delivered',
    trackingNumber: 'DELHIVERY-NEST-88231',
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
    id: 'NEST-ORD-9102',
    date: '18 Aug, 2026',
    total: 999,
    discount: 200,
    status: 'Delivered',
    statusType: 'delivered',
    trackingNumber: 'BLUEDART-NEST-77192',
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

export function useOrders() {
  const user = useAuthStore((s) => s.user);
  const addToCart = useCartStore((s) => s.addToCart);
  const navigate = useNavigate();

  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [orderFilter, setOrderFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchOrders = async () => {
      try {
        const res = await orderService.getUserOrders(user?.id);
        if (res?.success && Array.isArray(res.data) && res.data.length > 0 && isMounted) {
          const combined = [
            ...res.data,
            ...INITIAL_ORDERS.filter(
              (init) => !res.data.some((d) => (d.id || d.orderId) === init.id)
            ),
          ];
          setOrders(combined);
        }
      } catch (err) {
        console.warn('[useOrders] Failed to fetch orders:', err);
      }
    };

    fetchOrders();
    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const showToast = useCallback((title, subtext = '') => {
    setToastMessage({ title, subtext });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  const handleBuyAgain = useCallback(
    (item) => {
      addToCart({
        id: item.slug || item.id,
        title: item.title,
        price: item.price,
        quantity: 1,
        visualType: item.visualType,
        flavor: item.flavor,
      });
      showToast(
        `${item.title} added to your bag! 🛍️`,
        'Item is ready in your cart for fast checkout.'
      );
    },
    [addToCart, showToast]
  );

  const handleReorderWholeOrder = useCallback(
    (order) => {
      if (!order?.items) return;
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
      showToast(
        `Order #${order.id || order.orderId} items added to bag!`,
        'Ready to reorder your favourites.'
      );
      navigate('/cart');
    },
    [addToCart, showToast, navigate]
  );

  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const status = (ord.statusType || ord.status || '').toLowerCase();
      if (orderFilter === 'delivered') return status === 'delivered';
      if (orderFilter === 'processing') return status !== 'delivered';
      return true;
    });
  }, [orders, orderFilter]);

  return {
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
    handleBuyAgain,
    handleReorderWholeOrder,
  };
}

export default useOrders;
