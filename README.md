# Random Character Generator

A React + TypeScript app where you spin a wheel once per category and build up a result for each one.

## Tech stack

- React + TypeScript (built with Vite)
- Tailwind CSS
- GSAP for the spin animation
- SVG for the wheel graphics
- Vitest for tests

## Getting started

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Then open the local URL that Vite prints.

## Scripts

| Script            | What it does                                      |
| ----------------- | ------------------------------------------------- |
| `npm run dev`     | Starts the Vite dev server                        |
| `npm run build`   | Type-checks with `tsc -b`, then builds to `dist/` |
| `npm run preview` | Serves the production build locally               |
| `npm run lint`    | Runs ESLint                                       |
| `npm test`        | Runs Vitest                                       |

Before deploying, run `npm run build` followed by `npm run preview` to check the production build.

## How it works

- Categories are a static constant defined outside the components. Each has an `id`, a `label`, and a list of `items` that includes "None".
- The user spins one wheel per category. Each result is stored as `{ [categoryId]: result }`.
- The winner is chosen with a weighted random pick, with "None" weighted 3x. The wheel is then animated to land on that slice.

## Project structure

- `App.tsx` – layout; delegates state and logic to the hook
- `Wheel.tsx` – renders the SVG slices and runs the GSAP spin animation
- `ResultsList.tsx` – displays results as they fill in
- `types.ts` – shared types such as `Category` and `Results`

## Deployment

Hosted on Azure Static Web Apps (Free plan), deployed from GitHub.

- Pushing to the main branch triggers a GitHub Actions workflow that builds and deploys the app.
- Build settings: app location `/`, output location `dist`, no API.
- Check the **Actions** tab in the repo if a deployment fails.
