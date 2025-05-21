import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { theme } from '../styles/theme';
import { Container, Button } from '../components/common/StyledComponents';
import { stripReferences, cleanStringArray, CVData } from '../utils/cvUtils';
import profileImage from '../assets/images/profile.jpg';

interface HomeProps {
  cvData: CVData | null;
  loading: boolean;
  error: string | null;
}

const TITLES = [
  'Machine Learning Engineer',
  'NLP Engineer',
  'AI Engineer',
  'Data Scientist',
  'Machine Learning Researcher',
];

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  background: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.slate};
  overflow: hidden;
`;

const HeroContainer = styled(Container)`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4rem;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column-reverse;
    gap: 2rem;
  }
`;

const HeroContent = styled.div`
  max-width: 700px;
  color: ${({ theme }) => theme.colors.dark};
  
  @media (min-width: ${theme.breakpoints.lg}) {
    margin-left: 10%;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: ${theme.spacing.md};
  line-height: 1.2;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const TypewriterText = styled(motion.div)`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.primary};
  min-height: 2.5rem;
  font-family: ${theme.fonts.secondary};
  margin-bottom: ${theme.spacing.md};
  letter-spacing: 1px;
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${theme.fontSizes.lg};
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.gray};
  max-width: 600px;
`;

const ButtonWrapper = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledButton = styled(Button)<{ primary?: boolean }>`
  min-width: 160px;
  padding: 12px 24px;
  background: ${({ primary, theme }) =>
    primary ? theme.colors.darkGray : 'transparent'};
  color: ${({ primary, theme }) =>
    primary ? theme.colors.lightestSlate : theme.colors.primary};
  border: ${({ primary, theme }) =>
    primary ? 'none' : `1.5px solid ${theme.colors.primary}`};
  box-shadow: none;
  transition: ${theme.transitions.default};
  &:hover {
    background: ${({ primary, theme }) =>
      primary ? theme.colors.primary : theme.colors.highlight};
    color: ${({ primary, theme }) =>
      primary ? theme.colors.navy : theme.colors.primary};
  }
`;

const BackgroundPattern = styled.div`
  position: absolute;
  right: -150px;
  top: -100px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(74, 108, 250, 0.15) 0%, rgba(74, 108, 250, 0.05) 70%, rgba(74, 108, 250, 0) 100%);
  border-radius: 50%;
  z-index: 1;
`;

const BackgroundPattern2 = styled.div`
  position: absolute;
  left: -200px;
  bottom: -200px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(248, 112, 96, 0.1) 0%, rgba(248, 112, 96, 0.03) 70%, rgba(248, 112, 96, 0) 100%);
  border-radius: 50%;
  z-index: 1;
`;

const TechStack = styled(motion.div)`
  margin-top: ${theme.spacing.xl};
`;

const TechTitle = styled.p`
  font-size: ${theme.fontSizes.sm};
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${theme.colors.gray};
  margin-bottom: ${theme.spacing.sm};
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  align-items: center;
`;

const TechItem = styled(motion.div)`
  display: flex;
  align-items: center;
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.dark};
  font-weight: 500;
  
  svg {
    margin-right: ${theme.spacing.xs};
    font-size: 1.25rem;
  }
`;

const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.gray};
`;

const ErrorState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.secondary};
  flex-direction: column;
  
  button {
    margin-top: ${theme.spacing.lg};
  }
`;

const Summary = styled.p`
  text-align: justify;
  color: ${({ theme }) => theme.colors.dark};
`;

const ProfileImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  @media (max-width: ${theme.breakpoints.md}) {
    width: 200px;
    height: 200px;
  }
