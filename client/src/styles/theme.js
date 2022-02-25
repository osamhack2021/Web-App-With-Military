import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#000F04",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#073113",
      contrastText: "#FFFFFF",
    },
    // info: {},
    // error: {},
    // success: {},
    gray: {
      main: "#5E5E5E"
    },
    background: {
      paper: "#F5F5F5"
    }
    
  },
  // shadows: 0,
});

export default theme;
