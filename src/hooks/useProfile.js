import { useState, useCallback } from 'react';
import { useAuthStore } from '@/stores/authStore';

export function useProfile() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const login = useAuthStore((s) => s.login);
  const updateChildProfile = useAuthStore((s) => s.updateChildProfile);
  const updateProfile = useAuthStore((s) => s.updateProfile);

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((title, subtext = '') => {
    setToastMessage({ title, subtext });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loginError, setLoginError] = useState('');

  const currentUserName = user?.name || 'Amit Vishwakarma';
  const currentUserPhone = user?.phone || '7772929755';
  const currentUserEmail = user?.email || 'iam.itvishwakarma03@gmail.com';
  const currentChildName = user?.childName || 'Shubh';
  const currentChildAge = user?.childAge || '7';
  const nutritionGoal = user?.nutritionGoal || 'Growth & Immunity';
  const currentWalletBalance = user?.walletBalance !== undefined ? user.walletBalance : 200;
  const initialLetter = currentUserName.charAt(0).toUpperCase();

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

  const handleSaveChildProfile = (data) => {
    updateChildProfile?.(data);
    showToast(
      'Child profile updated!',
      `${data.childName || currentChildName}'s nutrition roadmap refreshed.`
    );
  };

  const handleSaveParentProfile = async (updatedData) => {
    await updateProfile?.(updatedData);
    showToast('Parent profile updated! 🎉', 'Your profile details have been saved.');
  };

  return {
    user,
    isAuthenticated,
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
    handleSaveChildProfile,
    handleSaveParentProfile,
    currentUserName,
    currentUserPhone,
    currentUserEmail,
    currentChildName,
    currentChildAge,
    nutritionGoal,
    currentWalletBalance,
    initialLetter,
  };
}

export default useProfile;
