import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { Page, Entry, Label, NotebookSection } from "../components/notebook/Notebook";

const StoryEntry = styled(Entry)`
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 32px;
  padding: 28px 0;
  h3 { font-size: 18px; margin: 0; line-height: 1.45; }
  > p { margin: 0; }
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 24px 0;
  }
`;

const projects: Record<string, { title: string; category: string; description: string; contribution: string; approach: string; lesson: string }> = {
  agentpod: {
    title: "From a business request to an inspectable workflow.",
    category: "agentPod / AI cofounder / startup prototype",
    description: "I cofounded agentPod to help businesses turn natural-language requests into automation they could inspect and refine. The product direction connected workflow creation, execution, observation, and improvement in one workspace.",
    contribution: "I worked across the product prototype and agent architecture, connecting conversational interfaces with workflow knowledge and a model-facing tool layer. The repository spans a multi-provider chat application, a workflow workspace, documentation-to-graph experiments, and an MCP retrieval service.",
    approach: "The retrieval system combines semantic search over n8n workflow templates with Neo4j graph lookup over documentation entities and relationships. MCP exposes template search, source JSON retrieval, graph queries, and web-documentation retrieval so the agent can work from concrete references rather than rely entirely on generated instructions.",
    lesson: "The founder’s challenge was to make automation understandable after generation. The product direction paired a conversational entry point with a visual workflow workspace and an observability view, so users could inspect the proposed workflow and understand how it should be evaluated.",
  },
  mercor: {
    title: "Long horizons. Deliberate course corrections.", category: "Mercor / ML engineer / contract",
    description: "Work on long-horizon LLM trajectories around Kaggle tasks. Models inspect progress, reconsider their strategy, and execute experiments within a constrained interaction budget.",
    contribution: "I built training trajectories from Kaggle tasks, capturing generated code, intermediate reasoning, and execution outputs to support LLM training and evaluation.",
    approach: "The work captured generated code, execution outputs, and intermediate trajectory information for training and evaluation. Self-evaluation connects the model’s current approach to the evidence produced by an experiment.",
    lesson: "A useful trajectory shows how a model responds when its initial approach falls short. Intermediate decisions and execution results make that behavior inspectable.",
  },
  quin: {
    title: "Financial decisions grounded in evidence.", category: "Quin / founding engineer",
    description: "An AI-native wealth-management decision system built around transparent, evidence-grounded support. A React and TypeScript frontend connects to Python services, financial data pipelines, and AWS orchestration.",
    contribution: "I built the React and TypeScript frontend, Python backend services, and financial data integrations. GitHub Actions and AWS Amplify supported delivery, while Lambda orchestration connected retrieval, model endpoints, and tool execution.",
    approach: "Query decomposition feeds sparse and dense retrieval with cross-encoder reranking. Structured financial tools, iterative planning, and answer verification connect retrieved evidence to decisions. Lambda orchestrates services, with RDS and S3 supporting storage.",
    lesson: "Retrieved information needs a path into a decision that can be inspected. Structured tools and verification help connect an answer to the evidence behind it.",
  },
  "ai-chess": {
    title: "Sequence modeling meets move selection.", category: "AI chess / model experiment",
    description: "A GPT-2-style decoder explores chess move prediction through sequence modeling and reward fine-tuning. The experiment connects distributed training to evaluation of candidate move predictions.",
    contribution: "I built and trained the decoder in PyTorch, then applied reward-based fine-tuning for move selection. Evaluation measured both the highest-ranked prediction and the set of candidate moves.",
    approach: "The reported experiment used a 12-layer decoder and 48 A10 GPUs, with 60% Top-1 and 85% Top-5 move prediction. These results measure prediction in the experiment’s setting and do not establish playing strength.",
    lesson: "Predicting a plausible move and playing a strong game answer different evaluation questions. The measurement needs to stay attached to the task it actually tests.",
  },
};
export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects[slug || ""];
  useEffect(() => {
    document.title = `${project ? project.category.split(" / ")[0] : "Project not found"} | Harshal Hirpara`;
    return () => { document.title = "Harshal Hirpara | Systems Notebook"; };
  }, [project]);
  if (!project) return <Page><Entry><h1>Project not found</h1><Link to="/#builds">Return to selected builds →</Link></Entry></Page>;
  return <Page><NotebookSection id="project-detail" number="Field note" label={project.category} title={project.title} headingLevel="h1">
    <p><Link to={slug === "ai-chess" ? "/#builds" : "/#systems"}>← Back to the notebook</Link></p>
    <StoryEntry><Label>Overview</Label><p>{project.description}</p></StoryEntry>
    <StoryEntry><h3>My contribution</h3><p>{project.contribution}</p></StoryEntry>
    <StoryEntry><h3>Approach</h3><p>{project.approach}</p></StoryEntry>
    <StoryEntry><h3>The systems question</h3><p>{project.lesson}</p></StoryEntry>
    {slug === "agentpod" && <>
      <StoryEntry><h3>Product experience</h3><p>
        The chat prototype supports streaming responses across OpenAI, Gemini,
        and Anthropic, with model selection, conversation history, and URL
        context. A separate workflow workspace explores visual node editing,
        workflow navigation, and an observability sidebar organized around run
        health, agent quality, and cost.
      </p></StoryEntry>
      <StoryEntry><h3>Why a knowledge graph?</h3><p>
        Workflow requests often describe a business goal without naming the
        integrations or nodes needed to implement it. Vector search finds
        relevant examples; a documentation graph adds connected entities and
        relationships. Retrieving the original template JSON keeps the source
        available for inspection and adaptation.
      </p></StoryEntry>
      <StoryEntry><h3>Stage and next challenge</h3><p>
        We reached a working prototype and engaged prospective design partners.
        The repos show implemented retrieval and chat components alongside an
        early workflow editor and an observability interface using sample data.
        Connecting those pieces into a fully instrumented execution and
        optimization loop was the broader product direction.
      </p></StoryEntry>
    </>}
  </NotebookSection></Page>;
}
