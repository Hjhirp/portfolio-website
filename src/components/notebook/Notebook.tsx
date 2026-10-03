import React, { ReactNode, useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";

export const Page = styled.div`
  max-width: 1120px;
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
  letter-spacing: 0.13em;
  color: #68665e;
`;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
  > * {
    min-width: 0;
  }
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;
export const Entry = styled.article`
  border-top: 1px solid #ccc8bb;
  padding: 24px 0;
  h3 {
    font-size: clamp(1.5rem, 2.5vw, 1.875rem);
    letter-spacing: -0.035em;
    margin: 10px 0 14px;
    line-height: 1.25;
    text-wrap: pretty;
  }
  p {
    max-width: 78ch;
    line-height: 1.75;
  }
  details {
    margin-top: 16px;
  }
  summary {
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    padding: 8px 0;
  }
  details p {
    margin-top: 14px;
  }
  small {
    display: block;
    color: #68665e;
    font-size: 12px;
    margin-top: 16px;
  }
`;
const SectionShell = styled(motion.section)`
  padding: 48px 0;
  border-top: 1px solid #ccc8bb;
  scroll-margin-top: 100px;
  h2 {
    font-size: clamp(32px, 4vw, 52px);
    letter-spacing: -0.045em;
    line-height: 1.12;
    margin: 14px 0 24px;
    max-width: 100%;
    text-wrap: balance;
  }
  @media (max-width: 700px) {
    padding: 36px 0;
    scroll-margin-top: 24px;
  }
`;
export function NotebookSection({
  id,
  number,
  label,
  title,
  children,
}: {
  id: string;
  number: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <SectionShell
      id={id}
      initial={false}
      whileInView={reduced ? {} : { opacity: 1 }}
      viewport={{ once: true }}
    >
      <Label>
        {number} / {label}
      </Label>
      <h2>{title}</h2>
      {children}
    </SectionShell>
  );
}
export type Stage = { name: string; detail: string };
const Diagram = styled.div`
  border-top: 1px solid #ccc8bb;
  border-bottom: 1px solid #ccc8bb;
  padding: 20px 0;
  margin: 24px 0;
  > p {
    max-width: 78ch;
    line-height: 1.65;
    margin-top: 20px;
  }
`;
const Nodes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
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
    border-top: 1px solid #ccc8bb;
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
    background: #f6f4ec;
  }
  .step-name {
    display: block;
  }
  @media (max-width: 760px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 450px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const cycling = playing && !reducedMotion && !hovered && !focused;
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <Label>{title}</Label>
        {!reducedMotion && <button
          type="button"
          aria-label={`${playing ? "Pause" : "Play"} ${title}`}
          onClick={() => setPlaying((value) => !value)}
          style={{ background: "none", border: "1px solid #ccc8bb", padding: "8px 12px", cursor: "pointer", color: "#68665e", fontSize: 12, flexShrink: 0 }}
        >{playing ? "Pause" : "Play"}</button>}
      </div>
      <Nodes>
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
      <p aria-live={cycling ? "off" : "polite"} style={{ fontSize: 14, marginBottom: 0 }}>
        <strong>{stages[active].name}.</strong> {stages[active].detail}
      </p>
    </Diagram>
  );
}
