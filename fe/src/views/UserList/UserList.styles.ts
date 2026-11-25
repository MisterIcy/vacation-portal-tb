import { css } from '@emotion/react';
import type { Theme } from '@styles/theme';

export const userListStyles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .user-list__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user-list__title {
    margin: 0;
    color: ${theme.colors.text.primary};
    font-size: 1.75rem;
    font-weight: 600;
  }

  .user-list__add-button {
    padding: 1rem 1.5rem;
    background-color: ${theme.colors.primary.main};
    color: ${theme.colors.primary.contrast};
    text-decoration: none;
    border-radius: 4px;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .user-list__add-button:hover {
    background-color: ${theme.colors.primary.dark};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .user-list__add-button:active {
    background-color: ${theme.colors.primary.dark};
    box-shadow: none;
  }

  .user-list__table {
    width: 100%;
    background: ${theme.colors.background.default};
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    border-collapse: collapse;

    @media (max-width: 768px) {
      display: block;
      box-shadow: none;
      background: transparent;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
  }

  .user-list__table-head {
    background-color: ${theme.colors.background.paper};

    @media (max-width: 768px) {
      display: none;
    }
  }

  .user-list__th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: ${theme.colors.text.secondary};
    border-bottom: 2px solid ${theme.colors.border.main};
  }

  tbody {
    @media (max-width: 768px) {
      display: block;
    }
  }

  tbody tr {
    @media (max-width: 768px) {
      display: block;
      margin-bottom: 1rem;
      background: ${theme.colors.background.default};
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }

  .user-list__td {
    padding: 1rem;
    border-bottom: 1px solid ${theme.colors.border.light};

    @media (max-width: 768px) {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border: none;

      &::before {
        content: attr(data-label);
        font-weight: 600;
        color: ${theme.colors.text.secondary};
        flex-shrink: 0;
        margin-right: 1rem;
      }

      &:last-child {
        padding-bottom: 0;
        margin-top: 0.5rem;
        border-top: 1px solid ${theme.colors.border.light};
        padding-top: 0.75rem;
        flex-direction: column;
        gap: 0.5rem;

        &::before {
          content: '';
          display: none;
        }
      }
    }
  }

  .user-list__role-badge {
    display: inline-block;
    padding: 0.25rem 1rem;
    border-radius: 12px;
    font-size: ${theme.fontSize.sm};
    font-weight: 500;
  }

  .user-list__role-badge--manager {
    background-color: ${theme.colors.role.manager.bg};
    color: ${theme.colors.role.manager.text};
  }

  .user-list__role-badge--employee {
    background-color: ${theme.colors.role.employee.bg};
    color: ${theme.colors.role.employee.text};
  }

  .user-list__button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    font-size: ${theme.fontSize.sm};
    cursor: pointer;
    transition: all 0.2s ease;
    margin-right: 0.5rem;
    text-decoration: none;
    display: inline-block;

    @media (max-width: 768px) {
      margin-right: 0;
      margin-bottom: 0.5rem;
      width: 100%;
      text-align: center;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .user-list__button--edit {
    background-color: ${theme.colors.primary.light};
    color: ${theme.colors.primary.contrast};
  }

  .user-list__button--edit:hover {
    background-color: ${theme.colors.primary.main};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .user-list__button--edit:active {
    background-color: ${theme.colors.primary.main};
    box-shadow: none;
  }

  .user-list__button--delete {
    background-color: ${theme.colors.error.light};
    color: ${theme.colors.error.contrast};
  }

  .user-list__button--delete:hover:not(:disabled) {
    background-color: ${theme.colors.error.main};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .user-list__button--delete:active:not(:disabled) {
    background-color: ${theme.colors.error.main};
    box-shadow: none;
  }

  .user-list__button--delete:disabled {
    background-color: ${theme.colors.background.disabled};
    cursor: not-allowed;
    opacity: 0.6;
  }

  .user-list__empty-state {
    padding: 3rem;
    text-align: center;
    color: ${theme.colors.text.disabled};
  }

  .user-list__loading-state {
    padding: 3rem;
    text-align: center;
    color: ${theme.colors.text.secondary};
  }
`;
