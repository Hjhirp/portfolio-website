import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ProjectArchive from "../components/notebook/ProjectArchive";
import Writing from "../components/notebook/Writing";
import { CVData } from "../utils/cvUtils";
import {
  Page,
  Label,
  Grid,
  Entry,
  NotebookSection,
  Pipeline,
} from "../components/notebook/Notebook";
const Intro = styled.section`
  padding: 48px 0 40px;
  h1 {
    font-size: clamp(2.5rem, 5.7vw, 4.5rem);
    font-weight: 500;
    letter-spacing: -0.055em;
    line-height: 1.04;
    margin: 24px 0 32px;
    max-width: 100%;
    text-wrap: balance;
  }
  .intro-context {
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
    gap: 56px;
    align-items: start;
  }
  .intro-role {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 14px;
    color: #68665e;
    line-height: 1.6;
  }
  .intro-role li + li {
    margin-top: 8px;
  }
  .intro-copy {
    font-size: 18px;
    max-width: 560px;
  }
  @media (max-width: 760px) {
    padding-top: 32px;
    .intro-context {
      grid-template-columns: 1fr;
      gap: 6px;
    }
    .intro-role {
      border-left: 0;
      padding-left: 0;
      max-width: none;
    }
  }
`;
const Index = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid #ccc8bb;
  margin-top: 20px;
  gap: 30px;
  padding-top: 20px;
  a {
    font-size: 14px;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;
const Metric = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin: 20px 0;
  strong {
    display: block;
    color: #ad3e16;
    font-size: 42px;
    letter-spacing: -0.04em;
  }
  span {
    font-size: 12px;
    display: block;
    max-width: 170px;
  }
`;
const Interests = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  span {
    border: 1px solid #ccc8bb;
    padding: 10px 16px;
    font-size: 14px;
  }
`;
export default function HomePage({
  cvData,
}: {
  cvData: CVData | null;
  loading: boolean;
  error: string | null;
}) {
  const info = cvData?.personal_information;
  return (
    <Page>
      <Intro id="intro">
        <div>
          <Label>01 / Field notes / ML, systems & reinforcement learning</Label>
          <h1>
            From the learning loop
            <br />
            to the production{" "}
            <span
              style={{
                fontFamily: "Georgia,serif",
                fontStyle: "italic",
                color: "#ad3e16",
              }}
            >
              runtime.
            </span>
          </h1>
          <div className="intro-context">
            <p className="intro-copy">
              I’m Harshal Hirpara. I build intelligent systems that learn, act,
              and improve, with the infrastructure to understand what happens
              along the way.
            </p>
            <ul className="intro-role" aria-label="Background">
              <li>ML &amp; systems engineer</li>
              <li>RL &amp; LLM researcher</li>
              <li>Former AI startup cofounder</li>
            </ul>
          </div>
          <Index>
            <a href="#systems">
              <Label>Engineering</Label>Agents that operate in real systems ↓
            </a>
            <a href="#research">
              <Label>Research</Label>Learning loops that change behavior ↓
            </a>
          </Index>
        </div>
      </Intro>
      <NotebookSection
        id="systems"
        number="02"
        label="Agent + systems engineering"
        title="An agent is only as useful as its feedback loop."
      >
        <p style={{ maxWidth: "78ch", fontSize: 18 }}>
          My recent work connects planning to execution, observation, and
          repair. The interesting part is what happens after the first attempt
          fails.
        </p>
        <Entry>
          <Label>
            Checksum AI / Lead ML + Systems Engineer / Dec 2025–present
          </Label>
          <h3>Testing the contract. Closing the loop.</h3>
          <Grid>
            <div>
              <p>
                Protocol-agnostic backend contract testing for REST and gRPC:
                turn API artifacts into executable tests, run them nightly, and
                diagnose failures.
              </p>
              <p>
                A maintenance agent analyzes network calls and previous
                successful runs to repair stale tests or surface likely product
                bugs.
              </p>
            </div>
            <div>
              <p>
                For Playwright healing, I work on isolated agent sandboxes and a
                rerun runtime: try a candidate repair, observe the result, and
                iterate.
              </p>
              <p>
                The harness migration moves from a Pydantic-based setup toward
                OpenCode + Daytona, with centralized factory and routing logic.
              </p>
            </div>
          </Grid>
          <Pipeline
            title="Conceptual contract-testing architecture"
            stages={[
              {
                name: "Artifacts",
                detail:
                  "Swagger / OpenAPI, documentation and existing tests provide the starting evidence.",
              },
              {
                name: "Detect flows",
                detail:
                  "A flow detection agent identifies the interactions to test.",
              },
              {
                name: "Generate tests",
                detail:
                  "A test generation agent creates pytest tests for backend contracts.",
              },
              {
                name: "Execute",
                detail:
                  "Nightly end-to-end execution produces failures and execution evidence.",
              },
              {
                name: "Diagnose",
                detail:
                  "Compare network calls and previous successful results to understand the failure.",
              },
              {
                name: "Repair / report",
                detail:
                  "Repair a stale test, or surface a likely product bug for investigation.",
              },
            ]}
          />
          <details>
            <summary>Inside the repair harness</summary>
            <p>
              Each agent runs in an isolated sandbox. A REPL-like runtime
              supports repeated execution of candidate fixes. The agent observes
              results before choosing a working repair; a separate
              classification agent distinguishes healable test failures from
              likely product bugs.
            </p>
            <p>
              Architecture is shown at a conceptual level; implementation and
              proprietary details are intentionally omitted.
            </p>
          </details>
          <small>REST · gRPC · pytest · Playwright · OpenCode · Daytona</small>
        </Entry>
        <Entry>
          <Label>Checksum / failure classification / field note</Label>
          <h3>Same timeout. Different failure.</h3>
          <p>
            A checkout test waits for an order confirmation and times out. The
            order might have failed, the page might have changed, or a helper
            might have stopped waiting too soon. The symptom alone cannot tell
            you which system needs fixing.
          </p>
          <p>
            Our classification work connects application behavior, the test’s
            expectations, and evidence from the rest of the run. An
            application-bug verdict keeps the failure out of automatic healing;
            a broken-test verdict makes it eligible for repair.
          </p>
          <Grid>
            <div>
              <h4>Start with what succeeded.</h4>
              <p>
                We expanded network evidence beyond failed requests to include
                successful operations, request origins, and connection-path
                context. A successful order request can challenge an outage
                explanation without proving that the whole checkout worked.
              </p>
              <h4>Read the assumptions behind the timeout.</h4>
              <p>
                Source retrieval includes the code at the failure location when
                available, so shared waiting and retry helpers can be examined
                alongside the registered test. Missing page snapshots are made
                explicit in the explanation.
              </p>
            </div>
            <div>
              <h4>Give related failures shared context.</h4>
              <p>
                Matching error, page, and trace evidence helps keep related
                failures together in classification sessions. Every test still
                receives its own verdict: a common error screen does not erase
                differences in what each test expected.
              </p>
              <h4>Make the suspected cause inspectable.</h4>
              <p>
                Application-bug verdicts include a suspected cause and title.
                Related verdicts can be organized into an issue group while
                retaining the individual failed tests and their evidence.
              </p>
            </div>
          </Grid>
          <details>
            <summary>
              Evaluation / organization, latency, and correctness
            </summary>
            <p>
              Grouping related failures makes a run easier to investigate.
              Faster classification shortens the feedback loop. Those operating
              measurements are separate from diagnostic accuracy.
            </p>
            <p>
              Accuracy evaluation needs independently reviewed failures,
              including application bugs incorrectly labeled as broken tests.
              Repair quality needs a separate check that the original test
              intent survives.
            </p>
          </details>
          <p style={{ marginTop: 24 }}>
            The engineering question I keep coming back to: does the proposed
            repair fix the test’s assumption, or conceal a regression in the
            application? The evidence should help a reviewer tell the
            difference.
          </p>
        </Entry>
        <Grid>
          <Entry>
            <Label>Design note / preserve the question</Label>
            <h3>A green run is evidence. It isn’t the whole answer.</h3>
            <p>
              A test generator can make a difficult journey easier until it
              passes. That changes what the test means. In my writing, I explore
              how to compare the proposed journey with the code that actually
              ships, and how to expose the checks that could not run.
            </p>
            <p>
              The useful artifact is a test an engineer can inspect, with enough
              context to understand its boundaries.
            </p>
            <a href="https://checksum.ai/blog/api-testing-with-ai-isnt-just-claudes-job">
              Read the architecture note ↗
            </a>
          </Entry>
          <Entry>
            <Label>Design note / separate reasoning from execution</Label>
            <h3>Give the agent room to try. Keep the runner predictable.</h3>
            <p>
              Diagnosis needs exploration: inspect evidence, propose a repair,
              execute it, and reconsider. Routine test execution needs a stable
              runtime. Keeping those responsibilities distinct makes the result
              easier to interpret.
            </p>
            <p>
              A repair should restore the test’s intent. A passing result alone
              cannot tell you whether that happened.
            </p>
            <a href="https://checksum.ai/blog/announcing-the-api-agent">
              Read about the API Agent ↗
            </a>
          </Entry>
        </Grid>
        <Grid>
          <Entry>
            <Label>agentPod / AI Co-Founder</Label>
            <h3>From a business request to an inspectable workflow.</h3>
            <p>
              I cofounded agentPod to help businesses turn natural-language
              requests into automation they could inspect and refine. The
              prototype brought together conversational AI, workflow-template
              retrieval, and a visual workflow workspace.
            </p>
            <p>
              The central idea was to ground workflow creation in existing
              templates and tool documentation. I worked across the product and
              agent system, connecting a model-facing MCP layer to semantic
              search and Neo4j knowledge graphs.
            </p>
            <details>
              <summary>System decisions</summary>
              <p>
                The retrieval layer combines vector search over n8n templates
                with graph-based lookup of documentation entities and their
                relationships. MCP exposes template search, source JSON
                retrieval, and web-documentation tools to the agent.
              </p>
              <p>
                The product experiments included streaming chat across model
                providers, persistent conversations, a visual node editor, and
                a prototype observability view for run health, agent quality,
                and cost. The startup reached a working prototype and
                prospective design partners.
              </p>
            </details>
            <small>MCP · knowledge graphs · n8n · Dify · Neo4j</small>
            <p><Link to="/projects/agentpod">Read project details →</Link></p>
          </Entry>
          <Entry>
            <Label>Mercor / ML Engineer, Contract / Sep–Dec 2025</Label>
            <h3>Long horizons. Deliberate course corrections.</h3>
            <p>
              LLM trajectories around Kaggle tasks, constrained to roughly 100
              turns. Models inspect progress, evaluate their approach, change
              strategy, and execute experiments.
            </p>
            <details>
              <summary>Training & evaluation evidence</summary>
              <p>
                Work captured generated code, execution outputs, and
                intermediate trajectory information for training and evaluation.
                The focus was long-horizon behavior and self-evaluation.
              </p>
            </details>
            <small>
              LLM trajectories · experiment execution · self-evaluation
            </small>
            <p><Link to="/projects/mercor">Read project details →</Link></p>
          </Entry>
        </Grid>
        <Entry>
          <Label>Quin / Founding Engineer / Jun–Aug 2025</Label>
          <h3>Financial decisions grounded in evidence.</h3>
          <p style={{ maxWidth: "78ch" }}>
            An AI-native wealth-management decision system built around
            transparent, evidence-grounded support. I connected a React /
            TypeScript frontend to Python services, financial data pipelines,
            and AWS orchestration.
          </p>
          <details>
            <summary>Retrieval → tools → verification</summary>
            <p>
              Query decomposition feeds sparse and dense retrieval with
              cross-encoder reranking. Structured financial tools, iterative
              planning, and answer verification connect retrieved evidence to
              decisions. AWS Lambda orchestrates services, with RDS for
              structured data and S3 for larger datasets.
            </p>
          </details>
          <small>
            Hybrid RAG · reranking · structured tools · Python · AWS
          </small>
            <p><Link to="/projects/quin">Read project details →</Link></p>
        </Entry>
      </NotebookSection>
      <NotebookSection
        id="research"
        number="03"
        label="RL + research / University of Illinois Chicago"
        title="Learning is a systems problem, too."
      >
        <Grid>
          <Entry>
            <Label>Research thread A / LLM alignment</Label>
            <h3>Beyond supervised fine-tuning.</h3>
            <p>
              Research into online alignment and reinforcement learning after
              supervised fine-tuning. Distributed training and profiling support
              experiments in how models learn from feedback beyond conventional
              RLHF.
            </p>
            <Metric>
              <div>
                <strong>~54%</strong>
                <span>
                  reported training-time reduction in the research environment
                </span>
              </div>
            </Metric>
            <details open>
              <summary>Infrastructure & profiling</summary>
              <p>
                PyTorch training across multi-node A40 / A100 environments,
                using Kubernetes and Slurm. Experiment tracking with Weights &
                Biases; system observation with Prometheus / Grafana; PyTorch
                and Nsight profiling to investigate training bottlenecks.
              </p>
            </details>
            <details>
              <summary>Method notes / the distributed learning loop</summary>
              <p>
                The work included online DPO pipelines with an LLM-as-a-Judge,
                implemented in PyTorch with DeepSpeed and Accelerate. The
                broader research explored alignment after supervised fine-tuning
                and feedback collected during learning.
              </p>
              <p>
                Training efficiency work covered parallelism and data
                throughput. PyTorch Profiler and Nsight helped locate kernel and
                memory bottlenecks; Slurm and Weights &amp; Biases supported
                hyperparameter sweeps and experiment tracking.
              </p>
              <p>
                The questions I’m interested in connect both layers: what
                behavior does the feedback reward, and how efficiently can the
                infrastructure turn that feedback into another experiment?
              </p>
            </details>
            <small>
              Reported research result; baseline and experiment details need
              confirmation.
            </small>
          </Entry>
          <Entry>
            <Label>Research thread B / Clinical reinforcement learning</Label>
            <h3>A policy for a patient digital twin.</h3>
            <p>
              Research into guided policy gradients for dynamic treatment planning
              in head and neck cancer. A simulated patient environment connects
              treatment decisions to efficacy, toxicity, and symptom burden.
            </p>
            <Metric>
              <div>
                <strong>~98%</strong>
                <span>simulated reward, as reported</span>
              </div>
              <div>
                <strong>~61%</strong>
                <span>macro-F1 matching physician decisions</span>
              </div>
            </Metric>
            <p>
              A patient digital twin combines a VAE and autoregressive XGBoost;
              behavior cloning informs the policy-gradient work.
            </p>
            <details>
              <summary>Method notes / Policy-Refined Behavior Cloning</summary>
              <p>
                The research agent uses Policy-Refined Behavior Cloning (PRBC):
                behavior cloning provides a starting point informed by physician
                decisions, and policy gradients refine the policy in the
                simulated treatment environment.
              </p>
              <p>
                The patient digital twin models multi-stage outcomes using a VAE
                and autoregressive XGBoost. The treatment-planning objective
                considers efficacy alongside toxicity and symptom burden.
              </p>
              <p>
                Reward and agreement answer different questions. A policy can
                achieve a high score in its simulator while still differing from
                physician decisions, so both measures belong in the research
                story.
              </p>
            </details>
            <small>
              These metrics describe the research setting, not clinical outcomes
              or deployment performance. Reward normalization and evaluation
              protocol need confirmation.
            </small>
          </Entry>
        </Grid>
        <Pipeline
          title="Conceptual research loop"
          stages={[
            {
              name: "Model / policy",
              detail:
                "Start with a model or policy whose behavior can be evaluated.",
            },
            {
              name: "Environment",
              detail:
                "Collect feedback from the task or a simulated patient digital twin.",
            },
            {
              name: "Evaluate",
              detail:
                "Measure reward, behavior, and agreement within the experiment’s defined setting.",
            },
            {
              name: "Update",
              detail:
                "Use the learning signal to update the policy; repeat and track the experiment.",
            },
          ]}
        />
        <Entry>
          <Label>Reading / publications & research notes</Label>
          <h3>Methods, experiments, and written work.</h3>
          <p>
            Master’s thesis: Guided Policy Gradient for Dynamic Treatment Plan
            Prediction with Symptom Burden Minimization in Head and Neck Cancer.
            The work studies treatment-planning policies that consider symptom
            burden alongside the outcomes modeled in a patient digital twin.
          </p>
          <p>
            <a
              href={
                info?.google_scholar ||
                "https://scholar.google.com/citations?user=dqOz0_UAAAAJ&hl=en"
              }
            >
              Research profile on Google Scholar ↗
            </a>
          </p>
          {cvData?.research_publications
            .filter(
              (p) =>
                p.title.startsWith("Exploring") ||
                p.title.startsWith("Automated"),
            )
            .map((p) => (
              <div key={p.title}>
                <p>
                <a href={p.link}>{p.title} ↗</a>{" "}
                <Label>
                  {p.date} /{" "}
                  {p.title.startsWith("Exploring")
                    ? "Technical article"
                    : "AES 2024 conference abstract"}
                </Label>
                </p>
                <p>
                  {p.title.startsWith("Exploring")
                    ? "A technical article on large language model concepts, alignment techniques, and practical implementation. It covers LoRA, QLoRA, supervised fine-tuning, and preference-based methods including RLHF, DPO, KTO, and ORPO."
                    : "A conference abstract on automated seizure detection in ambulatory EEG. It describes an ensemble of boosted-tree models evaluated against expert annotations."}
                </p>
              </div>
            ))}
          <details>
            <summary>Earlier research / UI Health</summary>
            <p>
              EEG seizure detection and ML pipelines at UI Health connect signal
              preprocessing, model evaluation, and collaboration with
              clinicians. This work is part of the broader trajectory toward
              observable and reliable learning systems.
            </p>
            <p>
              The engineering work covered raw signal preprocessing, artifact
              removal, containerized modules, and collaboration with clinicians.
              The AES 2024 abstract describes an ensemble of XGBoost, CatBoost,
              and LightGBM evaluated against expert annotations.
            </p>
          </details>
        </Entry>
      </NotebookSection>
      <NotebookSection
        id="builds"
        number="04"
        label="Selected builds"
        title="Ideas tested outside the notebook."
      >
        <Entry>
          <Label>Find-My-Hospital / voice-agent workflow</Label>
          <h3>From a phone call to a nearby hospital.</h3>
          <p>
            A voice-agent prototype helps a caller find a nearby hospital.
            Location discovery, hospital candidates, and live traffic and
            routing evidence inform the workflow’s recommendation.
          </p>
          <Pipeline
            title="Voice-agent workflow"
            stages={[
              {
                name: "Phone call",
                detail: "Twilio and ElevenLabs support the voice interaction.",
              },
              {
                name: "Locate",
                detail:
                  "Determine the caller’s location as input to the search.",
              },
              {
                name: "Find hospitals",
                detail: "Discover candidate hospitals through the workflow.",
              },
              {
                name: "Route",
                detail: "Google Maps supplies traffic and routing information.",
              },
              {
                name: "Choose",
                detail:
                  "Use location and routing evidence to identify a nearby hospital.",
              },
            ]}
          />
          <p>
            <strong>1st in the n8n track · 2nd in the AWS MCP Hackathon</strong>
          </p>
          <p>This project helped inspire agentPod.</p>
          <p>
            <a href="https://devpost.com/software/emergency-find-my-hospital">
              Project and award listing on Devpost ↗
            </a>
          </p>
          <small>ElevenLabs · Twilio · n8n · Google Maps · AWS Bedrock</small>
        </Entry>
        <Grid>
          <Entry>
            <Label>Notey / multimodal memory</Label>
            <h3>Keep the context, not just the transcript.</h3>
            <p>
              An AI memory companion that captures audio and photos in a shared
              timeline. Transcription, summaries, and session replay help revisit
              an event while preserving its original context.
            </p>
            <details>
              <summary>Capture → transcribe → revisit</summary>
              <p>
                Audio and photos enter the same event timeline. FastAPI services
                connect Whisper.cpp transcription, Gemini summaries, semantic search,
                and Supabase storage;
                replay restores the synchronized media so a summary can be
                checked against the original context.
              </p>
              <p>
                It’s a useful systems problem: a memory tool needs to preserve
                the evidence behind its compressed version of an event.
              </p>
            </details>
            <a href="https://github.com/Hjhirp/Notey">Explore the source ↗</a>
          </Entry>
          <Entry>
            <Label>AI chess / model experiment</Label>
            <h3>Sequence modeling meets move selection.</h3>
            <p>
              A GPT-2-style decoder explores chess move prediction through
              sequence modeling and reward fine-tuning. The experiment connects
              distributed training to evaluation of candidate move predictions.
            </p>
            <small>
              Reported experiment: 12 layers, 48 A10 GPUs, 60% Top-1 and 85% Top-5
              move prediction. Prediction accuracy is specific to this setting; it
              does not establish playing strength.
            </small>
            <details>
              <summary>Related / agent evaluation</summary>
              <p>
                Mistral / Llama experiments on blackjack and pathfinding
                explored chain-of-thought, few-shot prompting, bias, and rule
                violations.
              </p>
            </details>
            <p><Link to="/projects/ai-chess">Read project details →</Link></p>
          </Entry>
        </Grid>
        <ProjectArchive />
      </NotebookSection>
      <Writing />
      <NotebookSection
        id="trajectory"
        number="06"
        label="Trajectory"
        title="The thread through the work."
      >
        <Grid>
          <div>
            <Entry>
              <Label>Foundation / Nirma + Cactus Communications</Label>
              <h3>Make models useful.</h3>
              <p>
                Computer science foundations, scientific document processing,
                and production NLP pipelines.
              </p>
              <p>
                At Cactus Communications, I worked on Transformer-based
                summarization and keyword extraction for scientific documents,
                AWS Inferentia deployment, and evaluation for robustness,
                regressions, and A/B testing.
              </p>
            </Entry>
            <Entry>
              <Label>Research / UIC + UI Health</Label>
              <h3>Understand how they learn.</h3>
              <p>
                LLM alignment, distributed GPU training, clinical policy
                gradients, and EEG pipelines. M.S. in Computer Science, UIC,
                2023–2025.
              </p>
            </Entry>
          </div>
          <div>
            <Entry>
              <Label>Building / Quin + Find-My-Hospital + agentPod</Label>
              <h3>Connect intelligence to decisions.</h3>
              <p>
                Built systems spanning financial evidence, voice workflows, and
                natural-language automation. These projects connect model
                reasoning to tools, execution, and decisions people can inspect.
              </p>
            </Entry>
            <Entry>
              <Label>Recent work / Mercor + Checksum</Label>
              <h3>Make action observable.</h3>
              <p>
                Worked on long-horizon evaluation, isolated execution, and test
                repair. Feedback loops connect agent decisions to execution
                evidence so their behavior can be evaluated and improved.
              </p>
            </Entry>
          </div>
        </Grid>
      </NotebookSection>
      <NotebookSection
        id="interests"
        number="07"
        label="Open questions"
        title="What I’m thinking about next."
      >
        <p style={{ maxWidth: "78ch", fontSize: 18 }}>
          How can an agent tell when its own strategy is failing? How do we
          connect training-time objectives to reliable behavior in real
          environments?
        </p>
        <Interests>
          {[
            "Agent self-evaluation",
            "Reliable autonomous systems",
            "Reinforcement learning",
            "Agents in real environments",
            "Training & evaluation infrastructure",
          ].map((s) => (
            <span key={s}>{s}</span>
          ))}
        </Interests>
      </NotebookSection>
      <NotebookSection
        id="contact"
        number="08"
        label="Contact"
        title="Let’s compare notes."
      >
        <p style={{ maxWidth: "78ch", fontSize: 18 }}>
          I’m interested in hard problems at the intersection of learning and
          systems, and in the people building what comes next. Research,
          engineering, or a future collaboration: I’d like to hear about it.
        </p>
        <p>
          <a
            style={{
              fontSize: "clamp(18px, 3vw, 24px)",
              color: "#ad3e16",
              overflowWrap: "anywhere",
            }}
            href={`mailto:${info?.email || "Hirparaharshal333@gmail.com"}`}
          >
            {info?.email || "Hirparaharshal333@gmail.com"} ↗
          </a>
        </p>
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          <a href={info?.github || "https://github.com/Hjhirp"}>GitHub ↗</a>
          <a
            href={
              info?.linkedin || "https://www.linkedin.com/in/harshaljhirpara"
            }
          >
            LinkedIn ↗
          </a>
          <a href={info?.medium || "https://medium.com/@hhirp"}>Writing ↗</a>
        </div>
      </NotebookSection>
    </Page>
  );
}
