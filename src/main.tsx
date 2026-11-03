import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./styles/index.css";

// app entry point: mount <App /> into the #root div from index.html
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
