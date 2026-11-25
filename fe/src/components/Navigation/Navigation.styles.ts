import { css } from '@emotion/react';
import type { Theme } from '@styles/theme';

export const navigationStyles = (theme: Theme, mobileMenuOpen: boolean) => css`
  display: flex;
  align-items: center;

  .navigation__mobile-menu-button {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 1001;

    @media (max-width: 768px) {
      display: flex;
    }
  }

  .navigation__hamburger {
    width: 24px;
    height: 2px;
    background-color: ${theme.colors.primary.contrast};
    transition: all 0.3s ease;
    display: block;
  }

  .navigation__nav {
    display: flex;
    gap: 2rem;
    align-items: center;

    @media (max-width: 768px) {
      position: fixed;
      top: 0;
      right: ${mobileMenuOpen ? '0' : '-100%'};
      height: 100vh;
      width: 80%;
      max-width: 300px;
      background-color: ${theme.colors.primary.main};
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      padding: 4rem 0 2rem;
      box-shadow: ${mobileMenuOpen ? '-2px 0 8px rgba(0, 0, 0, 0.2)' : 'none'};
      transition: right 0.3s ease;
      z-index: 1000;
      overflow-y: auto;
    }
  }

  .navigation__nav-link {
    color: ${theme.colors.primary.contrast};
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.2s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      color: ${theme.colors.primary.contrast};
    }

    &:active {
      background-color: rgba(255, 255, 255, 0.15);
    }

    @media (max-width: 768px) {
      padding: 1rem 1.5rem;
      border-radius: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  .navigation__user-info {
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      margin-top: auto;
      padding: 1rem 0;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  .navigation__user-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-start;

    @media (max-width: 768px) {
      align-items: center;
      padding: 1rem 1.5rem;
    }
  }

  .navigation__user-name {
    font-size: ${theme.fontSize.sm};
    font-weight: 500;
    color: ${theme.colors.primary.contrast};
  }

  .navigation__role-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: ${theme.fontSize.xs};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .navigation__role-badge--manager {
    background-color: ${theme.colors.role.manager.bg};
    color: ${theme.colors.role.manager.text};
    border: 1px solid ${theme.colors.role.manager.text};
  }

  .navigation__role-badge--employee {
    background-color: ${theme.colors.role.employee.bg};
    color: ${theme.colors.role.employee.text};
    border: 1px solid ${theme.colors.role.employee.text};
  }

  .navigation__logout-button {
    background-color: rgba(255, 255, 255, 0.1);
    color: ${theme.colors.primary.contrast};
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    font-size: ${theme.fontSize.sm};
    transition: all 0.2s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
      color: ${theme.colors.primary.contrast};
    }

    &:active {
      background-color: rgba(255, 255, 255, 0.15);
    }

    @media (max-width: 768px) {
      margin: 0 1.5rem;
      width: calc(100% - 3rem);
      padding: 1rem;
      border-radius: 4px;
    }
  }
`;
