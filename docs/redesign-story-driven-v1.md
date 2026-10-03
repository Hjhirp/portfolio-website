# Systems notebook redesign

React / TypeScript, styled-components and Framer Motion are retained. The homepage now carries the full narrative: introduction, systems engineering, RL research, selected builds, trajectory, current interests and contact. The portrait was removed at the owner's request.

Reusable notebook sections, labels, entry grids and interactive pipelines live in `src/components/notebook/Notebook.tsx`. Pipelines support hover, focus and click, pressed states and live explanations. Native details elements provide deeper technical reading. Global CSS supports reduced motion, visible focus and a skip link. Existing page URLs redirect to corresponding sections. The existing CV JSON remains available; core homepage content and contact fallbacks render even if fetching it fails.

The layout uses paper, charcoal, restrained orange, technical metadata, thin rules and responsive grids. Invalid icon scripts, typewriter titles, gradients and the logo wall are removed from the active app. Previous page components remain in the repository for reference but are not mounted.

## Content to confirm before publication

- Research: baseline/protocol for the reported 54% training-time reduction; normalization behind 98% simulated reward; evaluation protocol for 61% macro-F1.
- Direct thesis/publication URL. The existing JSON repeats one Scholar citation for EEG and battery research; the battery entry is omitted from the homepage pending verification.
- Dates for Checksum, Mercor and agentPod, and current end dates for Quin/UI Health. No uncertain dates were invented.
- Public-disclosure suitability of Checksum harness description, and classification runtime target (not an achieved benchmark).
- Hackathon award source and a repository/demo URL for Find-My-Hospital.
- Chess benchmark dataset and evaluation split; scores are presented as reported experiment results.
- Preferred current contact email (existing UIC address retained).

## Validation

Production build and two focused tests: reading/contact fallbacks without CV data, and keyboard-accessible pipeline explanations. Browser review at desktop and 390px mobile; navigation and stage selection verified. No mobile horizontal overflow. Dependencies unchanged; npm reported existing dependency vulnerabilities and Browserslist data is stale.
