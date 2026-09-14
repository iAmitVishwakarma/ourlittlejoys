import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AuthModal from '../AuthModal';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';

vi.mock('@/services/authService', () => ({
  authService: {
    sendOtp: vi.fn().mockResolvedValue({ success: true, message: 'OTP sent' }),
  },
}));

describe('AuthModal Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({
      loginWithOtp: vi.fn().mockResolvedValue({ id: 'u1', name: 'Test' }),
      updateProfile: vi.fn().mockResolvedValue({ id: 'u1' }),
    });
  });

  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <MemoryRouter>
        <AuthModal isOpen={false} onClose={vi.fn()} />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });

  it('validates mobile number input and submits OTP request', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <AuthModal isOpen={true} onClose={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByRole('dialog', { name: /login or register/i })).toBeInTheDocument();

    const phoneInput = screen.getByPlaceholderText(/98765 43210/i);
    const sendOtpBtn = screen.getByRole('button', { name: /send verification code/i });

    // Too short phone number disables the submit button
    await user.type(phoneInput, '98765');
    expect(sendOtpBtn).toBeDisabled();
    expect(authService.sendOtp).not.toHaveBeenCalled();

    // Valid 10-digit phone number enables button and submits
    await user.clear(phoneInput);
    await user.type(phoneInput, '9876543210');
    expect(sendOtpBtn).toBeEnabled();
    await user.click(sendOtpBtn);

    await waitFor(() => {
      expect(authService.sendOtp).toHaveBeenCalledWith('9876543210');
    });
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <AuthModal isOpen={true} onClose={handleClose} />
      </MemoryRouter>
    );

    const closeBtn = screen.getByRole('button', { name: /close authentication dialog/i });
    await user.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
