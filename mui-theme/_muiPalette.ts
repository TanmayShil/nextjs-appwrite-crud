import { PaletteMode, PaletteOptions } from "@mui/material";

export const pallete = (mode: PaletteMode): PaletteOptions => {
    return {
        mode,
        background: {
            default: "#f5f8fa" 
            // default: mode === "light" ? "#f5f8fa" : "#000",
            // paper: mode === "light" ? "#fff" : "#000"
        },
        primary: {
            main: "#1976d2",
            //   dark: primaryColors.primary_600
        },
        secondary: {
            main: "#9c27b0"
        },
        info: {
            main: "#0288d1"
        },
        error: {
            main: "#d32f2f"
        },
        warning: {
            main: "#ed6c02"
        },
        success: {
            main: "#2e7d32"
        },
        common: {
            black: "#000",
            white: "#fff"
        }
    };
};