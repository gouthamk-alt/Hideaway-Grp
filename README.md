# H I D E A W A Y
### Boutique Living. Refined.

An elegant, full-stack real estate portfolio, boutique developer showcase, and interactive Content Management System (CMS) designed for high-value architecture, landscape integration, and luxury estate projects in Australia.

---

## ✦ Visual & Architectural Ethos

The website utilizes our custom **Sleek Interface** theme—inspired by boutique property studios that reject aggressive digital noise ("AI-slop", excessive telemetry widgets, or tech counters) to focus purely on tactile materiality, space, and typographic beauty.

### Style System:
- **Typography:** Built around a deliberate paring of the clean, Swiss-minimal **Montserrat** font with generous letters-spacing, paired with the organic, literary elegance of **Playfair Display** in display headlines.
- **Palette:** A tactile obsidian background (`#0F1110`) matched with earthy slate borders (`#2D302E`), champagne gold accents (`#D4C2AD`), and a warm, low-contrast off-white text structure (`#E8E4DF`).
- **Interactive Guide:** The website includes an online **Visual Identity & Editorial Guide** directly accessible from the navigation bar, offering real-time typeface testing and photographic selection compliance checks.

---

## 🛠️ Technology Stack

This repository is built using a modern, fast, type-safe full-stack template:

- **Frontend Core:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) for declarative, type-safe interface components.
- **Styling Architecture:** [Tailwind CSS v4](https://tailwindcss.com/) using modern CSS configuration and native components.
- **Animation System:** [Motion](https://motion.dev/) (from `motion/react`) for smooth page transitions, interactive drawers, and modal state transitions.
- **Server Infrastructure:** [Express](https://expressjs.com/) backend, supporting a high-performance middleware mode powered by Vite during development, and standalone execution in production.
- **Build Core:** Compiles client-side bundles via [Vite](https://vite.dev/) and packages backend TypeScript code via [esbuild](https://esbuild.github.io/) into a single optimized server module (`dist/server.cjs`).
- **Icons:** [Lucide React](https://lucide.dev/).

---

## 🚀 Getting Started

Ensure you have [Node.js v20+](https://nodejs.org/) installed on your machine.

### 1. Installation

Clone this repository and install all required modules using the lockfile:

```bash
npm install
```

### 2. Run Local Development Server

Launch the full-stack development environment. Express will boot on port `3000` with the Vite dev middleware mounted overlaying changes in real-time.

```bash
npm run dev
```

Your app will be available at: **`http://localhost:3000`**

### 3. Build for Production (GitHub Actions Compatible)

Clean build the frontend assets and compile the server-side entry-points to standalone performance bundles:

```bash
npm run build
```

The output is distributed neatly in `dist/`:
- `dist/index.html` + asset bundles (fully pre-compressed static client).
- `dist/server.cjs` (bundled CommonJS server, resolving all relative imports internally).

### 4. Run Production Server

Launch the prebuilt application, serving compiled assets efficiently without dev dependencies active:

```bash
npm run start
```

### 5. Deployment Options

Depending on your target hosting model, you can choose static or full-stack pathways:

#### A. Static Client-Only Deployment (GitHub Pages, Vercel, Netlify)
If you wish to deploy just the frontend static client bundle to **GitHub Pages**, we have configured a ready-to-run deploy script:

```bash
npm run deploy
```

> **Note:** Static deployments serve code built in `dist/`, but will skip the custom Express server-side routes (CMS changes will persist locally/session-based rather than through dynamic server-side proxy).

#### B. Full-Stack Deployment (Cloud Run, Railway, Render, Fly.io)
For full-stack scenarios where both the Express server handles CMS mutations or real-time parameters, deploy the entire container. Platforms with Git-integrations will automatically read these variables from your `package.json`:
- **Build command:** `npm run build`
- **Start command:** `npm run start`

---

## 📡 Automated CI/CD (GitHub Ready build)

We have integrated an automated GitHub Actions CI/CD configuration to enforce code quality and verify successful builds on every code contribution.

The live configuration is located at: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

### Workflow Tasks:
1. **Runner Matrix:** Executes tests in parallel on the latest Ubuntu environment across Node.js versions `20.x` and `22.x`.
2. **Deterministic Installs:** Resolves dependency lock definitions via `npm ci`.
3. **TypeScript Lint Check:** Verifies that no type mismatch, syntax issue, or missing exports slip into development branches via `npm run lint`.
4. **Bundle Compilation:** Executes the production output bundling successfully via `npm run build`.

---

## 🗄️ Application Architecture & Modularity

The codebase is highly modularized for robust scaling:
- `/src/components/HeroSection.tsx`: Custom layout containing the primary hero, inquiry action, brand navigation, and Brand Guide portal.
- `/src/components/PropertyCard.tsx`: Grid card component supporting customized property metrics, pricing, availability verification and image viewport configurations.
- `/src/components/BookingModal.tsx`: Slide-in transition sheet allowing customers to execute offline bookings or inquire about details.
- `/src/components/CmsConsole.tsx`: Full internal administrative CMS console allowing the estate agency to dynamically modify current properties list, editorial journal logs, and primary brand indicators.
- `/src/components/VisualIdentityGuide.tsx`: In-app brand guidelines playground and validator.
- `/src/types.ts`: Strictly-typed global definitions, schemas, and default states.

---

## 📄 License & Compliance

Distributed under proprietary development guidelines. Built in accordance with **Hideaway Registry Dept.** specifications. Committed to zero-carbon masonry by 2026.
