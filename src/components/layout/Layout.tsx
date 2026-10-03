import React from "react";
import { ThemeProvider, styled } from "styled-components";
import { Link } from "react-router-dom";
import { CVData } from "../../utils/cvUtils";
import theme from "../../styles/theme";
import { Page, Label } from "../notebook/Notebook";
const Header = styled.header`
  position: sticky;
  top: 0;
  background: #f6f4ec;
  z-index: 10;
  border-bottom: 1px solid #ccc8bb;
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    min-height: 82px;
  }
  nav {
    display: flex;
    gap: 28px;
    font-size: 13px;
  }
  nav a { display: inline-flex; align-items: center; min-height: 32px; }
  .brand {
    font-weight: 650;
    letter-spacing: -0.03em;
  }
  @media (max-width: 700px) {
    position: static;
    > div {
      padding-top: 18px;
      padding-bottom: 18px;
      align-items: flex-start;
      flex-direction: column;
      gap: 12px;
    }
    nav {
      gap: 8px 20px;
      flex-wrap: wrap;
    }
  }
`;
export default function Layout({
  children,
  cvData,
}: {
  children: React.ReactNode;
  cvData?: CVData | null;
}) {
  return (
    <ThemeProvider theme={theme}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header>
        <Page>
          <Link className="brand" to="/">
            Harshal Hirpara<span style={{ color: "#ad3e16" }}> /</span>
          </Link>
          <nav aria-label="Main navigation">
            <a href="/#systems">Systems</a>
            <a href="/#research">Research</a>
            <a href="/#builds">Builds</a>
            <a href="/#writing">Writing</a>
            <a href="/#contact">Contact ↗</a>
          </nav>
        </Page>
      </Header>
      <main id="main">{children}</main>
      <Page>
        <footer
          style={{
            borderTop: "1px solid #ccc8bb",
            padding: "28px 0",
            display: "flex",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <Label>© {new Date().getFullYear()} Harshal Hirpara</Label>
          <a
            href={
              cvData?.personal_information.github || "https://github.com/Hjhirp"
            }
          >
            GitHub ↗
          </a>
          <Label>Always a work in progress.</Label>
        </footer>
      </Page>
    </ThemeProvider>
  );
}
