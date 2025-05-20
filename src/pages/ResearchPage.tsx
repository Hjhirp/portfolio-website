import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Section, SectionTitle } from '../components/common/StyledComponents';
import { theme } from '../styles/theme';
import { CVData, stripReferences } from '../utils/cvUtils';

interface ResearchPageProps {
  cvData: CVData | null;
  loading: boolean;
  error: string | null;
}

const PaperCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.md};
  margin-bottom: ${theme.spacing.lg};
  transition: transform 0.3s ease;
  color: ${({ theme }) => theme.colors.dark};
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const PaperTitle = styled.h3`
  margin-bottom: ${theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
`;

const PaperAuthors = styled.p`
  font-style: italic;
  margin-bottom: ${theme.spacing.sm};
  color: ${({ theme }) => theme.colors.gray};
`;

const PaperVenue = styled.p`
  font-weight: 600;
  margin-bottom: ${theme.spacing.md};
  color: ${({ theme }) => theme.colors.secondary};
`;

const ResearchDate = styled.span`
  color: ${({ theme }) => theme.colors.lightSlate};
  font-size: 0.95em;
  font-style: italic;
`;

const PaperAbstract = styled.div`
  margin-top: ${theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.light};
  padding-top: ${theme.spacing.md};
  color: ${({ theme }) => theme.colors.dark};
  h4 {
    margin-bottom: ${theme.spacing.sm};
    color: ${({ theme }) => theme.colors.dark};
  }
  p {
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const PaperLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const PaperLink = styled.a<{ primary?: boolean }>`
  display: inline-block;
  margin-right: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  background-color: ${props => props.primary ? theme.colors.primary : theme.colors.light};
  color: ${props => props.primary ? 'white' : theme.colors.dark};
  text-decoration: none;
  border-radius: ${theme.borderRadius.sm};
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background-color: ${props => props.primary ? theme.colors.primaryDark : theme.colors.lightDark};
    color: ${props => props.primary ? 'white' : theme.colors.dark};
  }
`;

const ResearchPage: React.FC<ResearchPageProps> = ({ cvData, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cvData) return <div>No CV data available</div>;

  const papers = cvData.research_publications || [];
  
  return (
    <Section>
      <Container>
        <SectionTitle>Research & Publications</SectionTitle>
        
        {papers.length === 0 ? (
          <p>No research publications available.</p>
        ) : (
          papers.map((paper, index) => (
            <PaperCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <PaperTitle>{paper.title}</PaperTitle>
              {paper.institution && <PaperAuthors>{paper.institution}</PaperAuthors>}
              {paper.date && <PaperVenue><ResearchDate>{paper.date}</ResearchDate></PaperVenue>}
              
              {paper.description && (
                <PaperAbstract>
                  <h4>Description</h4>
                  <p style={{ textAlign: 'justify' }}>{stripReferences(paper.description)}</p>
                </PaperAbstract>
              )}
              
              {paper.note && (
                <PaperAbstract>
                  <h4>Note</h4>
                  <p style={{ textAlign: 'justify' }}>{stripReferences(paper.note)}</p>
                </PaperAbstract>
              )}
              
              {paper.link && (
                <PaperLinks>
                  <PaperLink href={paper.link} target="_blank" rel="noopener noreferrer" primary>
                    <i className="fas fa-file-pdf"></i> Link
                  </PaperLink>
                </PaperLinks>
              )}
            </PaperCard>
          ))
        )}
      </Container>
    </Section>
  );
};

export default ResearchPage;
