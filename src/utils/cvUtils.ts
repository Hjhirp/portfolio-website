import { useEffect, useState } from 'react';

export type CVData = {
  personal_information: {
    name: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
    medium: string;
    google_scholar: string;
  };
  summary: string[];
  education: Array<{
    degree: string;
    university: string;
    location: string;
    graduation_date: string;
    gpa: string;
    relevant_coursework?: string[];
    thesis?: string;
    achievements?: string[];
  }>;
  technical_skills: {
    ml_data_tools: string[];
    ci_cd: string[];
    frameworks: string[];
    programming: string[];
  };
  professional_experience: Array<{
    title: string;
    company: string;
    location: string;
    start_date: string;
    end_date: string;
    stack: string[];
    responsibilities: string[];
  }>;
  projects: Array<{
    name: string;
    stack: string[];
    description: string;
    tags?: string[];
    image?: string;
    github?: string;
    demo?: string;
  }>;
  research_publications: Array<{
    title: string;
    link?: string;
    date?: string;
    description?: string;
    note?: string;
    institution?: string;
  }>;
  achievements_awards: string[];
  superpowers_unleashed: {
    programming_mastery: string[];
    machine_learning_expertise: string[];
    data_cloud_proficiency: string[];
    ai_model_development: string[];
  };
  publications?: Array<{
    title: string;
    authors?: string;
    journal?: string;
    year?: string;
    pdf?: string;
    citation?: string;
  }>;
};

export const useCV = () => {
  const [cv, setCV] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        // In production, this would be a proper API call
        // For local development, we're using a direct import
        const response = await fetch('/cv.json');
        if (!response.ok) {
          throw new Error('Failed to fetch CV data');
        }
        const data = await response.json();
        setCV(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching CV data:', err);
        setError('Failed to load CV data. Please try again later.');
        setLoading(false);
      }
    };

    fetchCV();
  }, []);

  return { cv, loading, error };
};

// Helper to strip citation references like [1, 2] from strings
export const stripReferences = (text: string): string => {
  return text.replace(/\s*\[\d+(?:,\s*\d+)*\]\s*/g, '');
};

// Clean an array of strings by removing references
export const cleanStringArray = (arr: string[] | undefined): string[] => {
  if (!arr) return [];
  return arr.map(item => stripReferences(item));
};

// Helper to format date ranges for display
export const formatDateRange = (startDate: string, endDate: string): string => {
  return `${stripReferences(startDate)} - ${stripReferences(endDate)}`;
};

// Helper to group projects by technology/stack
export const groupProjectsByTech = (projects: CVData['projects'] | undefined) => {
  if (!projects) return {};
  
  const techGroups: { [key: string]: Array<typeof projects[0]> } = {};
  
  projects.forEach(project => {
    project.stack.forEach(tech => {
      const cleanTech = stripReferences(tech);
      if (!techGroups[cleanTech]) {
        techGroups[cleanTech] = [];
      }
      techGroups[cleanTech].push(project);
    });
  });
  
  return techGroups;
};
