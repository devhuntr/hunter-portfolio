# Implementation checkpoints

## Baseline and first content pass — September 22, 2026

- Installed the existing lockfile on Node 22.20.0 / npm 10.9.3 without upgrading packages.
- Original production build passed: main JavaScript 233.63 kB gzip.
- Original smoke test failed because CRA reset the matchMedia mock. Moving setup into beforeEach made it pass.
- Original development page loaded in the browser before content edits.
- Personalized central content, metadata, contact links, education, experience, and featured work; disabled the splash and unverified certifications.
- Removed Twitter, Medium/blogs, talks, podcasts, proficiency bars, their connected components/styles, the unused Twitter package, and four assets verified to have no remaining references.
- Resume links now use the configured URL and stay hidden until supplied. Removed the template PDF.
- Added accessible names, keyboard-operable mobile navigation, and link/focus fixes. Preserved React 16, CRA, SCSS, React Reveal and Lottie.
- Five behavior tests passed for content/no optional requests, contact/internal links, resume behavior, mobile navigation, and persistent theme.
- Production build passed: main JavaScript 217.4 kB gzip (16.23 kB smaller).
- Browser checked at 375 px mobile and 1440 px desktop, light/dark modes, and mobile navigation. No horizontal overflow measured at 320, 768, 1024 or 1440 px. No broken images found at 375 px.
- Existing React Reveal lifecycle and old Browserslist warnings remain for subsequent migrations. Reduced-motion support is only partial at this checkpoint.
- No deployment or GitHub refresh performed. Selected repositories, final resume URL, employment dates, certifications, and additional project details are still needed.

## Stabilization

Complete: contact is independent of GitHub; snapshots refresh explicitly with a build-only token; repository display handles missing, malformed, empty and valid data and aborts on unmount. Removed unused Enzyme dependencies, fixed scroll event cleanup, and replaced clickable spans/divs with links. CI and Docker now use Node 22 and npm ci; deployment scripts agree on gh-pages. Ten tests, formatting and production build passed (216.42 kB main JavaScript gzip). Browser reload produced no new runtime errors. Credential-free github:refresh exits with a clear error, without writing a snapshot. Live authenticated GitHub requests and CI/Docker execution were not tested.


## Vite migration

Complete: Vite 8.3, Vitest 5, explicit ESLint, JSX file extensions, ESM asset imports, root HTML entry, base-aware asset/data paths, and dist output. React 16.14, React Reveal 1.2.2, Lottie React 2.4.0, and Headroom 3.2.1 were preserved. Tests were migrated before removing CRA/Jest tooling. Old CRA dependencies were pruned before installing Vite because their Babel peer graph conflicted; no forced peer overrides were used.

- All 10 tests pass in Vitest; lint and formatting pass.
- Production build passes: JavaScript 187.81 kB gzip, CSS 4.61 kB gzip.
- Development app loads at http://127.0.0.1:3010/.
- Production app checked at http://127.0.0.1:4173/ and http://127.0.0.1:4174/portfolio/. Both loaded without new runtime errors; subpath check found no broken images or mobile overflow.
- Build warnings remain for Sass @import, Lottie's internal eval, and the size of the animation-heavy chunk. These are recorded rather than hidden.
- ESLint 9 is a compatibility choice for eslint-plugin-react's declared peer range; jsdom 26 is compatible with the existing Node 22.20 runtime. Revisit those versions with future dependency maintenance.
- Node is standardized to the 22.x line, minimum 22.20. CI and Docker configuration were updated but not executed remotely. Nothing has been deployed.

## Animation compatibility bridge

Removed React Reveal without changing React. Replaced its section entrances with a small CSS/IntersectionObserver bridge, preserving visible content when observation is unavailable. Added reduced-motion behavior for section entrances, looping Lottie illustrations, and scroll-to-top; scroll listeners now clean up on unmount. All 10 tests, lint, and production build passed on React 16 before proceeding.

## React runtime checkpoint

Upgraded React and React DOM together to 18.3.1 after removing the React-16-only animation dependency. Updated the app and tests to createRoot and React's act API. Dependency-tree verification shows one deduplicated React 18.3.1 runtime compatible with retained Lottie, Headroom and emoji libraries. All 10 tests, lint, and production build passed. React 18 is the planned compatibility checkpoint; a later React 19 move still requires verifying or replacing retained library peer constraints.

## Motion — September 23, 2026

Replaced the temporary reveal bridge with Motion 13.4.1 after the React checkpoint. Entrances remain restrained and content is visible before animation; reduced-motion preferences suppress entrances and pause decorative Lottie loops. Added a behavior test for changing reduced-motion preferences. All 11 tests, lint, and the production build passed before the next migration.

## TypeScript content checkpoint

Added TypeScript and React 18 type definitions. Moved centralized content into src/data/portfolio.ts, with explicit project, education, experience and achievement types in src/data/types.ts. Kept src/portfolio.js as a compatibility entry point so existing sections continue working. Strict type checking covers migrated .ts/.tsx files and is now part of the production build, including CI's existing build step. JavaScript sections are not yet type checked. Formatting and pre-commit patterns now include TypeScript. All 11 tests and the type-checked production build passed before design changes.

## Featured work redesign

Replaced the dense project paragraph with a responsive case-study layout: problem, contribution, and outcome, plus a clearly qualified 10+ hours/week metric for the broader automation effort. Content remains centralized and uses only supplied facts. Introduced scoped light/dark color variables, responsive typography, semantic heading levels, and a stacked mobile layout. Other sections retain their current design for later incremental passes.

Validation: all 11 tests, lint, formatting, strict content type checking, and production build pass. Production preview at /portfolio/ was checked visually at 1440 px (light) and 375 px (dark); no horizontal overflow at 320, 375, or 1440 px, and no new browser errors. Existing Sass import, Lottie eval, and bundle-size warnings remain. No deployment performed.
