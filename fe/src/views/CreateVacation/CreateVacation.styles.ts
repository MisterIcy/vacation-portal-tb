import { css } from '@emotion/react';
import type { Theme } from '@styles/theme';

export const createVacationStyles = (theme: Theme) => css`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;

  .create-vacation__title {
    margin: 0 0 1.5rem 0;
    color: ${theme.colors.text.primary};
    font-size: 1.75rem;
    font-weight: 600;
  }

  .create-vacation__card {
    background: ${theme.colors.background.default};
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .create-vacation__form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .create-vacation__input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .create-vacation__label {
    font-size: ${theme.fontSize.sm};
    color: ${theme.colors.text.secondary};
    font-weight: 500;
  }

  .create-vacation__input {
    padding: 0.75rem;
    border: 1px solid ${theme.colors.border.main};
    border-radius: 4px;
    font-size: ${theme.fontSize.md};
    width: 100%;
    box-sizing: border-box;
  }

  .create-vacation__input:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
  }

  .create-vacation__textarea {
    padding: 0.75rem;
    border: 1px solid ${theme.colors.border.main};
    border-radius: 4px;
    font-size: ${theme.fontSize.md};
    width: 100%;
    box-sizing: border-box;
    min-height: 100px;
    resize: vertical;
    font-family: inherit;
  }

  .create-vacation__textarea:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
  }

  .create-vacation__button-group {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .create-vacation__button {
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

  .create-vacation__button--submit {
    background-color: ${theme.colors.primary.main};
    color: ${theme.colors.primary.contrast};
  }

  .create-vacation__button--submit:hover:not(:disabled) {
    background-color: ${theme.colors.primary.dark};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .create-vacation__button--submit:active:not(:disabled) {
    background-color: ${theme.colors.primary.dark};
    box-shadow: none;
  }

  .create-vacation__button--submit:disabled {
    background-color: ${theme.colors.background.disabled};
    cursor: not-allowed;
    opacity: 0.6;
  }

  .create-vacation__button--cancel {
    background-color: ${theme.colors.grey[300]};
    color: ${theme.colors.text.primary};
  }

  .create-vacation__button--cancel:hover {
    background-color: ${theme.colors.grey[400]};
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .create-vacation__button--cancel:active {
    background-color: ${theme.colors.grey[400]};
    box-shadow: none;
  }

  .create-vacation__error-message {
    color: ${theme.colors.error.main};
    font-size: ${theme.fontSize.sm};
    background-color: ${theme.colors.grey[50]};
    padding: 1rem;
    border-radius: 4px;
  }
`;
