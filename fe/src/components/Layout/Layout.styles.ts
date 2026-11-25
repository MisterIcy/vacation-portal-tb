import { css } from '@emotion/react';
import type { Theme } from '@styles/theme';

export const layoutStyles = (theme: Theme) => css`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  .layout__main {
    flex: 1;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    box-sizing: border-box;
    overflow-y: auto;
    background-color: ${theme.colors.background.paper};

    @media (max-width: 768px) {
      padding: 1rem;
    }
  }
`;