`;

function useTypewriter(words: string[], typingSpeed = 80, pause = 1200) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef<number>(undefined);

  useEffect(() => {
    const current = words[index];
    if (!deleting && displayed.length < current.length) {
      timeout.current = window.setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typingSpeed);
    } else if (!deleting && displayed.length === current.length) {
      timeout.current = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && displayed.length > 0) {
      timeout.current = window.setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), typingSpeed / 2);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
    }
    return () => {
      if (timeout.current) window.clearTimeout(timeout.current);
    };
  }, [displayed, deleting, index, words, typingSpeed, pause]);

  return displayed;
}

const HomePage: React.FC<HomeProps> = ({ cvData, loading, error }) => {
  const typewriter = useTypewriter(TITLES);

  const languageIcons: Record<string, string> = {
    python: require('../assets/images/python.svg').default,
    java: require('../assets/images/java-14.svg').default,
    'c++': require('../assets/images/c.svg').default,
    pytorch: require('../assets/images/pytorch.svg').default,
    tensorflow: require('../assets/images/tensorflow.svg').default,
    docker: require('../assets/images/docker.svg').default,
    kubernetes: require('../assets/images/kubernetes.svg').default,
    bash: require('../assets/images/bash-2.svg').default,
    aws: require('../assets/images/aws.svg').default,
    pandas: require('../assets/images/pandas.svg').default,
    scikit: require('../assets/images/scikit-learn.svg').default,
    huggingface: require('../assets/images/hugging-face.svg').default,
    fastapi: require('../assets/images/fastapi.svg').default,
    wandb: require('../assets/images/wandb-dots-logo.svg').default,
  };

  if (loading) {
    return <LoadingState>Loading...</LoadingState>;
  }
  
  if (error || !cvData) {
    return (
      <ErrorState>
        <p>{error || "Failed to load data"}</p>
        <Button primary onClick={() => window.location.reload()}>Retry</Button>
      </ErrorState>
    );
  }
  
  // Extract data from CV
  const name = stripReferences(cvData.personal_information.name);
  // Use the About Me text from the footer (short, focused, with RL, LLM, agents)
  const firstSummary =
    'Machine Learning Engineer focused on creating innovative AI solutions, with expertise in NLP, computer vision, cloud technologies, and a strong focus on reinforcement learning, large language models (LLMs), and intelligent agents.';
  
  // Tech skills
  const programmingSkills = cleanStringArray(cvData.technical_skills.programming)
    .slice(0, 4) // Get first 4 skills
    .map((skill: string) => skill.split(' ')[0]); // Get just the language name without version info
  
  return (
    <>
      <HeroSection>
        <BackgroundPattern />
        <BackgroundPattern2 />
        <HeroContainer>
          <HeroContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <HeroTitle
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Hi, I'm <span style={{ color: theme.colors.primary }}>{name.split(' ')[0]}</span>
              </HeroTitle>
              <TypewriterText
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                aria-label="Typewriter roles"
              >
                {typewriter}
                <span style={{ color: theme.colors.primary, opacity: 0.7 }}>|</span>
              </TypewriterText>
              <HeroSubtitle
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {firstSummary}
              </HeroSubtitle>
              
              <ButtonWrapper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <StyledButton as={Link} to="/experience" primary>
                  <i className="fas fa-briefcase"></i> View Experience
                </StyledButton>
                <StyledButton as={Link} to="/projects" primary>
                  <i className="fas fa-code"></i> View Projects
                </StyledButton>
                <StyledButton as={Link} to="/contact" outlined>
                  <i className="fas fa-envelope"></i> Contact Me
                </StyledButton>
              </ButtonWrapper>
              
              <TechStack
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <TechTitle>Tech I Work With</TechTitle>
                <TechList>
                  {programmingSkills.filter(skill => skill.toLowerCase() !== 'scala').map((skill: string, index: number) => (
                    <TechItem
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + (index * 0.1) }}
                    >
                      {languageIcons[skill.toLowerCase()] ? (
                        <img src={languageIcons[skill.toLowerCase()]} alt={skill} style={{ width: 24, height: 24, marginRight: 8, verticalAlign: 'middle' }} />
                      ) : null}
                      <i className={`devicon-${skill.toLowerCase()}-plain`}></i>
                      {skill}
                    </TechItem>
                  ))}
                </TechList>
              </TechStack>
            </motion.div>
          </HeroContent>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <ProfileImage src={profileImage} alt={name} />
          </motion.div>
        </HeroContainer>
      </HeroSection>
    </>
  );
};

export default HomePage;
