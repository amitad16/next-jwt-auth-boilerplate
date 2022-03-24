import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 708,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      light: "#F6F8FB",
      main: "#323232",
      dark: "#EBEEFE",
    },
    secondary: {
      main: "#3152F5",
    },
    warning: {
      main: "#FD9E47",
    },
    info: {
      main: "#F6F8FB",
    },
    success: {
      main: "#3CD606",
    },
    error: {
      main: "#F82B2B",
    },
  },
  typography: {
    fontFamily: ["Hellix"].join(","),
    // h1: {
    //   fontFamily: "Hellix",
    //   fontSize: "36px",
    //   lineHeight: "44px",
    //   fontWeight: 700,
    // },
    // h2: {
    //   fontFamily: "Tiempos",
    //   fontSize: "24px",
    //   lineHeight: "30px",
    //   fontWeight: 700,
    // },
    // h3: {
    //   fontFamily: "Tiempos",
    //   fontSize: "20px",
    //   lineHeight: "24px",
    //   fontWeight: 700,
    // },
    // h4: {
    //   fontSize: "20px",
    //   lineHeight: "28px",
    //   fontWeight: 400,
    // },
    // h5: {
    //   fontFamily: "Tiempos",
    //   fontSize: "16px",
    //   lineHeight: "24px",
    //   fontWeight: 700,
    // },
    body1: {
      fontSize: "16px",
      lineHeight: "28px",
      fontWeight: 400,
    },
    body2: {
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: "12px",
      lineHeight: "20px",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: "10px",
      lineHeight: "18px",
      fontWeight: 400,
    },
  },
});
