import { PaletteMode } from "@mui/material";
import type { ThemeOptions } from "@mui/material/styles";
import { pallete } from "./_muiPalette";

export const MuiThemeOptions = (mode: PaletteMode): ThemeOptions => {
    return {
        palette: pallete(mode),
        typography: {
            fontFamily: ["Roboto"].join(","),
            fontSize: 16,
            h1: {
                fontSize: "67px",
                lineHeight: "1.1em",
                fontWeight: "700",
                fontFamily: "Cinzel",
                "@media(max-width:991px)": {
                    fontSize: "22px",
                    lineHeight: "1.1em"
                }
            },
            h2: {
                fontSize: "106px",
                lineHeight: "1.1em",
                fontWeight: "400",
                fontFamily: "Cinzel",
                "@media(max-width:991px)": {
                    fontSize: "22px",
                    lineHeight: "26px"
                }
            },
            h3: {
                fontSize: "20px",
                lineHeight: "1.1em",
                fontWeight: "700",
                fontFamily: "Cinzel",
                "@media(max-width:991px)": {
                    fontSize: "18px",
                    lineHeight: "1.1em"
                }
            },
            h4: {
                fontSize: "18px",
                lineHeight: "1.3",
                fontWeight: "500",
                fontFamily: "Cinzel",
                "@media(max-width:991px)": {
                    fontSize: "16px",
                    lineHeight: "1.3"
                }
            },
            h5: {
                fontSize: "15px",
                lineHeight: "1.4",
                fontWeight: "500",
                fontFamily: "Cinzel",
                "@media(max-width:991px)": {
                    fontSize: "12px",
                    lineHeight: "1.4"
                }
            },
            h6: {
                fontSize: "12px",
                lineHeight: "1.5",
                fontWeight: "500",
                fontFamily: "Cinzel",
                "@media(max-width:991px)": {
                    fontSize: "12px",
                    lineHeight: "1.5"
                }
            },
            body1: {
                fontSize: "16px",
                lineHeight: "1.5em",
                color: "#8F98A8"
            },
            body2: {
                fontSize: "12px",
                lineHeight: "1.5em",
                color: "#8F98A8"
            },
            caption: {
                fontSize: "14px",
                lineHeight: "1.5em",
                color: "#8F98A8"
            }
        },
        components: {
            MuiSkeleton: {
                defaultProps: {
                    animation: "wave",
                },
            },
            // MuiButton: {
            //     defaultProps: {
            //         color: "error",
            //     }
            // }
        }
    }
}