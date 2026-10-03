import React, { useState } from "react";
import styled from "styled-components";
import { Label, ProjectDescription, ProjectSources } from "./Notebook";
const ArchiveGrid = styled.div`
  border-top: 1px solid var(--rule);
`;
const ArchiveEntry = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.4fr);
  column-gap: 40px;
  padding: 24px 0;
  border-bottom: 1px solid var(--rule);
  h3 {
    margin: 8px 0 0;
    font-size: var(--project-title);
    letter-spacing: -0.035em;
    line-height: 1.25;
    text-wrap: pretty;
  }
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 20px 0;
  }
`;
const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 20px 0;
  button { padding: 10px 14px; border: 1px solid transparent; border-radius: 6px; background: transparent; color: #68665e; cursor: pointer; font: inherit; font-size: 14px; }
  button[aria-pressed="true"] { background: #ece7dc; color: #92320f; border-color: #d9d0be; }
  @media (max-width: 500px) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    button { padding: 8px; font-size: 12px; line-height: 1.35; min-height: 48px; }
  }
`;
const projects = [
  { name: "Kip", repo: "Kip", category: "Agents & products", title: "Check the claim against the filing.", description: "An earnings-call analysis prototype extracts quantitative management claims and compares them with financial data. Deterministic checks run first, with model reasoning for cases that need context.", stack: "PydanticAI · Gemini · SEC EDGAR · SQLite" },
  { name: "PatientHero", repo: "PatientHero", category: "Agents & products", title: "Coordinate the steps around finding care.", description: "A demonstration platform connects conversational intake, hospital discovery, and appointment-information extraction. Specialized agents and background browser tasks explore how to coordinate a multi-step healthcare workflow.", stack: "CrewAI · FastAPI · Playwright · Exa · Weave" },
  { name: "Voice authentication", repo: "voice-auth-microservice", category: "Agents & products", title: "Turn live audio into a verification signal.", description: "A speaker-verification service connects voice enrollment to real-time audio capture. SpeechBrain embeddings, FastAPI endpoints, and a Supabase-backed history support the authentication workflow.", stack: "SpeechBrain · ECAPA-TDNN · FastAPI · WebSockets" },
  { name: "Absurdly Visual", repo: "absurdly-visual", category: "Agents & products", title: "Give a card game a generative twist.", description: "A multiplayer card-game prototype combines human players, AI players, and video generation. Gemini and Fetch.ai agents support play, while Veo turns winning card combinations into short videos.", stack: "Gemini · Fetch.ai · Veo · Docker" },
  { name: "Re-Search", repo: "Re_Search", category: "Language & retrieval", title: "Find papers from a research question.", description: "A team-built research-paper recommender ranks papers against a topic query. The project compares TF-IDF, Word2Vec, and autoencoder representations over paper titles, abstracts, and keywords.", stack: "Streamlit · NLP · Word2Vec · scikit-learn" },
  { name: "LLM alignment implementations", repo: "Exploring-Large-Language-Models-Concepts-Alignment-Techniques-and-Practical-Implementation", category: "Language & retrieval", title: "Connect alignment concepts to implementation.", description: "A companion repository explores large language model training and adaptation. The associated technical article covers LoRA, QLoRA, supervised fine-tuning, and preference-based alignment methods.", stack: "LLMs · fine-tuning · preference alignment" },
  { name: "Product review analysis", repo: "Product-Review-Feature-and-Opinion-Extraction", category: "Language & retrieval", title: "Extract what a review is really about.", description: "An NLP experiment explores feature and opinion extraction from product reviews. It connects sentiment analysis to the product attributes people describe in their feedback.", stack: "NLP · sentiment analysis · feature extraction" },
  { name: "Tweet topic modeling", repo: "Tweet-Topic-Modelling", category: "Language & retrieval", title: "Find themes in a stream of short text.", description: "A topic-modeling experiment analyzes tweets for recurring themes. Gensim modeling and Seaborn visualization support exploration of the text corpus.", stack: "Gensim · Seaborn · NLP" },
  { name: "Robotic arm navigation", repo: "Robotic-Arm-Navigation", category: "ML & simulation", title: "Explore motion in simulated environments.", description: "A robotics experiment investigates arm navigation through simulation. PyBullet and Gazebo provide environments for exploring models and movement behavior.", stack: "PyBullet · Gazebo · robotics" },
  { name: "Mars anomaly detection", repo: "YOLO-Implementation-for-Mars-Anomaly-Detection-", category: "ML & simulation", title: "Look for anomalies in planetary imagery.", description: "A computer-vision experiment applies YOLO to anomaly detection in Mars imagery. The repository explores object detection in an unusual visual domain.", stack: "YOLO · computer vision · object detection" },
  { name: "U-Net segmentation", repo: "UNET-Implementation-for-Image-Segmentation", category: "ML & simulation", title: "Predict structure at the pixel level.", description: "An implementation study explores U-Net for image segmentation. It examines how an encoder-decoder model maps image features into spatial predictions.", stack: "U-Net · image segmentation · deep learning" },
  { name: "Climate prediction", repo: "Climate-Change-Prediction", category: "ML & simulation", title: "Compare boosted trees on climate data.", description: "A WiDS Datathon project explores climate-related prediction in the United States. CatBoost, XGBoost, and LightGBM provide alternative modeling approaches for the task.", stack: "CatBoost · XGBoost · LightGBM · tabular ML" },
];
const categories = ["Agents & products", "Language & retrieval", "ML & simulation"];
export default function ProjectArchive() {
  const [category, setCategory] = useState(categories[0]);
  return <div>
    <h3 style={{ fontSize: 26, margin: "32px 0 12px" }}>More from the project archive.</h3>
    <p>Product prototypes, research tools, and experiments from my GitHub repositories.</p>
    <Categories role="group" aria-label="Project categories">
      {categories.map((name) => <button key={name} type="button" aria-pressed={category === name} onClick={() => setCategory(name)}>{name}</button>)}
    </Categories>
    <ArchiveGrid>{projects.filter((project) => project.category === category).map((project) => <ArchiveEntry key={project.repo}>
      <div><Label>{project.name}</Label><h3>{project.title}</h3></div><div><ProjectDescription>{project.description}</ProjectDescription>
      <ProjectSources><a href={`https://github.com/Hjhirp/${project.repo}`}>Explore the source ↗</a><small>{project.stack}</small></ProjectSources></div>
    </ArchiveEntry>)}</ArchiveGrid>
    <p><a href="https://github.com/Hjhirp?tab=repositories">Browse all repositories ↗</a></p>
  </div>;
}
