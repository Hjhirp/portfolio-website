import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Container, Section, SectionTitle } from '../components/common/StyledComponents';
import { theme } from '../styles/theme';
import { CVData } from '../utils/cvUtils';

interface ProjectsPageProps {
  cvData: CVData | null;
  loading: boolean;
  error: string | null;
}

const ProjectCard = styled.div<{ theme: DefaultTheme }>`
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.dark};
`;

const ProjectImage = styled.div<{ theme: DefaultTheme }>`
  width: 100%;
  height: 180px;
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 2rem;
`;

const Tag = styled.span<{ theme: DefaultTheme }>`
  background: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.9rem;
`;

const ProjectsPage: React.FC<ProjectsPageProps> = ({ cvData, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cvData) return <div>No CV data available</div>;
  const projects = cvData.projects || [];

  return (
    <Section>
      <Container>
        <SectionTitle>Projects</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {projects.map((project, idx) => (
            <ProjectCard key={idx}>
              <ProjectImage>
                {project.image ? (
                  <img src={project.image} alt={project.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                ) : 'No Image'}
              </ProjectImage>
              <h3 style={{ marginBottom: '0.5rem' }}>{project.name}</h3>
              <p style={{ textAlign: 'justify' }}>{project.description}</p>
              <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.stack && project.stack.map((tech, i) => (
                  <Tag key={i}>{tech}</Tag>
                ))}
              </div>
            </ProjectCard>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default ProjectsPage;
