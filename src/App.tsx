import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { themeSettings } from "./utilities/theme.js";
import { AppStore } from "./redux/store.js";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/layout/Layout.js";
import Dashboard from "./pages/dashboard/Dashboard.js";
import Users from "./pages/users/Users";
import Pagos from "./pages/pagos/Pagos.js";
import LandingPage from "./pages/landingpage/LandingPage.js";

function App() {
  const mode = useSelector((state: AppStore) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/panel" element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Dashboard />} />
            <Route path="usuarios" element={<Users />} />
            <Route path="pagos" element={<Pagos />} />
          </Route>
        </Routes>

        <LandingPage />
      </ThemeProvider>
    </div>
  );
}

export default App;
