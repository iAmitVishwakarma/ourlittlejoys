import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, X } from 'lucide-react';
import SEO from '@/components/common/SEO';
import { OrderCardSkeleton } from '@/components/common/Skeleton';
import { useProfile } from '@/hooks/useProfile';
import ProfileLoginView from './profile/ProfileLoginView';
import ProfileHeaderBanner from './profile/ProfileHeaderBanner';
import ProfileQuickStats from './profile/ProfileQuickStats';
import ProfileNavSidebar from './profile/ProfileNavSidebar';
import ProfileRightSidebar from './profile/ProfileRightSidebar';
import OrderDetailModal from './profile/OrderDetailModal';

import ProfileDetailsTab from './profile/tabs/ProfileDetailsTab';
import ChildProfileTab from './profile/tabs/ChildProfileTab';
import OrdersTab from './profile/tabs/OrdersTab';
import AddressesTab from './profile/tabs/AddressesTab';
import WalletTab from './profile/tabs/WalletTab';

export default function Profile({ defaultTab }) {
  const profile = useProfile(defaultTab);

  if (!profile.isAuthenticated) {
    return (
      <ProfileLoginView
        otpSent={profile.otpSent}
        phoneNumber={profile.phoneNumber}
        setPhoneNumber={profile.setPhoneNumber}
        otp={profile.otp}
        setOtp={profile.setOtp}
        loginError={profile.loginError}
        setOtpSent={profile.setOtpSent}
        onSendOtp={profile.handleSendOtp}
        onVerifyOtp={profile.handleVerifyOtp}
        onQuickDemoLogin={profile.handleQuickDemoLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream pb-24 pt-3 md:pt-5 font-sans selection:bg-[#FAF4EB] selection:text-[#1F3C24]">
      <SEO
        title="Parent Account & Orders | Nestor"
        description="Manage your Nestor orders, child nutrition profile, saved delivery addresses, and Nestor Wallet."
      />

      {/* Floating Animated Feedback Toast */}
      {profile.toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce max-w-md bg-white border border-[#C89B58]/40 shadow-xl rounded-2xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1 pr-2">
            <p className="text-xs font-black text-slate-900">{profile.toastMessage.title}</p>
            {profile.toastMessage.subtext && (
              <p className="text-[11px] text-slate-500 mt-0.5">{profile.toastMessage.subtext}</p>
            )}
          </div>
          <Link
            to="/cart"
            className="text-[11px] font-extrabold text-[#1F3C24] hover:underline shrink-0 bg-[#FAF4EB] px-2.5 py-1 rounded-lg border border-[#C89B58]/30"
          >
            View Cart &rarr;
          </Link>
          <button
            onClick={() => profile.setToastMessage(null)}
            className="text-slate-400 hover:text-slate-600 ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 max-w-6xl space-y-6">
        {/* Welcome Header */}
        <ProfileHeaderBanner
          currentUserName={profile.currentUserName}
          currentUserPhone={profile.currentUserPhone}
          currentUserEmail={profile.currentUserEmail}
          currentChildName={profile.currentChildName}
          currentChildAge={profile.currentChildAge}
          currentWalletBalance={profile.currentWalletBalance}
          initialLetter={profile.initialLetter}
        />

        {/* Quick Stats */}
        <ProfileQuickStats
          activeTab={profile.activeTab}
          setActiveTab={profile.setActiveTab}
          ordersCount={profile.orders.length}
          wishlistCount={profile.wishlistItems.length}
          walletBalance={profile.currentWalletBalance}
        />

        {/* Main 3-Column Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Navigation Sidebar */}
          <ProfileNavSidebar
            activeTab={profile.activeTab}
            onTabSelect={profile.handleTabSelect}
            ordersCount={profile.orders.length}
            walletBalance={profile.currentWalletBalance}
          />

          {/* Central Active Tab */}
          <main className="lg:col-span-6 space-y-6">
            {profile.isTabLoading ? (
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
                {profile.activeTab === 'orders' && (
                  <OrdersTab
                    filteredOrders={profile.filteredOrders}
                    orderFilter={profile.orderFilter}
                    setOrderFilter={profile.setOrderFilter}
                    isFilterOpen={profile.isFilterOpen}
                    setIsFilterOpen={profile.setIsFilterOpen}
                    onSelectOrder={profile.setSelectedOrderDetail}
                    onBuyAgain={profile.handleBuyAgain}
                  />
                )}

                {profile.activeTab === 'profile' && (
                  <div className="space-y-6">
                    <ChildProfileTab
                      childName={profile.currentChildName}
                      childAge={profile.currentChildAge}
                      nutritionGoal={profile.nutritionGoal}
                      isEditingChild={profile.isEditingChild}
                      setIsEditingChild={profile.setIsEditingChild}
                      editName={profile.childName}
                      setEditName={profile.setChildName}
                      editAge={profile.childAge}
                      setEditAge={profile.setChildAge}
                      editGoal={profile.nutritionGoal}
                      setEditGoal={profile.setNutritionGoal}
                      onSaveChildProfile={profile.handleSaveChildProfile}
                    />
                    <ProfileDetailsTab
                      userName={profile.currentUserName}
                      userPhone={profile.currentUserPhone}
                      userEmail={profile.currentUserEmail}
                      childName={profile.currentChildName}
                      onSaveParentProfile={profile.handleSaveParentProfile}
                    />
                  </div>
                )}

                {profile.activeTab === 'addresses' && (
                  <AddressesTab
                    addresses={profile.addresses}
                    isAddingAddress={profile.isAddingAddress}
                    setIsAddingAddress={profile.setIsAddingAddress}
                    newAddress={profile.newAddress}
                    setNewAddress={profile.setNewAddress}
                    onSaveAddress={() => {
                      if (profile.newAddress.line1 && profile.newAddress.pincode) {
                        profile.setAddresses([
                          ...profile.addresses,
                          {
                            ...profile.newAddress,
                            id: `addr_${Date.now()}`,
                            isDefault: false,
                          },
                        ]);
                        profile.setIsAddingAddress(false);
                        profile.showToast('New address saved!');
                      }
                    }}
                    showToast={profile.showToast}
                  />
                )}

                {profile.activeTab === 'wallet' && (
                  <WalletTab walletBalance={profile.currentWalletBalance} />
                )}

                {profile.activeTab === 'settings' && (
                  <ProfileDetailsTab
                    userName={profile.currentUserName}
                    userPhone={profile.currentUserPhone}
                    userEmail={profile.currentUserEmail}
                    childName={profile.currentChildName}
                    onSaveParentProfile={profile.handleSaveParentProfile}
                  />
                )}
              </>
            )}
          </main>

          {/* Right Utility Sidebar */}
          <ProfileRightSidebar
            orders={profile.orders}
            onReorderWholeOrder={profile.handleReorderWholeOrder}
            onShowToast={profile.showToast}
          />
        </div>
      </div>

      {/* Order Detail Modal */}
      <OrderDetailModal
        order={profile.selectedOrderDetail}
        onClose={() => profile.setSelectedOrderDetail(null)}
        onReorderWholeOrder={profile.handleReorderWholeOrder}
      />
    </div>
  );
}
