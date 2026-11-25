import { css } from '@emotion/react';
import type { Theme } from '@styles/theme';

export const managerDashboardStyles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .manager-dashboard__welcome {
    background: ${theme.colors.background.default};
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .manager-dashboard__title {
    margin: 0 0 1rem 0;
    color: ${theme.colors.text.primary};
    font-size: 1.75rem;
    font-weight: 600;
  }

  .manager-dashboard__description {
    margin: 0 0 1.5rem 0;
    color: ${theme.colors.text.secondary};
    line-height: 1.5;
  }

  .manager-dashboard__stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .manager-dashboard__stat-card {
    background: ${theme.colors.background.default};
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .manager-dashboard__stat-label {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.fontSize.sm};
    margin-bottom: 0.5rem;
  }

  .manager-dashboard__stat-value {
    color: ${theme.colors.primary.main};
    font-size: ${theme.fontSize.xxxl};
    font-weight: 600;
  }

  .manager-dashboard__actions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .manager-dashboard__action-card {
    background: ${theme.colors.background.default};
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .manager-dashboard__action-title {
    font-size: ${theme.fontSize.lg};
    font-weight: 600;
    color: ${theme.colors.text.primary};
    margin: 0;
  }

  .manager-dashboard__action-description {
    font-size: ${theme.fontSize.sm};
    color: ${theme.colors.text.secondary};
    margin: 0;
  }

  .manager-dashboard__action-button {
    display: inline-block;
    padding: 1rem 1.5rem;
    background-color: ${theme.colors.primary.main};
    color: ${theme.colors.primary.contrast};
    text-decoration: none;
    border-radius: 4px;
    font-weight: 600;
    text-align: center;
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
