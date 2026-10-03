# Portfolio content verification

Reviewed October 3, 2026 against the supplied portfolio brief, repository CV JSON, and public primary sources. “Matches the brief” means supported by the owner's supplied account, not independently proven. Public profiles and project descriptions are self-reported unless stated otherwise.

| Content | Evidence and status |
| --- | --- |
| ML / systems engineer, RL / LLM researcher, former AI startup cofounder | Matches the brief. UIC research and Quin work also appear on the owner's GitHub profile. Cofounder status comes from the brief. |
| Checksum role and work | Architecture, tools, REST/gRPC testing, Playwright healing and classification architecture match the brief. Public Checksum author bio confirms affiliation, but says Software Test Engineer, conflicting with the supplied Lead ML + Systems Engineer title. Retained the owner's title pending clarification. No classification operating figures are published. |
| agentPod | Matches the brief; prototype and prospective design partners retained as separate facts. Removed unsupported causal wording suggesting the prototype produced those partners. No public independent evidence located for the company or workflow implementation. |
| Mercor | Matches the brief. Approximately 100-turn trajectories and evaluation work are owner-supplied. No Kaggle wins claimed. Removed unnecessary editorial wording about wins. |
| Quin | React/TypeScript, Python, AWS and RAG work match the brief and broadly align with the owner's GitHub profile. Detailed hybrid retrieval/reranking comes from the brief. No revenue, customers or financial outcome claims added. |
| LLM alignment | 54% training-time reduction also appears in the owner's GitHub README. Experimental baseline, timing protocol and profiling artifacts were not available. Research scope and infrastructure match the brief. |
| Clinical RL | 98% simulated reward and 61% macro-F1 also appear in the owner's GitHub README. These remain self-reported experiment results; normalization, held-out split and decision aggregation need confirmation. No clinical efficacy claim. |
| Thesis and education | Thesis title and UIC 2023–2025 appear in the owner's LinkedIn profile. Direct thesis manuscript was not located. No peer-reviewed publication status claimed. |
| EEG research | AES lists Harshal Hirpara as an author and December 7, 2024 as the presentation date. Corrected the homepage citation to the direct AES abstract and labeled it a conference abstract. The original CV's 88% sensitivity does not match the 2024 abstract's 91% segment sensitivity; neither figure is used on the homepage. A separate 2026 preprint exists, but is not substituted for the 2024 abstract. |
| LLM technical article | Title and October 1, 2024 date corroborated by the owner's LinkedIn publication listing. Direct Medium body could not be retrieved. Labeled technical article, not peer-reviewed research. |
| Find-My-Hospital | Devpost confirms creator, phone interface, hospital location search, n8n/Apify/Bedrock and Google Maps use, plus winner status in Best use of n8n and Top Overall Winners. Exact 1st/2nd placement was not shown in the accessible listing; retained the brief's ranks pending confirmation. ElevenLabs, Twilio and live traffic routing are supplied by the brief, not confirmed by the Devpost text. Added the primary project/award link. |
| Notey | Public repository README confirms transcription, synchronized photos, summaries and replay. Repository exists and is public. This verifies documented capabilities, not a runtime audit. |
| Chess experiment | Architecture, GPU count and Top-1/Top-5 figures match the brief and original CV. No public dataset, evaluation artifacts or benchmark located. The site limits these to reported prediction results. |
| Agent evaluation | Brief/CV and a pinned public GitHub project support Mistral/Llama game-agent work. No quantitative improvement claims introduced. |
| Trajectory | Removed arrows implying unconfirmed ordering between Quin and Find-My-Hospital. Devpost dates the latter May 30, 2025, while the old CV starts Quin in June 2025. Grouped related work without asserting chronology. |
| Current interests and contact | Interests match the brief; public contact links match the original CV. Whether the UIC email is still preferred requires owner confirmation. |

## Corrections made

- Direct AES citation and accurate conference-abstract label.
- Removed the inferred causal link between agentPod prototype and design partners.
- Removed unconfirmed timeline arrows.
- Aligned maintenance-agent wording with the brief's repair/report flow.
- Added the verified Devpost project and award link.

## Remaining confirmations

1. Current Checksum public title.
2. Experimental definitions/baselines for 54%, 98%, 61%, and chess scores.
3. Direct thesis URL and its current publication status.
4. Evidence of exact hackathon placements, voice provider integrations and live traffic routing.
5. Current role dates and preferred contact email.
6. Suitability of the supplied Checksum implementation details for public disclosure.

