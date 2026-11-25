# Vacation Portal - Frontend

A modern React application for managing employee vacation requests built with TypeScript and Domain-Driven Design principles.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Test Users

The backend is seeded with test users for development:

| Role     | Email                  | Password         | Name          |
|----------|------------------------|------------------|---------------|
| Manager  | manager@example.com    | managerpass123   | Manager User  |
| Employee | employee@example.com   | employeepass123  | Employee User |

## Development

### Available Commands

```bash
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build

npm test             # Run tests in watch mode
npm run test:ui      # Open interactive test UI
npm run test:coverage # Generate coverage report

npm run lint         # Check code quality
npm run lint:fix     # Auto-fix linting issues
npm run type-check   # Run TypeScript checks
npm run validate     # Run lint + type-check
```

## Project Structure

The application follows Domain-Driven Design with clear separation of concerns:

```
src/
├── api/              # API client & query configuration
├── components/       # Reusable UI components
│   ├── Header/
│   ├── Layout/
│   ├── Navigation/
│   └── ...
├── context/          # React Context providers
├── domains/          # Business logic (DDD)
│   ├── auth/         # Authentication
│   ├── users/        # User management
│   └── vacations/    # Vacation requests
├── hooks/            # Custom React hooks
├── routes/           # Routing configuration
├── styles/           # Global styles & theme
├── tests/            # Test utilities
├── utils/            # Helper functions
└── views/            # Page components
```

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Emotion** - CSS-in-JS styling
- **React Router v7** - Routing
- **TanStack Query** - Server state
- **Vitest** - Testing framework
- **React Testing Library** - Component tests

## Code Quality

### Linting

ESLint is configured with TypeScript and React-specific rules:

```bash
npm run lint      # Check for issues
npm run lint:fix  # Auto-fix issues
```

### Type Checking

TypeScript provides compile-time type safety:

```bash
npm run type-check  # Verify types
```

### Testing

Comprehensive test suite with Vitest and React Testing Library:

```bash
npm test                 # Watch mode
npm run test:coverage    # Coverage report (HTML in coverage/)
npm run test:ui          # Visual test runner
```

Current coverage: ~15% (3 components fully tested)

### Validation

Run all quality checks before committing:

```bash
npm run validate  # Runs lint + type-check
```

## Architecture Patterns

### Domain-Driven Design

Business logic is organized into domains (`auth`, `users`, `vacations`), each containing:
- API functions
- Type definitions
- Domain-specific logic

### State Management

- **Server State**: TanStack Query for API data, caching, and mutations
- **Global State**: React Context for auth and shared state
- **Local State**: React hooks for component state

### Styling

Emotion CSS-in-JS with a centralized theme system:
- Theme config in `src/styles/theme.ts`
- Component styles use Emotion's `css` prop
- BEM-style class naming convention

### Testing Philosophy

- **Unit tests** for utilities and hooks
- **Component tests** for UI components
- Focus on user behavior, not implementation details
- Tests co-located with components (`*.test.tsx`)

## Development Guidelines

### Component Organization

```typescript
// Component structure
ComponentName/
  ├── ComponentName.tsx        # Component logic
  ├── ComponentName.styles.ts  # Emotion styles
  ├── ComponentName.test.tsx   # Tests
  └── index.ts                 # Public exports
```

### Path Aliases

Import using clean aliases instead of relative paths:

```typescript
import { theme } from '@styles/theme';
import { useAuth } from '@hooks/useAuth';
import { getUsers } from '@domains/users/api';
```

### Type Safety

All components are fully typed with TypeScript. Avoid `any` types - use proper interfaces and types.
