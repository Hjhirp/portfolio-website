import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/theme';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectsPage from './pages/ProjectsPage';
import ResearchPage from './pages/ResearchPage';
import ContactPage from './pages/ContactPage';
import { useCV } from './utils/cvUtils';
// Font Awesome and DevIcons setup
import { useScript } from './utils/useScript';

function App() {
  const { cv, loading, error } = useCV();
  
  // Load Font Awesome
  useScript('https://kit.fontawesome.com/your-kit-code.js');
  // Load DevIcons for tech stack icons
  useScript('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css');
  
  // Copy CV.json to public folder on first load
  useEffect(() => {
    // For development purposes, we'd copy the CV.json to the public folder
    // In production, this would be handled during build
    // Or by having the CV data in a proper backend/API
    console.log('CV data loaded:', cv !== null);
  }, [cv]);
  
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <GlobalStyles />
      <Layout cvData={cv}>
        <Routes>
          <Route path="/" element={<HomePage cvData={cv} loading={loading} error={error} />} />
          <Route path="/about" element={<AboutPage cvData={cv} loading={loading} error={error} />} />
          <Route path="/experience" element={<ExperiencePage cvData={cv} loading={loading} error={error} />} />
          <Route path="/projects" element={<ProjectsPage cvData={cv} loading={loading} error={error} />} />
          <Route path="/research" element={<ResearchPage cvData={cv} loading={loading} error={error} />} />
          <Route path="/contact" element={<ContactPage cvData={cv} loading={loading} error={error} />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
