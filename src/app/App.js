import React from "react";
import { BrowserRouter } from "react-router-dom";

import { Box } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AppRoutes from "./AppRoutes";
import Sidebar from "../components/sidebar/Sidebar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f199af",
    },
    secondary: {
      main: "#fffaf9",
    },
    background: {
      menuButton: "#ffffff",
      activeMenuButton: "#f4cac3",
      sidebar: "linear-gradient(90deg, #f4f2ea 0%, #f9eaed 100%)",
      sidebarTitle: "linear-gradient(270deg, #f4d60a 0%, #f54d75 100%)",
      stepperIcon: "#efb9c6 !important",
    },
  },
  components: {
    MuiCollapse: {
      styleOverrides: {
        hidden: {
          display: "none",
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        circle: {
          color: "#f3ca14",
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          "& .Mui-active": { color: "#f44d75 !important" },
          "& .Mui-disabled .MuiStepIcon-root": {
            color: "lightgrey !important",
          },
          "& .Mui-completed": { color: "#f0bbc6 !important" },
        },
      },
    },
  },

  typography: {
    fontFamily: ["Nunito Sans"],
    pageTitle: {
      fontSize: "36px",
      fontWeight: "bold",
    },
    pageSubTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#f54d75",
    },
    sidebarTitle: {
      fontSize: "40px",
      fontWeight: "bold",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    stepperTitle: {
      fontSize: "20px",
      fontWeight: "bold",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box sx={{ display: "flex", height: "100%" }}>
          <Sidebar />
          <AppRoutes />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
