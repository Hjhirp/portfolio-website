import { createGlobalStyle } from "styled-components";

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
    navy: "#f6f4ec", // Main background
    lightNavy: "#eeece3", // Card background
    lightestNavy: "#dedbcf", // Lighter card/section
    slate: "#68665e", // Main text
    lightSlate: "#68665e", // Lighter text
    lightestSlate: "#252621", // Lightest text
    white: "#252621", // White text
    green: "#ad3e16", // Accent (primary)
    darkGray: "#68665e",
    background: "#f6f4ec", // Main background
    foreground: "#252621", // Main foreground (lightestSlate)
    primary: "#ad3e16", // Accent (primary)
    secondary: "#eeece3", // Card background
    accent: "#ad3e16", // Accent
    highlight: "#f2e2d5",
    cardBackground: "#eeece3", // Card background
    dark: "#252621", // Lightest text
    light: "#dedbcf", // Lighter card/section
    gray: "#68665e", // Main text
    lightGray: "#e2e8f0",
    success: "#2ecc40",
    primaryDark: "#92320f",
    lightDark: "#e8e4d8",
  },
  fontSizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    xxl: "1.5rem", // 24px
    heading: "2rem", // 32px
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  transitions: {
    default: "all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)",
  },
  borderRadius: {
    sm: "0.5rem",
    md: "1rem",
    lg: "2rem",
  },
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.04)",
    md: "0 2px 8px rgba(0,0,0,0.07)",
    lg: "0 8px 24px rgba(0,0,0,0.12)",
  },
  fonts: {
    primary: "Inter, sans-serif",
    secondary: "Poppins, sans-serif",
  },
};

export const lightTheme: ThemeType = {
  ...theme,
};

export const darkTheme: ThemeType = {
  ...theme,
  colors: {
    ...theme.colors,
    background: "#f6f4ec",
    cardBackground: "#eeece3",
    primary: "#ad3e16",
    secondary: "#dedbcf",
    dark: "#252621",
    light: "#dedbcf",
    gray: "#68665e",
  },
};

export const GlobalStyles = createGlobalStyle`
*{box-sizing:border-box;}body{margin:0;background:#f6f4ec;color:#252621;font-family:Arial,Helvetica,sans-serif;line-height:1.65;-webkit-font-smoothing:antialiased;}h1,h2,h3,h4,p{margin:0 0 18px;}h1,h2,h3,h4{line-height:1.15;}a{color:inherit;text-decoration:none;}a:hover{color:#ad3e16;}p{color:#55554d;}img{max-width:100%;}button{font:inherit;}a,button,summary{touch-action:manipulation;} :focus-visible{outline:2px solid #ad3e16;outline-offset:5px;}::selection{background:#eec9af;}html{scroll-behavior:smooth;}.skip{position:fixed;top:-100px;left:12px;background:#fff;padding:12px;z-index:100;}.skip:focus{top:12px;}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto;}*,*::before,*::after{animation:none!important;transition:none!important;}}
`;
export { theme };
export default theme;
