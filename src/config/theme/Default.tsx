import { createTheme } from "@mui/material/styles";
import { blue, cyan } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
      dark: blue[800],
      light: blue[500],
      contrastText: "#fffff",
    },
    secondary: {
      main: cyan[700],
      dark: cyan[800],
      light: cyan[500],
      contrastText: "#fffff",
    },
    background: {
      default: "#f7f6f3",
      paper: "#fffff",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 550,
      md: 900,
      lg: 1200,
      xl: 1500,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(53, 72, 123)",
          marginLeft: "14px",
          borderRadius: "20px",
          width: "70px",
          fontSize: "10px",
          textAlign: "center",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: " rgb(178, 174, 174)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "rgb(237, 239, 249)",
        },
      },
    },
  },
});

export default theme;
