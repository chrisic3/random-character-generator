import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./styles/index.css";

// App entry point: React starts here.
// The "!" tells TypeScript #root definitely exists in index.html (it would be null otherwise).
// StrictMode adds extra development-only checks, such as running effects twice to catch
// bugs; it has no effect on the production build.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
