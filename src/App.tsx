import React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import './App.css';
import AppRoutes from './AppRoutes';

const theme = createTheme({
  typography: {
    body1: {
      fontSize: 12,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </div>
  );
}

export default App;
