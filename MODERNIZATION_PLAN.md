# Hunter Anderson portfolio: assessment and implementation plan

Assessment date: September 22, 2026. Scope: local repository source, configuration, asset inventory, lockfile, tests, and deployment workflows. No application code or dependency changes were made. This is a static assessment, not a successful-build or browser-validation report. No node_modules directory is present; dependencies were not installed and build/tests were not run. Local tools report Node 22.20.0 and npm 10.9.3. Initial Git working tree was clean.

## 1. Application structure

This is a single-page, client-rendered React application built with Create React App (CRA). It uses JavaScript with JSX, global SCSS, anchor navigation, React context for theme state, and localStorage for theme persistence. There is no router, application backend, TypeScript configuration, or separate case-study page system.

The render chain is `src/index.js` -> `App.js` -> `containers/Main.js`. Main owns the splash timer and theme provider and explicitly renders the sections in order. Most containers import configuration directly; smaller components render cards, buttons, icons, and illustrations. This is a useful starting structure and does not need a wholesale rewrite.

`npm start` and `npm run build` first execute the Node script `fetch.js`. When enabled through environment variables, it fetches GitHub profile/pinned repositories and Medium posts into ignored public JSON files. Browser components subsequently fetch those files. There is no live GitHub API call from the browser in this implementation.

## 2. Important files

| File/path | Responsibility |
| --- | --- |
| `src/portfolio.js` | Central content, visibility flags, image references, social links, illustration/splash settings |
| `src/containers/Main.js` | Section order, theme initialization, splash lifecycle |
| `src/index.js`, `src/App.js` | React mounting and app entry; currently uses ReactDOM.render |
| `src/components/header/Header.js` | Anchor navigation, mobile menu, theme switch, Headroom wrapper |
| `src/containers/greeting/Greeting.js` | Hero and actual resume download behavior |
| `src/containers/StartupProjects/StartupProject.js` | Best existing starting point for featured work |
| `src/containers/projects/Projects.js` | GitHub pinned-repository display |
| `src/containers/profile/Profile.js` | GitHub profile/contact fallback |
| `src/_globalColor.scss`, `src/index.css`, colocated SCSS | Palette, fonts, global styles, responsive layouts |
| `src/components/displayLottie/DisplayLottie.js` | Shared looping Lottie renderer |
| `src/contexts/StyleContext.js`, `src/hooks/useLocalStorage.js` | Existing reusable theme infrastructure |
| `fetch.js`, `env.example` | Build/start data acquisition configuration |
| `public/index.html`, `public/manifest.json` | Metadata, icons, external icon stylesheet, template analytics |
| `package.json`, `package-lock.json` | Scripts and exact dependency baseline |
| `.github/workflows/`, `Dockerfile` | CI, deployment, and container setup |
| `src/App.test.js`, `src/setupTests.js` | One mount smoke test; Enzyme setup and canvas mock |

## 3. How portfolio.js controls the site

It exports named objects rather than one portfolio object. Containers read arrays and map them into cards; flags typically cause a component to return null. Header reads some of the same flags to decide which navigation links to show. Colors live separately in SCSS.

This is centralized configuration, but not plain data: it invokes react-easy-emoji, imports animation JSON, and uses CommonJS require for images. A future `src/data/portfolio.ts` should preserve the concept while separating presentation from strings and typed records.

Important exceptions:

- Section ordering remains in Main; several section headings and CTA labels are hardcoded in components.
- Metadata, analytics, footer attribution, GitHub/Medium usernames, and the resume file live elsewhere.
- `showGithubProfile` and `displayMediumBlogs` use strings such as `"true"`; most other switches are booleans. Normalize consumers and data together.
- Profile and Blogs mutate imported configuration when requests fail. GithubProfileCard mutates its profile prop. Replace these with local state/derived values during targeted cleanup.
- Returning null does not necessarily stop fetching: Projects fetches regardless of its display flag, and Blogs' effect is governed by its Medium flag, not overall section visibility.
- `greeting.resumeLink` only gates the download's visibility. The actual link uses `src/containers/greeting/resume.pdf`. The header's Resume link targets an empty `id="resume"` element in the hero. There is no standalone Resume section.
- `techStack.displayCodersrank` is exported but has no consumer in the scanned source.

## 4. Existing sections and disposition

Current page order after the splash:

