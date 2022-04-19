import { createTheme } from "@material-ui/core";

export const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "iranyekan",
    body1: {
      fontWeight: "bold",
    },
    button: {
      fontWeight: "bold",
    },
    h1: {
      fontSize: "1.6rem",
      fontWeight: 400,
      margin: "1rem 0",
    },
    h2: {
      fontSize: "1.4rem",
      fontWeight: 400,
      margin: "1rem 0",
    },
  },
  palette: {
    background: {
      default: "white",
    },
    primary: {
      main: "#0059B2",
    },
    secondary: {
      main: "#208080",
    },
  },
});
