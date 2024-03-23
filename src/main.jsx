import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import imageStore from "./store/index.js";
import NavigationProvider from "./NavigationProvider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={imageStore}>
        <Router>
          <NavigationProvider />
          <App />
        </Router>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
