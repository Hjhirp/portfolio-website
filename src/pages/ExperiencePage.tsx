import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Section, SectionTitle } from '../components/common/StyledComponents';
import { theme } from '../styles/theme';
import { CVData, stripReferences } from '../utils/cvUtils';

interface ExperiencePageProps {
  cvData: CVData | null;
  loading: boolean;
  error: string | null;
}

const Timeline = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.dark};
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 2px;
    background-color: ${theme.colors.primary};
    
    @media (min-width: ${theme.breakpoints.md}) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const TimelineItem = styled(motion.div)<{ isRight?: boolean }>`
  position: relative;
  margin-bottom: ${theme.spacing.xl};
  padding-left: calc(${theme.spacing.xl} * 2);
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.dark};
  
  @media (min-width: ${theme.breakpoints.md}) {
    width: 50%;
    padding-left: 0;
    padding-right: 0;
    margin-left: ${props => props.isRight ? '50%' : '0'};
    padding-left: ${props => props.isRight ? theme.spacing.xl : '0'};
    padding-right: ${props => props.isRight ? '0' : theme.spacing.xl};
  }
  
  &:before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${theme.colors.primary};
    left: -7px;
    top: 10px;
    
    @media (min-width: ${theme.breakpoints.md}) {
      left: ${props => props.isRight ? '-8px' : 'auto'};
      right: ${props => props.isRight ? 'auto' : '-8px'};
    }
  }
`;

const ExperienceCard = styled.div<{ isRight?: boolean }>`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  color: ${({ theme }) => theme.colors.dark};
  
  @media (min-width: ${theme.breakpoints.md}) {
    text-align: ${props => props.isRight ? 'left' : 'right'};
  }
`;

const JobTitle = styled.h3`
  margin-bottom: ${theme.spacing.xs};
  color: ${({ theme }) => theme.colors.primary};
`;

const CompanyName = styled.h4`
  margin-bottom: ${theme.spacing.xs};
  color: ${({ theme }) => theme.colors.secondary};
`;

const Company = styled.span`
  color: ${({ theme }) => theme.colors.lightSlate};
  font-weight: 600;
`;

const JobDate = styled.p`
  margin-bottom: ${theme.spacing.md};
  color: ${({ theme }) => theme.colors.gray};
  font-style: italic;
`;

const JobDescription = styled.ul<{ isRight?: boolean }>`
  padding-left: ${theme.spacing.lg};
  color: ${({ theme }) => theme.colors.dark};
  
  li {
    margin-bottom: ${theme.spacing.sm};
    line-height: 1.6;
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding-left: ${props => props.isRight ? theme.spacing.lg : '0'};
    padding-right: ${props => props.isRight ? '0' : theme.spacing.lg};
    text-align: left;
  }
`;

const ExperiencePage: React.FC<ExperiencePageProps> = ({ cvData, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cvData) return <div>No CV data available</div>;

  return (
    <Section>
      <Container>
        <SectionTitle>Professional Experience</SectionTitle>
        <Timeline>
          {cvData.professional_experience.map((job, index) => (
            <TimelineItem
              key={index}
              isRight={index % 2 === 1}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ExperienceCard isRight={index % 2 === 1}>
                <JobTitle>{job.title}</JobTitle>
                <CompanyName>
                  <Company>{job.company}</Company>
                </CompanyName>
                <JobDate>{job.start_date} - {job.end_date || 'Present'} | {job.location}</JobDate>
                <JobDescription isRight={index % 2 === 1}>
                  {job.responsibilities.map((resp, i) => (
                    <li key={i}>{stripReferences(resp)}</li>
                  ))}
                </JobDescription>
              </ExperienceCard>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Section>
  );
};

export default ExperiencePage;
