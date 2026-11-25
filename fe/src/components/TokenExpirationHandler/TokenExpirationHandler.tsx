/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useAuth } from '@hooks/useAuth';
import { isTokenExpired, getTokenExpiration } from '@utils/jwtUtils';
import type { Theme } from '@styles/theme';
import { tokenExpirationWarningStyles } from './TokenExpirationHandler.styles';

export const TokenExpirationHandler = () => {
  const theme = useTheme() as Theme;
  const [warningState, setWarningState] = useState<{
    show: boolean;
    minutesRemaining: number | null;
  }>({ show: false, minutesRemaining: null });
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      const expirationDate = getTokenExpiration(token);

      if (!expirationDate) {
        return;
      }

      const now = Date.now();
      const timeUntilExpiry = expirationDate.getTime() - now;
      const minutesRemaining = Math.floor(timeUntilExpiry / 1000 / 60);

      // Show warning if less than 5 minutes remaining
      if (timeUntilExpiry > 0 && minutesRemaining < 5) {
        setWarningState({ show: true, minutesRemaining });
      } else if (timeUntilExpiry <= 0 || isTokenExpired(token)) {
        // Token expired, logout
        logout();
        navigate('/login');
      } else {
        setWarningState({ show: false, minutesRemaining: null });
      }
    };

    // Check immediately
    checkTokenExpiration();

    // Check every 30 seconds
    const intervalId = setInterval(checkTokenExpiration, 30000);

    return () => clearInterval(intervalId);
  }, [isAuthenticated, logout, navigate]);

  if (!warningState.show || warningState.minutesRemaining === null) {
    return null;
  }

  return (
    <div css={tokenExpirationWarningStyles(theme)}>
      <div className="token-expiration-warning__content">
        <span className="token-expiration-warning__icon">⚠️</span>
        <span className="token-expiration-warning__message">
          Your session will expire in {warningState.minutesRemaining} minute
          {warningState.minutesRemaining !== 1 ? 's' : ''}. Please save your work.
        </span>
      </div>
    </div>
  );
};
