import { css, keyframes } from '@emotion/react';
import type { Theme } from '@styles/theme';

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;

export const tokenExpirationWarningStyles = (theme: Theme) => css`
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  animation: ${slideDown} 0.3s ease-out;

  .token-expiration-warning__content {
    background-color: #fff3cd;
    border: 1px solid ${theme.colors.warning.main};
    border-radius: 4px;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .token-expiration-warning__icon {
    font-size: ${theme.fontSize.xl};
    line-height: 1.2;
  }

  .token-expiration-warning__message {
    color: #856404;
    font-weight: 500;
    font-size: ${theme.fontSize.sm};
  }
`;
