import { css } from '@emotion/react';
import type { Theme } from '@styles/theme';

export const loginStyles = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.background.paper};
  box-sizing: border-box;

  .login__form {
    background: ${theme.colors.background.default};
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .login__title {
    font-size: 1.75rem;
    color: ${theme.colors.text.primary};
    text-align: center;
    margin: 0;
    font-weight: 600;
  }

  .login__input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .login__label {
    font-size: ${theme.fontSize.sm};
    color: ${theme.colors.text.secondary};
    font-weight: 500;
  }

  .login__input {
    padding: 1rem;
    border: 1px solid ${theme.colors.border.main};
    border-radius: 4px;
    font-size: ${theme.fontSize.md};
    width: 100%;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary.main};
      box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
    }
  }

  .login__submit-button {
    padding: 1rem;
    background-color: ${theme.colors.primary.main};
    color: ${theme.colors.primary.contrast};
    border: none;
    border-radius: 4px;
    font-size: ${theme.fontSize.md};
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background-color: ${theme.colors.primary.dark};
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    &:active:not(:disabled) {
      background-color: ${theme.colors.primary.dark};
      box-shadow: none;
    }

    &:disabled {
      background-color: ${theme.colors.background.disabled};
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  .login__error-message {
    color: ${theme.colors.error.main};
    font-size: ${theme.fontSize.sm};
    text-align: center;
    background-color: ${theme.colors.grey[50]};
    padding: 1rem;
    border-radius: 4px;
  }
`;
