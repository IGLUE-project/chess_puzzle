import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalProvider } from "./components/GlobalContext";
import ReduxProvider from "./redux/ReduxProvider";
import App from "./components/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </ReduxProvider>
  </React.StrictMode>
);
