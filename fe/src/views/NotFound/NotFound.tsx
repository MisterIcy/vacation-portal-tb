/** @jsxImportSource @emotion/react */
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import type { Theme } from '@styles/theme';
import { notFoundStyles } from './NotFound.styles';

export const NotFound = () => {
  const theme = useTheme() as Theme;
  const location = useLocation();

  console.log('404 Page Rendered - Path:', location.pathname);

  return (
    <div css={notFoundStyles(theme)}>
      <h1 className="not-found__error-code">404</h1>
      <h2 className="not-found__title">Page Not Found</h2>
      <p className="not-found__message">
        The page you're looking for doesn't exist or has been moved.
        <br />
        <small style={{ color: '#999', fontSize: '0.875rem' }}>
          Attempted path: {location.pathname}
        </small>
      </p>
      <Link to="/" className="not-found__home-button">
        Go to Home
      </Link>
    </div>
  );
};
