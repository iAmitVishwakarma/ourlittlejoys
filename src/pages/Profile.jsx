import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, X, ArrowRight } from 'lucide-react';
import SEO from '@/components/common/SEO';
import { useProfile } from '@/hooks/useProfile';
import ProfileLoginView from './profile/ProfileLoginView';
import ProfileHeaderBanner from './profile/ProfileHeaderBanner';
import ParentDetailsCard from './profile/ParentDetailsCard';
import ChildProfileCard from './profile/ChildProfileCard';
import AccountPreferencesCard from './profile/AccountPreferencesCard';
import ProfileActionCards from './profile/ProfileActionCards';

export default function Profile() {
  const profile = useProfile();

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
        title="Parent Account | Nestor"
        description="Manage your Nestor child nutrition profile, parent account details, and preferences."
      />

      {/* Floating Animated Feedback Toast */}
      {profile.toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 animate-bounce max-w-md bg-white border border-[#C89B58]/40 shadow-xl rounded-2xl p-4 flex items-start gap-3"
        >
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
            className="text-[11px] font-extrabold text-[#1F3C24] hover:underline shrink-0 bg-[#FAF4EB] px-2.5 py-1 rounded-lg border border-[#C89B58]/30 inline-flex items-center gap-1"
          >
            <span>View Cart</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => profile.setToastMessage(null)}
            aria-label="Close notification"
            className="text-slate-400 hover:text-slate-600 ml-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 max-w-6xl space-y-6">
        {/* Top Hero Banner */}
        <ProfileHeaderBanner
          currentUserName={profile.currentUserName}
          currentUserPhone={profile.currentUserPhone}
          currentUserEmail={profile.currentUserEmail}
          currentChildName={profile.currentChildName}
          currentChildAge={profile.currentChildAge}
          currentWalletBalance={profile.currentWalletBalance}
          initialLetter={profile.initialLetter}
        />

        {/* Row 1: Balanced 2-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column (7 cols): Parent Details + Child Profile */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <ParentDetailsCard
              userName={profile.currentUserName}
              userPhone={profile.currentUserPhone}
              userEmail={profile.currentUserEmail}
              onSaveParentProfile={profile.handleSaveParentProfile}
            />

            <ChildProfileCard
              childName={profile.currentChildName}
              childAge={profile.currentChildAge}
              nutritionGoal={profile.nutritionGoal}
              onSaveChildProfile={profile.handleSaveChildProfile}
            />
          </div>

          {/* Right Column (5 cols): Account Preferences */}
          <div className="lg:col-span-5">
            <AccountPreferencesCard childName={profile.currentChildName} />
          </div>
        </div>

        {/* Row 2: Balanced 3-Column Equal-Height Action Row */}
        <ProfileActionCards onShowToast={profile.showToast} />
      </div>
    </div>
  );
}
