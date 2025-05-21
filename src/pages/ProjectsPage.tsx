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

const Tag = styled.span<{ theme: DefaultTheme }>`
  background: ${({ theme }) => theme.colors.light};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.9rem;
`;

const ProjectsPage: React.FC<ProjectsPageProps> = ({ cvData, loading, error }) => {
  // Move hooks to the top, before any early returns
  const [activeTag, setActiveTag] = React.useState<string>('All');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cvData) return <div>No CV data available</div>;
  const projects = cvData.projects || [];
  const allTags = Array.from(new Set(projects.map((p: any) => p.tag || 'Other')));

  return (
    <Section>
      <Container>
        <SectionTitle>Projects</SectionTitle>
        {/* Tag Navbar */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => setActiveTag('All')}
            style={{
              background: activeTag === 'All' ? theme.colors.primary : theme.colors.cardBackground,
              color: activeTag === 'All' ? '#fff' : theme.colors.primary,
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              fontWeight: 600,
              boxShadow: activeTag === 'All' ? '0 2px 8px rgba(0,0,0,0.07)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                background: activeTag === tag ? theme.colors.primary : theme.colors.cardBackground,
                color: activeTag === tag ? '#fff' : theme.colors.primary,
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontWeight: 600,
                boxShadow: activeTag === tag ? '0 2px 8px rgba(0,0,0,0.07)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {(activeTag === 'All' ? projects : projects.filter((p: any) => (p.tag || 'Other') === activeTag)).map((project, idx) => (
            <ProjectCard key={idx}>
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
