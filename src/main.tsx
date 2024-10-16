import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//styling
import "./index.scss";
import "semantic-ui-css/semantic.min.css";
import "./Components/AktorPortal/FormStyle.scss";

//components
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
