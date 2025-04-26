import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/ui/theme-provider";
import App from "./App";
import "./index.css";

// Add Material Icons
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
document.head.appendChild(link);

// Add Noto Sans JP font
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap";
document.head.appendChild(fontLink);

// Add title
const title = document.createElement("title");
title.textContent = "甲子園 雨天中止予測 | Koshien Rain Cancellation Predictor";
document.head.appendChild(title);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="koshien-rain-cancellation-theme">
    <App />
  </ThemeProvider>
);
