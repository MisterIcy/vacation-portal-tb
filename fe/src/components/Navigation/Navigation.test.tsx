import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navigation } from './Navigation';
import { render } from '@tests/test-utils';
import type { User } from '@domains/auth/types';

describe('Navigation', () => {
  const mockOnLogout = vi.fn();

  const employeeUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'employee',
  };

  const managerUser: User = {
    id: 2,
    name: 'Jane Manager',
    email: 'jane@example.com',
    role: 'manager',
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Employee Navigation', () => {
    it('should render employee navigation links', () => {
      render(<Navigation user={employeeUser} onLogout={mockOnLogout} />);

      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('My Vacations')).toBeInTheDocument();
      expect(screen.getByText('Request Vacation')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('should not render manager-only links for employees', () => {
      render(<Navigation user={employeeUser} onLogout={mockOnLogout} />);

      expect(screen.queryByText('Vacation Requests')).not.toBeInTheDocument();
      expect(screen.queryByText('Manage Users')).not.toBeInTheDocument();
    });

    it('should have correct href for employee links', () => {
      render(<Navigation user={employeeUser} onLogout={mockOnLogout} />);

      const myVacationsLink = screen.getByText('My Vacations').closest('a');
      const requestVacationLink = screen.getByText('Request Vacation').closest('a');

      expect(myVacationsLink).toHaveAttribute('href', '/vacations');
      expect(requestVacationLink).toHaveAttribute('href', '/vacations/new');
    });
  });

  describe('Manager Navigation', () => {
    it('should render manager navigation links', () => {
      render(<Navigation user={managerUser} onLogout={mockOnLogout} />);

      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Vacation Requests')).toBeInTheDocument();
      expect(screen.getByText('Manage Users')).toBeInTheDocument();
      expect(screen.getByText('Jane Manager')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('should not render employee-only links for managers', () => {
      render(<Navigation user={managerUser} onLogout={mockOnLogout} />);

      expect(screen.queryByText('My Vacations')).not.toBeInTheDocument();
      expect(screen.queryByText('Request Vacation')).not.toBeInTheDocument();
    });

    it('should have correct href for manager links', () => {
      render(<Navigation user={managerUser} onLogout={mockOnLogout} />);

      const dashboardLink = screen.getByText('Dashboard').closest('a');
      const vacationRequestsLink = screen.getByText('Vacation Requests').closest('a');
      const manageUsersLink = screen.getByText('Manage Users').closest('a');

      expect(dashboardLink).toHaveAttribute('href', '/dashboard/manager');
      expect(vacationRequestsLink).toHaveAttribute('href', '/vacations');
      expect(manageUsersLink).toHaveAttribute('href', '/users');
    });
  });

  describe('Logout Functionality', () => {
    it('should call onLogout when logout button is clicked', async () => {
      const user = userEvent.setup();
      render(<Navigation user={employeeUser} onLogout={mockOnLogout} />);

      const logoutButton = screen.getByText('Logout');
      await user.click(logoutButton);

      expect(mockOnLogout).toHaveBeenCalledTimes(1);
    });
  });

  describe('Mobile Menu', () => {
    it('should render hamburger menu button', () => {
      render(<Navigation user={employeeUser} onLogout={mockOnLogout} />);

      const menuButton = screen.getByLabelText('Toggle menu');
      expect(menuButton).toBeInTheDocument();
    });

    it('should toggle mobile menu state when hamburger is clicked', async () => {
      const user = userEvent.setup();
      render(<Navigation user={employeeUser} onLogout={mockOnLogout} />);

      const menuButton = screen.getByLabelText('Toggle menu');

      // Click to open
      await user.click(menuButton);

      // Click to close
      await user.click(menuButton);

      // Button should still be in the document
      expect(menuButton).toBeInTheDocument();
    });

    it('should close mobile menu when a navigation link is clicked', async () => {
      const user = userEvent.setup();
      render(<Navigation user={employeeUser} onLogout={mockOnLogout} />);

      const menuButton = screen.getByLabelText('Toggle menu');
      await user.click(menuButton);

      const myVacationsLink = screen.getByText('My Vacations');
      await user.click(myVacationsLink);

      // Menu should still be functional after clicking a link
      expect(menuButton).toBeInTheDocument();
    });

    it('should close mobile menu when logout is clicked', async () => {
      const user = userEvent.setup();
      render(<Navigation user={employeeUser} onLogout={mockOnLogout} />);

      const menuButton = screen.getByLabelText('Toggle menu');
      await user.click(menuButton);

      const logoutButton = screen.getByText('Logout');
      await user.click(logoutButton);

      await waitFor(() => {
        expect(mockOnLogout).toHaveBeenCalled();
      });
    });
  });

  describe('Null User Handling', () => {
    it('should render only user info section when user is null', () => {
      render(<Navigation user={null} onLogout={mockOnLogout} />);

      expect(screen.queryByText('My Vacations')).not.toBeInTheDocument();
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });
  });
});
