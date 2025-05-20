import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { CVData } from '../../utils/cvUtils';
import { darkTheme } from '../../styles/theme';

interface LayoutProps {
  children: React.ReactNode;
  cvData?: CVData | null;
}

const Main = styled(motion.main)`
  min-height: 100vh;
  padding-top: 80px; // account for fixed navbar
`;

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.3,
    }
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.3,
    }
  }
};

const Layout: React.FC<LayoutProps> = ({ children, cvData }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ minHeight: '100vh', background: darkTheme.colors.background }}>
        <Navbar cvData={cvData} />
        <Main
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
        >
          {children}
        </Main>
        <Footer cvData={cvData} />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