| Section | Recommendation |
| --- | --- |
| Header | Keep; simplify navigation and improve menu accessibility |
| Greeting | Keep; clear Hunter identity, positioning, work/resume CTAs |
| Skills + SoftwareSkill | Keep; organize into meaningful categories |
| Proficiency/StackProgress | Remove percentage bars; replace their purpose with evidence and categorized skills |
| Education | Keep; BYU-Idaho, Software Engineering, Cloud Technologies minor, 4.0 GPA, December 2027 |
| WorkExperience | Keep; emphasize business problems, ownership, implementation, and outcomes |
| Projects | Keep concept; already displays up to six pinned GitHub repositories, not every repository |
| StartupProject / Big Projects | Evolve into featured case studies |
| Achievement | Keep only with Hunter's verified achievements/certifications; otherwise hide |
| Blogs/Medium | Remove for current scope |
| Talks | Remove for current scope |
| Twitter timeline | Remove for current scope |
| Podcast | Remove for current scope |
| Profile or Contact fallback | Simplify to reliable contact content independent of GitHub availability |
| Footer and scroll-to-top | Keep purpose; update implementation as needed |

There is no dedicated About component, grouped-skills model, or full case-study model yet. Reuse Button, SocialMedia, card structures, theme context, and DisplayLottie where their behavior remains useful. Reuse does not mean retaining existing accessibility defects.

The proposed removals are currently connected and enabled, not dead code. Remove each feature's Main/Header references, configuration, styles, and integration code together, then verify references before deleting dependencies/assets. Remove Medium settings from CI as well as local configuration. Keep GitHub fetching if retained; do not delete all of fetch.js just to remove Medium. Keep static illustration fallbacks while they remain reachable. Retain LICENSE and project provenance.

## 5. Dependencies: retain, replace, or investigate

Versions below are lockfile resolutions, not claims about the latest releases. Exact upgrade targets and advisories should be checked when implementing each phase; this was not a security audit.

| Dependency (locked) | Assessment and action |
| --- | --- |
| react / react-dom 16.14.0 | Legacy runtime. Preserve for baseline and initial cleanup; upgrade together in a dedicated step |
| react-scripts 5.0.1 | CRA build/test/lint toolchain. Keep until Vite conversion is validated |
| react-reveal 1.2.2 | Pervasive animation dependency; declared React peers support 15/16 only. Must be addressed before modern React |
| react-twitter-embed 3.0.3 | Declared React peers support 15/16. Remove with Twitter feature |
| enzyme 3.11.0 + enzyme-adapter-react-16 1.15.7 | Adapter is coupled to React 16. Setup imports it, but the sole test uses ReactDOM directly, not Enzyme |
| react-test-renderer 16.14.0 | No direct source usage found; adapter may require it transitively. Remove top-level dependency with test cleanup after checking dependency tree |
| lottie-react 2.4.0 | Useful and compatible with current React; locked peer range includes React 18, not 19. Keep temporarily |
| react-headroom 3.2.1 | Useful existing header behavior; locked peer range includes React 18, not 19. Keep temporarily |
| sass 1.65.1 | Keep SCSS initially; separately modernize Sass imports and styles |
| colorthief 2.4.0 | Actively used to derive experience-card banner colors from logos; keep until that design changes |
| react-easy-emoji 1.8.1 | Actively used by config and UI; keep temporarily, consider native emoji during presentation cleanup |
| dotenv 8.6.0 | Older Node-side utility; retain while fetch.js uses it, update separately |
| gh-pages 2.2.0 | Older deployment utility; retain only if local deploy script is chosen over Actions |
| jest-canvas-mock 2.5.2 | Keep while tests need canvas/Lottie support |
| prettier 2.8.8 | Working formatting baseline; defer upgrade to avoid incidental mass diffs |
| Babel private-property proposal plugin 7.21.11 | CRA-era tooling support; remove only after CRA removal and usage verification |

