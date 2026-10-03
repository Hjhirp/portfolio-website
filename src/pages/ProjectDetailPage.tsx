import React from "react";
import { Link, useParams } from "react-router-dom";
import { Page, Entry, Label, NotebookSection } from "../components/notebook/Notebook";

const projects: Record<string, { title: string; category: string; description: string; approach: string; lesson: string }> = {
  agentpod: {
    title: "Workflows with a memory of the system.",
    category: "agentPod / AI cofounder / prototype",
    description: "A B2B prototype for creating, running, observing, and optimizing workflows from natural language. MCP and a knowledge graph provide context for an agent to improve the workflows it produces.",
    approach: "Neo4j models workflow knowledge, while MCP connects tools and context. n8n and Dify support execution, with Python and Supabase behind the prototype. The product reached a working prototype with prospective design partners.",
    lesson: "Workflow generation is the beginning of the problem. Execution history and system context give an agent evidence for deciding what to change on its next attempt.",
  },
  mercor: {
    title: "Long horizons. Deliberate course corrections.", category: "Mercor / ML engineer / contract",
    description: "Work on long-horizon LLM trajectories around Kaggle tasks. Models inspect progress, reconsider their strategy, and execute experiments within a constrained interaction budget.",
    approach: "The work captured generated code, execution outputs, and intermediate trajectory information for training and evaluation. Self-evaluation connects the model’s current approach to the evidence produced by an experiment.",
    lesson: "A useful trajectory shows how a model responds when its initial approach falls short. Intermediate decisions and execution results make that behavior inspectable.",
  },
  quin: {
    title: "Financial decisions grounded in evidence.", category: "Quin / founding engineer",
    description: "An AI-native wealth-management decision system built around transparent, evidence-grounded support. A React and TypeScript frontend connects to Python services, financial data pipelines, and AWS orchestration.",
    approach: "Query decomposition feeds sparse and dense retrieval with cross-encoder reranking. Structured financial tools, iterative planning, and answer verification connect retrieved evidence to decisions. Lambda orchestrates services, with RDS and S3 supporting storage.",
    lesson: "Retrieved information needs a path into a decision that can be inspected. Structured tools and verification help connect an answer to the evidence behind it.",
  },
  "ai-chess": {
    title: "Sequence modeling meets move selection.", category: "AI chess / model experiment",
    description: "A GPT-2-style decoder explores chess move prediction through sequence modeling and reward fine-tuning. The experiment connects distributed training to evaluation of candidate move predictions.",
    approach: "The reported experiment used a 12-layer decoder and 48 A10 GPUs, with 60% Top-1 and 85% Top-5 move prediction. These results measure prediction in the experiment’s setting and do not establish playing strength.",
    lesson: "Predicting a plausible move and playing a strong game answer different evaluation questions. The measurement needs to stay attached to the task it actually tests.",
  },
};
export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects[slug || ""];
  if (!project) return <Page><Entry><h1>Project not found</h1><Link to="/#builds">Return to selected builds →</Link></Entry></Page>;
  return <Page><NotebookSection id="project-detail" number="Field note" label={project.category} title={project.title}>
    <Link to="/#systems">← Back to the notebook</Link>
    <Entry><Label>Overview</Label><p>{project.description}</p></Entry>
    <Entry><h3>Approach</h3><p>{project.approach}</p></Entry>
    <Entry><h3>The systems question</h3><p>{project.lesson}</p></Entry>
  </NotebookSection></Page>;
}
