import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import { render } from '@tests/test-utils';
import type { User } from '@domains/auth/types';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Header', () => {
  const mockOnLogout = vi.fn();

  const testUser: User = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    role: 'employee',
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the header with title', () => {
    render(<Header user={testUser} onLogout={mockOnLogout} />);

    expect(screen.getByText('Vacation Portal')).toBeInTheDocument();
  });

  it('should render the header as a header element', () => {
    render(<Header user={testUser} onLogout={mockOnLogout} />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('should render Navigation component', () => {
    render(<Header user={testUser} onLogout={mockOnLogout} />);

    // Navigation should render user name and logout
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('should call onLogout and navigate to login when logout is clicked', async () => {
    const user = userEvent.setup();
    render(<Header user={testUser} onLogout={mockOnLogout} />);

    const logoutButton = screen.getByText('Logout');
    await user.click(logoutButton);

    expect(mockOnLogout).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('should navigate to login after logout', async () => {
    const user = userEvent.setup();
    render(<Header user={testUser} onLogout={mockOnLogout} />);

    const logoutButton = screen.getByText('Logout');
    await user.click(logoutButton);

    // Ensure navigation happens after logout
    expect(mockOnLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(mockNavigate).toHaveBeenCalledAfter(mockOnLogout);
  });

  it('should handle null user gracefully', () => {
    render(<Header user={null} onLogout={mockOnLogout} />);

    expect(screen.getByText('Vacation Portal')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('should pass user prop to Navigation component', () => {
    render(<Header user={testUser} onLogout={mockOnLogout} />);

    // Verify Navigation received the user by checking user name
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });
  
  describe('Header Structure', () => {
    it('should have correct semantic structure', () => {
      const { container } = render(<Header user={testUser} onLogout={mockOnLogout} />);

      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();

      const title = screen.getByRole('heading', { level: 1 });
      expect(title).toHaveTextContent('Vacation Portal');
    });
  });
});
