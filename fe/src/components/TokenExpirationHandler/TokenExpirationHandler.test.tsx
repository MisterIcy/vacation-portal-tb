import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, act } from '@testing-library/react';
import { TokenExpirationHandler } from './TokenExpirationHandler';
import { render } from '@tests/test-utils';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock useAuth
const mockLogout = vi.fn();
const mockUseAuth = vi.fn();
vi.mock('@hooks/useAuth', () => ({
  useAuth: () => mockUseAuth(),
}));

// Mock JWT utils
const mockIsTokenExpired = vi.fn();
const mockGetTokenExpiration = vi.fn();
vi.mock('@utils/jwtUtils', () => ({
  isTokenExpired: (token: string) => mockIsTokenExpired(token),
  getTokenExpiration: (token: string) => mockGetTokenExpiration(token),
}));

describe('TokenExpirationHandler', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    mockUseAuth.mockReturnValue({
      logout: mockLogout,
      isAuthenticated: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  describe('Warning Display', () => {
    it('should not show warning when token has more than 5 minutes remaining', () => {
      const futureDate = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      localStorage.setItem('token', 'valid-token');
      mockGetTokenExpiration.mockReturnValue(futureDate);
      mockIsTokenExpired.mockReturnValue(false);

      render(<TokenExpirationHandler />);

      expect(screen.queryByText(/Your session will expire in/)).not.toBeInTheDocument();
    });

    it('should show warning when token has less than 5 minutes remaining', () => {
      const futureDate = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes
      localStorage.setItem('token', 'expiring-token');
      mockGetTokenExpiration.mockReturnValue(futureDate);
      mockIsTokenExpired.mockReturnValue(false);

      render(<TokenExpirationHandler />);

      expect(screen.getByText(/Your session will expire in 3 minutes/)).toBeInTheDocument();
    });

    it('should show singular "minute" for 1 minute remaining', () => {
      const futureDate = new Date(Date.now() + 1 * 60 * 1000); // 1 minute
      localStorage.setItem('token', 'expiring-token');
      mockGetTokenExpiration.mockReturnValue(futureDate);
      mockIsTokenExpired.mockReturnValue(false);

      render(<TokenExpirationHandler />);

      expect(screen.getByText(/Your session will expire in 1 minute\./)).toBeInTheDocument();
    });

    it('should display warning icon', () => {
      const futureDate = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
      localStorage.setItem('token', 'expiring-token');
      mockGetTokenExpiration.mockReturnValue(futureDate);
      mockIsTokenExpired.mockReturnValue(false);

      render(<TokenExpirationHandler />);

      expect(screen.getByText('⚠️')).toBeInTheDocument();
    });

    it('should include "Please save your work" message', () => {
      const futureDate = new Date(Date.now() + 4 * 60 * 1000); // 4 minutes
      localStorage.setItem('token', 'expiring-token');
      mockGetTokenExpiration.mockReturnValue(futureDate);
      mockIsTokenExpired.mockReturnValue(false);

      render(<TokenExpirationHandler />);

      expect(screen.getByText(/Please save your work/)).toBeInTheDocument();
    });
  });

  describe('Token Expiration', () => {
    it('should logout and navigate when token is expired', () => {
      const pastDate = new Date(Date.now() - 1000); // Expired 1 second ago
      localStorage.setItem('token', 'expired-token');
      mockGetTokenExpiration.mockReturnValue(pastDate);
      mockIsTokenExpired.mockReturnValue(true);

      render(<TokenExpirationHandler />);

      expect(mockLogout).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    it('should not show warning when token is expired', () => {
      const pastDate = new Date(Date.now() - 1000); // Expired
      localStorage.setItem('token', 'expired-token');
      mockGetTokenExpiration.mockReturnValue(pastDate);
      mockIsTokenExpired.mockReturnValue(true);

      render(<TokenExpirationHandler />);

      expect(mockLogout).toHaveBeenCalled();
      expect(screen.queryByText(/Your session will expire/)).not.toBeInTheDocument();
    });
  });

  describe('Periodic Checks', () => {
    it('should check token expiration every 30 seconds', () => {
      const futureDate = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      localStorage.setItem('token', 'valid-token');
      mockGetTokenExpiration.mockReturnValue(futureDate);
      mockIsTokenExpired.mockReturnValue(false);

      render(<TokenExpirationHandler />);

      // Initial check
      expect(mockGetTokenExpiration).toHaveBeenCalledTimes(1);

      // Advance time by 30 seconds
      act(() => {
        vi.advanceTimersByTime(30000);
      });

      expect(mockGetTokenExpiration).toHaveBeenCalledTimes(2);

      // Advance another 30 seconds
      act(() => {
        vi.advanceTimersByTime(30000);
      });

      expect(mockGetTokenExpiration).toHaveBeenCalledTimes(3);
    });

    it('should call checkTokenExpiration periodically', () => {
      const currentTime = Date.now();
      const initialFutureDate = new Date(currentTime + 4 * 60 * 1000); // 4 minutes

      localStorage.setItem('token', 'expiring-token');
      mockGetTokenExpiration.mockReturnValue(initialFutureDate);
      mockIsTokenExpired.mockReturnValue(false);

      render(<TokenExpirationHandler />);

      // Initially shows 4 minutes
      expect(screen.getByText(/4 minutes/)).toBeInTheDocument();

      // Trigger multiple interval checks
      act(() => {
        vi.advanceTimersByTime(30000);
      });

      // Component still renders after interval fires
      expect(screen.getByText(/minute/)).toBeInTheDocument();
    });
  });

  describe('Authentication State', () => {
    it('should not render when user is not authenticated', () => {
      mockUseAuth.mockReturnValue({
        logout: mockLogout,
        isAuthenticated: false,
      });

      render(<TokenExpirationHandler />);

      expect(screen.queryByText(/Your session will expire/)).not.toBeInTheDocument();
    });

    it('should not check token when user is not authenticated', () => {
      mockUseAuth.mockReturnValue({
        logout: mockLogout,
        isAuthenticated: false,
      });

      render(<TokenExpirationHandler />);

      expect(mockGetTokenExpiration).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing token gracefully', () => {
      mockUseAuth.mockReturnValue({
        logout: mockLogout,
        isAuthenticated: true,
      });

      render(<TokenExpirationHandler />);

      expect(mockLogout).not.toHaveBeenCalled();
      expect(screen.queryByText(/Your session will expire/)).not.toBeInTheDocument();
    });

    it('should handle null expiration date gracefully', () => {
      localStorage.setItem('token', 'invalid-token');
      mockGetTokenExpiration.mockReturnValue(null);

      render(<TokenExpirationHandler />);

      expect(mockLogout).not.toHaveBeenCalled();
      expect(screen.queryByText(/Your session will expire/)).not.toBeInTheDocument();
    });

    it('should cleanup interval on unmount', () => {
      const futureDate = new Date(Date.now() + 10 * 60 * 1000);
      localStorage.setItem('token', 'valid-token');
      mockGetTokenExpiration.mockReturnValue(futureDate);

      const { unmount } = render(<TokenExpirationHandler />);

      expect(mockGetTokenExpiration).toHaveBeenCalledTimes(1);

      unmount();

      // Advance time - interval should not run after unmount
      act(() => {
        vi.advanceTimersByTime(30000);
      });

      expect(mockGetTokenExpiration).toHaveBeenCalledTimes(1);
    });
  });
});
