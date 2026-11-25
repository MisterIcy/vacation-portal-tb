export const theme = {
  colors: {
    primary: {
      main: '#1976d2',
      dark: '#1565c0',
      light: '#42a5f5',
      contrast: '#ffffff',
    },
    success: {
      main: '#2e7d32',
      dark: '#1b5e20',
      light: '#4caf50',
      contrast: '#ffffff',
    },
    error: {
      main: '#d32f2f',
      dark: '#c62828',
      light: '#ef5350',
      contrast: '#ffffff',
    },
    warning: {
      main: '#ed6c02',
      dark: '#e65100',
      light: '#ff9800',
      contrast: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      disabled: '#999999',
      hint: '#aaaaaa',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
      hover: '#f0f0f0',
      disabled: '#e0e0e0',
    },
    border: {
      main: '#dddddd',
      light: '#eeeeee',
      dark: '#cccccc',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    status: {
      pending: {
        bg: '#fff3e0',
        text: '#ff9800',
      },
      approved: {
        bg: '#e8f5e9',
        text: '#4caf50',
      },
      rejected: {
        bg: '#ffebee',
        text: '#f44336',
      },
    },
    role: {
      admin: {
        bg: '#f3e5f5',
        text: '#9c27b0',
      },
      manager: {
        bg: '#e3f2fd',
        text: '#2196f3',
      },
      employee: {
        bg: '#f5f5f5',
        text: '#4caf50',
      },
    },
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
    xxxl: '2rem',
  },
} as const;

export type Theme = typeof theme;
