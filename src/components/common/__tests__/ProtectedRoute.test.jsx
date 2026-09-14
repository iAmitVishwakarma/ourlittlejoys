import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import { useAuthStore } from '@/stores/authStore';

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  });

  it('renders loading spinner when session is restoring (isLoading: true)', () => {
    useAuthStore.setState({ isLoading: true });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Secret Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/verifying parent session/i)).toBeInTheDocument();
    expect(screen.queryByText('Secret Content')).not.toBeInTheDocument();
  });

  it('redirects unauthenticated guest to /login preserving intended destination in state', () => {
    useAuthStore.setState({ isAuthenticated: false, isLoading: false });

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div>Private Profile</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page Target</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page Target')).toBeInTheDocument();
    expect(screen.queryByText('Private Profile')).not.toBeInTheDocument();
  });

  it('renders protected child content when user is authenticated', () => {
    useAuthStore.setState({
      isAuthenticated: true,
      isLoading: false,
      user: { id: 'u1', name: 'Amit' },
    });

    render(
      <MemoryRouter initialEntries={['/orders']}>
        <Routes>
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <div>Protected Orders Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Orders Content')).toBeInTheDocument();
  });

  it('renders nested Outlet when no children passed and user is authenticated', () => {
    useAuthStore.setState({
      isAuthenticated: true,
      isLoading: false,
      user: { id: 'u1', name: 'Amit' },
    });

    render(
      <MemoryRouter initialEntries={['/parent/child']}>
        <Routes>
          <Route path="/parent" element={<ProtectedRoute />}>
            <Route path="child" element={<div>Nested Child Outlet Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Nested Child Outlet Content')).toBeInTheDocument();
  });
});
