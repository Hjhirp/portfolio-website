import React, { ReactNode, useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";

export const Page = styled.div`
  max-width: 1088px;
  --rule: #d9d5ca;
  --space-sm: 12px;
  --space-md: 24px;
  --space-lg: 40px;
  --project-title: clamp(22px, 2vw, 26px);
  margin: auto;
  padding: 0 48px;
  @media (max-width: 700px) {
    padding: 0 22px;
  }
`;
export const Label = styled.div`
  font:
    11px/1.6 "SFMono-Regular",
    Consolas,
    monospace;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: #68665e;
`;
export const SectionLead = styled.p`
  max-width: 66ch;
  font-size: 17px;
  line-height: 1.65;
  margin: -8px 0 32px 212px;
  @media (max-width: 760px) { margin: -8px 0 24px; }
`;
export const ProjectDescription = styled.p`
  margin: 0 0 12px;
  line-height: 1.65;
`;
export const ProjectSources = styled.footer`
  a { display: inline-block; font-size: 14px; line-height: 1.5; }
  small { display: block; color: #68665e; font-size: 12px; margin-top: 6px; line-height: 1.5; }
`;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: var(--space-lg);
  row-gap: var(--space-md);
  align-items: start;
  > * {
    min-width: 0;
  }
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;
export const Entry = styled.article`
  border-top: 1px solid var(--rule, #d9d5ca);
  padding: 20px 0;
  h3 {
    font-size: var(--project-title);
    letter-spacing: -0.025em;
    margin: 10px 0 16px;
    line-height: 1.25;
    text-wrap: pretty;
  }
  p {
    max-width: 66ch;
    line-height: 1.65;
    margin: 0 0 12px;
  }
  details {
    margin-top: 8px;
  }
  summary {
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    padding: 8px 0;
  }
  details p {
    margin-top: 8px;
  }
  small {
    display: block;
    color: #68665e;
    font-size: 12px;
    margin-top: 8px;
    line-height: 1.5;
  }
`;
const SectionShell = styled(motion.section)`
  padding: 56px 0;
  border-top: 1px solid var(--rule, #d9d5ca);
  scroll-margin-top: 100px;
  &:first-child { border-top: 0; }
  h1, h2 {
    font-size: clamp(28px, 3.3vw, 38px);
    letter-spacing: -0.035em;
    line-height: 1.18;
    margin: 0;
    max-width: 100%;
    text-wrap: balance;
  }
  .section-heading {
    display: grid;
    grid-template-columns: 180px minmax(0, 1fr);
    gap: 32px;
    align-items: start;
    margin-bottom: 28px;
  }
  .section-heading.with-art { grid-template-columns: 180px minmax(0, 1fr) 220px; align-items: center; }
  .section-art { display: block; width: 220px; height: auto; aspect-ratio: 3 / 2; border-radius: 8px; }
  @media (min-width: 761px) and (max-width: 1000px) {
    .section-heading.with-art { grid-template-columns: minmax(0, 1fr) 200px; }
    .section-heading.with-art > div { grid-column: 1 / -1; }
    .section-art { width: 200px; }
    .section-heading.with-art + p { margin-left: 0; }
  }
  .section-heading > div { padding-top: 6px; max-width: 24ch; }
  > p:first-of-type { max-width: 66ch; }
  @media (max-width: 760px) {
    .section-heading, .section-heading.with-art { grid-template-columns: 1fr; gap: 12px; margin-bottom: 24px; }
    .section-art { width: 100%; max-width: 360px; margin-top: 4px; }
    .section-heading > div { padding: 0; max-width: none; }
  }
  @media (max-width: 700px) {
    padding: 40px 0;
    scroll-margin-top: 24px;
  }
`;
export function NotebookSection({
  id,
  number,
  label,
  title,
  children,
  headingLevel = "h2",
  artwork,
}: {
  id: string;
  number: string;
  label: string;
  title: string;
  children: ReactNode;
  headingLevel?: "h1" | "h2";
  artwork?: "systems" | "research" | "builds";
}) {
  const reduced = useReducedMotion();
  const Heading = headingLevel;
  return (
    <SectionShell
      id={id}
      initial={false}
      whileInView={reduced ? {} : { opacity: 1 }}
      viewport={{ once: true }}
    >
      <header className={`section-heading${artwork ? " with-art" : ""}`}>
        <Label>{number} / {label}</Label>
        <Heading>{title}</Heading>
        {artwork && <img className="section-art" src={`/images/editorial/${artwork}.jpg`} alt="" width={960} height={640} loading="lazy" decoding="async" />}
      </header>
      {children}
    </SectionShell>
  );
}
export type Stage = { name: string; detail: string };
const Diagram = styled.div`
  background: #efede5;
  border-radius: 8px;
  padding: 24px;
  margin: 24px 0;
  @media (max-width: 450px) { padding: 20px 16px; }
  &:last-child { margin-bottom: 0; }
  > p {
    max-width: 66ch;
    line-height: 1.65;
    margin-top: 20px;
  }
`;
const Nodes = styled.div<{ $count: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $count }) => $count}, minmax(0, 1fr));
  gap: 12px;
  margin: 20px 0 0;
  button {
    position: relative;
    text-align: left;
    background: none;
    border: 0;
    padding: 0 0 10px;
    color: #68665e;
    cursor: pointer;
    font-size: 13px;
    line-height: 1.4;
  }
  button::before {
    content: "";
    position: absolute;
    top: 13px;
    left: 32px;
    right: 0;
    border-top: 1px solid var(--rule, #d9d5ca);
  }
  button:last-child::before {
    display: none;
  }
  button[aria-pressed="true"] {
    color: #252621;
    font-weight: 600;
  }
  button[aria-pressed="true"] .step-number {
    background: #ad3e16;
    color: #fff;
    border-color: #ad3e16;
  }
  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: 1px solid #bcb8aa;
    border-radius: 50%;
    font: 10px monospace;
    margin-bottom: 12px;
    background: #efede5;
  }
  .step-name {
    display: block;
  }
  @media (max-width: 760px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    button:nth-child(3n)::before { display: none; }
  }
  @media (max-width: 450px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    button:nth-child(3n)::before { display: block; }
    button:nth-child(2n)::before, button:last-child::before { display: none; }
  }
`;
export function Pipeline({
  title,
  stages,
}: {
  title: string;
  stages: Stage[];
}) {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const cycling = !reducedMotion && !hovered && !focused;
  useEffect(() => {
    if (!cycling || stages.length < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((index) => (index + 1) % stages.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [cycling, stages.length]);
  return (
    <Diagram
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <Label>{title}</Label>
      <Nodes $count={stages.length}>
        {stages.map((stage, i) => (
          <button
            key={stage.name}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <span className="step-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="step-name">{stage.name}</span>
          </button>
        ))}
      </Nodes>
      <p aria-live={cycling ? "off" : "polite"} style={{ display: "grid", fontSize: 14, marginBottom: 0 }}>
        {stages.map((stage, index) => (
          <span key={stage.name} aria-hidden={active !== index} style={{ gridArea: "1 / 1", visibility: active === index ? "visible" : "hidden" }}>
            <strong>{stage.name}.</strong> {stage.detail}
          </span>
        ))}
      </p>
    </Diagram>
  );
}
