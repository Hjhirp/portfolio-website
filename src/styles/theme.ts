import { createGlobalStyle } from 'styled-components';

export type ThemeType = {
  colors: {
    navy: string;
    lightNavy: string;
    lightestNavy: string;
    slate: string;
    lightSlate: string;
    lightestSlate: string;
    white: string;
    green: string;
    darkGray: string;
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    highlight: string;
    cardBackground: string;
    dark: string;
    light: string;
    gray: string;
    lightGray: string;
    success: string;
    primaryDark: string;
    lightDark: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    heading: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  transitions: {
    default: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
};

const theme: ThemeType = {
  colors: {
    navy: '#0a192f',          // Main background
    lightNavy: '#112240',     // Card background
    lightestNavy: '#233554',  // Lighter card/section
    slate: '#8892b0',         // Main text
    lightSlate: '#a8b2d1',    // Lighter text
    lightestSlate: '#ccd6f6', // Lightest text
    white: '#e6f1ff',         // White text
    green: '#64ffda',         // Accent (primary)
    darkGray: '#495670',
    background: '#0a192f',    // Main background
    foreground: '#ccd6f6',    // Main foreground (lightestSlate)
    primary: '#64ffda',       // Accent (primary)
    secondary: '#112240',     // Card background
    accent: '#64ffda',        // Accent
    highlight: 'rgba(100,255,218,0.1)',
    cardBackground: '#112240',// Card background
    dark: '#ccd6f6',          // Lightest text
    light: '#233554',         // Lighter card/section
    gray: '#8892b0',          // Main text
    lightGray: '#e2e8f0',
    success: '#2ecc40',
    primaryDark: '#53cab5',
    lightDark: '#1a263b',
  },
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    md: '1rem',       // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    xxl: '1.5rem',    // 24px
    heading: '2rem',  // 32px
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  transitions: {
    default: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
  },
  borderRadius: {
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.04)',
    md: '0 2px 8px rgba(0,0,0,0.07)',
    lg: '0 8px 24px rgba(0,0,0,0.12)',
  },
  fonts: {
    primary: 'Inter, sans-serif',
    secondary: 'Poppins, sans-serif',
  },
};

export const lightTheme: ThemeType = {
  ...theme
};

export const darkTheme: ThemeType = {
  ...theme,
  colors: {
    ...theme.colors,
    background: '#0a192f',
    cardBackground: '#112240',
    primary: '#64ffda',
    secondary: '#233554',
    dark: '#ccd6f6',
    light: '#233554',
    gray: '#8892b0',
  },
};

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', sans-serif;
    color: ${theme.colors.slate};
    background-color: ${theme.colors.background};
    line-height: 1.6;
    font-size: ${theme.fontSizes.md};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
    margin-bottom: ${theme.spacing.md};
    font-weight: 600;
    line-height: 1.3;
  }

  h1 {
    font-size: ${theme.fontSizes.heading};
  }

  h2 {
    font-size: ${theme.fontSizes.xxl};
  }

  h3 {
    font-size: ${theme.fontSizes.xl};
  }

  h4 {
    font-size: ${theme.fontSizes.lg};
  }

  p {
    margin-bottom: ${theme.spacing.md};
  }

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: ${theme.transitions.default};

    &:hover {
      color: ${theme.colors.green};
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    font-family: 'Inter', sans-serif;
  }

  section {
    padding: ${theme.spacing.xxl} 0;
  }
`;

export { theme };
export default theme;
