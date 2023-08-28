import { Typography, CssBaseline, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { themeSettings } from './utilities/theme.js';
import { AppStore } from './redux/store.js';
function App() {
  const mode = useSelector((state: AppStore) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Typography className="app">Welcome</Typography>
        <Button variant="contained">Go</Button>
      </ThemeProvider>
    </div>
  );
}

export default App;