## Sources

- Owner-supplied portfolio redesign brief and repository `public/cv.json`.
- https://github.com/Hjhirp (self-reported research and experience).
- https://github.com/Hjhirp/Notey (public README retrieved through GitHub API).
- https://www.linkedin.com/in/harshaljhirpara (owner profile, education and publications).
- https://checksum.ai/blog/shadow-qa (employer author bio; title discrepancy).
- https://aesnet.org/abstractslisting/automated-seizure-detection-in-ambulatory-eeg (conference abstract).
- https://devpost.com/software/emergency-find-my-hospital (project description and awarded categories).
- https://aws-mcp-agents-hackathon.devpost.com/ (organizer prize definitions).

The duplicated Scholar citation for battery research remains in the legacy CV data, but that entry is not rendered on the homepage. It should be replaced only when the correct publisher or citation URL is confirmed.

## Application materials and expanded content

The owner authorized using the Application Materials folder and requested more content and Checksum writing. Reviewed the complete text of these DOCX resumes: AI ENGINEER FULL STACK / Harshal_Hirpara_Latest, MACHINE LEARNING ENGINEER CORE / Harshal_Hirpara, and the master resume. These are owner-authored sources, not independent benchmark evidence.

Consistent newer details adopted:
- Checksum start: December 2025; Mercor: September–December 2025; Quin: June–August 2025; UI Health end: May 2025.
- Gmail address used consistently across the reviewed resumes replaces the older UIC contact address.
- Online DPO with an LLM-as-a-Judge, DeepSpeed/Accelerate, throughput/parallelism work, profiling and hyperparameter sweeps.
- Policy-Refined Behavior Cloning (PRBC), combining behavior cloning and policy gradients for simulated treatment planning.
- Cactus summarization/keyword extraction, Inferentia deployment and regression/robustness evaluation.

The Checksum title remains unresolved: newer resumes say Software Engineer, the public blog says Software Test Engineer, and the supplied brief says Lead ML + Systems Engineer. The brief's title is retained.

Not adopted: conflicting annual/monthly inference-cost savings, customer-conversion attribution, 95% context savings without its measurement definition, hospital response-time claims, or claims that using Bedrock alone prevents PII leakage. The awards and voice-provider claims are now also supported by the owner's resumes, while exact placement still lacks an independent ranking source.

Added six verified Checksum bylines as linked article cards, with short paraphrases. Product/platform results in the articles are not attributed as personal performance metrics. New design notes draw on public material about stateful journeys, coverage gaps, preserving test intent, and deterministic execution. Research interpretations about reward versus physician agreement are framed as conceptual distinctions, not additional measured findings.

Article sources:
- https://checksum.ai/blog/api-test-generation-journey-based-tests (September 9, 2026).
- https://checksum.ai/blog/api-testing-with-ai-isnt-just-claudes-job (updated September 9, 2026).
- https://checksum.ai/blog/best-ai-testing-software (August 21, 2026).
- https://checksum.ai/blog/ai-testing-guide (August 4, 2026).
- https://checksum.ai/blog/shadow-qa (July 15, 2026).
- https://checksum.ai/blog/announcing-the-api-agent (June 25, 2026).

Earlier unresolved-date and contact items are superseded by the resume-backed updates above. Metric protocols, thesis URL/current publication status, title reconciliation and public-disclosure suitability remain open.

## Failure classification draft

Added the owner-supplied draft “How we improved test failure classification at Checksum” as an expanded case study, not as a published blog link. Evidence: successful network operations, origins/connection-path context, helper source retrieval, explicit missing snapshots, evidence-based session grouping, per-test verdicts and suspected issue descriptions.

Classification operating figures and measurement-window details are private and excluded at the owner’s request. The case study describes qualitative engineering changes and distinguishes operational measurements from accuracy evaluation.

## Layout revision

Reviewed all eight notebook sections after feedback about empty space. Reduced section/card gaps and page width, removed the pipeline's fixed minimum explanation height, let explanations use the diagram width, compacted stage controls, and gave full-width headings a matching reading span. Paired content remains in responsive columns, and article metadata stays in aligned rows. Production metric groups wrap on narrow screens.
