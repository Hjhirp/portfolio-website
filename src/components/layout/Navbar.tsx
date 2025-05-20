import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import { Container } from '../common/StyledComponents';
import { CVData } from '../../utils/cvUtils';

interface NavbarProps {
  cvData?: CVData | null;
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
}

const StyledHeader = styled(motion.header)<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: ${({ scrolled, theme }) =>
    scrolled ? theme.colors.navy : 'transparent'};
  box-shadow: ${({ scrolled, theme }) =>
    scrolled ? theme.shadows.sm : 'none'};
  transition: all 0.3s ease;
  backdrop-filter: ${({ scrolled }) => (scrolled ? 'blur(8px)' : 'none')};
  padding: ${({ scrolled }) => (scrolled ? '0.75rem 0' : '1.5rem 0')};
`;

const NavContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  font-family: ${theme.fonts.secondary};
  color: ${theme.colors.dark};
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const NavMenu = styled.nav`
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: ${theme.spacing.lg};
`;

const NavItem = styled.li``;

const NavLink = styled(Link)<{ $active?: boolean }>`
  font-size: ${theme.fontSizes.md};
  font-weight: 500;
  color: ${props => props.$active ? theme.colors.primary : theme.colors.dark};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${props => props.$active ? '100%' : '0'};
    height: 2px;
    background-color: ${theme.colors.primary};
    transition: ${theme.transitions.default};
  }
  
  &:hover {
    color: ${theme.colors.primary};
    
    &:after {
      width: 100%;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
`;

const SocialLink = styled.a`
  color: ${theme.colors.dark};
  font-size: 1.25rem;
  transition: ${theme.transitions.default};
  
  &:hover {
    color: ${theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.colors.dark};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.98);
  z-index: 999;
  padding: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
  }
`;

const MobileNavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xxl};
`;

const MobileNavItem = styled(motion.li)``;

const MobileNavLink = styled(Link)`
  font-size: ${theme.fontSizes.xl};
  font-weight: 600;
  color: ${theme.colors.dark};
  display: block;
  padding: ${theme.spacing.sm} 0;
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  background: none;
  border: none;
  color: ${theme.colors.dark};
  font-size: 1.5rem;
  cursor: pointer;
`;

const MobileSocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};
`;

const Navbar: React.FC<NavbarProps> = ({ cvData, darkMode, setDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState('/');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Set active path
    setActivePath(window.location.pathname);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Disable scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const handleMobileMenuClick = (path: string) => {
    setMobileMenuOpen(false);
    setActivePath(path);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/experience', label: 'Experience' },
    { path: '/projects', label: 'Projects' },
    { path: '/research', label: 'Research' },
    { path: '/contact', label: 'Contact' },
  ];

  const name = cvData?.personal_information?.name || 'Harshal Hirpara';
  const githubUrl = cvData?.personal_information?.github?.split(' ')[0] || 'https://github.com/Hjhirp';
  const linkedinUrl = cvData?.personal_information?.linkedin?.split(' ')[0] || 'https://linkedin.com/in/Harshaljhirpara';

  return (
    <>
      <StyledHeader 
        scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NavContainer>
          <Logo to="/">{name.split(' ')[0]}</Logo>
          
          <NavMenu>
            <NavList>
              {navItems.map((item) => (
                <NavItem key={item.path}>
                  <NavLink 
                    to={item.path} 
                    $active={activePath === item.path}
                    onClick={() => setActivePath(item.path)}
                  >
                    {item.label}
                  </NavLink>
                </NavItem>
              ))}
            </NavList>
          </NavMenu>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <SocialLinks>
              <SocialLink href={githubUrl} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </SocialLink>
              <SocialLink href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </SocialLink>
            </SocialLinks>
          </div>
          
          <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
            <i className="fas fa-bars"></i>
          </MobileMenuButton>
        </NavContainer>
      </StyledHeader>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton onClick={() => setMobileMenuOpen(false)}>
              <i className="fas fa-times"></i>
            </CloseButton>
            
            <MobileNavList>
              {navItems.map((item, index) => (
                <MobileNavItem
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MobileNavLink 
                    to={item.path}
                    onClick={() => handleMobileMenuClick(item.path)}
                  >
                    {item.label}
                  </MobileNavLink>
                </MobileNavItem>
              ))}
            </MobileNavList>
            
            <MobileSocialLinks>
              <SocialLink href={githubUrl} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </SocialLink>
              <SocialLink href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </SocialLink>
            </MobileSocialLinks>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
