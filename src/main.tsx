import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WordProvider } from "./components/WordProvider.tsx";
import { CompleteProvider } from "./components/WinProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CompleteProvider>
      <WordProvider>
        <App />
      </WordProvider>
    </CompleteProvider>
  </StrictMode>
);
