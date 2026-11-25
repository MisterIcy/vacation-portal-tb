import { css } from '@emotion/react';
import type { Theme } from '@styles/theme';

export const userFormStyles = (theme: Theme) => css`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;

  .user-form__title {
    margin: 0 0 1.5rem 0;
    color: ${theme.colors.text.primary};
    font-size: 1.75rem;
    font-weight: 600;
  }

  .user-form__card {
    background: ${theme.colors.background.default};
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .user-form__form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .user-form__input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .user-form__label {
    font-size: ${theme.fontSize.sm};
    color: ${theme.colors.text.secondary};
    font-weight: 500;
  }

  .user-form__input {
    padding: 0.75rem;
    border: 1px solid ${theme.colors.border.main};
    border-radius: 4px;
    font-size: ${theme.fontSize.md};
    width: 100%;
    box-sizing: border-box;
  }

  .user-form__input:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
  }

  .user-form__select {
    padding: 0.75rem;
    border: 1px solid ${theme.colors.border.main};
    border-radius: 4px;
    font-size: ${theme.fontSize.md};
    width: 100%;
    box-sizing: border-box;
  }

  .user-form__select:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
  }

  .user-form__button-group {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .user-form__button {
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 4px;
    font-size: ${theme.fontSize.md};
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    display: inline-block;
    text-align: center;
  }

  .user-form__button--submit {
    background-color: ${theme.colors.primary.main};
    color: ${theme.colors.primary.contrast};
  }

  .user-form__button--submit:hover:not(:disabled) {
    background-color: ${theme.colors.primary.dark};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .user-form__button--submit:active:not(:disabled) {
    background-color: ${theme.colors.primary.dark};
    box-shadow: none;
  }

  .user-form__button--submit:disabled {
    background-color: ${theme.colors.background.disabled};
    cursor: not-allowed;
    opacity: 0.6;
  }

  .user-form__button--cancel {
    background-color: ${theme.colors.grey[300]};
    color: ${theme.colors.text.primary};
  }

  .user-form__button--cancel:hover {
    background-color: ${theme.colors.grey[400]};
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .user-form__button--cancel:active {
    background-color: ${theme.colors.grey[400]};
    box-shadow: none;
  }

  .user-form__error-message {
    color: ${theme.colors.error.main};
    font-size: ${theme.fontSize.sm};
    background-color: ${theme.colors.grey[50]};
    padding: 1rem;
    border-radius: 4px;
  }

  .user-form__loading-state {
    padding: 3rem;
    text-align: center;
    color: ${theme.colors.text.secondary};
  }

  .user-form__help-text {
    font-size: ${theme.fontSize.xs};
    color: ${theme.colors.text.secondary};
    margin-top: 0.25rem;
  }
`;
