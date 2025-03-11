import { Provider } from "react-redux";
import React from "react";
import App from "../components/App";
import store from "./Store";

export default function ReduxProvider() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
