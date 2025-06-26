import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme, StyledEngineProvider } from "@mui/material/styles";
import { MuiThemeOptions } from "./_muiTheme";
import { PaletteMode } from "@mui/material";


const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
 const mode: PaletteMode = "light"; 
  const theme = createTheme(MuiThemeOptions(mode));

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MuiThemeProvider;