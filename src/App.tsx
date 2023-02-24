import React from "react";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store";
import AppRoutes from "./routes/AppRoutes";
import themeDefault from "./config/theme/Default";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={themeDefault}>
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
