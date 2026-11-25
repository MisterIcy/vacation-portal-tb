import { css } from '@emotion/react';
import type { Theme } from '@styles/theme';

export const vacationListStyles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .vacation-list__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .vacation-list__title {
    margin: 0;
    color: ${theme.colors.text.primary};
    font-size: 1.75rem;
    font-weight: 600;
  }

  .vacation-list__table {
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

  .vacation-list__table-head {
    background-color: ${theme.colors.background.paper};

    @media (max-width: 768px) {
      display: none;
    }
  }

  .vacation-list__th {
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

  .vacation-list__td {
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

        &::before {
          content: '';
          display: none;
        }
      }
    }
  }

  .vacation-list__status-badge {
    display: inline-block;
    padding: 0.25rem 1rem;
    border-radius: 12px;
    font-size: ${theme.fontSize.sm};
    font-weight: 500;
  }

  .vacation-list__status-badge--pending {
    background-color: ${theme.colors.status.pending.bg};
    color: ${theme.colors.status.pending.text};
  }

  .vacation-list__status-badge--approved {
    background-color: ${theme.colors.status.approved.bg};
    color: ${theme.colors.status.approved.text};
  }

  .vacation-list__status-badge--rejected {
    background-color: ${theme.colors.status.rejected.bg};
    color: ${theme.colors.status.rejected.text};
  }

  .vacation-list__button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    font-size: ${theme.fontSize.sm};
    cursor: pointer;
    transition: all 0.2s ease;
    margin-right: 0.5rem;

    @media (max-width: 768px) {
      margin-right: 0;
      margin-bottom: 0.5rem;
      width: 100%;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .vacation-list__button--delete {
    background-color: ${theme.colors.error.light};
    color: ${theme.colors.error.contrast};
  }

  .vacation-list__button--delete:hover:not(:disabled) {
    background-color: ${theme.colors.error.main};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .vacation-list__button--delete:active:not(:disabled) {
    background-color: ${theme.colors.error.main};
    box-shadow: none;
  }

  .vacation-list__button--delete:disabled {
    background-color: ${theme.colors.background.disabled};
    cursor: not-allowed;
    opacity: 0.6;
  }

  .vacation-list__button--approve {
    background-color: ${theme.colors.success.light};
    color: ${theme.colors.success.contrast};
  }

  .vacation-list__button--approve:hover:not(:disabled) {
    background-color: ${theme.colors.success.main};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .vacation-list__button--approve:active:not(:disabled) {
    background-color: ${theme.colors.success.main};
    box-shadow: none;
  }

  .vacation-list__button--reject {
    background-color: ${theme.colors.warning.light};
    color: ${theme.colors.warning.contrast};
  }

  .vacation-list__button--reject:hover:not(:disabled) {
    background-color: ${theme.colors.warning.main};
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .vacation-list__button--reject:active:not(:disabled) {
    background-color: ${theme.colors.warning.main};
    box-shadow: none;
  }

  .vacation-list__empty-state {
    padding: 3rem;
    text-align: center;
    color: ${theme.colors.text.disabled};
  }

  .vacation-list__loading-state {
    padding: 3rem;
    text-align: center;
    color: ${theme.colors.text.secondary};
  }
`;
