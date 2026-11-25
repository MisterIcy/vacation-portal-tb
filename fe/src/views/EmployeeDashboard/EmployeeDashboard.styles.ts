import { css } from '@emotion/react';
import type { Theme } from '@styles/theme';

export const employeeDashboardStyles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .employee-dashboard__welcome {
    background: ${theme.colors.background.default};
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .employee-dashboard__title {
    margin: 0 0 1rem 0;
    color: ${theme.colors.text.primary};
    font-size: 1.75rem;
    font-weight: 600;
  }

  .employee-dashboard__description {
    margin: 0 0 1.5rem 0;
    color: ${theme.colors.text.secondary};
    line-height: 1.6;
  }

  .employee-dashboard__action-button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: ${theme.colors.primary.main};
    color: ${theme.colors.primary.contrast};
    text-decoration: none;
    border-radius: 4px;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${theme.colors.primary.dark};
      box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
    }

    &:active {
      background-color: ${theme.colors.primary.dark};
      box-shadow: none;
    }
  }

  .employee-dashboard__stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .employee-dashboard__stat-card {
    background: ${theme.colors.background.default};
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .employee-dashboard__stat-label {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.fontSize.sm};
    margin-bottom: 0.5rem;
  }

  .employee-dashboard__stat-value {
    color: ${theme.colors.primary.main};
    font-size: ${theme.fontSize.xxxl};
    font-weight: 600;
  }
`;
