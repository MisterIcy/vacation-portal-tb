import { css } from '@emotion/react';
import type { Theme } from '@styles/theme';

export const notFoundStyles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: ${theme.colors.background.paper};
  padding: 2rem;
  text-align: center;

  .not-found__error-code {
    font-size: 8rem;
    font-weight: 700;
    color: ${theme.colors.primary.main};
    margin: 0;
    line-height: 1.2;
  }

  .not-found__title {
    font-size: ${theme.fontSize.xxxl};
    font-weight: 600;
    color: ${theme.colors.text.primary};
    margin: 1rem 0;
  }

  .not-found__message {
    font-size: ${theme.fontSize.lg};
    color: ${theme.colors.text.secondary};
    margin: 1rem 0 2rem;
    max-width: 500px;
  }

  .not-found__home-button {
    padding: 1rem 1.5rem;
    background-color: ${theme.colors.primary.main};
    color: ${theme.colors.primary.contrast};
    text-decoration: none;
    border-radius: 4px;
    font-weight: 600;
    font-size: ${theme.fontSize.md};
    transition: all 0.2s ease;

    &:hover {
      background-color: ${theme.colors.primary.dark};
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    &:active {
      background-color: ${theme.colors.primary.dark};
      box-shadow: none;
    }
  }
`;
