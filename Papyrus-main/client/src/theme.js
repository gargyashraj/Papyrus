import { createTheme } from "@mui/material/styles";

import { orange } from "@mui/material/colors";

export default createTheme({
  status: {
    danger: orange[500],
  },
  palette: {
    primary: {
      main: "#2C3333",
      darker: "#222831",
      dark: "#393E46",
      light: "#FFD369",
      lighter: "#EEEEEE",
    },

    secondary: {
      light: "#2e42db",
      main: "#0013a1",
      dark: "#1b2ba8",
    },
    common: {
      white: "#fff",
    },
  },
});
