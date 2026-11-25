/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react';
import { useAuth } from '@hooks/useAuth';
import type { ReactNode } from 'react';
import type { Theme } from '@styles/theme';
import { Header } from '@components/Header/Header';
import { layoutStyles } from './Layout.styles';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme() as Theme;
  const { user, logout } = useAuth();

  return (
    <div css={layoutStyles(theme)}>
      <Header user={user} onLogout={logout} />
      <main className="layout__main">{children}</main>
    </div>
  );
};
