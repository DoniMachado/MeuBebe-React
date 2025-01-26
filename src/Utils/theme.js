import {
  createTheme,
  alpha,
  getContrastRatio,
  ThemeProvider,
} from "@mui/material/styles";

const violetBase = "#7b1fa2";
const violetMain = alpha(violetBase, 0.7);

const lightTheme = createTheme({
  palette: {
    primary: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText:
        getContrastRatio(violetMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
    secondary: {
      main: "#f5f5f5",
      light: "#fafafa",
      dark: "#9e9e9e",
      contrastText: alpha(violetBase, 0.9),
    },
  },
});

const darkVioletBase = "#4a148c";
const darkVioletMain = alpha(darkVioletBase, 0.7);

const darkTheme = createTheme({
  palette: {
    primary: {
      main: darkVioletMain,
      light: alpha(darkVioletBase, 0.5),
      dark: alpha(darkVioletBase, 0.9),
      contrastText:
        getContrastRatio(darkVioletMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
    secondary: {
      main: "#f5f5f5",
      light: "#fafafa",
      dark: "#9e9e9e",
      contrastText: alpha(darkVioletBase, 0.9),
    },
  },
});

export { lightTheme, darkTheme };
