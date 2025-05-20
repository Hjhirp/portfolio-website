import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Section, SectionTitle } from '../components/common/StyledComponents';
import { theme } from '../styles/theme';
import { CVData, stripReferences } from '../utils/cvUtils';

interface AboutPageProps {
  cvData: CVData | null;
  loading: boolean;
  error: string | null;
}

const AboutContainer = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.dark};
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 2rem;
`;

const AboutText = styled.p`
  text-align: justify;
  color: ${({ theme }) => theme.colors.dark};
`;

const EducationSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.light};
`;

const EducationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const EducationCard = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  
  h3 {
    margin-bottom: ${theme.spacing.xs};
    color: ${theme.colors.primary};
  }
  
  h4 {
    margin-bottom: ${theme.spacing.sm};
  }
  
  p {
    margin-bottom: ${theme.spacing.sm};
    color: ${({ theme }) => theme.colors.gray};
  }
  
  ul {
    margin-top: ${theme.spacing.md};
    padding-left: ${theme.spacing.lg};
    
    li {
      margin-bottom: ${theme.spacing.xs};
    }
  }
`;

const AnimatedItem = styled(motion.div)``;

const AboutPage: React.FC<AboutPageProps> = ({ cvData, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cvData) return <div>No CV data available</div>;

  return (
    <>
      <Section>
        <Container>
          <SectionTitle>About</SectionTitle>
          <AboutContainer>
            {cvData.summary && cvData.summary.map((line, idx) => (
              <AboutText key={idx}>{stripReferences(line)}</AboutText>
            ))}
          </AboutContainer>
        </Container>
      </Section>

      <EducationSection>
        <Container>
          <SectionTitle>Education</SectionTitle>
          <EducationList>
            {cvData.education.map((edu, index) => (
              <AnimatedItem
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <EducationCard>
                  <h3>{edu.degree}</h3>
                  <h4>{edu.university}</h4>
                  <p>{edu.location} • {edu.graduation_date}</p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  
                  {edu.relevant_coursework && edu.relevant_coursework.length > 0 && (
                    <>
                      <h5>Relevant Coursework</h5>
                      <ul>
                        {edu.relevant_coursework.map((course, i) => (
                          <li key={i}>{stripReferences(course)}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {edu.achievements && edu.achievements.length > 0 && (
                    <>
                      <h5>Achievements</h5>
                      <ul>
                        {edu.achievements.map((achievement, i) => (
                          <li key={i}>{stripReferences(achievement)}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </EducationCard>
              </AnimatedItem>
            ))}
          </EducationList>
        </Container>
      </EducationSection>
    </>
  );
};

export default AboutPage;
