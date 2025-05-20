import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

// Container
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.sm};
  }
`;

// Section components
export const Section = styled.section`
  padding: ${theme.spacing.xxl} 0;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl} 0;
  }
`;

export const SectionTitle = styled.h2`
  position: relative;
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -${theme.spacing.sm};
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: ${theme.colors.primary};
  }
`;

export const SectionSubtitle = styled.h3`
  font-weight: 500;
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.gray};
`;

// Card components
export const Card = styled(motion.div)`
  background-color: ${theme.colors.cardBackground};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  transition: ${theme.transitions.default};
  height: 100%;
  
  &:hover {
    box-shadow: ${theme.shadows.lg};
    transform: translateY(-4px);
  }
`;

export const CardTitle = styled.h4`
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
`;

export const CardSubtitle = styled.h5`
  font-weight: 500;
  color: ${theme.colors.gray};
  margin-bottom: ${theme.spacing.sm};
`;

// Button components
interface ButtonProps {
  primary?: boolean;
  outlined?: boolean;
  small?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.small ? '0.5rem 1rem' : '0.75rem 1.5rem'};
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  font-size: ${props => props.small ? theme.fontSizes.sm : theme.fontSizes.md};
  transition: ${theme.transitions.default};
  cursor: pointer;
  
  background-color: ${props => 
    props.primary 
      ? theme.colors.primary 
      : props.outlined 
        ? 'transparent' 
        : theme.colors.light
  };
  
  color: ${props => 
    props.primary 
      ? 'white' 
      : props.outlined 
        ? theme.colors.primary 
        : theme.colors.dark
  };
  
  border: ${props => 
    props.outlined 
      ? `2px solid ${theme.colors.primary}` 
      : 'none'
  };
  
  &:hover {
    background-color: ${props => 
      props.primary 
        ? '#3A5BD9' // slightly darker primary 
        : props.outlined 
          ? 'rgba(74, 108, 250, 0.1)' 
          : '#E9ECEF' // slightly darker light
    };
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 108, 250, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  svg {
    margin-right: ${theme.spacing.sm};
  }
`;

export const ButtonLink = styled(Button).attrs({ as: 'a' })`
  text-decoration: none;
`;

// Grid components
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-gap: ${theme.spacing.md};
  }
`;

interface ColProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export const Col = styled.div<ColProps>`
  grid-column: span ${props => props.xs || 12};
  
  @media (min-width: ${theme.breakpoints.sm}) {
    grid-column: span ${props => props.sm || props.xs || 12};
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-column: span ${props => props.md || props.sm || props.xs || 12};
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    grid-column: span ${props => props.lg || props.md || props.sm || props.xs || 12};
  }
  
  @media (min-width: ${theme.breakpoints.xl}) {
    grid-column: span ${props => props.xl || props.lg || props.md || props.sm || props.xs || 12};
  }
`;

// Tag/Chip component
export const Tag = styled.span`
  display: inline-block;
  background-color: ${theme.colors.light};
  color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.sm};
  padding: 0.25rem 0.75rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  border: 1px solid rgba(74, 108, 250, 0.3);
`;

// Divider
export const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: ${theme.spacing.lg} 0;
`;

// List components
export const List = styled.ul`
  list-style-position: inside;
  margin-bottom: ${theme.spacing.md};
  padding-left: ${theme.spacing.md};
`;

export const ListItem = styled.li`
  margin-bottom: ${theme.spacing.sm};
`;

// Justified Paragraph
export const JustifiedParagraph = styled.p`
  text-align: justify;
`;

// Animation variants for Framer Motion
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6 } 
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Global styles for paragraphs
export const GlobalStyles = styled.div`
  p {
    text-align: justify;
  }
`;