CRA has been officially deprecated; upstream developerFolio also identifies itself as not actively maintained. These support planned modernization rather than an immediate rewrite. [React announcement](https://react.dev/blog/2025/02/14/sunsetting-create-react-app), [upstream repository](https://github.com/saadpasta/developerFolio).

“Keep temporarily” means useful within the current compatibility baseline, not a guarantee of security or future compatibility.

## 6. Animation and responsive behavior

react-reveal supplies Fade and Slide wrappers throughout sections/cards: commonly 1000 ms, 20 px bottom reveals, a 40 px hero reveal, left/right skill entrances, and a 2000 ms education-border slide. Lottie JSON supplies hero, skills, proficiency, contact, and splash illustrations, looping through DisplayLottie. Its Suspense wrapper does not itself make the statically imported animation assets lazy.

CSS supplies the continuously waving emoji, loading spinner, hover transitions, and smooth scrolling. Headroom handles scroll-dependent header visibility. Main holds content behind a configurable splash, currently 2000 ms. No prefers-reduced-motion handling was found. Prefer disabling the blocking splash, shorter entrances, visible content by default, and reduced-motion treatment for CSS, reveal behavior, Lottie, and scrolling.

Responsive styles use flex layouts, auto-fit/auto-fill grids, 90%-width containers, and mostly 1380 px and 768 px breakpoints, with additional component-specific breakpoints. Hero stacks on mobile; skills reorder; cards reflow; the header uses a checkbox menu. This is an existing responsive foundation, not yet verified on devices.

Potential issues include 290–400 px grid minimums inside narrow padded containers, scattered global class names, repeated `.subTitle` definitions, fixed sizes, and ad hoc breakpoints. `font-size: rem` in index.css and quoted `transition: "0.1s"` in Main.scss are invalid declarations. Test 320/375/768/1024/1440 px widths and 200% zoom before claiming responsive quality.

## 7. Migration risks and existing defects

1. **React/animation dependency cycle.** Current Motion requires React >=18.2, while locked react-reveal supports React 15/16. Introduce a small, React-16-compatible CSS/IntersectionObserver reveal replacement first, remove react-reveal, then upgrade React, then migrate the same behavior to Motion separately. Keep this helper limited to existing reveal needs. [Motion installation](https://motion.dev/docs/react-installation).
2. **Vite asset and entry differences.** JSX is in .js files; prefer mechanical .jsx renames during migration. Replace asset require calls with ESM imports, make JSON extensions explicit, move the HTML entry, replace %PUBLIC_URL%, and account for the Node fetch script remaining CommonJS (use .cjs if setting package type to module). CRA's test/lint support does not transfer automatically.
3. **Subpath deployment.** `/profile.json`, `/blogs.json`, manifest icon paths, logo href `/`, and hardcoded hashed font preloads assume a root deployment. Configure base-aware paths and verify the intended hosting subpath. Vite output is normally dist instead of build. [Vite deployment](https://vite.dev/guide/static-deploy), [asset handling](https://vite.dev/guide/assets).
4. **Data failures.** Missing generated JSON is possible in a fresh checkout. GitHub GraphQL can return errors in an HTTP-200 response; fetch.js does not validate that payload before saving it. It has no request timeout, write errors only log, and the Medium error constant has a naming mismatch. Define explicit loading/empty/error states and make normal development independent of credentials/network fetching.
5. **Token naming.** GitHub token is used in the Node script, but is named REACT_APP_GITHUB_TOKEN, a browser-exposable CRA prefix. Rename it to a server/build-only name and update CI/docs together. Do not rename it to VITE_GITHUB_TOKEN. No actual token exposure was demonstrated in this assessment.
6. **Deployment drift.** package.json deploys build to master; Actions deploys to gh-pages. Homepage still points to developerfolio.js.org. CI uses Node 18, Docker Node 20.0, and README says Node 10+. CI upgrades npm to latest and uses npm install; Docker does not copy the lockfile before installation and runs npm audit fix. Standardize a supported runtime and deterministic npm ci; remove automatic dependency mutation from image builds. Do not run deployment scripts until the target is settled.
7. **Accessibility.** Project/achievement links use clickable spans; GitHub cards use clickable divs. Icon-only social links and theme/menu controls lack clear accessible names. Resume wraps Button's anchor inside another anchor. There are multiple section h1s and scroll-to-top suppresses outline. Fix semantics, focus visibility, and keyboard operation incrementally.
8. **React lifecycle cleanup.** Top assigns global scroll/load handlers during render without effect cleanup. Twitter starts a timeout during render and directly rewrites DOM. Projects declares lazy() inside the component. Modern React development checks can expose these patterns; fix retained code before enabling stricter checks.
9. **Test gap.** The sole smoke test mounts and immediately unmounts; with splash enabled it does not exercise the main portfolio. Add a small set of behavior tests for rendered content after splash, navigation, contact fallback, and resume handling before migrations; do not create tests that merely duplicate markup.
10. **Styling/tooling changes.** Modern Sass deprecates @import; migrate to @use separately from visual redesign. Formatting hook uses Prettier 3 alpha while package uses 2.8.8. Do not fold a repository-wide reformat into functional changes. [Sass guidance](https://sass-lang.com/documentation/breaking-changes/import/).
11. **Template identity beyond config.** HTML metadata, manifest, icons, footer, bundled PDF, analytics ID, workflow Medium username, and homepage still reference template content. Updating portfolio.js alone is insufficient.
12. **Service worker.** Registration is currently disabled via unregister(). Preserve deliberate cache cleanup if removing CRA scaffolding; do not introduce offline caching as part of the build migration.

## 8. Phased implementation plan

Each numbered phase is independently reviewable. Keep a clean working baseline between phases, and stop to resolve regressions before proceeding. Split larger phases into small logical changes.

| Phase | Scope | Completion gate |
| --- | --- | --- |
| 0. Establish runtime baseline | Install from existing lockfile; record install/build/test issues; capture desktop/mobile, light/dark screenshots; add only essential behavior coverage | Known baseline with documented failures; no uncontrolled upgrades |
| 1. Personalize and reduce scope | Update confirmed Hunter content, metadata, resume behavior, links; remove Twitter, Medium/blogs, talks, podcast, unused socials and percentage bars in small steps; disable splash; verify references before asset/dependency deletion | No template claims or broken navigation; no requests for removed integrations; existing build/test checks pass |
| 2. Stabilize retained behavior | Correct semantic links, controls, handlers and data fallbacks; normalize flags; remove unused Enzyme setup/adapter; make GitHub refresh optional; align deploy configuration without publishing | Keyboard navigation, resume, theme, data failure paths and no-credential build work |
| 3. Move build tooling to Vite | Keep React 16, JavaScript, SCSS and visual behavior; migrate entry/assets/env/base; preserve tests temporarily through CRA if necessary, then move tests to Vitest in a separate small change before removing react-scripts; configure explicit linting | Dev and production preview work; tests/lint run independently; root and intended subpath assets resolve; CI uses correct output |
| 4. Remove React upgrade blockers | Replace react-reveal with minimal compatible reveal behavior; reduced motion included; verify all retained dependency peer ranges | No react-reveal/Twitter/React-16-only test adapter; existing animation intent and content visibility preserved |
| 5. Upgrade React | Upgrade React/react-dom together; use createRoot; use React 18.2+ as a bounded compatibility checkpoint, not an assumed final destination; verify supported target and dependencies at execution time | No forced peer overrides; behavior tests and browser flows pass; retained library compatibility documented |
| 6. Adopt Motion | Replace temporary reveal behavior with Motion section/card entrances; retain useful Lottie illustrations; avoid a visual redesign in this phase | Short, consistent motion; reduced motion works; no content blocked by animation |
| 7. Introduce TypeScript incrementally | Configure TS alongside JS; first type plain portfolio data and reusable card props; move toward src/data/portfolio.ts; then convert touched components in small batches | Typecheck passes for converted scope; no broad any types or forced whole-app conversion |
| 8. Redesign one section at a time | Establish typography/spacing/color tokens and SCSS boundaries; hero + About, featured work, experience, skills, education/certifications, contact; optional workspace personality in hero | Each section reviewed at target widths, zoom, keyboard, both themes and reduced motion |
| 9. Finish and release | Verify metadata, social preview, selected GitHub repos, resume, performance, optimized assets, attribution, and deployment preview | Production preview passes; publish only to the agreed destination |

Suggested final flow: Hero -> About -> Featured Work -> Experience -> Skills -> Education -> verified Certifications -> selected GitHub repositories -> Contact. Resume should remain a prominent direct action. Featured work deserves priority over a generic repository grid.

The case-study model should support problem, role, solution, technologies, decisions, challenges, outcome, and optional links. Start with the Internal Operations Platform. Attribute the 10+ hours/week to the broader automation effort unless project-specific measurement is provided. Use supplied education and experience facts; leave unknown dates, URLs, project stacks, certifications, and results unclaimed. Novi and other named projects need details before publishing case studies. Do not invent fintech experience from an interest in fintech.

Recommended next work item: establish the runtime baseline, then one small content/feature-cleanup change. No Vite, React, TypeScript, Motion, or visual redesign migration should be bundled into that first change.
