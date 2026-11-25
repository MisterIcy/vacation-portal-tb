/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import type { Theme } from '@styles/theme';
import type { User } from '@domains/auth/types';
import { Navigation } from '@components/Navigation/Navigation';
import { headerStyles } from './Header.styles';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

export const Header = ({ user, onLogout }: HeaderProps) => {
  const theme = useTheme() as Theme;
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header css={headerStyles(theme)}>
      <div className="header__content">
        <h1 className="header__title">Vacation Portal</h1>
        <Navigation user={user} onLogout={handleLogout} />
      </div>
    </header>
  );
};
