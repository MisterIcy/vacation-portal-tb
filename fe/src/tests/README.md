# Test Suite

This directory contains the test setup and utilities for the Vacation Portal frontend application.

## Test Stack

- **Vitest**: Fast unit test framework
- **React Testing Library**: Testing utilities for React components
- **@testing-library/jest-dom**: Custom matchers for DOM assertions
- **@testing-library/user-event**: User interaction simulation
- **jsdom**: DOM implementation for Node.js

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Files

### Component Tests

- **Navigation.test.tsx**: Tests for the Navigation component
  - Employee and manager navigation rendering
  - Role-based link visibility
  - Mobile menu functionality
  - Logout functionality

- **Header.test.tsx**: Tests for the Header component
  - Title rendering
  - Navigation integration
  - Logout with navigation flow
  - Semantic HTML structure

- **TokenExpirationHandler.test.tsx**: Tests for token expiration warnings
  - Warning display at < 5 minutes
  - Token expiration handling
  - Periodic checks (every 30 seconds)
  - Authentication state handling
  - Edge cases (missing token, null expiration)

## Test Utilities

### `setup.ts`
Configures the test environment:
- Extends Vitest matchers with jest-dom
- Cleans up after each test

### `test-utils.tsx`
Provides custom render function with providers:
- Wraps components with BrowserRouter
- Wraps components with ThemeProvider
- Supports initial route configuration

Usage:
```typescript
import { render, screen } from '@tests/test-utils';

render(<MyComponent />);
```

## Writing Tests

### Best Practices

1. **Use the custom render function** from `@tests/test-utils` instead of React Testing Library's render
2. **Mock external dependencies** like hooks, utilities, and navigation
3. **Use descriptive test names** that explain the expected behavior
4. **Test user interactions** with `userEvent` instead of `fireEvent`
5. **Avoid implementation details** - test behavior, not implementation
6. **Use `act()` for timer advances** when using fake timers

### Example Test

```typescript
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyComponent } from './MyComponent';
import { render } from '@tests/test-utils';

describe('MyComponent', () => {
  it('should handle button click', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<MyComponent onClick={handleClick} />);

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Configuration

Test configuration is defined in `vitest.config.ts` at the project root.

Key settings:
- **globals**: true (global test functions available)
- **environment**: jsdom (DOM environment for React)
- **setupFiles**: Runs setup.ts before tests
- **Path aliases**: Configured to match tsconfig paths
