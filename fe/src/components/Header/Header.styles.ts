import { css } from '@emotion/react';
import type { Theme } from '@styles/theme';

export const headerStyles = (theme: Theme) => css`
  width: 100%;
  background-color: ${theme.colors.primary.main};
  color: ${theme.colors.primary.contrast};
  padding: 1rem 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  position: relative;

  .header__content {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }

  .header__title {
    margin: 0;
    font-size: ${theme.fontSize.xxl};
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: ${theme.fontSize.xl};
    }
  }
`;
