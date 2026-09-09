import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { AppErrorBoundary } from "./components/errors/AppErrorBoundary";
import { initializeAnalytics } from "./lib/analytics/analytics";
import { queryClient } from "./lib/queryClient";

initializeAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AppErrorBoundary>
  </StrictMode>,
);
