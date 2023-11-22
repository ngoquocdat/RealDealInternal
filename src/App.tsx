import React from "react";
import "./App.css";
import MainContainer from "./Components/main";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import ViewportProvider from "./contexts/ViewportContext";
import theme from "./theme";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ViewportProvider>
          <AuthProvider>
            <Router>
              <MainContainer />
            </Router>
          </AuthProvider>
        </ViewportProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
