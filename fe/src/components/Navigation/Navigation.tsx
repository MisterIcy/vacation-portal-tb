/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import type { Theme } from '@styles/theme';
import type { User } from '@domains/auth/types';
import { navigationStyles } from './Navigation.styles';

interface NavigationProps {
  user: User | null;
  onLogout: () => void;
}

export const Navigation = ({ user, onLogout }: NavigationProps) => {
  const theme = useTheme() as Theme;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setMobileMenuOpen(false);
    onLogout();
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div css={navigationStyles(theme, mobileMenuOpen)}>
      <button
        className="navigation__mobile-menu-button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className="navigation__hamburger"></span>
        <span className="navigation__hamburger"></span>
        <span className="navigation__hamburger"></span>
      </button>

      <nav className="navigation__nav">
        {user?.role === 'employee' && (
          <>
            <Link to="/dashboard" className="navigation__nav-link" onClick={closeMobileMenu}>
              Dashboard
            </Link>
            <Link to="/vacations" className="navigation__nav-link" onClick={closeMobileMenu}>
              My Vacations
            </Link>
            <Link to="/vacations/new" className="navigation__nav-link" onClick={closeMobileMenu}>
              Request Vacation
            </Link>
          </>
        )}
        {user?.role === 'manager' && (
          <>
            <Link to="/dashboard/manager" className="navigation__nav-link" onClick={closeMobileMenu}>
              Dashboard
            </Link>
            <Link to="/vacations" className="navigation__nav-link" onClick={closeMobileMenu}>
              Vacation Requests
            </Link>
            <Link to="/users" className="navigation__nav-link" onClick={closeMobileMenu}>
              Manage Users
            </Link>
          </>
        )}
        <div className="navigation__user-info">
          <div className="navigation__user-details">
            {user?.name && user?.role && (
              <span className={`navigation__role-badge navigation__role-badge--${user.role}`}>
                {user.name}
              </span>
            )}
          </div>
          <button className="navigation__logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};
