import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '../common/StyledComponents';
import { theme } from '../../styles/theme';
import { CVData } from '../../utils/cvUtils';

interface FooterProps {
  cvData?: CVData | null;
}

const StyledFooter = styled.footer`
  width: 100%;
  background: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.slate};
  padding: 1.5rem 0;
  text-align: center;
  font-size: 1rem;
  letter-spacing: 1px;
  border-top: 1px solid ${({ theme }) => theme.colors.lightNavy};
`;

const FooterContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  
  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterSection = styled.div`
  margin-bottom: ${theme.spacing.lg};
  
  @media (min-width: ${theme.breakpoints.md}) {
    width: 30%;
    margin-bottom: 0;
  }
`;

const FooterHeading = styled.h4`
  font-size: ${theme.fontSizes.lg};
  margin-bottom: ${theme.spacing.md};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -${theme.spacing.xs};
    left: 0;
    width: 40px;
    height: 2px;
    background-color: ${theme.colors.primary};
  }
`;

const FooterText = styled.p`
  font-size: ${theme.fontSizes.md};
  margin-bottom: ${theme.spacing.md};
  color: rgba(255, 255, 255, 0.8);
`;

const FooterLinks = styled.ul`
  list-style: none;
`;

const FooterLink = styled.li`
  margin-bottom: ${theme.spacing.sm};
`;

const StyledLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  transition: ${theme.transitions.default};
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const ExternalLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  transition: ${theme.transitions.default};
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${theme.colors.primary};
  }
  
  i {
    margin-right: ${theme.spacing.sm};
    min-width: 20px;
  }
`;

const BottomFooter = styled.div`
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: ${theme.fontSizes.sm};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

const SocialLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.25rem;
  transition: ${theme.transitions.default};
  
  &:hover {
    color: ${theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const Footer: React.FC<FooterProps> = ({ cvData }) => {
  const name = cvData?.personal_information?.name || 'Harshal Hirpara';
  const email = cvData?.personal_information?.email?.split(' ')[0] || 'Hhirp@uic.edu';
  const githubUrl = cvData?.personal_information?.github?.split(' ')[0] || 'https://github.com/Hjhirp';
  const linkedinUrl = cvData?.personal_information?.linkedin?.split(' ')[0] || 'https://linkedin.com/in/Harshaljhirpara';
  const mediumUrl = cvData?.personal_information?.medium?.split(' ')[0] || 'https://medium.com/@hhirp';
  const googleScholarUrl = cvData?.personal_information?.google_scholar?.split(' ')[0] || '#';
  
  const year = new Date().getFullYear();

  return (
    <StyledFooter>
      <FooterContainer>
        <FooterSection>
          <FooterHeading>Navigation</FooterHeading>
          <FooterLinks>
            <FooterLink>
              <StyledLink to="/">Home</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/about">About</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/experience">Experience</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/projects">Projects</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/research">Research</StyledLink>
            </FooterLink>
            <FooterLink>
              <StyledLink to="/contact">Contact</StyledLink>
            </FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading>Contact</FooterHeading>
          <FooterLinks style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FooterLink>
              <ExternalLink href={`mailto:${email}`}>
                <i className="far fa-envelope"></i>
                {email}
              </ExternalLink>
            </FooterLink>
            <FooterLink>
              <ExternalLink href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
                LinkedIn
              </ExternalLink>
            </FooterLink>
            <FooterLink>
              <ExternalLink href={githubUrl} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
                GitHub
              </ExternalLink>
            </FooterLink>
            <FooterLink>
              <ExternalLink href={mediumUrl} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-medium"></i>
                Medium
              </ExternalLink>
            </FooterLink>
          </FooterLinks>
        </FooterSection>
      </FooterContainer>
      
      <BottomFooter>
        <p>&copy; {year} {name} • Made with React</p>
      </BottomFooter>
    </StyledFooter>
  );
};

export default Footer;
