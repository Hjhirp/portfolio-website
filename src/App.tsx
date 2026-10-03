import React, { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { GlobalStyles } from "./styles/theme";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import { useCV } from "./utils/cvUtils";
function ScrollToSection() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);
  return null;
}
export default function App() {
  const data = useCV();
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <GlobalStyles />
      <Layout cvData={data.cv}>
        <ScrollToSection />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                cvData={data.cv}
                loading={data.loading}
                error={data.error}
              />
            }
          />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          {Object.entries({
            about: "intro",
            experience: "systems",
            projects: "builds",
            research: "research",
            contact: "contact",
          }).map(([path, id]) => (
            <Route
              key={path}
              path={`/${path}`}
              element={<Navigate to={`/#${id}`} replace />}
            />
          ))}
          <Route
            path="*"
            element={
              <div style={{ padding: 48 }}>
                <h1>Page not found</h1>
                <a href="/">Return to the notebook →</a>
              </div>
            }
          />
        </Routes>
      </Layout>
      <Analytics />
    </BrowserRouter>
  );
}
