import { createRoot } from "react-dom/client";
import "./index.css";
import ReduxProvider from "./redux/ReduxProvider";

createRoot(document.getElementById("root")).render(<ReduxProvider />);
