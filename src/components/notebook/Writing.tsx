import React from "react";
import styled from "styled-components";
import { Label, NotebookSection, SectionLead } from "./Notebook";
const Articles = styled.div`
  margin-top: 24px;
  border-top: 1px solid #ccc8bb;
`;
const Article = styled.article`
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr) 24px;
  gap: 24px;
  padding: 24px 0;
  border-bottom: 1px solid #ccc8bb;
  .date {
    font-size: 0.8125rem;
    color: #68665e;
    padding-top: 3px;
  }
  .date span {
    display: block;
    margin-top: 6px;
    font-size: 11px;
  }
  h3 {
    font-size: clamp(21px, 2.2vw, 27px);
    line-height: 1.3;
    font-weight: 600;
    letter-spacing: -0.025em;
    margin: 6px 0 8px;
    max-width: 46ch;
    text-wrap: pretty;
  }
  p {
    font-size: 1rem;
    line-height: 1.55;
    max-width: 65ch;
    margin: 0;
  }
  .arrow {
    font-size: 22px;
    color: #ad3e16;
    align-self: start;
    margin-top: 25px;
  }
  a:hover h3 {
    color: #ad3e16;
  }
  @media (max-width: 760px) {
    grid-template-columns: minmax(0, 1fr) 22px;
    gap: 12px;
    padding: 24px 0;
    .date {
      grid-column: 1 / -1;
      padding: 0;
    }
    .date span {
      display: inline;
      margin-left: 12px;
    }
    h3 {
      font-size: 1.375rem;
    }
  }
`;
const articles = [
  {
    title:
      "Why AI-generated API tests pass and catch nothing, and how to fix it",
    date: "September 9, 2026",
    path: "api-test-generation-journey-based-tests",
    note: "Explores why passing endpoint checks can miss a broken resource lifecycle. Describes stateful test journeys that keep coverage gaps and test intent visible.",
    topic: "Stateful testing",
  },
  {
    title: "API testing with AI isn't just Claude's job",
    date: "Updated September 9, 2026",
    path: "api-testing-with-ai-isnt-just-claudes-job",
    note: "Explores how planning, implementation, review, execution, and repair fit into an AI testing system. Describes why each responsibility needs its own checks around the model.",
    topic: "Agent architecture",
  },
  {
    title: "How to choose the right AI testing tool",
    date: "August 21, 2026",
    path: "best-ai-testing-software",
    note: "Explores how engineering teams can evaluate AI testing tools. Describes practical criteria for code ownership, test intent, and repairs that engineers can review.",
    topic: "Engineering judgment",
  },
  {
    title: "What is AI testing? The complete guide for engineering teams",
    date: "August 4, 2026",
    path: "ai-testing-guide",
    note: "Explores how AI supports test generation, execution, and maintenance. Describes how these capabilities fit together in an ongoing verification workflow.",
    topic: "Testing infrastructure",
  },
  {
    title: "Understanding shadow QA and its impact",
    date: "July 15, 2026",
    path: "shadow-qa",
    note: "Explores what happens when testing drifts away from the development workflow. Describes the maintenance burden and context switching that make coverage harder to trust.",
    topic: "Reliability in practice",
  },
  {
    title: "Announcing the API Agent",
    date: "June 25, 2026",
    path: "announcing-the-api-agent",
    note: "Introduces the API Agent and its approach to journey-based testing. Describes explicit coverage gaps and a runner that separates execution from model reasoning.",
    topic: "Product systems",
  },
];
export default function Writing() {
  return (
    <NotebookSection
      id="writing"
      number="05"
      label="Writing / published at Checksum"
      title="Notes from the workbench."
    >
      <SectionLead>
        I write about the infrastructure around AI: what gets tested, what gets
        missed, and what it takes to keep an autonomous system useful after the
        demo.
      </SectionLead>
      <Articles>
        {articles.map((article) => (
          <Article key={article.path}>
            <div className="date">
              {article.date}
              <span>By Harshal Hirpara</span>
            </div>
            <div>
              <Label>{article.topic} / Checksum</Label>
              <a href={`https://checksum.ai/blog/${article.path}`}>
                <h3>{article.title}</h3>
              </a>
              <p>{article.note}</p>
            </div>
            <a className="arrow" href={`https://checksum.ai/blog/${article.path}`} aria-label={`Read ${article.title}`}>
              ↗
            </a>
          </Article>
        ))}
      </Articles>
    </NotebookSection>
  );
}
