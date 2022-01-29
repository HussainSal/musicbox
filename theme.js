import { createTheme } from "@material-ui/core";

const theme = createTheme({
  typography: {
    fontFamily: "Lato",
    h1: {
      fontSize: "50px",
      lineHeight: "32px",
      letterSpacing: "-30",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "48px",
      lineHeight: "64px",
      letterSpacing: "20",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "36px",
      lineHeight: "34px",
      letterSpacing: ".10px",
    },
    h4: {
      fontSize: "34px",
      fontWeight: "700",
      lineHeight: "34px",
    },
    h5: {
      fontSize: "26px",
      fontWeight: "bold",
      lineHeight: "26px",
    },
    subtitle1: {
      fontSize: "20px",
      fontWeight: "normal",
      lineHeight: "35px",
      letterSpacing: ".16px",
    },
    subtitle2: {
      fontSize: "14px",
      fontWeight: "normal",
      lineHeight: "17px",
      // letterSpacing: "10",
    },
    body1: {
      fontSize: "18px",
      fontWeight: "bold",
      lineHeight: "32px",
      // letterSpacing: ".6px",
    },
    body2: {
      fontSize: "16px",
      fontWeight: "bold",
      lineHeight: "32px",
      letterSpacing: ".6px",
    },
  },
  palette: {
    primary: {
      main: "#FFF",
    },
    secondary: {
      main: "#848484",
    },
  },
});

export default theme;
